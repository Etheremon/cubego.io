import now from 'performance-now';
import { commitMount, commitTextUpdate, resetTextContent } from './mutations';
import { createTextInstance, prepareForCommit } from './reconcilers';
import {
  applyProps, diffProps, emptyFnc, filterByKey, including, loggerFnc,
} from '../utils';
import { createComponent } from '../../components';

const createInstance = (type, props, rootContainerInstance, hostContext, internalInstanceHandle) => {
  loggerFnc('createInstance')();
  return createComponent(type, props, rootContainerInstance);
};

const appendChild = (parent, child) => {
  loggerFnc('appendChild')();
  parent.addChild(child);
};

const removeChild = (parent, child) => {
  loggerFnc('removeChild')();
  parent.removeChild(child);
};

const prepareUpdate = (element, type, oldProps, newProps, rootContainerInstance, hostContext) => {
  loggerFnc('prepareUpdate')();
  return diffProps(element, type, oldProps, newProps, rootContainerInstance);
};

const commitUpdate = (instance, updatePayload, type, lastRawProps, nextRawProps, internalInstanceHandle) => {
  loggerFnc('commitUpdate')();
  const updatedPropKeys = including(updatePayload.filter((item, i) => i % 2 === 0));
  const oldProps = filterByKey(lastRawProps, updatedPropKeys);
  const newProps = filterByKey(nextRawProps, updatedPropKeys);

  applyProps(instance, oldProps, newProps);
};

const shouldSetTextContent = () => false;

const finalizeInitialChildren = () => false;

const getChildHostContext = () => ({});

const getRootHostContext = () => ({});

const getPublicInstance = (inst) => inst;

const insertBefore = (parentInstance, child, beforeChild) => {
  loggerFnc('insertBefore')();
  parentInstance.addChild(child);
};

const resetAfterCommit = () => {
  loggerFnc('resetAfterCommit')();
};

const hostConfig = {
  now,
  appendInitialChild: appendChild,
  createInstance,
  createTextInstance,
  finalizeInitialChildren,
  getChildHostContext,
  getRootHostContext,
  getPublicInstance,
  insertBefore,
  insertInContainerBefore: insertBefore,
  prepareForCommit,
  prepareUpdate,
  resetAfterCommit,
  resetTextContent,
  shouldSetTextContent,
  supportsMutation: true,
  // Mutations
  commitUpdate,
  commitMount,
  commitTextUpdate,
  appendChild,
  appendChildToContainer: appendChild,
  removeChild,
  removeChildFromContainer: removeChild,
};

export default hostConfig;
