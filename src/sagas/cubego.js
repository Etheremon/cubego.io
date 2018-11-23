import {call, put, select, takeLatest, all} from 'redux-saga/effects';
import {CubegoActions} from "../actions/cubego";

export function* watchAll() {
  yield all([
    // takeLatest(CubegoActions.LOAD_USER_CUBEGO.init.key, loadUserCubego),
  ]);
}