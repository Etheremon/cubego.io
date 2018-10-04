import { Actions } from '../actions/index'


export const txnStore = (state={txn: null}, action) => {
  switch (action.type) {
    case Actions.txnAction.types.ADD_TXN:
      return {...state, txn: action.txn};

    case Actions.txnAction.types.POP_TXN:
      return {...state, txn: null};

    default:
      return state;
  }
};

export const GetTxn = (state) => (state.txn);
