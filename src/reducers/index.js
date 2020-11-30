import { battle } from './battle';
import { model } from './model';
import { localization } from './localization';

export const voxelStoreReducers = {
  battle,
  model,
  localization,
};

export const getTxnStore = (store) => (store.txnStore);
