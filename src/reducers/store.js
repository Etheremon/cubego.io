import * as ActionTypes from '../actions/action_types';
import { NETWORK_ERROR } from '../constants/general';
import {combineReducers} from "redux";

export const availableCubegoes = (state={}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_AVAILABLE_CUBEGOES.SUCCESS:
      return {...state, ['data']: action.response};
    case ActionTypes.FETCH_AVAILABLE_CUBEGOES.REQUESTED:
      return {...state, ['data']: null};
    case ActionTypes.FETCH_AVAILABLE_CUBEGOES.FAILED:
      return {...state, ['data']: undefined, ['error']: NETWORK_ERROR};
    default:
      return state;
  }
}

export const auctionCubegons = (state={}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_AUCTION_CUBEGONS.SUCCESS:
      return {...state, ['data']: action.response};
    case ActionTypes.FETCH_AUCTION_CUBEGONS.FAILED:
      return {...state, ['data']: undefined, ['error']: NETWORK_ERROR};
    case ActionTypes.FETCH_AUCTION_CUBEGONS.REQUESTED:
      return {...state, ['data']: null};
    default:
      return state;
  }
}

export const store = combineReducers({
  availableCubegoes,
  auctionCubegons,
});