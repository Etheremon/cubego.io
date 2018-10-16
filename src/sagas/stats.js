// import {call, fork, put, select, takeLatest, all} from 'redux-saga/effects';
//
// import * as ActionTypes from '../actions/action_types';
// import {Actions} from '../actions/index';
// import * as Api from '../services/api/utils';
// import {GetGeneralStats} from "../reducers/selectors";
//
//
// function* fetchGeneralStats() {
//   yield put(Actions.stats.fetchGeneralStats.request());
//   const {response, error} = yield call(Api.getGeneralStats);
//
//   if (!error) {
//     yield put(Actions.stats.fetchGeneralStats.success(response));
//   } else {
//     yield put(Actions.stats.fetchGeneralStats.fail(error));
//   }
// }
//
// export function* loadGeneralStats({forceUpdate}) {
//   let generalStats = yield select(GetGeneralStats);
//   if (!generalStats.trainer_count || forceUpdate) yield fetchGeneralStats();
// }
//
// function* watchLoadGeneralStats() {
//   yield takeLatest(ActionTypes.LOAD_GENERAL_STATS, loadGeneralStats);
// }
//
// export function* watchAll() {
//   yield all([
//     fork(watchLoadGeneralStats),
//   ]);
// }
