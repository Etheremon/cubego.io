import {sendGetRequest, sendPostRequest} from "./utils";
import {SERVER_URL} from "../../config";

const URL_SUBSCRIBE_EMAIL_USER = SERVER_URL + '/api/subscriber/subscribe';

const LOCALIZE_SHEET_JSON = 'https://spreadsheets.google.com/feeds/list/16h5Oja2Xw3wgw27VnAgN-W2bel5ms5a5z1U_jTqrCeY/1/public/values?alt=json-in-script';
const FEEDS_SHEET_JSON = 'https://spreadsheets.google.com/feeds/list/1c8VWWAEr7RRHLcVgOslVu5fNSUzpDRhIBADCAPDcyVk/1/public/values?alt=json-in-script';
/**
 * Localization
 */
const GetLocalization = () => {
  return new Promise(function (resolve, reject) {
    sendGetRequest({url: LOCALIZE_SHEET_JSON, resolve, reject});
  });
};

const GetNotifications = () => {
  return new Promise(function (resolve, reject) {
    sendGetRequest({url: FEEDS_SHEET_JSON, resolve, reject});
  });
};

const SubscribeEmail = (email) => {
  return new Promise(function(resolve, reject) {
    sendPostRequest({
      url: URL_SUBSCRIBE_EMAIL_USER,
      data: {
        email,
      },
      resolve, reject
    });
  });
};

export const GeneralApi = {
  GetLocalization,
  GetNotifications: GetNotifications,
  SubscribeEmail: SubscribeEmail,
};