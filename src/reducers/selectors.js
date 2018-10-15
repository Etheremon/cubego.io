import {CloneDeep} from "../utils/objUtils";


/**
 * Auth
 */
export const GetLoggedInUserId = (state) => (state.auth['userId']);


/**
 * User
 */
export const GetUserBasicInfo = (state, userId) => (CloneDeep(state.user['basicInfo'][userId]));

/**
 * Model
 */
export const GetSavedModel = (state) => CloneDeep(state.model['savedModel']);


/**
 * Localization
 */
export const GetLocalizationData = (state) => CloneDeep(state.localization.localizationData['fetchedData']);