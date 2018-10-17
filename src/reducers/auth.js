import {AuthActions} from "../actions/auth";
import * as LS from "../services/localStorageService";

const defaultState = {
  user: undefined,
  error: undefined,
};

export const auth = (state = defaultState, action) => {
  switch (action.type) {
    case AuthActions.LOGIN.success.key:
      if (action.userId)
        LS.SetItem(LS.Fields.account, action.userId);
      else
        LS.DeleteItem(LS.Fields.account);

      return {
        ...state,
        userId: action.userId,
        error: undefined,
      };

    case AuthActions.LOGIN.fail.key:
      return {
        ...state,
        error: undefined,
      };

    default:
      return state;
  }
};


