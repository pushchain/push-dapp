import { useQuery } from '@tanstack/react-query';
import { pointsVaultPendingUsers } from '../../queryKeys';
import { PointsVaultGetUsersPayload } from 'queries/types';
import { getPointsVaultUsers } from 'queries/services';

type UseGetPointsVaultPendingUsersPaginatedProps = PointsVaultGetUsersPayload & {
  page: number;
};

export const useGetPointsVaultPendingUsersPaginated = ({
  status,
  pageSize = 10,
  page,
  token,
  twitter,
  wallet,
  activityTypeId,
}: UseGetPointsVaultPendingUsersPaginatedProps) => {
  return useQuery({
    queryKey: [pointsVaultPendingUsers, `${twitter}-${wallet}`, page, pageSize],
    queryFn: () =>
      getPointsVaultUsers({ status, page, pageSize, token, twitter, wallet, activityTypeId }),
    enabled: !!token,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
  });
};
