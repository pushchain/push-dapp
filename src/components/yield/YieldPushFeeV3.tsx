// React + Web3 Essentials
import { useEffect, useState, useRef } from 'react';
import { ethers } from 'ethers';

// External Packages
import styled, { useTheme } from 'styled-components';
import { MdCheckCircle, MdError } from 'react-icons/md';

// Internal Components
import useToast from 'hooks/useToast';
import useModalBlur, { MODAL_POSITION } from 'hooks/useModalBlur';
import InfoLogo from '../../assets/inforWithoutBG.svg';
import { B } from 'primaries/SharedStyling';
import LoaderSpinner, { LOADER_TYPE } from 'components/reusables/loaders/LoaderSpinner';
import { formatTokens, numberWithCommas } from 'helpers/StakingHelper';
import StakingToolTip, { StakingToolTipContent } from './StakingToolTip';
import StakingModalComponent from './StakingModalComponent';
import {
  H2V2,
  ImageV2,
  ItemHV2,
  ItemVV2,
  SectionV2,
  Skeleton,
  SkeletonLine,
  SpanV2,
} from 'components/reusables/SharedStylingV2';
import { Box, Button } from 'blocks';

// Internal Configs
import { abis, addresses } from 'config/index.js';
import { useAccount, useDeviceWidthCheck } from 'hooks';
import Tooltip from 'components/reusables/tooltip/Tooltip';
import { device } from 'config/Globals';
import { useClickAway } from 'react-use';
import StepsTransactionModal from 'components/StepsTransactionModal';

