import {call, put, select, takeLatest, all} from 'redux-saga/effects';
import {CubegonActions} from "../actions/cubegon";
import {GetCubegonInfo, GetUserCubegons} from "../reducers/selectors";
import {CubegonApi} from "../services/api/cubegonApi";

export function* loadCubegonInfo({forceUpdate, gonId}) {
  let gonInfo = yield select(GetCubegonInfo, gonId);
  if (!gonInfo || forceUpdate) {
    yield put(CubegonActions.LOAD_CUBEGON_INFO.request.func({gonId}));
    const {response, error} = yield call(CubegonApi.GetCubegonInfo, gonId, null);

    if (!error) {
      yield put(CubegonActions.LOAD_CUBEGON_INFO.success.func({gonId, response}));
    } else {
      yield put(CubegonActions.LOAD_CUBEGON_INFO.func({gonId, error}));
    }
  }
}

export function* loadUserCubegon({forceUpdate, userId}) {
  let userCubegons = yield select(GetUserCubegons, userId);
  if (!userCubegons || forceUpdate) {
    yield put(CubegonActions.LOAD_USER_CUBEGON.request.func({userId}));
    const {response, error} = yield call(CubegonApi.GetUserCubegons, userId, null);

    if (!error) {
      yield put(CubegonActions.LOAD_USER_CUBEGON.success.func({userId, response}));
    } else {
      yield put(CubegonActions.LOAD_USER_CUBEGON.func({userId, error}));
    }
  }
}

export function* watchAll() {
  yield all([
    takeLatest(CubegonActions.LOAD_CUBEGON_INFO.init.key, loadCubegonInfo),
    takeLatest(CubegonActions.LOAD_USER_CUBEGON.init.key, loadUserCubegon),
  ]);
}