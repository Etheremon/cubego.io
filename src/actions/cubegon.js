import * as types from './action_types';
import {action} from './action_utils';

export const loadCubegoInfo = (forceUpdate) => action(types.LOAD_CUBEGO_INFO, {forceUpdate});

export const fetchCubegoInfo = {
  request: (userId) => action(types.FETCH_CUBEGO_INFO.REQUESTED, {userId}),
  success: (userId, response) => action(types.FETCH_CUBEGO_INFO.SUCCESS, {userId, response}),
  fail: (userId, error) => action(types.FETCH_CUBEGO_INFO.FAILED, {userId, error}),
};

export const loadCubegon = (forceUpdate) => action(types.LOAD_CUBEGON, {forceUpdate});

export const fetchCubegon = {
  request: (userId) => action(types.FETCH_CUBEGON.REQUESTED, {userId}),
  success: (userId, response) => action(types.FETCH_CUBEGON.SUCCESS, {userId, response}),
  fail: (userId, error) => action(types.FETCH_CUBEGON.FAILED, {userId, error}),
};