const CHILDREN = 'children';
const emptyFnc = (name) => () => {
  console.log(name);
};

const cutHex = (h) => h.charAt(0) === "0" && h.charAt(1) === "x" ? h.substring(2, 8) : h;

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
