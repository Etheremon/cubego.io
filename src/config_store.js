import {
  combineReducers, createStore,
} from 'redux';
import { localeReducer } from 'react-localize-redux';
import { voxelStoreReducers } from './reducers';
import { LanguageActions } from './config_language.js';
import { LocalizeActions } from './actions/localization';

export const setupStore = () => {
  // Creating store
  const reducer = combineReducers({ ...voxelStoreReducers, localeReducer });
  const initialState = {};

  const store = createStore(reducer, initialState);

  // Initial Actions
  store.dispatch(LocalizeActions.LOAD_LOCALIZATION.request.func({}));

  LanguageActions().then((lanActions) => {
    lanActions.forEach((a) => store.dispatch(a));
    store.dispatch(LocalizeActions.LOAD_LOCALIZATION.success.func({}));
  });

  return store;
};
