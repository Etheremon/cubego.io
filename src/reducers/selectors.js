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
 * Cubegons
 */
export const GetCubegonInfo = (state, gonId) => CloneDeep(state.cubegon.info[gonId]);


/**
 * Localization
 */
export const GetLocalizationData = (state) => CloneDeep(state.localization.localizationData['fetchedData']);

/**
 * Feeds
 */
export const GetNotification = (state) => (CloneDeep(state.notifications.notification));
export const GetHomeBanners = (state) => CloneDeep(state.notifications.notification['banners_home']);
export const GetStoreBanners = (state) => CloneDeep(state.notifications.notification['banners_store']);
export const GetFeed = (state) => CloneDeep((state.notifications.notification['feeds'] || [])[0]);


/**
 * Feeds
 */
export const GetTxn = (state) => CloneDeep(state.txn);