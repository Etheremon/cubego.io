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

export const userMaterials = (state={}, action) => {
  switch (action.type) {
    case UserActions.LOAD_USER_CUBEGON.success.key:
      return {
        ...state,
        [action.userId]: [...action.response.materials].map(c => ({...c, material_id: c['material_class']})),
      };
    default:
      return state;
  }
};

export const userCubegons = (state={}, action) => {
  switch (action.type) {
    case UserActions.LOAD_USER_CUBEGON.success.key:
      return {
        ...state,
        [action.userId]: [...action.response.cubegons],
      };
    default:
      return state;
  }
};

export const user = combineReducers({
  info: info,
  userMaterials,
  userCubegons,
});