import now from "performance-now";
import {commitMount, commitTextUpdate, resetTextContent} from "./mutations";
import {createTextInstance, prepareForCommit} from "./reconcilers";
import {diffProps, emptyFnc} from "../../utils";
import {createComponent} from "../../components";

const appendChild = (parent, child) => {
  child.parent = parent;
  emptyFnc('appendChild')();
};

const removeChild = (parent, child) => {
  child.dispose();
  emptyFnc('removeChild')();
};

const shouldSetTextContent = () => {
  return false;
};

const finalizeInitialChildren = () => {
  return false;
};

const getChildHostContext = () => {
  return {};
};

const getRootHostContext = () => {
  return {};
};

const getPublicInstance = (inst) => {
  return inst;
};

const insertBefore = () => {

};

const prepareUpdate = (pixiElement, type, oldProps, newProps, rootContainerInstance, hostContext) => {
  emptyFnc('prepareUpdate')();
  return diffProps(pixiElement, type, oldProps, newProps, rootContainerInstance);
};

const resetAfterCommit = () => {
};

const createInstance = (type, props, rootContainerInstance, hostContext, internalInstanceHandle) => {
  return createComponent(type, props, rootContainerInstance);
};

const commitUpdate = (domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
  emptyFnc('commitUpdate')();
};

const hostConfig = {
  now: now,
  appendInitialChild: appendChild,
  createInstance: createInstance,
  createTextInstance: createTextInstance,
  finalizeInitialChildren: finalizeInitialChildren,
  getChildHostContext: getChildHostContext,
  getRootHostContext: getRootHostContext,
  getPublicInstance: getPublicInstance,
  insertBefore: insertBefore,
  insertInContainerBefore: insertBefore,
  prepareForCommit: prepareForCommit,
  prepareUpdate: prepareUpdate,
  resetAfterCommit: resetAfterCommit,
  resetTextContent: resetTextContent,
  shouldSetTextContent: shouldSetTextContent,
  supportsMutation: true,
  //Mutations
  commitUpdate: commitUpdate,
  commitMount: commitMount,
  commitTextUpdate: commitTextUpdate,
  appendChild: appendChild,
  appendChildToContainer: appendChild,
  removeChild: removeChild,
  removeChildFromContainer: removeChild,
};

export default hostConfig;