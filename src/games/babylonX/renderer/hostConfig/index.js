import now from 'performance-now';
import { commitMount, commitTextUpdate, resetTextContent } from './mutations';
import { createTextInstance, prepareForCommit } from './reconcilers';
import { diffProps, emptyFnc } from '../../utils';
import { createComponent } from '../../components';
import {
  applyProps, filterByKey, including, loggerFnc,
} from '../../../threeX/fiber/utils';

const appendChild = (parent, child) => {
  child.parent = parent;
  emptyFnc('appendChild')();
};

const removeChild = (parent, child) => {
  child.dispose();
  emptyFnc('removeChild')();
};

const shouldSetTextContent = () => false;

const finalizeInitialChildren = () => false;

const getChildHostContext = () => ({});

const getRootHostContext = () => ({});

const getPublicInstance = (inst) => inst;

const insertBefore = () => {

};

const prepareUpdate = (element, type, oldProps, newProps, rootContainerInstance, hostContext) => {
  emptyFnc('prepareUpdate')();
  return diffProps(element, type, oldProps, newProps, rootContainerInstance);
};

const resetAfterCommit = () => {
};

const createInstance = (type, props, rootContainerInstance, hostContext, internalInstanceHandle) => createComponent(type, props, rootContainerInstance);

const commitUpdate = (instance, updatePayload, type, lastRawProps, nextRawProps, internalInstanceHandle) => {
  loggerFnc('commitUpdate')();
  const updatedPropKeys = including(updatePayload.filter((item, i) => i % 2 === 0));
  const oldProps = filterByKey(lastRawProps, updatedPropKeys);
  const newProps = filterByKey(nextRawProps, updatedPropKeys);

  applyProps(instance, oldProps, newProps);
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
