import * as BABYLON from 'babylonjs';

const CHILDREN = 'children';
const emptyFnc = (name) => () => {
  console.log(name);
};

const cutHex = (h) => h.charAt(0) === "0" && h.charAt(1) === "x" ? h.substring(2, 8) : h;
const hexToR = (h) => parseInt((cutHex(h)).substring(0, 2), 16);
const hexToG = (h) => parseInt((cutHex(h)).substring(2, 4), 16);
const hexToB = (h) => parseInt((cutHex(h)).substring(4, 6), 16);

export const hexToColor3 = (hex) => {
  let r = hexToR(hex) / 255;
  let g = hexToG(hex) / 255;
  let b = hexToB(hex) / 255;
  return new BABYLON.Color3(r, g, b);
};

const diffProps = (element, type, lastRawProps, nextRawProps, rootContainerElement) => {
  let updatePayload = null;

  let lastProps = lastRawProps;
  let nextProps = nextRawProps;
  let propKey;

  for (propKey in lastProps) {
    if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
      continue;
    }
    if (propKey === CHILDREN) {
      // Noop. Text children not supported
    } else {
      (updatePayload = updatePayload || []).push(propKey, null);
    }
  }
  for (propKey in nextProps) {
    const nextProp = nextProps[propKey];
    const lastProp = lastProps != null ? lastProps[propKey] : undefined;
    if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || (nextProp == null && lastProp == null)) {
      continue;
    }
    if (propKey === CHILDREN) {
      // Noop. Text children not supported
    } else {
      (updatePayload = updatePayload || []).push(propKey, nextProp);
    }
  }
  return updatePayload;
};

export {emptyFnc, diffProps}
