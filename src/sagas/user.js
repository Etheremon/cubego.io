import {call, fork, put, select, take, takeLatest, all} from 'redux-saga/effects';

import * as ActionTypes from '../actions/action_types';
import {Actions} from '../actions/index';
import * as Api from '../services/api';
import {GetLoggedInUserId, GetUserBasicInfo, GetUserCubegon} from "../reducers/selectors";

function* fetchBasicInfo(userId) {
  yield put(Actions.user.fetchUserBasicInfo.request(userId));

  const {response, error} = yield call(Api.getUserBasicInfo, userId);
  if (!error) {
    yield put(Actions.user.fetchUserBasicInfo.success(userId, response));
  } else {
    yield put(Actions.user.fetchUserBasicInfo.fail(userId, error));
  }
}

function* loadUserBasicInfo({forceUpdate}) {
  function* process() {
    let userId = yield select(GetLoggedInUserId);
    let userBasicInfo = yield select(GetUserBasicInfo, userId);
    if (userId && (!userBasicInfo || forceUpdate)) yield fetchBasicInfo(userId);
  }

  yield process();
  while (true) {
    const action = yield take([ActionTypes.LOGIN_SUCCESS, ActionTypes.LOAD_USER_BASIC_INFO.STOP]);
    if (action.type === ActionTypes.LOAD_USER_BASIC_INFO.STOP) break;
    if (action.type === ActionTypes.LOGIN_SUCCESS) yield process();
  }
}

function* watchLoadUserBasicInfo() {
  yield takeLatest(ActionTypes.LOAD_USER_BASIC_INFO.START, loadUserBasicInfo);
}

function* fetchUserCubegon(userId) {
  yield put(Actions.user.fetchUserCubegon.request(userId));

  const {response, error} = yield call(Api.getUserCubegon, userId);
  if (!error) {
    yield put(Actions.user.fetchUserCubegon.success(userId, response));
  } else {
    yield put(Actions.user.fetchUserCubegon.fail(userId, error));
  }
}

function* loadUserCubegon({forceUpdate}) {
  function* process() {
    let userId = yield select(GetLoggedInUserId);
    let userCubegon = yield select(GetUserCubegon, userId);
    if (userId && (!userCubegon || forceUpdate)) yield fetchUserCubegon(userId);
  }

  yield process();
  while (true) {
    const action = yield take([ActionTypes.LOGIN_SUCCESS, ActionTypes.LOAD_USER_CUBEGON.STOP]);
    if (action.type === ActionTypes.LOAD_USER_CUBEGON.STOP) break;
    if (action.type === ActionTypes.LOGIN_SUCCESS) yield process();
  }
}

function* watchLoadUserCubegon() {
  yield takeLatest(ActionTypes.LOAD_USER_CUBEGON.START, loadUserCubegon);
}

export function* watchAll() {
  yield all([
    fork(watchLoadUserBasicInfo),
    fork(watchLoadUserCubegon),
  ]);
}