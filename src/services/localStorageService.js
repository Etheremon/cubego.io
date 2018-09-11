const storageKey = 'voxel';

export const Fields = {
  language: 'language',
  account: 'account',
  metamaskPopup: 'metamask-popup',
};

export const SetItem = (key, value)  => {
  if (typeof(Storage) === "undefined") {
    console.log(`Local Storage is not supported: key=${key}, value=${value}`);
  } else {
    localStorage.setItem(`${storageKey}_${key}`, value);
  }
};

export const GetItem = (key)  => {
  if (typeof(Storage) === "undefined") {
    console.log(`Local Storage is not supported: key=${key}`);
  } else {
    return localStorage.getItem(`${storageKey}_${key}`);
  }
};

export const DeleteItem = (key)  => {
  if (typeof(Storage) === "undefined") {
    console.log(`Local Storage is not supported: key=${key}`);
  } else {
    return localStorage.removeItem(`${storageKey}_${key}`);
  }
};