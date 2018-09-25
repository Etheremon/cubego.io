import { txnStore } from './txnStore'
import { user } from './user'
import { auth } from './auth'
import { localization } from './localization';

export const voxelStoreReducers = {
  auth,
  user,
  txnStore,
  localization
};

export const getTxnStore = (store) => (store['txnStore']);