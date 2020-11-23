import { combineReducers, createStore, compose } from 'redux';
import { initialize, localeReducer } from 'react-localize-redux';

import { voxelStoreReducers } from './reducers';
import { LocalizeActions } from './actions/localization';

export const setupStore = () => {
  // Creating store
  const reducer = combineReducers({ ...voxelStoreReducers, localeReducer });
  const initialState = {};
  const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

  const store = createStore(reducer, initialState);

  // Initial Actions
  store.dispatch(LocalizeActions.LOAD_LOCALIZATION.request.func({}));

  store.dispatch(initialize([{ name: 'English', code: 'en', country: 'gb' }], {
    defaultLanguage: 'en',
    missingTranslationMsg: '${key}',
  }));

  return store;
};
