import 'regenerator-runtime/runtime';
import {fork} from 'redux-saga/effects';

/**
 * action-related
 */
import {watchAll as AuthWatcher} from './auth';
import {watchAll as UserWatcher} from './user';
import {watchAll as ModelWatcher} from './model';
import {watchAll as CubegonWatcher} from './cubegon';
import {watchAll as CubegoWatcher} from './cubego';
import {watchAll as NotificationWatcher} from './notification';
import {watchAll as SubscriberWatcher} from './subscriber';

export default function* rootSaga() {
  const watchers = [
    fork(UserWatcher),
    fork(AuthWatcher),
    fork(ModelWatcher),
    fork(CubegonWatcher),
    fork(NotificationWatcher),
    fork(SubscriberWatcher),
    fork(CubegoWatcher),
  ];

  yield* watchers;
}