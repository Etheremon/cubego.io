/**
 * Convert to promise function
 * @param fn
 * @returns {Function}
 */
export const ToPromiseFunction = (fn) => {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, getCallbackFunc(resolve, reject))
    });
  }
};

/**
 * Callback Function => Call Promise
 * @param resolve
 * @param reject
 * @returns {Function}
 */
export const getCallbackFunc = (resolve, reject) => {
  return function(code, data) {
    switch (code) {
      case RESULT_CODE.SUCCESS:
        resolve({response: data, response_code: code});
        break;

      default:
        resolve({error: data, response_code: code});
    }
  }
};

export const sendGetRequest = ({url, resolve, reject}) => {
  return $
    .ajax({
      url: url,
      type: 'get',
      contentType: 'application/json',
    })
    .done(function(data) {
      if (data.result !== undefined)
        getCallbackFunc(resolve, reject)(data.result, data.data);
      else
        resolve({response: data});
    })
    .fail(function(err) {
      reject({error: err});
    })
};

export const sendPostRequest = ({url, data, resolve, reject}) => {
  return $
    .ajax({
      url: url,
      type: 'post',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data),
      timeout: 0,
    })
    .done(function(data) {
      if (data.result !== undefined)
        getCallbackFunc(resolve, reject)(data.result, data.data);
      else
        resolve({response: data});
    })
    .fail(function(err) {
      reject({error: err});
    })
};

