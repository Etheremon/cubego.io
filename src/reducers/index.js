import { txnStore } from './txnStore'
import { user } from './user'
import { auth } from './auth'
import { model } from  './model'
import { cubegon } from  './cubegon'
import { cubego } from  './cubego'
import { localization } from './localization';
import { notifications } from './notification';
import { subscriber } from './subscriber';

export const voxelStoreReducers = {
  auth,
  user,
  model,
  cubegon,
  cubego,
  localization,
  notifications,
  subscriber,
  txnStore,
};

export const getTxnStore = (store) => (store['txnStore']);