import { battle } from './battle';
import { model } from './model';

export const voxelStoreReducers = {
  battle,
  model,
};

export const getTxnStore = (store) => (store.txnStore);
