import axios from 'axios';
import { getRewardsBaseURL } from 'queries/baseURL';
import { getPVUsersModelCreator } from 'queries/models';
import { PointsVaultGetUsersPayload } from 'queries/types';

export const getPointsVaultUsers = ({
  page,
  status,
  pageSize,
  token,
  wallet,
  twitter,
  activityTypeId,
}: PointsVaultGetUsersPayload) =>
  axios({
    method: 'GET',
    url: `${getRewardsBaseURL()}/v2/activities/list`,
    params: {
      status,
      page,
      pageSize,
      wallet,
      twitter,
      activityTypeId,
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }).then((response) => getPVUsersModelCreator(response.data));