const YieldPushFeeV3 = ({ userDataPush, getUserDataPush, PUSHPoolstats, getPUSHPoolStats }) => {
  const { account, provider } = useAccount();

  const [txInProgressWithdraw, setTxInProgressWithdraw] = useState(false);
  const [txInProgressClaimRewards, setTxInProgressClaimRewards] = useState(false);

  const [unstakeErrorMessage, setUnstakeErrorMessage] = useState(null);
  const [withdrawErrorMessage, setWithdrawErrorMessage] = useState(null);

  const [currentTransactionNo, setCurrentTransactionNo] = useState(0);
  const [totalTransactionNo, setTotalTransactionNo] = useState(0);
  const [transactionSteps, setTransactionSteps] = useState(0);

  const [transactionText, setTransactionText] = useState('');

  const pushFeeToast = useToast();
  const theme = useTheme();

  // Checking if the address is Delegated or not
  const checkDelegateAddress = async (pushCoreV2) => {
    var signer = provider.getSigner(account);
    let pushToken = new ethers.Contract(addresses.pushToken, abis.pushToken, signer);

    const isAddressDelegated = await pushToken.holderDelegation(account, pushCoreV2.address);

    //First we will delegate the pushCoreV2 address then we will proceed further
    if (!isAddressDelegated) {
      try {
        pushFeeToast.showLoaderToast({ loaderMessage: 'Delegating! Please wait..' });
        const tx = await pushToken.setHolderDelegation(pushCoreV2.address, 'true');
        await provider.waitForTransaction(tx.hash);
        pushFeeToast.showMessageToast({
          toastTitle: 'Success',
          toastMessage: 'Transaction Completed! Address Delegated',
          toastType: 'SUCCESS',
          getToastIcon: (size) => (
            <MdCheckCircle
              size={size}
              color="green"
            />
          ),
        });
        return true;
      } catch (error) {
        console.error('Error in delegating', error);
        pushFeeToast.showMessageToast({
          toastTitle: 'Error',
          toastMessage: `Transaction failed! ${error.reason}`,
          toastType: 'ERROR',
          getToastIcon: (size) => (
            <MdError
              size={size}
              color="red"
            />
          ),
        });
        setTxInProgressWithdraw(false);
        return false;
      }
    } else {
      return true;
    }
  };

  const getLastClaimedBlock = async (pushCoreV2) => {
    const userFeesInfo = await pushCoreV2.userFeesInfo(account);
    const lastClaimedBlock = userFeesInfo.lastClaimedBlock;

    if (lastClaimedBlock.toNumber() !== 0) {
      const genesisEpoch = await pushCoreV2.genesisEpoch();
      const epochDuration = await pushCoreV2.epochDuration();

      const epochNumberGap = (lastClaimedBlock - genesisEpoch) / epochDuration;

      return epochNumberGap;
    }
  };

  const claimRewards = async () => {
    if (txInProgressClaimRewards) {
      return;
    }

    setTxInProgressClaimRewards(true);
    const withdrawAmount = userDataPush?.availableRewards;

    if (withdrawAmount == 0) {
      setWithdrawErrorMessage('No Rewards to Claim');
      setTxInProgressClaimRewards(false);
      return;
    }

    var signer = provider.getSigner(account);
    let pushCoreV2 = new ethers.Contract(addresses.pushCoreV2, abis.pushCoreV2, signer);

    const currentEpoch = PUSHPoolstats?.currentEpochNumber;
    const batchSize = 14;

    const isAddressDelegate = await checkDelegateAddress(pushCoreV2);
    if (!isAddressDelegate) {
      return;
    }

    let _tillEpoch = 1;
    _tillEpoch = await getLastClaimedBlock(pushCoreV2);

    openTransactionModal();
    setTxInProgressClaimRewards(false);

    let totalTransactionNumber = 0;
    //!TODO Verify Again. Edge Cases
    if (currentEpoch - _tillEpoch < batchSize) {
      totalTransactionNumber = Math.ceil((currentEpoch - _tillEpoch) / batchSize);
    } else {
      totalTransactionNumber = Math.ceil((currentEpoch - _tillEpoch) / batchSize);
    }

    setTotalTransactionNo(totalTransactionNumber);

    if (totalTransactionNumber == 0) {
      return;
    }

    // Making a single function for claiming rewards Modal
    await RewardsPaginated(totalTransactionNumber, _tillEpoch, pushCoreV2, batchSize);

    getUserDataPush();
    setTransactionSteps(2);
    setCurrentTransactionNo(0);
  };

  const RewardsPaginated = async (totalTransactionNumber, _tillEpoch, pushCoreV2, batchSize) => {
    const currentEpoch = PUSHPoolstats?.currentEpochNumber;

    let transactionNumber = 0;
    for (let i = 0; i < totalTransactionNumber; i++) {
      let lastEpoch = _tillEpoch;
      _tillEpoch += batchSize;

      let temp = Math.min(_tillEpoch, currentEpoch - 1);

      setTransactionText(`Claiming the rewards from Epoch ${lastEpoch} to ${temp} `);

      const tx = pushCoreV2.harvestPaginated(temp, {
        gasLimit: 910000,
      });

      await tx
        .then(async (tx) => {
          try {
            pushFeeToast.showLoaderToast({ loaderMessage: 'Waiting for confirmation' });
            await provider.waitForTransaction(tx.hash);

            pushFeeToast.showMessageToast({
              toastTitle: 'Success',
              toastMessage: 'Transaction Completed!',
              toastType: 'SUCCESS',
              getToastIcon: (size) => (
                <MdCheckCircle
                  size={size}
                  color="green"
                />
              ),
            });

            transactionNumber++;
            setCurrentTransactionNo(transactionNumber);
          } catch (error) {
            console.error('Error in the transaction', tx);
            return;
          }
        })
        .catch((error) => {
          console.error('Error in claiming the reward', error);
          pushFeeToast.showMessageToast({
            toastTitle: 'Error',
            toastMessage: `Transaction failed! ${error.reason}`,
            toastType: 'ERROR',
            getToastIcon: (size) => (
              <MdError
                size={size}
                color="red"
              />
            ),
          });
          setTransactionText('');
          setTxInProgressWithdraw(false);
          getUserDataPush();
          setTransactionSteps(1);
          setCurrentTransactionNo(0);
          throw error;
        });
    }
  };

  const unstakeTokensPaginated = async () => {
    if (txInProgressWithdraw) {
      return;
    }

    setTxInProgressWithdraw(true);
    const unstakeAmount = formatTokens(userDataPush?.userStaked);

    if (unstakeAmount == 0) {
      setUnstakeErrorMessage('Nothing to unstake, You need to stake first');
      setTxInProgressWithdraw(false);
      return;
    }

    var signer = provider.getSigner(account);
    let pushCoreV2 = new ethers.Contract(addresses.pushCoreV2, abis.pushCoreV2, signer);

    // Checking if the address is delegated or not
    const isAddressDelegate = await checkDelegateAddress(pushCoreV2);
    setTxInProgressClaimRewards(false);
    if (!isAddressDelegate) {
      return;
    }

    const currentEpoch = PUSHPoolstats?.currentEpochNumber;
    const batchSize = 14;

    let _tillEpoch = 0;
    _tillEpoch = await getLastClaimedBlock(pushCoreV2);

    // Case -: When the user has just claimed reward and then trying to unstake
    if (_tillEpoch >= currentEpoch - 1) {
      setTxInProgressWithdraw(false);
      setUnstakeErrorMessage('PUSH cannot be unstaked until current epoch is over.');
      pushFeeToast.showMessageToast({
        toastTitle: 'Unstaking Error',
        toastMessage: `You cannot unstake until Current Epoch gets over.`,
        toastType: 'ERROR',
        getToastIcon: (size) => (
          <MdError
            size={size}
            color="red"
          />
        ),
      });
      return;
    }

    // Modal for displaying transactions
    openTransactionModal();

    const totalTransactionNumber = Math.ceil((currentEpoch - _tillEpoch) / batchSize);
    setTotalTransactionNo(totalTransactionNumber);

    if (totalTransactionNumber > 1) {
      await RewardsPaginated(totalTransactionNumber - 1, _tillEpoch, pushCoreV2, batchSize);
    }

    setTransactionText('Unstaking Your Push Tokens. Please wait...');

    const tx = pushCoreV2.unstake();
    tx.then(async (tx) => {
      pushFeeToast.showLoaderToast({ loaderMessage: 'Unstaking! Waiting for Confirmation...' });

      try {
        await provider.waitForTransaction(tx.hash);
        pushFeeToast.showMessageToast({
          toastTitle: 'Success',
          toastMessage: 'Transaction Completed!',
          toastType: 'SUCCESS',
          getToastIcon: (size) => (
            <MdCheckCircle
              size={size}
              color="green"
            />
          ),
        });

        getPUSHPoolStats();
        getUserDataPush();
        setTxInProgressWithdraw(false);
        setTransactionSteps(2);
        setCurrentTransactionNo(0);
      } catch (e) {
        console.error('Error', e);
        pushFeeToast.showMessageToast({
          toastTitle: 'Error',
          toastMessage: `Transaction Failed! (" +${e.name}+ ")`,
          toastType: 'ERROR',
          getToastIcon: (size) => (
            <MdError
              size={size}
              color="red"
            />
          ),
        });
        setTransactionText('');
        setTxInProgressWithdraw(false);
      }
    }).catch((err) => {
      console.error('Error: ', err);
      const unstakeErrorMessage = err.reason.includes('PushCoreV2::unstake:');
      const harvestErrorMessage = err.reason.includes('PushCoreV2::harvestPaginated:');
      if (unstakeErrorMessage || harvestErrorMessage) {
        setUnstakeErrorMessage('PUSH cannot be unstaked until current epoch is over.');
      } else {
        let errorMessage = err.reason.slice(err.reason.indexOf('::') + 1);
        errorMessage = errorMessage.replace('unstake:', '');
        pushFeeToast.showMessageToast({
          toastTitle: 'Error',
          toastMessage: `${errorMessage}`,
          toastType: 'ERROR',
          getToastIcon: (size) => (
            <MdError
              size={size}
              color="red"
            />
          ),
        });
      }
      setTxInProgressWithdraw(false);
      getUserDataPush();
      setTransactionSteps(1);
      setCurrentTransactionNo(0);
    });
  };

  useEffect(() => {
    setWithdrawErrorMessage(null);
    setUnstakeErrorMessage(null);
  }, [account]);

  const {
    isModalOpen: isStakingModalOpen,
    showModal: showStakingModal,
    ModalComponent: StakingComponent,
  } = useModalBlur();

  const stakingModalToast = useToast();
  const isMobile = useDeviceWidthCheck(600);

  const {
    isModalOpen: isTransactionModalOpen,
    showModal: openTransactionModal,
    ModalComponent: TransactionModal,
  } = useModalBlur();

  return (
    <Container>
      <StakingComponent
        InnerComponent={StakingModalComponent}
        InnerComponentProps={{
          title: 'PUSH',
          getUserData: getUserDataPush,
          getPoolStats: getPUSHPoolStats,
          setUnstakeErrorMessage: setUnstakeErrorMessage,
          setWithdrawErrorMessage: setWithdrawErrorMessage,
        }}
        toastObject={stakingModalToast}
        modalPosition={MODAL_POSITION.ON_PARENT}
      />

      <TransactionModal
        InnerComponent={StepsTransactionModal}
        InnerComponentProps={{
          currentTransactionNo,
          totalTransactionNo,
          transactionSteps,
          transactionText,
          setCurrentTransactionNo,
          setTotalTransactionNo,
          setTransactionSteps,
          claimRewards,
          unstakeTokensPaginated,
        }}
        onConfirm={() => {}}
        modalPadding="0px"
        modalPosition={MODAL_POSITION.ON_ROOT}
      />

      {/* Top Section */}
      <ItemVV2 margin="0px 0px 20px 0px">
        {PUSHPoolstats ? (
          <>
            <Heading>PUSH Fee Staking Pool</Heading>
            {/* <APRText>
              Current APR
              <SpanV2
                color="#D53A94"
                fontWeight="600"
                margin="0 5px 0 5px"
              >
                &gt;{numberWithCommas(PUSHPoolstats?.stakingAPR)}% + Fee
              </SpanV2>
              <ToolTipAPR />
            </APRText> */}
          </>
        ) : (
          <SkeletonContainer padding="5px 15px 0 15px">
            <SkeletonLine
              height="12px"
              width="234px"
              margin="0 0 10px 0"
            ></SkeletonLine>
            <SkeletonLine
              height="12px"
              width="112px"
            ></SkeletonLine>
          </SkeletonContainer>
        )}
      </ItemVV2>

      {/* Body Section */}
      <ItemVV2 flex="5">
        {/* Reward Section */}
        <RewardContainer
          border={`1px solid ${theme.stakingBorder}`}
          borderRadius="16px"
        >
          <ItemVV2 padding={isMobile ? ' 1px' : '8px'}>
            {PUSHPoolstats ? (
              <>
                <SecondaryText>Current Reward</SecondaryText>
                <H2V2
                  fontSize={isMobile ? '18px' : '24px'}
                  fontWeight="600"
                  color="#D53A94"
                  letterSpacing="normal"
                >
                  {numberWithCommas(formatTokens(PUSHPoolstats?.currentReward))} PUSH
                </H2V2>
              </>
            ) : (
              <SkeletonContainer padding={isMobile ? '0px' : '5px 15px 0 15px'}>
                <SkeletonLine
                  height="12px"
                  width={isMobile ? '100px' : '135px'}
                  margin="0 0 8px 0"
                ></SkeletonLine>
                <SkeletonLine
                  height="12px"
                  width={isMobile ? '65px' : '100px}'}
                ></SkeletonLine>
              </SkeletonContainer>
            )}
          </ItemVV2>

          <Line
            width="10px"
            height="100%"
          ></Line>

          <ItemVV2 padding={isMobile ? ' 1px' : '8px'}>
            {PUSHPoolstats ? (
              <>
                <SecondaryText>Total Staked</SecondaryText>
                <StakedAmount
                  fontSize={isMobile ? '18px' : '24px'}
                  fontWeight="600"
                  letterSpacing="normal"
                >
                  {numberWithCommas(formatTokens(PUSHPoolstats?.totalStakedAmount))} PUSH
                </StakedAmount>
              </>
            ) : (
              <SkeletonContainer padding={isMobile ? '0px' : '5px 15px 0 15px'}>
                <SkeletonLine
                  height="12px"
                  width={isMobile ? '100px' : '135px'}
                  margin="0 0 8px 0"
                ></SkeletonLine>
                <SkeletonLine
                  height="12px"
                  width={isMobile ? '65px' : '100px}'}
                ></SkeletonLine>
              </SkeletonContainer>
            )}
          </ItemVV2>
        </RewardContainer>

        {/* Epoch Text */}
        <ItemHV2
          alignSelf="end"
          margin="12px 13px 24px 0px"
          color="#575D73"
          letterSpacing="normal"
        >
          {PUSHPoolstats ? (
            <>
              <EpochNo>Current Epoch</EpochNo>
              <EpochNo>{PUSHPoolstats?.currentEpochNumber}</EpochNo>
            </>
          ) : (
            <SkeletonContainer padding="5px 0px 0 15px">
              <SkeletonLine
                height="12px"
                width="124px"
              ></SkeletonLine>
            </SkeletonContainer>
          )}
        </ItemHV2>

        {/* Deposit Cash Data */}

        {userDataPush ? (
          <ItemVV2>
            <ItemHV2
              justifyContent="space-between"
              margin={isMobile ? '0px 0px 12px 0px' : '0px 13px 12px 13px'}
            >
              <DataTitle>
                User Deposit
                <InfoSpan>
                  <StakingToolTip
                    ToolTipTitle={'User Deposited'}
                    ToolTipBody={'Amount of PUSH Token User Staked'}
                  >
                    <ImageV2
                      src={InfoLogo}
                      alt="Info-Logo"
                      width="16px"
                      style={{ cursor: 'pointer' }}
                    />
                  </StakingToolTip>
                </InfoSpan>
              </DataTitle>
              <DataValue> {numberWithCommas(formatTokens(userDataPush?.userStaked))} PUSH</DataValue>
            </ItemHV2>
            <ItemHV2
              justifyContent="space-between"
              margin={isMobile ? '0px 0px 12px 0px' : '0px 13px 12px 13px'}
            >
              <DataTitle>
                Rewards Claimed
                <InfoSpan>
                  <StakingToolTip
                    ToolTipTitle={'Rewards Claimed'}
                    ToolTipBody={'Amount of Push Claimed by User'}
                  >
                    <ImageV2
                      src={InfoLogo}
                      alt="Info-Logo"
                      width="16px"
                      style={{ cursor: 'pointer' }}
                    />
                  </StakingToolTip>
                </InfoSpan>
              </DataTitle>
              <DataValue> {numberWithCommas((userDataPush?.claimedReward).toFixed(2))} PUSH</DataValue>
            </ItemHV2>
            <ItemHV2
              justifyContent="space-between"
              margin={isMobile ? '0px 0px 12px 0px' : '0px 13px 12px 13px'}
            >
              <DataTitle>
                Current Epoch Reward
                <InfoSpan>
                  <StakingToolTip
                    ToolTipTitle={'Current Epoch Reward'}
                    ToolTipBody={'Displays the approximate latest reward amount for current epoch'}
                  >
                    <ImageV2
                      src={InfoLogo}
                      alt="Info-Logo"
                      width="16px"
                      style={{ cursor: 'pointer' }}
                    />
                  </StakingToolTip>
                </InfoSpan>
              </DataTitle>
              <DataValue> {numberWithCommas((userDataPush?.potentialReward).toFixed(2))} PUSH</DataValue>
            </ItemHV2>
            <ItemHV2
              justifyContent="space-between"
              margin={isMobile ? '0px 0px 12px 0px' : '0px 13px 12px 13px'}
            >
              <DataTitle>
                Available for Claiming
                <InfoSpan>
                  <StakingToolTip
                    ToolTipTitle={'Available for Claiming'}
                    ToolTipBody={'Amount of Push Token Available to claim'}
                  >
                    <ImageV2
                      src={InfoLogo}
                      alt="Info-Logo"
                      width="16px"
                      style={{ cursor: 'pointer' }}
                    />
                  </StakingToolTip>
                </InfoSpan>
              </DataTitle>
              <DataValue> {numberWithCommas((userDataPush?.availableRewards).toFixed(2))} PUSH</DataValue>
            </ItemHV2>
          </ItemVV2>
        ) : (
          <Skeleton
            padding="0 15px 15px 15px"
            width="100%"
            maxWidth=" -webkit-fill-available"
            borderRadius="5px"
          >
            <ItemHV2
              justifyContent="space-between"
              margin="0 0 23px 0"
            >
              <SkeletonLine
                height="12px"
                width="164px"
              ></SkeletonLine>
              <SkeletonLine
                height="12px"
                width="72px"
              ></SkeletonLine>
            </ItemHV2>
            <ItemHV2
              justifyContent="space-between"
              margin="0 0 23px 0"
            >
              <SkeletonLine
                height="12px"
                width="164px"
              ></SkeletonLine>
              <SkeletonLine
                height="12px"
                width="72px"
              ></SkeletonLine>
            </ItemHV2>
            <ItemHV2
              justifyContent="space-between"
              margin="0 0 23px 0"
            >
              <SkeletonLine
                height="12px"
                width="164px"
              ></SkeletonLine>
              <SkeletonLine
                height="12px"
                width="72px"
              ></SkeletonLine>
            </ItemHV2>
            <ItemHV2 justifyContent="space-between">
              <SkeletonLine
                height="12px"
                width="164px"
              ></SkeletonLine>
              <SkeletonLine
                height="12px"
                width="72px"
              ></SkeletonLine>
            </ItemHV2>
          </Skeleton>
        )}
      </ItemVV2>

      {/* Bottom Section */}
      <ItemVV2
        padding={isMobile ? '0px ' : '0px 14px'}
        margin="24px 0px 24px 0px"
      >
        {userDataPush ? (
          <>
            <ItemHV2>
              <Button
                variant="primary"
                size="medium"
                block
                onClick={showStakingModal}
              >
                Stake $PUSH
              </Button>
            </ItemHV2>
            <ButtonsContainer>
              <Box width="50%">
                {PUSHPoolstats?.currentEpochNumber <= 2 ? (
                  <ErrorToolTip
                    ToolTipTitle={'You can unstake once epoch 2 ends.'}
                    ButtonTitle={'Unstake PUSH'}
                  />
                ) : formatTokens(userDataPush?.userStaked) == 0 || unstakeErrorMessage !== null ? (
                  <ErrorToolTip
                    ToolTipTitle={unstakeErrorMessage ? unstakeErrorMessage : 'Nothing to unstake, Stake First'}
                    ButtonTitle={'Unstake PUSH'}
                  />
                ) : (
                  <Button
                    variant="outline"
                    size="medium"
                    block
                    onClick={unstakeTokensPaginated}
                  >
                    {txInProgressWithdraw ? (
                      <LoaderSpinner
                        type={LOADER_TYPE.SEAMLESS}
                        spinnerSize={26}
                        spinnerColor={theme.activeButtonText}
                        title="Unstaking"
                        titleColor={theme.activeButtonText}
                      />
                    ) : (
                      'Unstake $PUSH'
                    )}
                  </Button>
                )}
              </Box>
              <Box width="50%">
                {userDataPush?.availableRewards === 0.0 ? (
                  <StakingToolTip
                    bottom={'-30px'}
                    ToolTipTitle={'No Rewards to Claim'}
                    error={true}
                    left={'40px'}
                    ToolTipWidth={'10rem'}
                  >
                    <Button
                      size="medium"
                      block
                      disabled={true}
                    >
                      {txInProgressClaimRewards ? (
                        <LoaderSpinner
                          type={LOADER_TYPE.SEAMLESS}
                          spinnerSize={26}
                          spinnerColor="#D53A94"
                        />
                      ) : (
                        'Claim Rewards'
                      )}
                    </Button>
                  </StakingToolTip>
                ) : (
                  <Button
                    variant="outline"
                    size="medium"
                    block
                    onClick={claimRewards}
                  >
                    {txInProgressClaimRewards ? (
                      <LoaderSpinner
                        type={LOADER_TYPE.SEAMLESS}
                        spinnerSize={26}
                        spinnerColor={theme.activeButtonText}
                        title="Claiming"
                        titleColor={theme.activeButtonText}
                      />
                    ) : (
                      'Claim Rewards'
                    )}
                  </Button>
                )}
              </Box>
            </ButtonsContainer>
          </>
        ) : (
          <SkeletonContainer width="100%">
            <SkeletonLine
              height="49px"
              width="100%"
              margin="0 0 8px 0"
            ></SkeletonLine>
            <SkeletonLine
              height="49px"
              width="100%"
            ></SkeletonLine>
          </SkeletonContainer>
        )}
      </ItemVV2>
    </Container>
  );
};

