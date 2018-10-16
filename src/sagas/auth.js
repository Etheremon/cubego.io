import {put, fork, takeLatest, all} from 'redux-saga/effects';
import {AuthActions} from "../actions/auth";
import {UserActions} from "../actions/user";


export function* login({userId}) {
  if (window.isValidEtherAddress(userId) || userId === null) {
    yield put(AuthActions.LOGIN.success.func({userId}));

    yield put(UserActions.LOAD_USER_INFO.init.func({}));
  } else {
    yield put(AuthActions.LOGIN.fail.func({userId, err: 'err.invalid_ether_address'}));
  }
}

function* watchLogin() {
  yield takeLatest(AuthActions.LOGIN.init.key, login);
}

export function* watchAll() {
  yield all([
    fork(watchLogin),
  ]);
}
