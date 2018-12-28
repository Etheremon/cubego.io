import {take, call, put, select, takeLatest, all} from 'redux-saga/effects';
import {PresaleActions} from "../actions/presale";
import {GetDiscountFactor, GetLoggedInUserId, GetPresalePerformance} from "../reducers/selectors";
import { PresaleApi } from '../services/api/presaleApi';
import {AuthActions} from "../actions/auth";

export function* loadDiscountFactor({forceUpdate}) {
  let discountFactor = yield select(GetDiscountFactor);
  if (!discountFactor || forceUpdate) {
    yield put(PresaleActions.LOAD_DISCOUNT_FACTOR.request.func({}));
    const {response, error} = yield call(PresaleApi.GetDiscountFactor);

    if (!error) {
      yield put(PresaleActions.LOAD_DISCOUNT_FACTOR.success.func({response}));
    } else {
      yield put(PresaleActions.LOAD_DISCOUNT_FACTOR.func({error}));
    }
  }
}

export function* getPresalePerformance({forceUpdate, userId}) {
  function* process(userId) {
    if (!userId) userId = yield select(GetLoggedInUserId);
    let perf = yield select(GetPresalePerformance, userId);

    if (userId && (!perf || forceUpdate)) {
      yield put(PresaleActions.GET_PRESALE_PERFORMANCE.request.func({userId}));
      const {response, error} = yield call(PresaleApi.GetPresalePerformance, userId);

      if (!error) {
        yield put(PresaleActions.GET_PRESALE_PERFORMANCE.success.func({userId, response}));
      } else {
        yield put(PresaleActions.GET_PRESALE_PERFORMANCE.fail.func({userId, error}));
      }
    }
  }

  yield process(userId);
  while (true) {
    const action = yield take([AuthActions.LOGIN.success.key, PresaleActions.GET_PRESALE_PERFORMANCE.stop.key]);
    if (action.type === PresaleActions.GET_PRESALE_PERFORMANCE.stop.key) break;
    if (action.type === AuthActions.LOGIN.success.key) yield process(userId);
  }
}

export function* watchAll() {
  yield all([
    takeLatest(PresaleActions.LOAD_DISCOUNT_FACTOR.init.key, loadDiscountFactor),
    takeLatest(PresaleActions.GET_PRESALE_PERFORMANCE.init.key, getPresalePerformance),
  ]);
}