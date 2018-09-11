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

/**
 * Network Requests / Action Requests, with 3 related actions
 * REQUESTED means the network request is just sent / Action started
 * SUCCESS means the request is returned with 200 and no error field in response / Action success
 * FAILED means either a 50x, 40x, or response contains error field / Action failed
 */
export function createRequestTypes(name: string): RequestActionType {
  return {
    REQUESTED: `${name}_REQUESTED`,
    SUCCESS: `${name}_SUCCESS`,
    FAILED: `${name}_FAILED`,
  };
}

export function action(type: string, data: Object = {}): ActionType {
  return {type, ...data};
}
