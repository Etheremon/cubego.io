import {call, put, select, takeLatest, all} from 'redux-saga/effects';
import {CubegonActions} from "../actions/cubegon";
import {GetCubegonInfo} from "../reducers/selectors";
import {CubegonApi} from "../services/api/cubegonApi";
import {takeEvery} from "redux-saga";

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

export function* watchAll() {
  yield all([
    takeEvery(CubegonActions.LOAD_CUBEGON_INFO.init.key, loadCubegonInfo),
  ]);
}
