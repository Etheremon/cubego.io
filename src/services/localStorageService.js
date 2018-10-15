const storageKey = 'voxel';

export const Fields = {
  language: 'language',
  account: 'account',
  metamaskPopup: 'metamask-popup',
  savedModel: 'saved-model',
};

export const SetItem = (key, value)  => {
  if (typeof(Storage) === "undefined") {
    console.log(`Local Storage is not supported: key=${key}, value=${value}`);
  } else {
    localStorage.setItem(`${storageKey}_${key}`, JSON.stringify(value));
  }
};

export const GetItem = (key)  => {
  if (typeof(Storage) === "undefined") {
    console.log(`Local Storage is not supported: key=${key}`);
  } else {
    let res = localStorage.getItem(`${storageKey}_${key}`);
    try {
      return JSON.parse(res);
    }
    catch(err) {
      return res;
    }
  }
};

export const DeleteItem = (key)  => {
  if (typeof(Storage) === "undefined") {
    console.log(`Local Storage is not supported: key=${key}`);
  } else {
    return localStorage.removeItem(`${storageKey}_${key}`);
  }
};