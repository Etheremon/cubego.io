import {AuthActions} from "../actions/auth";

const defaultState = {
  user: undefined,
  error: undefined,
};

export const auth = (state = defaultState, action) => {
  switch (action.type) {
    case AuthActions.LOGIN.success.key:
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


