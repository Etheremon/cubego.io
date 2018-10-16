import {sendGetRequest} from "./utils";

const GOOGLE_SHEET_JSON = 'https://spreadsheets.google.com/feeds/list/16h5Oja2Xw3wgw27VnAgN-W2bel5ms5a5z1U_jTqrCeY/1/public/values?alt=json-in-script';

/**
 * Localization
 */
const GetLocalization = () => {
  return new Promise(function (resolve, reject) {
    sendGetRequest({url: GOOGLE_SHEET_JSON, resolve, reject});
  });
};

export const GeneralApi = {
  GetLocalization,
};