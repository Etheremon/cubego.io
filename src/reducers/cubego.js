import {combineReducers} from "redux";
import {CubegoActions} from "../actions/cubego";

export const userCubegos = (state={}, action) => {
  switch (action.type) {
    case CubegoActions.LOAD_USER_CUBEGO.success.key:
      return {
        ...state
      }
    default:
      return state;
  }
}

export const cubego = combineReducers({
  userCubegos,
});