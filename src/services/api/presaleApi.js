import { getCallbackFunc, sendGetRequest } from './utils';
import { SERVER_URL } from '../../config';

const URL_PRESALE_PERFORMANCE = `${SERVER_URL}/api/user/get_presale_performance`;

const GetDiscountFactor = () => new Promise((resolve, reject) => {
  window.getDiscountFactor(getCallbackFunc(resolve, reject));
});

const GetPresalePerformance = (address) => new Promise((resolve, reject) => {
  sendGetRequest({
    url: `${URL_PRESALE_PERFORMANCE}?trainer_address=${address}`,
    resolve,
    reject,
  });
});

export const PresaleApi = {
  GetDiscountFactor,
  GetPresalePerformance,
};
