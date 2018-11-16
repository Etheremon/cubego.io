import {createActionTypes} from "./action_utils";

export const UserActions = {
  LOAD_USER_INFO: createActionTypes('LOAD_USER_INFO'),
  UPDATE_USER_INFO: createActionTypes('UPDATE_USER_INFO'),

  LOAD_USER_CUBEGON: createActionTypes('LOAD_USER_CUBEGON'),
  LOAD_USER_CUBEGO: createActionTypes('LOAD_USER_CUBEGO'),
};
