import {call, put, select, takeLatest, all} from 'redux-saga/effects';
import {CubegonActions} from "../actions/cubegon";
import {GetCubegonInfo, GetCubegonList} from "../reducers/selectors";
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

export function* loadCubegonList({forceUpdate}) {
  let listGon = yield select(GetCubegonList);
  if (!listGon || forceUpdate) {
    yield put(CubegonActions.LOAD_CUBEGON_LIST.request.func({}));
    const {response, error} = yield call(CubegonApi.GetCubegonList);

    if (!error) {
      yield put(CubegonActions.LOAD_CUBEGON_LIST.success.func({response}));
    } else {
      yield put(CubegonActions.LOAD_CUBEGON_LIST.fail.func({error}));
    }
  }
}

export function* watchAll() {
  yield all([
    takeEvery(CubegonActions.LOAD_CUBEGON_INFO.init.key, loadCubegonInfo),
    takeEvery(CubegonActions.LOAD_CUBEGON_LIST.init.key, loadCubegonList),
  ]);
}
