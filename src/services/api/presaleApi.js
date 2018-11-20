

const GetDiscountFactor = () => {
  return new Promise(function (resolve, reject) {
    getDiscountFactor((code, data) => {
      switch (code) {
        case window.RESULT_CODE.SUCCESS:
          resolve({response: data})
          break;
        case window.RESULT_CODE.ERROR_SERVER:
          reject({error: data})
          break;
        default:
          reject({error: data});
      }
    });
  });
}

export const PresaleApi = {
  GetDiscountFactor,
};