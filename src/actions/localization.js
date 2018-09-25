import * as types from './action_types';
import {action} from './action_utils';


export const fetchLocalization = {
  request: () => action(types.FETCH_LOCALIZATION.REQUESTED, {}),
  success: ({response}) => action(types.FETCH_LOCALIZATION.SUCCESS, {response}),
  fail: ({error}) => action(types.FETCH_LOCALIZATION.FAILED, {error}),
};