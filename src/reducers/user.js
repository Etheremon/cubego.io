import * as ActionTypes from '../actions/action_types';
import * as Utils from "../utils/utils";
import {combineReducers} from "redux";
import cloneDeep from "lodash/cloneDeep";

const basicInfo = (state = {null: {}}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER_BASIC_INFO.SUCCESS:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          ...action.response,
        },
      };
    default:
      return state;
  }
};

export const user = combineReducers({
  basicInfo: basicInfo,
});