export const IsIterable = (obj) => (obj && (typeof obj === 'object'));

export const IsArray = (arr) => (Array.isArray(arr));

export const IsEqual = (a, b) => {
  if (!IsIterable(a) && !IsIterable(b)) return a === b;
  if (!IsIterable(a) || !IsIterable(b)) return false;

  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) return false;

  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i];
    if (!IsEqual(a[propName], b[propName])) return false;
  }

  return true;
};

export const CloneDeep = (a) => {
  if (!IsIterable(a)) return a;

  const res = IsArray(a) ? [] : {};
  const aProps = Object.getOwnPropertyNames(a);
  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i];
    res[propName] = CloneDeep(a[propName]);
  }

  return res;
};

export const CloneWithValueModify = (obj, func) => {
  const result = {};
  Object.keys(obj).forEach((key, idx) => {
    result[key] = func(key, obj[key], idx);
  });
  return result;
};

export const CloneWithKeyModify = (obj, func) => {
  const result = {};
  Object.keys(obj).forEach((key, idx) => {
    const r = func(key, obj[key], idx);
    result[r.key] = r.value;
  });
  return result;
};

export const GetValues = (obj) => (typeof (obj) === 'object' && obj !== null ? Object.keys(obj).map((key) => obj[key]) : obj);

export const GetLength = (obj) => Object.keys(obj).length;

export const ForEach = (obj, func) => {
  Object.keys(obj).forEach((key) => {
    func(key, obj[key]);
  });
};

export const FilterValue = (obj, func) => Object.keys(obj).filter((key) => func(key, obj[key]));

export const Map = (obj, func) => {
  const result = [];
  if (!obj) return result;
  Object.keys(obj).forEach((key) => {
    result.push(func(key, obj[key]));
  });
  return result;
};

export const ConvertToArray = (obj) => (Array.isArray(obj) ? obj : obj !== undefined && obj !== null ? [obj] : []);
