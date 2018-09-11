import * as types from './action_types';
import {action} from './action_utils';

export const loadUserBasicInfo = {
  start: (forceUpdate) => action(types.LOAD_USER_BASIC_INFO.START, {forceUpdate}),
  stop: () => action(types.LOAD_USER_BASIC_INFO.STOP, {}),
};

export const fetchUserBasicInfo = {
  request: (userId) => action(types.FETCH_USER_BASIC_INFO.REQUESTED, {userId}),
  success: (userId, response) => action(types.FETCH_USER_BASIC_INFO.SUCCESS, {userId, response}),
  fail: (userId, error) => action(types.FETCH_USER_BASIC_INFO.FAILED, {userId, error}),
};