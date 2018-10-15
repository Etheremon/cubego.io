/**
 * Created by jarvis on 21/02/18.
 */

export type ActionType = {
  type: string,
  [key: string]: any,
};

export type FlowActionType = {
  START: string,
  STOP: string,
};

export type RequestActionType = {
  REQUESTED: string,
  SUCCESS: string,
  FAILED: string
};

/**
 * Some Actions that run continuously in background
 * START means the action has been started
 * STOP means the action has been stopped
 */
export function createFlowTypes(name: string): FlowActionType {
  return {
    START: `${name}_START`,
    STOP: `${name}_STOP`,
  };
}

export function action(type: string, data: Object = {}): ActionType {
  return {type, ...data};
}

export const createAction = (type) => ((data) => action(type, {...data}));

export function createRequestTypes(name: string): RequestActionType {
  return {
    INIT: `${name}_INIT`,
    REQUESTED: `${name}_REQUESTED`,
    SUCCESS: `${name}_SUCCESS`,
    FAILED: `${name}_FAILED`,
  };
}

export function createActionTypes(name: string): RequestActionType {
  return {
    init: {
      key: `${name}_INIT`,
      func: createAction(`${name}_INIT`),
    },
    request: {
      key: `${name}_REQUEST`,
      func: createAction(`${name}_REQUEST`),
    },
    success: {
      key: `${name}_SUCCESS`,
      func: createAction(`${name}_SUCCESS`),
    },
    fail: {
      key: `${name}_FAIL`,
      func: createAction(`${name}_FAIL`),
    },
  };
}
