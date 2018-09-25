import * as ActionTypes from '../actions/action_types';
import {combineReducers} from "redux";
import cloneDeep from "lodash/cloneDeep";

const localizationData = (state={}, action) => {
  switch(action.type) {
    case ActionTypes.FETCH_LOCALIZATION.REQUESTED:
      return {
        ...state,
        ['fetchedData']: undefined,
      };
    case ActionTypes.FETCH_LOCALIZATION.SUCCESS:
      return {
        ...state,
        ['fetchedData']: true,
      };
    case ActionTypes.FETCH_LOCALIZATION.FAILED:
      return {
        ...state,
        ['fetchedData']: false,
      };
    default:
      return state
  }
}; 

export const localization = combineReducers({
  localizationData,
});