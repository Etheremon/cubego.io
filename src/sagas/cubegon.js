import {call, fork, put, select, takeLatest, all} from 'redux-saga/effects';

import * as ActionTypes from '../actions/action_types';
import {Actions} from '../actions/index';
import * as Api from '../services/api';
import {GetCubegoInfo, GetCubegon} from "../reducers/selectors";


function* fetchCubegoInfo() {
  yield put(Actions.cubegon.cubegoInfo.request());
  const {response, error} = yield call(Api.getCubegoInfo);

  if (!error) {
    yield put(Actions.cubegon.fetchCubegoInfo.success(response));
  } else {
    yield put(Actions.cubegon.fetchCubegoInfo.fail(error));
  }
}

export function* loadCubegoInfo({forceUpdate}) {
  let cubegoInfo = yield select(GetCubegoInfo);
  if (!cubegoInfo || forceUpdate) yield fetchCubegoInfo();
}

function* watchLoadCubegoInfo() {
  yield takeLatest(ActionTypes.LOAD_CUBEGO_INFO, loadCubegoInfo);
}

function* fetchCubegon() {
  yield put(Actions.cubegon.cubegon.request());
  const {response, error} = yield call(Api.getcubegon);

  if (!error) {
    yield put(Actions.cubegon.fetchCubegon.success(response));
  } else {
    yield put(Actions.cubegon.fetchCubegon.fail(error));
  }
}

export function* loadCubegon({forceUpdate}) {
  let cubegon = yield select(GetCubegon);
  if (!cubegon || forceUpdate) yield fetchCubegon();
}

function* watchLoadCubegon() {
  yield takeLatest(ActionTypes.LOAD_CUBEGON, loadCubegon);
}

export function* watchAll() {
  yield all([
    fork(watchLoadCubegoInfo),
    fork(watchLoadCubegon),
  ]);
}
