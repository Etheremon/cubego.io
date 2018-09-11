import cloneDeep from 'lodash/cloneDeep';
import * as Utils from "../utils/utils";
import {MONSTER_STATUS} from "../utils/constants";


/**
 * Auth
 */
export const GetLoggedInUserId = (state) => (state.auth['userId']);

/**
 * User
 */
export const GetUserInfo = (state, userId) => cloneDeep(state.user['monsters'][userId]);
export const GetUserBasicInfo = (state, userId) => (cloneDeep(state.user['basicInfo'][userId]));

