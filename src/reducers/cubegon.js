import {combineReducers} from "redux";
import {CubegonActions} from "../actions/cubegon";


export const info = (state={}, action) => {
  switch (action.type) {
    case CubegonActions.LOAD_CUBEGON_INFO.success.key:
      return {
        ...state,
        [action.gonId]: action.response
      };
    default:
      return state;
  }
};

export const list = (state={}, action) => {
  switch (action.type) {
    case CubegonActions.LOAD_CUBEGON_LIST.success.key:
      return {
        ...state, ['gallery']: action.response
      };
    default:
      return state;
  }
};

export const cubegon = combineReducers({
  info,
  list,
});