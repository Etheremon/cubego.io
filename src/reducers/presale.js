import {combineReducers} from "redux";
import {PresaleActions} from "../actions/presale";


export const discountFactor = (state=null, action) => {
  switch (action.type) {
    case PresaleActions.LOAD_DISCOUNT_FACTOR.success.key:
      return action.response;
    default:
      return state;
  }
};

export const performance = (state={null: {}}, action) => {
  switch (action.type) {
    case PresaleActions.GET_PRESALE_PERFORMANCE.success.key:
      return {
        ...state,
        [action.userId]: action.response
      };
    default:
      return state;
  }
};

export const presale = combineReducers({
  discountFactor,
  performance,
});