import * as types from './action_types';
import {action} from './action_utils';

export const loadAvailableCubegoes = (forceUpdate) => action(types.LOAD_AVAILABLE_CUBEGOES, {forceUpdate});

export const fetchAvailableCubegoes = {
  request: (userId) => action(types.FETCH_AVAILABLE_CUBEGOES.REQUESTED, {userId}),
  success: (userId, response) => action(types.FETCH_AVAILABLE_CUBEGOES.SUCCESS, {userId, response}),
  fail: (userId, error) => action(types.FETCH_AVAILABLE_CUBEGOES.FAILED, {userId, error}),
};

export const loadAuctionCubegon = (forceUpdate) => action(types.LOAD_AUCTION_CUBEGONS, {forceUpdate});

export const fetchAuctionCubegon = {
  request: (userId) => action(types.FETCH_AUCTION_CUBEGONS.REQUESTED, {userId}),
  success: (userId, response) => action(types.FETCH_AUCTION_CUBEGONS.SUCCESS, {userId, response}),
  fail: (userId, error) => action(types.FETCH_AUCTION_CUBEGONS.FAILED, {userId, error}),
};