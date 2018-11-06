import {call, put, select, take, takeLatest, all} from 'redux-saga/effects';

import * as Utils from "../utils/utils";
import { GeneralApi } from '../services/api/generalApi';
import { SubscriberActions } from '../actions/subscriber';

function* subscribeEmail({email, callbackFunc}) {
  if (!Utils.VerifyEmail(email)) {
    callbackFunc(window.RESULT_CODE.ERROR_PARAMS, {error: 'err.invalid_email'});
  } else {
    let {response, error} = yield call(GeneralApi.SubscribeEmail, email);
    if (!error) {
      callbackFunc(window.RESULT_CODE.SUCCESS, response);
    } else {
      callbackFunc(window.RESULT_CODE.SUCCESS, {error: 'err.server_error', error_values: {msg: error}});
    }
  }


}

export function* watchAll() {
  yield all([
    takeLatest(SubscriberActions.SUBSCRIBE_EMAIL.init.key, subscribeEmail),
  ]);
}