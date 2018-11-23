import { types } from "../actions/txnAction";


export const txnStore = (state={txn: null}, action) => {
  switch (action.type) {
    case types.ADD_TXN:
      return {...state, txn: action.txn};

    case types.POP_TXN:
      return {...state, txn: null};

    case types.UPDATE_TXN:
      return {...state, txn: {...state.txn, ...action.txn}};

    default:
      return state;
  }
};
