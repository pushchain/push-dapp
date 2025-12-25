import axios from 'axios';

import { getUserRewardsStatsModel } from '../../models';
import { getRewardsBaseURL } from '../../baseURL';

export const getUserRewardsStats = () =>
  axios({
    method: 'GET',
    url: `${getRewardsBaseURL()}/v2/users/stats`,
  }).then((response) => getUserRewardsStatsModel(response.data));
