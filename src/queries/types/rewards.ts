export type RewardsAcitivitesResponse = {
  activities: Activity[];
  total: number;
  page: number;
  size: number;
};

//TODO: Remove the test expiry type
export type ActvityType =
  | 'follow_push_on_discord'
  | 'follow_push_on_twitter'
  | 'notifications_integration_email_telegram_discord'
  | 'create_gated_group_push_chat'
  | 'subscribe_5_channels_push'
  | 'subscribe_20_channels_push'
  | 'setup_push_user_profile'
  | 'active_push_chat_user'
  | 'hold_push_alpha_access_nft'
  | 'hold_push_rockstar_nft'
  | 'create_channel_push'
  | 'reach_100_subscribers'
  | 'reach_500_subscribers'
  | 'reach_1000_subscribers'
  | 'reach_5000_subscribers'
  | 'reach_10000_subscribers'
  | 'reach_50000_subscribers'
  | 'reach_100000_subscribers'
  | 'daily_check_in_7_days_day1'
  | 'daily_check_in_7_days_day2'
  | 'daily_check_in_7_days_day3'
  | 'daily_check_in_7_days_day4'
  | 'daily_check_in_7_days_day5'
  | 'daily_check_in_7_days_day6'
  | 'daily_check_in_7_days_day7'
  | 'channel_specific_subscriptions:BTC_PRICE_TRACKER_CHANNEL'
  | 'channel_specific_subscriptions:QUICKSWAP_CHANNEL'
  | 'channel_specific_subscriptions:WALLETTRACKER_CHANNEL'
  | 'channel_specific_subscriptions:PRICETRACKER_CHANNEL'
  | 'channel_specific_subscriptions:SHAPESHIFT_CHANNEL'
  | 'channel_specific_subscriptions:CYBER_CHANNEL'
  | 'channel_specific_subscriptions:REVOKE_NOTIFICATIONS_CHANNEL'
  | 'channel_specific_subscriptions:PWN_NOTIFICATIONS_CHANNEL'
  | 'channel_specific_subscriptions:UNSTOPPABLE_DOMAINS_CHANNEL'
  | 'channel_specific_subscriptions:RIVO_CHANNEL'
  | 'atleast_5_defi_channel_specific_subscriptions'
  | 'stake_1k_push_epoch'
  | 'stake_5k_push_epoch'
  | 'stake_10k_push_epoch'
  | 'stake_50k_push_epoch'
  | 'stake_100k_push_epoch'
  | 'stake_500k_push_epoch'
  | 'stake_1_uni_v2_lp_epoch'
  | 'stake_5_uni_v2_lp_epoch'
  | 'stake_10_uni_v2_lp_epoch'
  | 'stake_50_uni_v2_lp_epoch'
  | 'stake_100_uni_v2_lp_epoch'
  | 'stake_500_uni_v2_lp_epoch'
  | 'stake_1k_push_one_time'
  | 'stake_5k_push_one_time'
  | 'stake_10k_push_one_time'
  | 'stake_50k_push_one_time'
  | 'stake_100k_push_one_time'
  | 'stake_500k_push_one_time'
  | 'stake_1_uni_v2_lp_one_time'
  | 'stake_5_uni_v2_lp_one_time'
  | 'stake_10_uni_v2_lp_one_time'
  | 'stake_50_uni_v2_lp_one_time'
  | 'stake_100_uni_v2_lp_one_time'
  | 'stake_500_uni_v2_lp_one_time';

export type Activity = {
  id: string;
  activityType: ActvityType;
  activityTitle: string;
  activityDesc: string;
  points: number;
  multiplier: number;
  expiryType: number;
  name?: string;
  JoinURL: string;
  index: string;
  status: 'ENABLED' | 'DISABLED';
  tags: [];
  isExpired?: boolean;
};

export type UsersAllActivitiesResponse = {
  activities: UsersActivity[];
  total: number;
  page: number;
  size: number;
};

