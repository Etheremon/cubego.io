import {getCallbackFunc} from "./utils";


const GetDiscountFactor = () => {
  return new Promise(function (resolve, reject) {
    window.getDiscountFactor(getCallbackFunc(resolve, reject));
  });
};

export const PresaleApi = {
  GetDiscountFactor,
};