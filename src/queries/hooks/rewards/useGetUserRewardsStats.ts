import { useQuery } from '@tanstack/react-query';
import { userRewardsStats } from '../../queryKeys';
import { getUserRewardsStats } from '../../services';

export const useGetUserRewardsStats = () =>
  useQuery({
    queryKey: [userRewardsStats],
    queryFn: () => getUserRewardsStats(),
    retry: false,
  });
