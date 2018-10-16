import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { localeReducer } from 'react-localize-redux'
import createSagaMiddleware from 'redux-saga'
import { voxelStoreReducers } from './reducers'
import { LanguageActions } from './config_language.js'
import rootSagas from './sagas'
import {LocalizeActions} from "./actions/localization";

export const setupStore = () => {
  // Create the saga middleware
  const sagaMiddleware = createSagaMiddleware();

  // Creating store
  const reducer = combineReducers({...voxelStoreReducers, localeReducer});
  const initialState = {};
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;
  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

  //  const enhancer = compose(applyMiddleware(sagaMiddleware));
  let store = createStore(reducer, initialState, enhancer);
  store.sagaMiddleware = sagaMiddleware;

  // Initial Actions
  store.dispatch(LocalizeActions.LOAD_LOCALIZATION.request.func({}));

  LanguageActions().then(lanActions => {
    lanActions.forEach(a => store.dispatch(a));
    store.dispatch(LocalizeActions.LOAD_LOCALIZATION.success.func({}))
  });

  sagaMiddleware.run(rootSagas);

  return store;
};
