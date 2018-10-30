// import { txnStore } from './txnStore'
import { user } from './user'
import { auth } from './auth'
import { model } from  './model'
import { cubegon } from  './cubegon'
import { localization } from './localization';
import { notifications } from './notification';

export const voxelStoreReducers = {
  auth,
  user,
  model,
  cubegon,
  // txnStore,
  localization,
  notifications,
};

export const getTxnStore = (store) => (store['txnStore']);