export default YieldPushFeeV3;

const ErrorToolTip = (props) => {
  return (
    <StakingToolTip
      error={true}
      ToolTipTitle={props.ToolTipTitle}
      ToolTipWidth={'16rem'}
      bottom={'-30px'}
    >
      <Button
        size="medium"
        block
        disabled={true}
      >
        {props.ButtonTitle}
      </Button>
    </StakingToolTip>
  );
};

const ToolTipAPR = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClose = () => setIsActive(false);
  const containerRef = useRef(null);
  useClickAway(containerRef, () => handleClose());

  return (
    <OuterContainer ref={containerRef}>
      <ImageV2
        onClick={() => setIsActive(!isActive)}
        src={InfoLogo}
        alt="Info-Logo"
        width="16px"
        style={{ cursor: 'pointer' }}
      />

      {isActive && (
        <Content id="channel">
          <StakingToolTipContent
            title={''}
            body={'Push Fee Pool APR distributes yield farming rewards + fee earned by protocol. More Info '}
          />
        </Content>
      )}
    </OuterContainer>
  );
};

const OuterContainer = styled.div`
  width: 34%;
  width: 100%;
  min-width: none;
  max-width: none;
  display: flex;
  flex: 1;
  height: fit-content;
  position: relative;
  @media ${device.tablet} {
    width: 100%;
    max-width: 100%;
  }
`;

