import {createRequestTypes, createFlowTypes} from './action_utils';

/**
 * AUTH related actions
 */
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

/**
 * user related actions
 */
export const LOAD_USER_BASIC_INFO = createFlowTypes('LOAD_USER_BASIC_INFO');
export const FETCH_USER_BASIC_INFO = createRequestTypes('FETCH_USER_BASIC_INFO');