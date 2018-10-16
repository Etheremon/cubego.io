// import {call, fork, put, select, takeLatest, all} from 'redux-saga/effects';
//
// import * as ActionTypes from '../actions/action_types';
// import {Actions} from '../actions/index';
// import * as Api from '../services/api/utils';
// import {GetAvailableCubegoes, GetAuctionCubegons} from "../reducers/selectors";
//
//
// function* fetchAvailableCubegoes() {
//   yield put(Actions.store.fetchAvailableCubegoes.request());
//   const {response, error} = yield call(Api.getAvailableCubegoes);
//
//   if (!error) {
//     yield put(Actions.store.fetchAvailableCubegoes.success(response));
//   } else {
//     yield put(Actions.store.fetchAvailableCubegoes.fail(error));
//   }
// }
//
// export function* loadAvailableCubegoes({forceUpdate}) {
//   let availableCubegoes = yield select(GetAvailableCubegoes);
//   if (!availableCubegoes || forceUpdate) yield fetchAvailableCubegoes();
// }
//
// function* watchLoadAvailableCubegoes() {
//   yield takeLatest(ActionTypes.LOAD_AVAILABLE_CUBEGOES, loadAvailableCubegoes);
// }
//
// function* fetchAuctionCubegons() {
//   yield put(Actions.store.fetchAuctionCubegons.request());
//   const {response, error} = yield call(Api.getAuctionCubegons);
//
//   if (!error) {
//     yield put(Actions.store.fetchAuctionCubegons.success(response));
//   } else {
//     yield put(Actions.store.fetchAuctionCubegons.fail(error));
//   }
// }
//
// export function* loadAuctionCubegons({forceUpdate}) {
//   let auctionCubegons = yield select(GetAuctionCubegons);
//   if (!auctionCubegons || forceUpdate) yield fetchAuctionCubegons();
// }
//
// function* watchLoadAuctionCubegons() {
//   yield takeLatest(ActionTypes.LOAD_AUCTION_CUBEGONS, loadAuctionCubegons);
// }
//
// export function* watchAll() {
//   yield all([
//     fork(watchLoadAvailableCubegoes),
//     fork(watchLoadAuctionCubegons),
//   ]);
// }
