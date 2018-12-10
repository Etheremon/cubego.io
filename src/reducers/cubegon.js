import {combineReducers} from "redux";
import {CubegonActions} from "../actions/cubegon";
import { CLAIM_AIRDROP_OFFSET } from "../config";

export const info = (state={}, action) => {
  switch (action.type) {
    case CubegonActions.LOAD_CUBEGON_INFO.success.key:
      return {
        ...state,
        [action.gonId]: action.response
      };
    default:
      return state;
  }
};

export const list = (state={}, action) => {
  switch (action.type) {
    case CubegonActions.LOAD_CUBEGON_LIST.success.key:
      return {
        ...state, ['gallery']: action.response
      };
    default:
      return state;
  }
};

export const eligibleToClaim = (state={}, action) => {
  switch (action.type) {
    case CubegonActions.CHECK_ELIGIBLE_TO_CLAIM.success.key:
      return {
        ...state, [action.userId]: action.response['txn_hash'],
      }
    default:
      return state;
  }
}

export const claimedCount = (state=null, action) => {
  switch (action.type) {
    case CubegonActions.LOAD_CLAIM_COUNT.success.key:
      let num = Math.min(1000, action.response['txn_hash'].toNumber() - CLAIM_AIRDROP_OFFSET);
      return num;
    default:
      return state;
  }
}

export const cubegon = combineReducers({
  info,
  list,
  eligibleToClaim,
  claimedCount,
});