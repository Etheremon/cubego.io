import {getCallbackFunc, sendGetRequest, sendPostRequest} from "./utils";
import {SERVER_URL} from "../../config";

const URL_GET_CUBEGON_INFO = SERVER_URL + '/api/cubego/get_data';

const GetCubegonInfo = (id, tokenId) => {
  return new Promise(function(resolve, reject) {
    sendGetRequest({
      url: URL_GET_CUBEGON_INFO + (id ? `?id=${id}` : `?token_id=${tokenId}`),
      resolve, reject
    });
  });
};

export const CubegonApi = {
  GetCubegonInfo,
};