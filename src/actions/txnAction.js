export const types = {
  ADD_TXN: 'ADD_TXN',
  POP_TXN: 'POP_TXN',
  UPDATE_TXN: 'UPDATE_TXN',
};

export const addTxn = (txn) => ({
  type: types.ADD_TXN,
  txn,
});

export const popTxn = () => ({
  type: types.POP_TXN,
});

export const updateTxn = (txn) => ({
  type: types.UPDATE_TXN,
  txn,
});
