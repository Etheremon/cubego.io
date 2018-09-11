import {put, fork, takeLatest, all} from 'redux-saga/effects';

import * as ActionTypes from '../actions/action_types';
import { Actions } from '../actions/index';


export function* login({userId}) {
  if (window.isValidEtherAddress(userId) || userId === null) {
    yield put(Actions.auth.loginSuccess(userId));
    yield put(Actions.user.loadUserBasicInfo.start(true));
  } else {
    yield put(Actions.auth.loginFailed(userId, 'err.invalid_ether_address'));
  }
}

function* watchLogin() {
  yield takeLatest(ActionTypes.LOGIN, login);
}

export function* watchAll() {
  yield all([
    fork(watchLogin),
  ]);
}
