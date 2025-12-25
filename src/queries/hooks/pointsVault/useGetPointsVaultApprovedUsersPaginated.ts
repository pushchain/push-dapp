import { useQuery } from '@tanstack/react-query';
import { pointsVaultApprovedUsers } from '../../queryKeys';
import { PointsVaultGetUsersPayload } from 'queries/types';
import { getPointsVaultUsers } from 'queries/services';

type UseGetPointsVaultApprovedUsersPaginatedProps = PointsVaultGetUsersPayload & {
  page: number;
};

export const useGetPointsVaultApprovedUsersPaginated = ({
  status,
  pageSize = 10,
  page,
  token,
  twitter,
  wallet,
  activityTypeId,
}: UseGetPointsVaultApprovedUsersPaginatedProps) => {
  return useQuery({
    queryKey: [pointsVaultApprovedUsers, `${twitter}-${wallet}`, page, pageSize],
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
