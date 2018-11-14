import {call, put, select, takeLatest, all} from 'redux-saga/effects';
import {CubegoActions} from "../actions/cubego";
import {CubegoApi} from "../services/api/cubegoApi";
import { GetUserCubegoes } from '../reducers/selectors';

export function* loadUserCubego({forceUpdate, userId}) {
  let userCubegoes = yield select(GetUserCubegoes, userId);
  if (!userCubegoes || forceUpdate) {
    yield put(CubegoActions.LOAD_USER_CUBEGO.request.func({userId}));
    const {response, error} = yield call(CubegoApi.GetUserCubegoes, userId, null);

    if (!error) {
      yield put(CubegoActions.LOAD_USER_CUBEGO.success.func({userId, response}));
    } else {
      yield put(CubegoActions.LOAD_USER_CUBEGO.func({userId, error}));
    }
  }
}

export function* watchAll() {
  yield all([
    takeLatest(CubegoActions.LOAD_USER_CUBEGO.init.key, loadUserCubego),
  ]);
}