import {sendGetRequest} from "./utils";

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

export const GeneralApi = {
  GetLocalization,
  GetNotifications: GetNotifications,
};