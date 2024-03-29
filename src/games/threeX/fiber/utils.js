const CHILDREN = 'children';

const RESERVED_PROPS = {
  [CHILDREN]: true,
};

const __DEV__ = false;

const DEFAULT_PROPS = {};

const emptyFnc = (name) => () => {
  // console.log(name);
};

const compareNullUndefined = (nextProps, lastProps) => (nextProps === null || nextProps === undefined) && (lastProps === null || lastProps === undefined);

const compareVector = (vector1, vector2) => {
  if (typeof vector1 !== 'object' || typeof vector2 !== 'object') {
    return false;
  }
  if (vector1.x && vector2.x && vector1.y && vector2.y && vector1.z && vector2.z) {
    return vector1.x === vector2.x && vector1.y === vector2.y && vector1.z === vector2.z;
  }
  return false;
};

const loggerFnc = (name) => () => {
  // console.log(name);
};

const compareProp = (nextProp, lastProp) => nextProp === lastProp || compareNullUndefined(nextProp, lastProp) || compareVector(nextProp, lastProp);

const diffProps = (element, type, lastRawProps, nextRawProps, rootContainerElement) => {
  let updatePayload = null;

  const lastProps = lastRawProps;
  const nextProps = nextRawProps;
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
    const lastProp = lastProps[propKey];
    if (!nextProps.hasOwnProperty(propKey) || compareProp(nextProp, lastProp)) {
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
    .forEach((key) => {
      exportObject[key] = inputObject[key];
    });

  return exportObject;
}

const including = (props) => (key) => props.indexOf(key) !== -1;

const not = (fn) => (...args) => !fn(...args);

export const includingReservedProps = including(Object.keys(RESERVED_PROPS));

function defaultApplyProps(instance, oldProps, newProps) {
  Object.keys(newProps)
    .filter(not(includingReservedProps))
    .forEach((propName) => {
      const value = newProps[propName];
      if (typeof value !== 'undefined') {
        setThreeXValue(instance, propName, value);
      } else if (typeof instance[propName] !== 'undefined' && typeof DEFAULT_PROPS[propName] !== 'undefined') {
        if (__DEV__) {
          console.warn(`setting default value: ${propName} was ${instance[propName]} is ${value} for`, instance);
        }
        setThreeXValue(instance, propName, DEFAULT_PROPS[propName]);
      } else if (__DEV__) {
        console.warn(`ignoring prop: ${propName} was ${instance[propName]} is ${value} for`, instance);
      }
    });
}

function setThreeXValue(instance, propName, value) {
  instance[propName] = value;
}

function applyProps(instance, oldProps, newProps) {
  if (typeof instance._customApplyProps === 'function') {
    instance._customApplyProps(instance, oldProps, newProps);
  } else {
    defaultApplyProps(instance, oldProps, newProps);
  }
}

function parsePoint(value) {
  let arr = [];
  if (typeof value === 'undefined') {
    return arr;
  } if (typeof value === 'string') {
    arr = value.split(',');
  } else if (typeof value === 'number') {
    arr = [value];
  } else if (Array.isArray(value)) {
    // shallow copy the array
    arr = value.slice();
  } else if (typeof value.x !== 'undefined' && typeof value.y !== 'undefined') {
    arr = [value.x, value.y];
  }

  return arr.map(Number);
}

function getMousePositionOnCanvas(event, canvas) {
  const canvasStyle = getComputedStyle(canvas);
  const width = parseInt(canvasStyle.getPropertyValue('width'), 10);
  const height = parseInt(canvasStyle.getPropertyValue('height'), 10);
  const scaleX = canvas.width / width;
  const scaleY = canvas.height / height;
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
  };
}

export {
  emptyFnc, diffProps, loggerFnc, filterByKey, including, applyProps, getMousePositionOnCanvas,
};
