import * as PIXI from "pixi.js";
const CHILDREN = 'children';

const RESERVED_PROPS = {
  [CHILDREN]: true,
};

const __DEV__  = false;

const DEFAULT_PROPS = {};

const emptyFnc = (name) => () => {
  // console.log(name);
};

const loggerFnc = (name) => () => {
  // console.log(name);
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

function filterByKey(inputObject, filter) {
  const exportObject = {};

  Object.keys(inputObject)
    .filter(filter)
    .forEach(key => {
      exportObject[key] = inputObject[key];
    });

  return exportObject;
}

const including = props => key => props.indexOf(key) !== -1;


const not = fn => (...args) => !fn(...args);

export const includingReservedProps = including(Object.keys(RESERVED_PROPS));

function defaultApplyProps(instance, oldProps, newProps) {
  Object.keys(newProps)
    .filter(not(includingReservedProps))
    .forEach(propName => {
      const value = newProps[propName];
      if (typeof value !== "undefined") {
        setThreeXValue(instance, propName, value);
      } else if (typeof instance[propName] !== "undefined" && typeof DEFAULT_PROPS[propName] !== "undefined") {
        if (__DEV__) {
          console.warn(`setting default value: ${propName} was ${instance[propName]} is ${value} for`, instance);
        }
        setThreeXValue(instance, propName, DEFAULT_PROPS[propName]);
      } else {
        if (__DEV__) {
          console.warn(`ignoring prop: ${propName} was ${instance[propName]} is ${value} for`, instance);
        }
      }
    });
}

function isPointType(value) {
  return value instanceof PIXI.Point || value instanceof PIXI.ObservablePoint;
}

function setThreeXValue(instance, propName, value) {
  if (isPointType(instance[propName]) && isPointType(value)) {
    instance[propName].copy(value);
  } else if (isPointType(instance[propName])) {
    const coordinateData = parsePoint(value);
    instance[propName].set(coordinateData.shift(), coordinateData.shift());
  } else {
    instance[propName] = value;
  }
}

function applyProps(instance, oldProps, newProps) {
  if (typeof instance._customApplyProps === "function") {
    instance._customApplyProps(instance, oldProps, newProps);
  } else {
    defaultApplyProps(instance, oldProps, newProps);
  }
}

function parsePoint(value) {
  let arr = [];
  if (typeof value === "undefined") {
    return arr;
  } else if (typeof value === "string") {
    arr = value.split(",");
  } else if (typeof value === "number") {
    arr = [value];
  } else if (Array.isArray(value)) {
    // shallow copy the array
    arr = value.slice();
  } else if (typeof value.x !== "undefined" && typeof value.y !== "undefined") {
    arr = [value.x, value.y];
  }

  return arr.map(Number);
}

function getMousePositionOnCanvas(event, canvas) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}


export {emptyFnc, diffProps, loggerFnc, filterByKey, including, applyProps, getMousePositionOnCanvas}
