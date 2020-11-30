import { combineReducers } from 'redux';
import { LocalizeActions } from '../actions/localization';

const localizationData = (state = {}, action) => {
  switch (action.type) {
    case LocalizeActions.LOAD_LOCALIZATION.init.key:
      return {
        ...state,
        fetchedData: undefined,
      };
    case LocalizeActions.LOAD_LOCALIZATION.success.key:
      return {
        ...state,
        fetchedData: true,
      };
    case LocalizeActions.LOAD_LOCALIZATION.fail.key:
      return {
        ...state,
        fetchedData: false,
      };
    default:
      return state;
  }
};

export const localization = combineReducers({
  localizationData,
});
