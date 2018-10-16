import {CloneDeep} from "../utils/objUtils";


/**
 * Auth
 */
export const GetLoggedInUserId = (state) => (state.auth['userId']);


/**
 * User
 */
export const GetUserInfo = (state, userId) => (CloneDeep(state.user.info[userId]));

/**
 * Model
 */
export const GetSavedModel = (state) => CloneDeep(state.model['savedModel']);
export const GetValidatedModel = (state) => CloneDeep(state.model['validatedModel']);


/**
 * Localization
 */
export const GetLocalizationData = (state) => CloneDeep(state.localization.localizationData['fetchedData']);