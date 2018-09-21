
export const IsIterable = (obj) => (obj && (typeof obj[Symbol.iterator] === 'function'));

export const IsArray = (arr) => (Array.isArray(arr));

export const IsEqual = (a, b) => {
  if (!IsIterable(a) && !IsIterable(b)) return a === b;
  if (!IsIterable(a) || !IsIterable(b)) return false;

  let aProps = Object.getOwnPropertyNames(a);
  let bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) return false;

  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];
    if (!IsEqual(a[propName], b[propName])) return false;
  }

  return true;
};

export const CloneDeep = (a) => {
  if (!IsIterable(a)) return a;

  let res = IsArray(a) ? [] : {};
  let aProps = Object.getOwnPropertyNames(a);
  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];
    res[propName] = CloneDeep(a[propName]);
  }

  return res;
};