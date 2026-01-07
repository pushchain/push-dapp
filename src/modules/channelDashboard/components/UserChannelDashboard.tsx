import { FC, useMemo, useState } from 'react';

import { Alert, Box } from 'blocks';

import { appConfig } from 'config';

import { useAccount } from 'hooks';

import { ChannelDetails } from 'queries';

import { ChannelDashboardHeader } from './ChannelDashboardHeader';
import { AppFooter } from './AppFooter';
import { ChannelDashboardBody } from './ChannelDashboardBody';

import { DashboardActiveState } from '../ChannelDashboard.types';
import LoaderSpinner, { LOADER_TYPE } from 'components/reusables/loaders/LoaderSpinner';
import { ChannelDashboardNullChain } from './ChannelDashboardNullChain';
import { convertAddressToAddrCaip } from 'helpers/CaipHelper';

type UserChannelDashboardProps = {
  setActiveState: (activeState: DashboardActiveState) => void;
  channelDetails?: ChannelDetails;
  loadingChannelDetails: boolean;
};

const UserChannelDashboard: FC<UserChannelDashboardProps> = ({
  setActiveState,
  channelDetails,
  loadingChannelDetails
}) => {
  const { chainId, account } = useAccount();

  const [channelDashboardError, setChannelDashboardError] = useState('');

  /**
   ** Alias Logic:
   * 1. First Filter out the alias based on alias address and caip address (Note: It will only give a single alias because we are using caip Address which means only single channel exists per user on a chain)
   * 2. Check If the Filtered alias exists and is verified or not
   * 3. If verified, then it is an active network (means: Channel is present and is active on this chain)
   * 4. If not, then it is not on active network -> then we pass filtered alias details to the ChannelDashboardNullChain to check if loading or not
   * 5. We check that alias is present and is_alias_verified is 0 (alias not verified), then we show loading state
   * 6. If alias is not present, then we show add new chain button
   */

  // Only those aliases where you have added yourself as an alias on the other chain
  const filteredAlias = channelDetails?.aliases.find(
    (alias) => alias.alias_address === convertAddressToAddrCaip(account, chainId)
  );

  const checkIfAliasIsVerified = filteredAlias && !!filteredAlias?.is_alias_verified ? true : false;

  /**
   * Active network will only be true when:
   * 1. Then chain is core (e.g, Sepolia or mainnet)
   * 2. Channel Alias is present and is verified (is_alias_verified === 1)
   */
  const onActiveNetwork =
    appConfig.coreContractChain === chainId ||
    (checkIfAliasIsVerified && parseInt(filteredAlias?.alias_blockchain_id as string) === chainId);

  return (
    <>
      <Box
        display="flex"
        width={{ initial: '1120px', ml: '357px', tb: '700px' }}
        padding="spacing-md"
        flexDirection="column"
        alignItems="center"
        gap="spacing-lg"
        backgroundColor="surface-primary"
        borderRadius="radius-lg"
        margin="spacing-none spacing-none spacing-sm spacing-none"
      >
        <ChannelDashboardHeader
          channelDetails={channelDetails}
          setActiveState={setActiveState}
          onActiveNetwork={onActiveNetwork}
          currentAliasDetails={filteredAlias}
        />

        {channelDashboardError && (
          <Box width="100%">
            <Alert variant="error" heading={channelDashboardError} showIcon />
          </Box>
        )}

        {!onActiveNetwork && <ChannelDashboardNullChain currentAliasDetails={filteredAlias} />}

        {onActiveNetwork && (
          <Box width="100%" height={{ initial: '355px', tb: 'auto' }}>
            {loadingChannelDetails || !channelDetails?.name ? (
              <Box height="100%" display="flex" justifyContent="center" alignItems="center">
                <LoaderSpinner type={LOADER_TYPE.SEAMLESS} title="Loading Channel Details. Please wait..." />
              </Box>
            ) : (
              <ChannelDashboardBody
                setActiveState={setActiveState}
                setChannelDashboardError={setChannelDashboardError}
                channelDetails={channelDetails}
                loadingChannelDetails={loadingChannelDetails}
              />
            )}
          </Box>
        )}
      </Box>

      <AppFooter />
    </>
  );
};

export { UserChannelDashboard };
