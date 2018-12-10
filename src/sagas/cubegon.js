import {call, put, select, take, takeLatest, all} from 'redux-saga/effects';
import {CubegonActions} from "../actions/cubegon";
import {GetCubegonInfo, GetCubegonList, GetClaimStatus, GetLoggedInUserId, GetClaimedCount} from "../reducers/selectors";
import {CubegonApi} from "../services/api/cubegonApi";
import {takeEvery} from "redux-saga";
import { AuthActions } from '../actions/auth';

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

export function* checkEligibleToClaim({userId, forceUpdate}) {
  function* process(userId) {
    if (!userId) userId = yield select(GetLoggedInUserId);

    let claimStatus = yield select(GetClaimStatus, userId);
    if (userId && (!claimStatus || forceUpdate)) {
      yield put(CubegonActions.CHECK_ELIGIBLE_TO_CLAIM.request.func({userId}));

      const {response, error} = yield call(CubegonApi.CheckEligibleToClaim, userId);

      if (!error) {
        yield put(CubegonActions.CHECK_ELIGIBLE_TO_CLAIM.success.func({userId, response}));
      } else {
        yield put(CubegonActions.CHECK_ELIGIBLE_TO_CLAIM.fail.func({userId, error}));
      }
    }
  }

  yield process(userId);
  while (true) {
    const action = yield take([AuthActions.LOGIN.success.key, CubegonActions.CHECK_ELIGIBLE_TO_CLAIM.stop.key]);
    if (action.type === CubegonActions.CHECK_ELIGIBLE_TO_CLAIM.stop.key) break;
    if (action.type === AuthActions.LOGIN.success.key) yield process(userId);
  }
}

export function* loadClaimedCount({forceUpdate}) {
  let claimedCount = yield select(GetClaimedCount);
  if (!claimedCount || forceUpdate) {
    yield put(CubegonActions.LOAD_CLAIM_COUNT.request.func({}));
    const {response, error} = yield call(CubegonApi.GetClaimedCount);

    if (!error) {
      yield put(CubegonActions.LOAD_CLAIM_COUNT.success.func({response}));
    } else {
      yield put(CubegonActions.LOAD_CLAIM_COUNT.fail.func({error}));
    }
  }
}

export function* watchAll() {
  yield all([
    takeEvery(CubegonActions.LOAD_CUBEGON_INFO.init.key, loadCubegonInfo),
    takeEvery(CubegonActions.LOAD_CUBEGON_LIST.init.key, loadCubegonList),
    takeEvery(CubegonActions.CHECK_ELIGIBLE_TO_CLAIM.init.key, checkEligibleToClaim),
    takeEvery(CubegonActions.LOAD_CLAIM_COUNT.init.key, loadClaimedCount),
  ]);
}
