import {createActionTypes} from "./action_utils";

export const ModelActions = {
  DELETE_MODEL: createActionTypes('DELETE_MODEL'),
  SAVE_MODEL: createActionTypes('SAVE_MODEL'),
  VALIDATE_MODEL: createActionTypes('VALIDATE_MODEL'),
  SUBMIT_MODEL: createActionTypes('SUBMIT_MODEL'),
};
