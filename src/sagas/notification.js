import {all, call, put, select, takeLatest} from 'redux-saga/effects';

import * as Utils from "../utils/utils";
import {NotificationActions} from "../actions/notification";
import {GeneralApi} from "../services/api/generalApi";
import {GetNotification} from "../reducers/selectors";

export function* loadFeeds ({forceUpdate}) {
  let feeds = yield select(GetNotification);
  if (Utils.ObjIsEmpty(feeds) || forceUpdate) {
    yield put(NotificationActions.LOAD_NOTIFICATION.request.func({}));
    const {response, error} = yield call(GeneralApi.GetNotifications);

    if (!error) {
      yield put(NotificationActions.LOAD_NOTIFICATION.success.func({response}));
    } else {
      yield put(NotificationActions.LOAD_NOTIFICATION.fail.func({error}))
    }
  }
}

export function* watchAll() {
  yield all([
    takeLatest(NotificationActions.LOAD_NOTIFICATION.init.key, loadFeeds),
  ]);
}