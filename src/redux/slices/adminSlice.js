/**
 * This file helps us to maintain the state of the logged in user user(if they have an account)
 * as well as the privileges the logged in user has
 */

// External Packages
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channelDetails: "unfetched",
  coreChannelAdmin: null,
  canVerify: false,
  aliasDetails: {
    aliasAddr: null,
    aliasAddrFromContract: null,
    aliasEthAddr: null,
    isAliasVerified: null,
    aliasChainId: null
  },
  delegatees: null,
  canVerify: false,
};

export const contractSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetAdminSlice: () => initialState,
    setUserChannelDetails: (state, action) => {
      state.channelDetails = action.payload;
    },
    setCoreChannelAdmin: (state, action) => {
      state.coreChannelAdmin = action.payload;
    },
    setCanVerify: (state, action) => {
      state.canVerify = action.payload;
    },
    setDelegatees: (state, action) => {
      state.delegatees = action.payload;
    },
    setAliasAddress: (state, action) => {
      state.aliasDetails["aliasAddr"] = action.payload;
    },
    setAliasAddressFromContract: (state, action) => {
      state.aliasDetails['aliasAddrFromContract'] = action.payload;
    },
    setAliasEthAddress: (state, action) => {
      state.aliasDetails["aliasEthAddr"] = action.payload;
    },
    setAliasChainId: (state, action) => {
      state.aliasDetails["aliasChainId"] = action.payload;
    },
    setAliasVerified: (state, action) => {
      state.aliasDetails["isAliasVerified"] = action.payload;
    },
  },
});

export const {
  resetAdminSlice,
  setUserChannelDetails,
  setCoreChannelAdmin,
  setAliasVerified,
  setCanVerify,
  setDelegatees,
  setAliasAddress,
  setAliasAddressFromContract,
  setAliasEthAddress,
  setAliasChainId
} = contractSlice.actions;

export default contractSlice.reducer;
