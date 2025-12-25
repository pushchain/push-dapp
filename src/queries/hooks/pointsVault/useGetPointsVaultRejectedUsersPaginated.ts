import { useQuery } from '@tanstack/react-query';
import { pointsVaultRejectedUsers } from '../../queryKeys';
import { PointsVaultGetUsersPayload } from 'queries/types';
import { getPointsVaultUsers } from 'queries/services';

type UseGetPointsVaultRejectedUsersPaginatedProps = PointsVaultGetUsersPayload & {
  page: number;
};

export const useGetPointsVaultRejectedUsersPaginated = ({
  status,
  pageSize = 10,
  page,
  token,
  twitter,
  wallet,
  activityTypeId,
}: UseGetPointsVaultRejectedUsersPaginatedProps) => {
  return useQuery({
    queryKey: [pointsVaultRejectedUsers, `${twitter}-${wallet}`, page, pageSize],
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
