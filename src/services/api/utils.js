/**
 * Convert to promise function
 * @param fn
 * @returns {Function}
 */
export const ToPromiseFunction = (fn) => function (...args) {
  return new Promise((resolve, reject) => {
    fn(...args, getCallbackFunc(resolve, reject));
  });
};

/**
 * Callback Function => Call Promise
 * @param resolve
 * @param reject
 * @returns {Function}
 */
export const getCallbackFunc = (resolve, reject) => function (code, data) {
  switch (code) {
    case RESULT_CODE.SUCCESS:
      resolve({ response: data, response_code: code });
      break;

    default:
      resolve({ error: data, response_code: code });
  }
};

export const sendGetRequest = ({ url, resolve, reject }) => $
  .ajax({
    url,
    type: 'get',
    contentType: 'application/json',
  })
  .done((data) => {
    if (data.result !== undefined) getCallbackFunc(resolve, reject)(data.result, data.data);
    else resolve({ response: data });
  })
  .fail((err) => {
    reject({ error: err });
  });

export const sendPostRequest = ({
  url, data, resolve, reject,
}) => $
  .ajax({
    url,
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(data),
    timeout: 0,
  })
  .done((data) => {
    if (data.result !== undefined) getCallbackFunc(resolve, reject)(data.result, data.data);
    else resolve({ response: data });
  })
  .fail((err) => {
    reject({ error: err });
  });
