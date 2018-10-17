import {call, put, select, take, takeLatest, all} from 'redux-saga/effects';

import {GetLoggedInUserId, GetUserInfo} from "../reducers/selectors";
import {UserActions} from "../actions/user";
import {AuthActions} from "../actions/auth";
import {UserApi} from "../services/api/userApi";
import * as Utils from "../utils/utils";


function* loadUserInfo({userId, forceUpdate}) {
  function* process(userId) {
    if (!userId) userId = yield select(GetLoggedInUserId);

    let userInfo = yield select(GetUserInfo, userId);
    if (userId && (!userInfo || forceUpdate)) {
      yield put(UserActions.LOAD_USER_INFO.request.func({userId}));

      const {response, error} = yield call(UserApi.GetUserInfo, userId);

      if (!error) {
        yield put(UserActions.LOAD_USER_INFO.success.func({userId, response}));
      } else {
        yield put(UserActions.LOAD_USER_INFO.fail.func({userId, error}));
      }
    }
  }

  yield process(userId);
  while (true) {
    const action = yield take([AuthActions.LOGIN.success.key, UserActions.LOAD_USER_INFO.stop.key]);
    if (action.type === UserActions.LOAD_USER_INFO.stop.key) break;
    if (action.type === AuthActions.LOGIN.success.key) yield process(userId);
  }
}

function* updateUserInfo({userId, email, username, inviteCode, signature, termsAgreed, callbackFunc}) {
  if (!Utils.VerifyEmail(email)) {
    callbackFunc(window.RESULT_CODE.ERROR_PARAMS, {error: 'err.invalid_email'});
  } else if (!termsAgreed) {
    callbackFunc(window.RESULT_CODE.ERROR_PARAMS, {error: 'err.agree_tos_pp', error_values: {}});
  } else {
    callbackFunc(window.RESULT_CODE.SUCCESS, {});
  }
}

export function* watchAll() {
  yield all([
    takeLatest(UserActions.LOAD_USER_INFO.init.key, loadUserInfo),
    takeLatest(UserActions.UPDATE_USER_INFO.init.key, updateUserInfo),
  ]);
}