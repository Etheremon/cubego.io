import * as types from './action_types';
import {action} from './action_utils';


export const loadGeneralStats = (forceUpdate) => action(types.LOAD_GENERAL_STATS, {forceUpdate});

export const fetchGeneralStats = {
  request: () => action(types.FETCH_GENERAL_STATS.REQUESTED, {}),
  success: (response) => action(types.FETCH_GENERAL_STATS.SUCCESS, {response}),
  fail: (error) => action(types.FETCH_GENERAL_STATS.FAILED, {error}),
};