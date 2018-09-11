import * as ActionTypes from '../actions/action_types';

const defaultState = {
  user: undefined,
  error: undefined,
};

export const auth = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        userId: action.userId,
        username: action.username,
        userEmail: action.email,
        error: undefined,
      };

    case ActionTypes.LOGIN_FAILED:
      return {
        ...state,
        error: undefined,
      };

    default:
      return state;
  }
};


