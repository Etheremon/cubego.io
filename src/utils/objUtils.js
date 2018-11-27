
export const IsIterable = (obj) => (obj && (typeof obj === 'object'));

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


export const CloneWithValueModify = (obj, func) => {
  let result = {};
  Object.keys(obj).forEach((key, idx) => {
    result[key] = func(key, obj[key], idx);
  });
  return result;
};

export const CloneWithKeyModify = (obj, func) => {
  let result = {};
  Object.keys(obj).forEach((key, idx) => {
    let r = func(key, obj[key], idx);
    result[r.key] = r.value;
  });
  return result;
};



export const GetValues = (obj) => {
  return typeof(obj) === 'object' && obj !== null ? Object.keys(obj).map(key => obj[key]) : obj;
};

export const GetLength = (obj) => {
  return Object.keys(obj).length;
};

export const ForEach = (obj, func) => {
  Object.keys(obj).forEach((key) => {
    func(key, obj[key]);
  });
};

export const FilterValue = (obj, func) => {
  return Object.keys(obj).filter((key) => {
    return func(key, obj[key]);
  });
};

export const Map = (obj, func) => {
  let result = [];
  if (!obj) return result;
  Object.keys(obj).forEach((key) => {
    result.push(func(key, obj[key]));
  });
  return result;
};

export const ConvertToArray = (obj) => {
  return Array.isArray(obj) ? obj : obj !== undefined && obj !== null ? [obj] : [];
};