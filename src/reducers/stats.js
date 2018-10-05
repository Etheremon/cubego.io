import * as ActionTypes from '../actions/action_types';
import { NETWORK_ERROR } from '../utils/constants';
import {combineReducers} from "redux";

export const generalStats = (state={}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_GENERAL_STATS.SUCCESS:
      return {...state, ['data']: action.response};
    case ActionTypes.FETCH_GENERAL_STATS.REQUESTED:
      return {...state, ['data']: null};
    case ActionTypes.FETCH_GENERAL_STATS.FAILED:
      return {...state, ['data']: undefined, ['error']: NETWORK_ERROR};
    default:
      return state;
  }
}

export const stats = combineReducers({
  generalStats,
});