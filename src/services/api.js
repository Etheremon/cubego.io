const GOOGLE_SHEET_JSON = 'https://spreadsheets.google.com/feeds/list/16h5Oja2Xw3wgw27VnAgN-W2bel5ms5a5z1U_jTqrCeY/1/public/values?alt=json-in-script';


/**
 * Localization
 */
export const getLocalization = () => {
  return new Promise(function(resolve, reject) {
    sendGetRequest({url: GOOGLE_SHEET_JSON, resolve, reject});
  });
};






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
};