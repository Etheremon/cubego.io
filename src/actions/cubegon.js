import {createActionTypes} from "./action_utils";

export const CubegonActions = {
  LOAD_CUBEGON_INFO: createActionTypes('LOAD_CUBEGON_INFO'),
  LOAD_CUBEGON_LIST: createActionTypes('LOAD_CUBEGON_LIST'),
  CHECK_ELIGIBLE_TO_CLAIM: createActionTypes('CHECK_ELIGIBLE_TO_CLAIM'),
  LOAD_CLAIM_COUNT: createActionTypes('LOAD_CLAIM_COUNT'),
};
