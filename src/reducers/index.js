import { txnStore } from './txnStore'
import { user } from './user'
import { auth } from './auth'
import { model } from  './model'
import { localization } from './localization';

export const voxelStoreReducers = {
  auth,
  user,
  model,
  txnStore,
  localization
};

export const getTxnStore = (store) => (store['txnStore']);