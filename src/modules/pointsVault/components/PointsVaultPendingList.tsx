import { Box, Pagination } from 'blocks';
import { useQueryClient } from '@tanstack/react-query';
import LoaderSpinner, { LOADER_TYPE } from 'components/reusables/loaders/LoaderSpinner';
import { PointsVaultListColumns } from './PointsVaultListColumns';
import { PointsVaultListItem } from './PointsVaultListItem';
import {
  PointsVaultStatus,
  pointsVaultApprovedUsers,
  pointsVaultRejectedUsers,
  useGetPointsVaultPendingUsersPaginated,
  usePointsVaultToken,
} from 'queries';
import { LeaderBoardNullState } from 'modules/rewards/components/LeaderboardNullState';
import { useEffect, useState } from 'react';

type PointsVaultPendingListProps = {
  query: {
    wallet?: string;
    twitter?: string;
  };
};

const PointsVaultPendingList = ({ query }: PointsVaultPendingListProps) => {
  const token = usePointsVaultToken();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isError, refetch, isFetching } = useGetPointsVaultPendingUsersPaginated({
    status: 'PENDING',
    token,
    pageSize,
    page: currentPage,
    twitter: query.twitter,
    wallet: query.wallet,
    activityTypeId: 'follow_push_on_twitter',
  });

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query.twitter, query.wallet]);

  const pointsVaultList = isLoading ? Array(5).fill(0) : data?.activities || [];
  const totalItems = data?.total || 0;

  if (!pointsVaultList.length && !isLoading) {
    return (
      <LeaderBoardNullState
        refetchLeaderboard={isError ? refetch : undefined}
        heading="No Users Found"
        error={isError}
        subHeading={isError ? 'Please refresh to view the List' : ''}
      />
    );
  }

  const handleRefetch = (action?: PointsVaultStatus) => {
    refetch();

    const key =
      action === 'COMPLETED' ? pointsVaultApprovedUsers : action === 'REJECTED' ? pointsVaultRejectedUsers : undefined;

    if (key) {
      queryClient.invalidateQueries({ queryKey: [key] });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box
      gap="spacing-sm"
      display="flex"
      flexDirection="column"
    >
      <Box
        height="calc(100vh - 420px)"
        overflow="auto"
      >
        <PointsVaultListColumns />
        {pointsVaultList.map((item, index) => (
          <PointsVaultListItem
            key={item?.activityId || index}
            item={item}
            isLoading={isLoading}
            refetch={handleRefetch}
          />
        ))}
        {isFetching && !isLoading && (
          <Box
            margin="spacing-xs"
            display="flex"
            justifyContent="center"
          >
            <LoaderSpinner
              spinnerSize={24}
              type={LOADER_TYPE.SEAMLESS}
            />
          </Box>
        )}
      </Box>
      {totalItems > 0 && (
        <Box
          display="flex"
          justifyContent="center"
          padding="spacing-sm spacing-none"
        >
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            onChange={handlePageChange}
          />
        </Box>
      )}
    </Box>
  );
};

export { PointsVaultPendingList };
