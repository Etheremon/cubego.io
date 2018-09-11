import { Actions } from '../actions/index'


export const txnStore = (state = {currentTxn: null, txnLogs: []}, action) => {
  let newState;

  switch (action.type) {
    case Actions.txnAction.types.ADD_TXN:
      newState = {currentTxn: action.txn, txnLogs: [...state.txnLogs, action.txn]};
      return newState;

    case Actions.txnAction.types.POP_TXN:
      newState = {...state, currentTxn: null};
      return newState;

    default:
      return state;
  }
};

export const getCurrentTxn = (state) => (state.currentTxn);
export const getTxnLogs = (state) => (state.txnLogs);