const Content = styled.div`
  position: absolute;
  border-radius: 17px;
  background: none;
  bottom: 25px;
  left: 5px;
  color: #fff;
  background: #131313;
  font-family: 'FK Grotesk Neu';
  font-style: normal;
  font-weight: 400;
  font-size: 0.9rem;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  line-height: 21px;
  z-index: 10;
  &::before {
    bottom: 100%;
    border-bottom-color: #131313;
  }
`;

const Container = styled(SectionV2)`
  border: 1px solid ${(props) => props.theme.stakingBorder};
  border-radius: 24px;
  padding: 20px;
  margin: 10px 10px 10px 0;
  font-family: 'FK Grotesk Neu';
  font-style: normal;
  font-weight: 500;
  min-height: 587px;
  color: ${(props) => props.theme.stakingPrimaryText};
  width: -webkit-fill-available;
  @media (max-width: 1300px) {
    margin: 10px 0;
  }
  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const Heading = styled(H2V2)`
  font-size: 24px;
  line-height: 141%;
  letter-spacing: normal;
  color: ${(props) => props.theme.stakingPrimaryText};

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const APRText = styled.div`
  margin: 0px;
  font-size: 18px;
  line-height: 141%;
  letter-spacing: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const SecondaryText = styled.p`
  margin: 0px;
  font-size: 18px;
  line-height: 141%;
  letter-spacing: normal;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const RewardContainer = styled(ItemHV2)`
  min-height: 110px;

  @media (min-width: 600px) and (max-width: 992px) {
    margin: 0px 13px;
  }
`;

const Line = styled.div`
  width: 1px;
  height: 100%;
  background: ${(props) => props.theme.stakingBorder};
`;
const DataTitle = styled.div`
  font-size: 18px;
  line-height: 141%;
  letter-spacing: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.stakingUserDetails};

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;
const StakedAmount = styled(H2V2)`
  color: ${(props) => props.theme.stakingSecondaryText};
`;

const EpochNo = styled(B)`
  font-weight: 600;
  text-align: right;
  letter-spacing: normal;
  font-size: 16px;
  line-height: 141%;
  margin-right: 5px;
  color: ${(props) => props.theme.stakingUserDetails};

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const InfoSpan = styled(SpanV2)`
  margin: 0px 0px 0px 6px;
  cursor: pointer;
`;

const DataValue = styled(H2V2)`
  font-size: 18px;
  line-height: 141%;
  letter-spacing: normal;
  color: ${(props) => props.theme.stakingPrimaryText};

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin: 15px 0px 0px 0px;
  gap: var(--s3);
  width: 100%;
`;

const SkeletonContainer = styled(Skeleton)`
  // width:150px;
  max-width: -webkit-fill-available;
  border-radius: 5px;
  gap: 5px;
`;
