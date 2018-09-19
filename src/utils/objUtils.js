
export const IsIterable = (obj) => (obj && (typeof obj[Symbol.iterator] === 'function'));

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