// React + Web3 Essentials
import { useState, useEffect } from 'react';
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
import StakingToolTip from './StakingToolTip';
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

const bn = function (number, defaultValue = null) {
  if (number == null) {
    if (defaultValue == null) {
      return null;
    }
    number = defaultValue;
  }
  return ethers.BigNumber.from(number);
};

const YieldUniswapV3 = ({ lpPoolStats, userDataLP, getLpPoolStats, getUserDataLP }) => {
  const { account, provider } = useAccount();

  const [txInProgressWithdraw, setTxInProgressWithdraw] = useState(false);
  const [txInProgressClaimRewards, setTxInProgressClaimRewards] = useState(false);

  const [withdrawErrorMessage, setWithdrawErrorMessage] = useState(null);
  const [unstakeErrorMessage, setUnstakeErrorMessage] = useState(null);

  const uniswapV2Toast = useToast();
  const theme = useTheme();

  const withdrawAmountTokenFarmAutomatic = async () => {
    if (txInProgressWithdraw) {
      return;
    }

    setTxInProgressWithdraw(true);
    const withdrawAmount = formatTokens(userDataLP.epochStakeNext);

    if (withdrawAmount == 0) {
      setUnstakeErrorMessage('Nothing to unstake. You need to stake first');
      setTxInProgressWithdraw(false);
      return;
    }

    var signer = provider.getSigner(account);
    let staking = new ethers.Contract(addresses.stakingV2, abis.stakingV2, signer);

    const amounttowithdraw = await staking.balanceOf(account, addresses.uniV2LPToken);

    const tx = staking.withdraw(
      addresses.uniV2LPToken,
      ethers.BigNumber.from(withdrawAmount).mul(ethers.BigNumber.from(10).pow(18))
    );

    tx.then(async (tx) => {
      uniswapV2Toast.showLoaderToast({ loaderMessage: 'Waiting for Confirmation...' });

      try {
        await provider.waitForTransaction(tx.hash);
        uniswapV2Toast.showMessageToast({
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

        setTxInProgressWithdraw(false);

        getLpPoolStats();
        getUserDataLP();
      } catch (e) {
        console.error('Error', e);
        uniswapV2Toast.showMessageToast({
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

        setTxInProgressWithdraw(false);
      }
    }).catch((err) => {
      uniswapV2Toast.showMessageToast({
        toastTitle: 'Error',
        toastMessage: `Transaction Cancelled!`,
        toastType: 'ERROR',
        getToastIcon: (size) => (
          <MdError
            size={size}
            color="red"
          />
        ),
      });

      setTxInProgressWithdraw(false);
    });
  };

  const massClaimRewardsTokensAll = async () => {
    if (txInProgressClaimRewards) {
      return;
    }

    if (userDataLP?.totalAvailableReward == 0) {
      setWithdrawErrorMessage('No Rewards to Claim!');
      return;
    }

    console.debug('Lp POOL stats', lpPoolStats);

    if (!lpPoolStats.currentEpochLP || lpPoolStats.currentEpochLP == 1) {
      uniswapV2Toast.showMessageToast({
        toastTitle: 'Error',
        toastMessage: `Harvest unlocks from Epoch 2!)`,
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
    setTxInProgressClaimRewards(true);

    var signer = provider.getSigner(account);
    let yieldFarmingLP = new ethers.Contract(addresses.yieldFarmLP, abis.yieldFarming, signer);
    const tx = yieldFarmingLP.massHarvest();

    tx.then(async (tx) => {
      uniswapV2Toast.showLoaderToast({ loaderMessage: 'Waiting for Confirmation...' });

      try {
        await provider.waitForTransaction(tx.hash);

        uniswapV2Toast.showMessageToast({
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

        getUserDataLP();
        setTxInProgressClaimRewards(false);
      } catch (e) {
        uniswapV2Toast.showMessageToast({
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

        setTxInProgressClaimRewards(false);
      }
    }).catch((err) => {
      uniswapV2Toast.showMessageToast({
        toastTitle: 'Error',
        toastMessage: `Transaction Cancelled!`,
        toastType: 'ERROR',
        getToastIcon: (size) => (
          <MdError
            size={size}
            color="red"
          />
        ),
      });

      setTxInProgressClaimRewards(false);
    });
  };

  useEffect(() => {
    setWithdrawErrorMessage(null);
    setUnstakeErrorMessage(null);
  }, [account]);

  const handleStakingModal = () => {
    if (lpPoolStats?.currentEpochLP.toNumber() + 1 <= lpPoolStats?.totalEpochLP.toNumber()) {
      showStakingModal();
    } else {
      uniswapV2Toast.showMessageToast({
        toastTitle: 'Error',
        toastMessage: `Epochs have ended!`,
        toastType: 'ERROR',
        getToastIcon: (size) => (
          <MdError
            size={size}
            color="red"
          />
        ),
      });
    }
  };

  const {
    isModalOpen: isStakingModalOpen,
    showModal: showStakingModal,
    ModalComponent: StakingComponent,
  } = useModalBlur();

  const stakingModalToast = useToast();
  const isMobile = useDeviceWidthCheck(600);

  return (
    <Container>
      <StakingComponent
        InnerComponent={StakingModalComponent}
        InnerComponentProps={{
          title: 'Uni-V2',
          getUserData: getUserDataLP,
          getPoolStats: getLpPoolStats,
          setUnstakeErrorMessage: setUnstakeErrorMessage,
          setWithdrawErrorMessage: setWithdrawErrorMessage,
        }}
        toastObject={stakingModalToast}
        modalPosition={MODAL_POSITION.ON_PARENT}
      />

      {/* Top Section */}
      <ItemVV2 margin="0px 0px 20px 0px">
        {lpPoolStats ? (
          <>
            <Heading>Uniswap V2 LP Staking Pool</Heading>
            {/* <SecondaryText>
              Current APR{' '}
              <SpanV2
                color="#D53A94"
                fontWeight="600"
              >
                &gt;{numberWithCommas(lpPoolStats?.stakingAPR)}%
              </SpanV2>
            </SecondaryText> */}
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
            {lpPoolStats ? (
              <>
                <SecondaryText>Current Reward</SecondaryText>
                <H2V2
                  fontSize={isMobile ? '18px' : '24px'}
                  fontWeight="600"
                  color="#D53A94"
                  letterSpacing="normal"
                >
                  {/* {numberWithCommas(formatTokens(lpPoolStats?.rewardForCurrentEpoch))} PUSH */}0 PUSH
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
            {lpPoolStats ? (
              <>
                <SecondaryText>Total Staked</SecondaryText>

                <StakedAmount
                  fontSize={isMobile ? '18px' : '24px'}
                  fontWeight="600"
                  letterSpacing="normal"
                >
                  {numberWithCommas(formatTokens(lpPoolStats?.poolBalance))} UNI-V2
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
          {lpPoolStats ? (
            <>
              <EpochNo>Current Epoch</EpochNo>
              <EpochNo>
                {Math.min(lpPoolStats?.currentEpochLP, lpPoolStats?.totalEpochLP).toString()}/
                {lpPoolStats?.totalEpochLP.toString()}
              </EpochNo>
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
        {userDataLP ? (
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
              <DataValue>{formatTokens(userDataLP?.epochStakeNext)} UNI-V2</DataValue>
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
              <DataValue>
                {' '}
                {numberWithCommas(
                  (userDataLP?.totalAccumulatedReward - userDataLP?.totalAvailableReward).toFixed(2)
                )}{' '}
                PUSH
              </DataValue>
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
              <DataValue> {numberWithCommas(userDataLP?.potentialUserReward)} PUSH</DataValue>
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
              <DataValue> {numberWithCommas(userDataLP?.totalAvailableReward)} PUSH</DataValue>
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
        {userDataLP ? (
          <>
            <ItemHV2>
              <Button
                variant="primary"
                size="medium"
                disabled
                block
                onClick={() => {
                  handleStakingModal();
                }}
              >
                Stake $UNI-V2 LP Tokens
              </Button>
            </ItemHV2>
            <ButtonsContainer>
              <Box width="50%">
                {formatTokens(userDataLP?.epochStakeNext) === '0' ? (
                  <StakingToolTip
                    error={true}
                    ToolTipTitle={'Nothing to unstake! Stake First.'}
                    ToolTipWidth={'16rem'}
                    bottom={'-30px'}
                  >
                    <Button
                      disabled={true}
                      size="medium"
                      block
                    >
                      {txInProgressWithdraw ? (
                        <LoaderSpinner
                          type={LOADER_TYPE.SEAMLESS}
                          spinnerSize={26}
                          spinnerColor="#D53A94"
                        />
                      ) : (
                        'Unstake $UNI-V2'
                      )}
                    </Button>
                  </StakingToolTip>
                ) : (
                  <Button
                    size="medium"
                    variant="outline"
                    block
                    onClick={withdrawAmountTokenFarmAutomatic}
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
                      'Unstake $UNI-V2'
                    )}
                  </Button>
                )}
              </Box>

              <Box width="50%">
                {userDataLP?.totalAvailableReward === '0.00' ? (
                  <StakingToolTip
                    bottom={'-30px'}
                    left={'40px'}
                    ToolTipTitle={'No Rewards to Claim!'}
                    error={true}
                    ToolTipWidth={'10rem'}
                  >
                    <Button
                      disabled={true}
                      size="medium"
                      block
                    >
                      {txInProgressClaimRewards ? (
                        <LoaderSpinner
                          type={LOADER_TYPE.SEAMLESS}
                          spinnerSize={26}
                          spinnerColor="#FFFFF"
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
                    onClick={() => massClaimRewardsTokensAll()}
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

export default YieldUniswapV3;

const Container = styled(SectionV2)`
  border: 1px solid ${(props) => props.theme.stakingBorder};
  border-radius: 24px;
  padding: 20px;

  font-family: 'FK Grotesk Neu';

  margin: 10px 0 10px 10px;

  font-style: normal;
  font-weight: 500;
  min-height: 587px;
  color: ${(props) => props.theme.stakingPrimaryText};
  width: -webkit-fill-available;
  @media (max-width: 1300px) {
    margin: 0 0 10px 0;
  }
  @media (max-width: 600px) {
    padding: 16px;
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
const SecondaryText = styled.div`
  margin: 0px;
  font-size: 18px;
  line-height: 141%;
  letter-spacing: normal;
  // color: #333333;

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
  // color: rgba(87, 93, 115, 0.8);
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
  gap: 12px;
  margin: 15px 0px 0px 0px;
  width: 100%;
`;

const SkeletonContainer = styled(Skeleton)`
  // width:150px;
  max-width: -webkit-fill-available;
  border-radius: 5px;
  gap: 5px;
`;
