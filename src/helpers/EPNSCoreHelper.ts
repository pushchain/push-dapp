// React + Web3 Essentials
import { ethers } from 'ethers';

// External Packages
import axios from 'axios';
//import { parseEther, bigNumber } from 'ethers/utils'

// Internal Components
import { getReq } from '../api';
import { convertAddressToAddrCaip } from './CaipHelper';
import { IPFSGateway } from './IpfsHelper';

// Constants
const COINDESK_CHANNEL_ADDR = '0xe56f1D3EDFFF1f25855aEF744caFE7991c224FFF';
const COINDESK_HASH = '1+bafkreif643vf3cteadznccivnsk5uj26e3ls7onbshnldb3aej3omrxsau';
const ENS_CHANNEL_ADDR = '0x983110309620D911731Ac0932219af06091b6744';
const ENS_HASH = '1+bafkreiekigkyezwrspignt7l7vsrjefjmogwmigy4eqtts277cu2p23ilm';
// FeedDB Helper Function
const EPNSCoreHelper = {
  // get gas price in dollars
  getGasPriceInDollars: async (provider: any): Promise<number> => {
    const ethPrice = await axios
      .get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
      .then(({ data }) => data.USD || 0);
    const gasPriceInWei: number = await provider.getGasPrice();
    const gasPriceInEth: string = ethers.utils.formatEther(gasPriceInWei);
    const gasPriceInUsd: number = gasPriceInEth * ethPrice;
    return gasPriceInUsd;
  },

  getVotingPower: async (
    delegateeAddress: string,
    contract: ethers.Contract,
    rawFormat = false
  ): Promise<string | number> => {
    let isAddress: boolean = await ethers.utils.isAddress(delegateeAddress);
    if (isAddress || delegateeAddress.endsWith('.eth')) {
      try {
        let decimals: number = await contract.decimals();
        let votes: number = await contract.getCurrentVotes(delegateeAddress);
        let votingPower: number = await Number(votes / Math.pow(10, decimals));
        let prettyVotingPower: string = votingPower.toString();
        return rawFormat ? votingPower : prettyVotingPower;
      } catch (err) {
        console.error('🚀 ~ file: ViewDelegateeItem.js ~ line 47 ~ getVotingPower ~ err', err);
      }
    }
    return '0.000';
  },

  // To retrieve a channel's Info from channel address
  getChannelInfo: async (channel: string, contract: ethers.Contract): Promise<any> => {
    if (channel === null) return;
    const enableLogs: number = 0;
    return new Promise((resolve, reject) => {
      // To get channel info from a channel address
      contract
        .channels(channel)
        .then((response: any) => {
          // Add an extra field for future info
          const mappings = { ...response };
          mappings.addr = channel;

          if (enableLogs) console.debug('getChannelInfo() --> %o', mappings);
          resolve(mappings);
        })
        .catch((err: any) => {
          console.error('!!!Error, getChannelInfo() --> %o', err);
          reject(err);
        });
    });
  },
  // To retrieve a channel's AddChannel event
  getChannelEvent: async (
    channel: string,
    startBlock: string,
    updateBlock: string,
    contract: ethers.Contract
  ): Promise<string> => {
    const enableLogs: number = 0;

    return new Promise((resolve, reject) => {
      // To get channel ipfs hash from channel info
      let filter: ethers.EventFilter = contract.filters.AddChannel(channel);
      let block: string = startBlock;
      if (startBlock != updateBlock) {
        filter = contract.filters.UpdateChannel(channel);
        block = updateBlock;
      }

      contract
        .queryFilter(filter, block, block)
        .then(async (response: any) => {
          if (response.length == 0) {
            const res = await contract.queryFilter(contract.filters.AddChannel(channel), startBlock, startBlock);
            response = res;
          }
          let filteredResponse: string;

          if (enableLogs) console.debug('getChannelEvent() --> Finding: %s in | %o |', channel, response);

          response.forEach(function (item: any) {
            if (item.args.channel.toString() == channel.toString()) {
              if (enableLogs) console.debug('getChannelEvent() --> Selected Channel %o: ', item);
              filteredResponse = ethers.utils.toUtf8String(item.args.identity);
            }
          });

          if (enableLogs) console.debug('getChannelEvent() --> Filtered Channel: %o', filteredResponse!);
          resolve(filteredResponse!);
        })
        .catch((err: any) => {
          console.error('!!!Error, getChannelEvent() --> %o', err);
          reject(err);
        });
    });
  },
  // Retrive IPFS File from ipfshash
  getJsonFileFromIdentity: async (identity: any, channel: string): Promise<any> => {
    const enableLogs: number = 0;

    return new Promise((resolve, reject) => {
      // Split Channel Identity, delimiter of identity is "+"
      if (!identity) {
        reject(`There is no identity file for channel: ${channel}`);
      }
      const ids = identity?.split('+') || []; // First segment is storage type, second is the pointer to it

      if (ids[0] == 1) {
        // IPFS HASH
        // Form Gateway URL
        const IPFS_GATEWAY: string = IPFSGateway;
        const url: string = IPFS_GATEWAY + ids[1];
        fetch(url)
          .then((response) => response.json())
          .then((response) => {
            if (enableLogs) console.debug('getJsonFileFromIdentity() --> %o', response);
            resolve(response);
          })
          .catch((err) => {
            console.error('!!!Error, getJsonFileFromIdentity() --> %o', err);
            reject(err);
          });
      }
    });
  },

  // Helper to get Channel Alias from Channel's address
  // getAliasAddressFromChannelAddress: async (channel, chainId) => {
  //   if (channel === null) return;
  //   const enableLogs = 0;

  //   return new Promise((resolve, reject) => {
  //     // To get channel info from a channel address
  //     const channelAddressInCaip = convertAddressToAddrCaip(channel, chainId);
  //     getReq(`/v1/alias/${channelAddressInCaip}/channel`)
  //       .then((response) => {
  //         if (enableLogs) console.log('getAliasAddressFromChannelAddress() --> %o', response);
  //         resolve(response?.data?.aliasAddress);
  //       })
  //       .catch((err) => {
  //         console.log('!!!Error, getAliasAddressFromChannelAddress() --> %o', err);
  //         reject(err);
  //       });
  //   });
  // },
  // Helper to get Channel from Channel's address
  getChannelJsonFromChannelAddress: async (channel: string, contract: ethers.Contract): Promise<any> => {
    if (channel === null) return;
    const enableLogs: number = 0;

    return new Promise((resolve, reject) => {
      // To get channel info from a channel address
      EPNSCoreHelper.getChannelInfo(channel, contract)
        .then((response) =>
          EPNSCoreHelper.getChannelEvent(
            channel,
            response.channelStartBlock.toNumber(),
            response.channelUpdateBlock.toNumber(),
            contract
          )
        )
        .then((response) => {
          // add little hack for now to change coindesk's descriptioon
          const hash: any =
            channel === COINDESK_CHANNEL_ADDR ? COINDESK_HASH : channel === ENS_CHANNEL_ADDR ? ENS_HASH : response;
          return EPNSCoreHelper.getJsonFileFromIdentity(hash, channel);
          // return EPNSCoreHelper.getJsonFileFromIdentity(response, channel)
        })
        .then((response: any) => {
          if (enableLogs) console.debug('getChannelJsonFromChannelAddress() --> %o', response);
          resolve(response);
        })
        .catch((err: any) => {
          console.error('!!!Error, getChannelJsonFromChannelAddress() --> %o', err);
          reject(err);
        });
    });
  },
  // Helper to get Channel from Channel's address and block number
  getChannelJsonFromChannelAddressStartBlock: async (channel: string, contract: ethers.Contract): Promise<any> => {
    if (channel === null) return;
    const enableLogs: number = 0;

    return new Promise((resolve, reject) => {
      // To get channel info from a channel address and block
      EPNSCoreHelper.getChannelInfo(channel, contract)
        .then((response) =>
          EPNSCoreHelper.getChannelEvent(
            channel,
            response.channelStartBlock.toNumber(),
            response.channelStartBlock.toNumber(),
            contract
          )
        )
        .then((response) => {
          // add little hack for now to change coindesk's descriptioon
          const hash: any =
            channel === COINDESK_CHANNEL_ADDR ? COINDESK_HASH : channel === ENS_CHANNEL_ADDR ? ENS_HASH : response;
          return EPNSCoreHelper.getJsonFileFromIdentity(hash, channel);
          // return EPNSCoreHelper.getJsonFileFromIdentity(response, channel)
        })
        .then((response: any) => {
          if (enableLogs) console.debug('getChannelJsonFromChannelAddress() --> %o', response);
          resolve(response);
        })
        .catch((err: any) => {
          console.error('!!!Error, getChannelJsonFromChannelAddress() --> %o', err);
          reject(err);
        });
    });
  },
  // Helper to get Channel from User's address
  getChannelJsonFromUserAddress: async (user: string, contract: ethers.Contract): Promise<any> => {
    if (user === null) return;
    const enableLogs: number = 0;

    return new Promise((resolve, reject) => {
      // To get channel info from a channel address
      // EPNSCoreHelper.getUserInfo(user, contract)
      //   .then(response => EPNSCoreHelper.getChannelJsonFromChannelAddress(user, contract))
      EPNSCoreHelper.getChannelJsonFromChannelAddress(user, contract)
        .then((response: any) => {
          if (enableLogs) console.debug('getChannelJsonFromUserAddress() --> %o', response);
          resolve(response);
        })
        .catch((err: any) => {
          console.error('!!!Error, getChannelJsonFromUserAddress() --> %o', err);
          reject(err);
        });
    });
  },
  // Get Total Number of Channels
  getTotalNumberOfChannels: async (contract: ethers.Contract): Promise<number> => {
    const enableLogs: number = 0;

    return new Promise((resolve, reject) => {
      // Get User Info from Push (EPNS) Core
      contract
        .channelsCount()
        .then((response: any) => {
          if (enableLogs) console.debug('getTotalNumberOfChannels() --> %o', response.toNumber());
          resolve(response.toNumber());
        })
        .catch((err: any) => {
          console.error('!!!Error, getTotalNumberOfChannels() --> %o', err);
          reject(err);
        });
    });
  },
  // Get channels address given number of channels, , atIndex: -1 is start from latest, numChannels: -1 is return all
  getChannelsMetaLatestToOldest: async (
    atIndex: number,
    numChannels: number,
    contract: ethers.Contract
  ): Promise<any> => {
    const enableLogs: number = 0;

    return new Promise((resolve, reject) => {
      EPNSCoreHelper.getTotalNumberOfChannels(contract)
        .then(async (response) => {
          let channelsInfo: any[] = [];
          const channelsCount = response;

          if (atIndex > channelsCount || atIndex == -1) {
            atIndex = channelsCount - 1;
          }

          if (numChannels == -1) {
            numChannels = channelsCount;
          }

          // Get channels
          let channelArrays: any[] = [];

          // prefil and then refil
          let count: number = 0;
          for (let i = numChannels - 1; i >= 0; i--) {
            const assignedChannelID = atIndex - i;
            channelArrays.push(assignedChannelID);
          }

          const promises: Promise<any>[] = channelArrays.map(async (channelID) => {
            await EPNSCoreHelper.getChannelAddressFromID(channelID, contract)
              .then((response) => EPNSCoreHelper.getChannelInfo(response, contract))
              .then((response) => {
                if (enableLogs)
                  console.debug('getChannelsMetaLatestToOldest(%d, %d) --> %o', channelID, numChannels, channelsInfo);
                channelsInfo = [response, ...channelsInfo];
              })
              .catch((err) => console.error('Error in channel: %d | skipping...', channelID));
          });

          // wait until all promises are resolved
          await Promise.all(promises);

          if (enableLogs)
            console.debug(
              'getChannelsMetaLatestToOldest(Index: %d, Number: %d) --> %o',
              atIndex,
              numChannels,
              channelsInfo
            );
          resolve(channelsInfo);
        })
        .catch((err) => {
          console.error('!!!Error, getChannelsMetaLatestToOldest() --> %o', err);
          reject(err);
        });
    });
  },

  // Get Total Subsbribed Channels
  getSubscribedStatus: async (user: string, channel: string, contract: ethers.Contract): Promise<number> => {
    return new Promise((resolve, reject) => {
      // Get User Info from Push (EPNS) Core
      contract
        .isUserSubscribed(channel, user)
        .then((response: any) => {
          // console.log("getSubscribedStatus() --> %o", {response, user, channel});
          resolve(response);
        })
        .catch((err: any) => {
          console.error('!!!Error, getSubscribedStatus() --> %o', err);
          reject(err);
        });
    });
  },
  // Get Total Subsbribed Channels
  getTotalSubscribedChannels: async (user: string, contract: ethers.Contract): Promise<number | string> => {
    return new Promise((resolve, reject) => {
      // Get User Info from Push (EPNS) Core
      contract.users[user]
        .subscribedCount()
        .then((response: any) => {
          console.debug('getTotalSubscribedChannels() --> %o', response.toNumber());
          resolve(response.toNumber());
        })
        .catch((err: any) => {
          console.error('!!!Error, getTotalSubscribedChannels() --> %o', err);
          reject(err);
        });
    });
  },
  // Get Fair Share
  getFairShareOfUserAtBlock: async (user: string, block: string, contract: ethers.Contract): Promise<any> => {
    const enableLogs: number = 0;

    return new Promise((resolve, reject) => {
      // Get User Info from Push (EPNS) Core
      contract
        .users(user)
        .then((response: any) => {
          if (response.userActivated) {
            contract
              .calcAllChannelsRatio(user, block)
              .then((response: any) => {
                if (enableLogs) console.debug('calcAllChannelsRatio() --> %o', response);
                resolve(response);
              })
              .catch((err: any) => {
                console.error('!!!Error, calcAllChannelsRatio() --> %o', err);
                reject(err);
              });
          } else {
            if (enableLogs) console.warn('!!!Warning, calcAllChannelsRatio() --> User not activated');
            reject('User not activated');
          }
        })
        .catch((err: any) => {
          console.error('!!!Error, calcAllChannelsRatio() --> %o', err);
          reject(err);
        });
    });
  },
  // Get Pool Funds
  getPoolFunds: async (contract: ethers.Contract): Promise<number> => {
    const enableLogs: number = 0;

    return new Promise((resolve, reject) => {
      contract
        .poolFunds()
        .then((response: any) => {
          if (enableLogs) console.debug('getPoolFunds() --> %o', response);
          resolve(response);
        })
        .catch((err: any) => {
          console.error('!!!Error, getPoolFunds() --> %o', err);
          reject(err);
        });
    });
  },
  // Helper Functions
  // To format Big Number
  formatBigNumberToMetric: (bignumber: any, convertToCurrency: boolean): string | number => {
    try {
      if (convertToCurrency) {
        bignumber = bignumber.div(100000000000000);
        bignumber = bignumber.div(10000);
      }
      bignumber = bignumber.toNumber();
      return EPNSCoreHelper.metricFormatter(bignumber, 2);
    } catch (e) {
      console.error(e);
      return '---';
    }
  },
  // Metric Formatter, thanks: https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
  metricFormatter: (num: number, digits: number): string => {
    var si = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ];
    var rx: RegExp = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i: number;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
  },
};

export default EPNSCoreHelper;
