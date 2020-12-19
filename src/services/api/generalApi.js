import { sendGetRequest, sendPostRequest } from './utils';
import { SERVER_URL } from '../../config';

const URL_SUBSCRIBE_EMAIL_USER = `${SERVER_URL}/api/subscriber/subscribe`;

// eslint-disable-next-line max-len
const LOCALIZE_SHEET_JSON = 'https://spreadsheets.google.com/feeds/list/1znZ83lek0r2YCmzvt2k7-o5ZUy4SNaG2HUc96YozR14/1/public/values?alt=json-in-script';
/**
 * Localization
 */
const GetLocalization = () => new Promise((resolve, reject) => {
  sendGetRequest({ url: LOCALIZE_SHEET_JSON, resolve, reject });
});

const SubscribeEmail = (email) => new Promise((resolve, reject) => {
  sendPostRequest({
    url: URL_SUBSCRIBE_EMAIL_USER,
    data: {
      email,
    },
    resolve,
    reject,
  });
});

export const GeneralApi = {
  GetLocalization,
  SubscribeEmail,
};
