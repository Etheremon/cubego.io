import * as ActionTypes from '../actions/action_types';
import {combineReducers} from "redux";

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
  info: basicInfo,
});