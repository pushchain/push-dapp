import { Box, Link, Skeleton, Text } from 'blocks';
import { PointsVaultActivity, PointsVaultStatus, useGetUserTwitterDetails, usePointsVaultToken } from 'queries';
import { css } from 'styled-components';
import { PointsVaultListActionButtons } from './PointsVaultListActionButtons';
import { caip10ToWallet } from 'helpers/w2w';

export type PointsVaultListItemProps = {
  item: PointsVaultActivity;
  isLoading: boolean;
  refetch: (actions?: PointsVaultStatus) => void;
};

const truncateMiddle = (str: string, startChars: number = 14, endChars: number = 14) => {
  if (!str) return '';
  if (str.length <= startChars + endChars) return str;
  return `${str.slice(0, startChars)}...${str.slice(-endChars)}`;
};

const PointsVaultListItem = ({ isLoading, item, refetch }: PointsVaultListItemProps) => {
  const token = usePointsVaultToken();
  const { data } = useGetUserTwitterDetails(item.data?.twitter, token);

  return (
    <Box
      height="48px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      css={css`
        border-bottom: var(--border-sm) solid var(--stroke-secondary);
      `}
    >
      <Skeleton isLoading={isLoading}>
        <Box
          display="flex"
          alignItems="center"
          width="300px"
          height="22px"
        >
          <Text
            variant="bs-semibold"
            color="text-secondary"
          >
            {truncateMiddle(item.userWallet)}
          </Text>
        </Box>
      </Skeleton>

      <Skeleton isLoading={isLoading}>
        <Box
          display="flex"
          alignItems="center"
          width="200px"
        >
          <Link
            to={`https://x.com/${item.twitterUserName || item.data?.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text
              color="text-brand-medium"
              variant="bs-semibold"
            >
              https://x.com/{item.twitterUserName || item.data?.twitter}
            </Text>
          </Link>
        </Box>
      </Skeleton>

      <Skeleton isLoading={isLoading}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="190px"
        >
          <Text
            variant="bs-semibold"
          >
            {item?.primaryDiscordUserName ?? '-'}
          </Text>
        </Box>
      </Skeleton>

      <Skeleton isLoading={isLoading}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="150px"
        >
          <Text
            variant="bs-semibold"
          >
            {item?.discordEmail ?? '-'}
          </Text>
        </Box>
      </Skeleton>

      <Skeleton isLoading={isLoading}>
        <Box
          width="245px"
          minHeight="22px"
          display="flex"
          justifyContent="center"
        >
          <PointsVaultListActionButtons
            refetch={refetch}
            status={item.status}
            item={item}
          />
        </Box>
      </Skeleton>
    </Box>
  );
};

export { PointsVaultListItem };
