import { txnStore } from './txnStore'
import { user } from './user'
import { auth } from './auth'

export const voxelStoreReducers = {
  auth,
  user,
  txnStore,
};

export const getTxnStore = (store) => (store['txnStore']);