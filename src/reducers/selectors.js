import {CloneDeep} from "../utils/objUtils";
import * as LogicUtils from "../utils/logicUtils";
import {GON_STATUS} from "../constants/cubegon";
import * as ArrayUtils from "../utils/arrayUtils";


/**
 * Auth
 */
export const GetLoggedInUserId = (state) => (state.auth['userId']);

/**
 * User
 */
export const GetUserInfo = (state, userId) => (CloneDeep(state.user.info[userId]));
export const GetUserCubegons = (state, userId) => CloneDeep(ArrayUtils.Filter(state.user.userCubegons[userId], c => c.status === GON_STATUS.VALID));
export const GetUserPendingCubegons = (state, userId) => CloneDeep(ArrayUtils.Filter(state.user.userCubegons[userId], c => c.status === GON_STATUS.PENDING));
export const GetUserMaterials = (state, userId) => CloneDeep(state.user.userMaterials[userId]);
export const GetUserNumberOfMaterials = (state, userId) => {
  let userCubes = {};
  (state.user.userMaterials[userId] || []).forEach(m => {
    userCubes[m.material_id] = m.available_amount;
  });
  return userCubes;
};

/**
 * Model
 */
export const GetSavedModel = (state) => CloneDeep(state.model['savedModel'].map(i => LogicUtils.GetFullModel(i)));
export const GetValidatedModel = (state) => CloneDeep(state.model['validatedModel']);

/**
 * Cubegons
 */
export const GetCubegonInfo = (state, gonId) => {
  return gonId ? CloneDeep(state.cubegon.info[gonId]) : {};
}

/**
 * Cubegoes
 */


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
 * Txn
 */
export const GetTxn = (state) => CloneDeep(state.txn);


/**
 * Presale
 */
export const GetDiscountFactor = (state) => (CloneDeep(state.presale.discountFactor))

/**
 * Battle
 */
export const GetSelectedCubegon = (state) => {
  return state.battle.cubegons.selectedCubegon ? CloneDeep(state.battle.cubegons.selectedCubegon) : {};
}
