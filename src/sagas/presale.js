import {call, put, select, takeLatest, all} from 'redux-saga/effects';
import {PresaleActions} from "../actions/presale";
import {GetDiscountFactor} from "../reducers/selectors";
import { PresaleApi } from '../services/api/presaleApi';

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

export function* watchAll() {
  yield all([
    takeLatest(PresaleActions.LOAD_DISCOUNT_FACTOR.init.key, loadDiscountFactor),
  ]);
}