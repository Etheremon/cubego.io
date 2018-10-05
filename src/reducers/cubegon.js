import * as ActionTypes from '../actions/action_types';
import { NETWORK_ERROR } from '../utils/constants';
import {combineReducers} from "redux";

export const cubegoInfo = (state={}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CUBEGO_INFO.SUCCESS:
      return {...state, ['data']: action.response};
    case ActionTypes.FETCH_CUBEGO_INFO.REQUESTED:
      return {...state, ['data']: null};
    case ActionTypes.FETCH_CUBEGO_INFO.FAILED:
      return {...state, ['data']: undefined, ['error']: NETWORK_ERROR};
    default:
      return state;
  }
}

export const cubegons = (state={}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CUBEGON.SUCCESS:
      return {...state, ['data']: action.response};
    case ActionTypes.FETCH_CUBEGON.FAILED:
      return {...state, ['data']: undefined, ['error']: NETWORK_ERROR};
    case ActionTypes.FETCH_CUBEGON.REQUESTED:
      return {...state, ['data']: null};
    default:
      return state;
  }
}

export const cubegon = combineReducers({
  cubegons,
  cubegoInfo,
});