export type UsersActivity = {
  activityId: string;
  userId: string;
  activityTypeId: string;
  data:
    | { twitter?: string; discord?: string }
    | { currentEpoch?: number; fromBlock?: number; toBlock?: number; fromTimestamp?: number; toTimestamp?: number }
    | any;
  status: 'COMPLETED' | 'PENDING' | 'REJECTED';
  points: number;
  multiplier: number;
  verificationProof: string;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
};

export type UsersActivityError = {
  error: string;
};

// The key can be any string, and the value can be either StakeActivitySuccess or StakeActivityError
export type StakeActivityResponse = {
  [key: string]: UsersActivity | UsersActivityError;
};

type Prop = {
  [key: string]: string;
};

export type ClaimRewardsActivityProps = {
  userId: string;
  activityTypeId: string;
  data: Prop | {};
  verificationProof: string;
  pgpPublicKey: string;
};

export type RewardActivityStatusProps = {
  userId: string;
  activities: any;
};

export type PointsVaultUserLoginProps = {
  username: string;
  password: string;
};
export type PointsVaultUserLoginPayload = {
  token: string;
};

export type ClaimActivitesResponse = {
  status: 'COMPLETED' | 'PENDING';
};

export type DiscordDetails = {
  id: string;
  username: string;
  avatar: null | string;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: null | string;
  accent_color: null | string;
  global_name: string;
  avatar_decoration_data: null | object;
  banner_color: null | string;
  clan: null | object;
  mfa_enabled: boolean;
  locale: string;
  premium_type: number;
};

export type UserRewardsDetailParams = {
  caip10WalletAddress: string;
};

export type UserRewardsDetailResponse = {
  userId: string;
  userWallet: string;
  refPrimary: string | null;
  refSecondary: string | null;
  verificationProof: string;
  activityPoints: number;
  referralPoints: number;
  totalPoints: number;
  multiplier: number;
  rank: number;
  lastUpdated: string;
  pgpPublicKey: string;
  usersInvited: number;
};

export type UserRewardsStatsResponse = {
  seasonOne: {
    totalUsers: number;
    totalUsersWithEmail: number;
  };
  seasonTwo: {
    totalUsers: number;
    totalUsersWithEmail: number;
  };
  allSeasons: {
    totalUniqueUsers: number;
    totalUniqueUsersWithEmail: number;
  };
};

export type createUserRewardsDetailsProps = {
  userWallet: string;
  pgpPublicKey: string;
  verificationProof: string;
  refPrimary?: string;
};

export type createUserRewardsDetailsResponse = {};

type LeaderBoardUser = {
  userId: string;
  userWallet: string;
  refPrimary: string | null;
  refSecondary: string | null;
  verificationProof: string;
  activityPoints: number;
  referralPoints: number;
  totalPoints: number;
  multiplier: number;
  lastUpdated: string;
  pgpPublicKey: string;
  rank: number;
};

export type ModelledLeaderBoardUser = {
  userId: string;
  userWallet: string;
  totalPoints: number;
  rank: number;
};

export type LeaderboardResponse = {
  users: Array<LeaderBoardUser>;
  page: number;
  pageSize: number;
  total: number;
};

export type LeaderboardModelledResponse = {
  users: Array<ModelledLeaderBoardUser>;
  page: number;
  pageSize: number;
  total: number;
};

export type LeaderboardParams = {
  order?: string;
  pageSize?: number;
  pageNumber?: number;
};

export type RewardsStakeParams = {
  currentEpoch: number;
  fromBlock: number;
  toBlock: number;
  fromTimestamp: number;
  toTimestamp: number;
};

export type ActivityData = {
  discord?: string;
  discord_token?: string;
  twitter?: string;
};

export type RewardActivityStatus = {
  activityId: string;
  activityTypeId: string;
  createdAt: string;
  data: ActivityData | {};
  multiplier: number;
  points: number;
  status: string;
  updatedAt: string;
  userId: string;
  verificationProof: string;
};

export type RewardActivityStatusResponse = {
  [key: string]: RewardActivityStatus | {};
};
