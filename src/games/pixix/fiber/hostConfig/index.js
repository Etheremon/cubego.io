import now from "performance-now";
import {commitMount, commitTextUpdate, resetTextContent} from "./mutations";
import {createTextInstance, prepareForCommit} from "./reconcilers";
import {applyProps, diffProps, emptyFnc, filterByKey, including, loggerFnc} from "../utils";
import Component from "../../components/index";

const createInstance = (type, props, rootContainerInstance, hostContext, internalInstanceHandle) => {
  return Component.createFiberComponent(type, props, rootContainerInstance);
};

const appendChild = (parent, child) => {
  parent.addChild(child);
};

const removeChild = (parent, child) => {
  parent.removeChild(child);
};

const prepareUpdate = (pixiElement, type, oldProps, newProps, rootContainerInstance, hostContext) => {
  loggerFnc('prepareUpdate')();
  return diffProps(pixiElement, type, oldProps, newProps, rootContainerInstance);
};

const commitUpdate = (instance, updatePayload, type, lastRawProps, nextRawProps, internalInstanceHandle) => {
  loggerFnc('commitUpdate')();
  const updatedPropKeys = including(updatePayload.filter((item, i) => i % 2 === 0));
  const oldProps = filterByKey(lastRawProps, updatedPropKeys);
  const newProps = filterByKey(nextRawProps, updatedPropKeys);

  applyProps(instance, oldProps, newProps);
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

const resetAfterCommit = () => {
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
