

export const types = {
  ADD_TXN: 'ADD_TXN',
  POP_TXN: 'POP_TXN',
};

export const addTxn = (txn) => ({
  type: types.ADD_TXN,
  txn,
});

export const popTxn = () => ({
  type: types.POP_TXN,
});