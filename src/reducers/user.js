import {combineReducers} from "redux";
import {UserActions} from "../actions/user";

const info = (state = {null: {}}, action) => {
  switch (action.type) {
    case UserActions.LOAD_USER_INFO.success.key:
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

export const userCubegoes = (state={}, action) => {
  switch (action.type) {
    case UserActions.LOAD_USER_CUBEGO.success.key:
      return {
        ...state,
        [action.userId]: {...action.response},
      }
    default:
      return state;
  }
}

export const userCubegons = (state={}, action) => {
  switch (action.type) {
    case UserActions.LOAD_USER_CUBEGON.success.key:
      return {
        ...state,
        [action.userId]: {...action.response},
      }
    default:
      return state;
  }
}

export const user = combineReducers({
  info: info,
  userCubegoes,
  userCubegons,
});