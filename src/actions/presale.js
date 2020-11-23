import { createActionTypes } from './action_utils';

export const PresaleActions = {
  LOAD_DISCOUNT_FACTOR: createActionTypes('LOAD_DISCOUNT_FACTOR'),
  GET_PRESALE_PERFORMANCE: createActionTypes('GET_PRESALE_PERFORMANCE'),
};
