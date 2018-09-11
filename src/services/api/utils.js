export const toPromiseFunction = (fn) => {
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
      case window.RESULT_CODE.SUCCESS:
        resolve({response: data});
        break;

      default:
        resolve({error: data});
    }
  }
};

export const sendGetRequest = ({url, resolve, reject}) => {
  return $.get(url)
    .done(function(data) {
      resolve({response: data});
    })
    .fail(function(err) {
      reject({error: err});
    })
};

export const sendPostRequest = ({url, data, resolve, reject}) => {
  return $.ajax({
      url: url,
      type: 'post',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data)
    })
    .done(function(data) {
      resolve({response: data});
    })
    .fail(function(err) {
      reject({error: err});
    });
  // return $.post(url, JSON.stringify(data), () => {}, "json")
  //   .done(function(data) {
  //     console.log("hahahahahaa", data);
  //     resolve({response: data});
  //   })
  //   .fail(function(err) {
  //     reject({error: err});
  //   })
};