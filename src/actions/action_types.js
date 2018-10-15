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
export const LOAD_USER_CUBEGON = createFlowTypes('LOAD_USER_CUBEGON');
export const FETCH_USER_CUBEGON = createRequestTypes('FETCH_USER_CUBEGON');

/**
 * localization
 */
export const FETCH_LOCALIZATION = createRequestTypes('FETCH_LOCALIZATION');

/**
 * stats related actions
 */
export const LOAD_GENERAL_STATS = 'LOAD_GENERAL_STATS';
export const FETCH_GENERAL_STATS = createRequestTypes('FETCH_GENERAL_STATS');

/**
 * cubegon related actions
 */
export const LOAD_CUBEGO_INFO = 'LOAD_CUBEGO_INFO';
export const FETCH_CUBEGO_INFO = createRequestTypes('FETCH_CUBEGO_INFO');
export const LOAD_CUBEGON = 'LOAD_CUBEGON';
export const FETCH_CUBEGON = createRequestTypes('FETCH_CUBEGON');

/**
 * store related actions
 */
export const LOAD_AVAILABLE_CUBEGOES = 'LOAD_AVAILABLE_CUBEGOES';
export const FETCH_AVAILABLE_CUBEGOES = createRequestTypes('FETCH_AVAILABLE_CUBEGOES');
export const LOAD_AUCTION_CUBEGONS = 'LOAD_AUCTION_CUBEGONS';
export const FETCH_AUCTION_CUBEGONS = createRequestTypes('FETCH_AUCTION_CUBEGONS');
