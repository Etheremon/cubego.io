/**
 * Created by jarvis on 27/02/18.
 */
import * as types from './action_types';
import {action} from './action_utils';


export const login = (userId) => action(types.LOGIN, {userId});

export const loginSuccess = (userId, username, email) => action(types.LOGIN_SUCCESS, {userId});

export const loginFailed = (userId, error) => action(types.LOGIN_FAILED, {userId, error});
