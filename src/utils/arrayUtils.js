export const OrderBy = (array, identity, order) => {
  const compare = (a, b, order) => {
    if (a > b) {
      return order === 'asc' ? 1 : -1;
    } if (a < b) {
      return order === 'asc' ? -1 : 1;
    }
    return 0;
  };

  return array.sort((a, b) => {
    for (let idx = 0; idx < identity.length; idx++) {
      const res = compare(a[identity[idx]], b[identity[idx]], order[idx]);
      if (res !== 0) {
        return res;
      }
    }
    return 0;
  });
};

export const Filter = (arr, func) => {
  if (!Array.isArray(arr)) return arr;
  return arr.filter(func);
};

export const FindIndexOfFirstMax = (arr) => {
  let res = 0;
  for (let i = 1; i < arr.length; i++) if (arr[res] < arr[i]) res = i;
  return res;
};

export const Sum = (arr) => (arr.reduce((a, b) => a + b, 0));

export const ConvertToArray = (v) => (Array.isArray(v) ? v : [v]);
