import {getCallbackFunc, sendGetRequest, sendPostRequest} from "./utils";
import {SERVER_URL} from "../../config";

const URL_GET_CUBEGON_INFO = SERVER_URL + '/api/cubego/get_data';
const URL_GET_USER_CUBEGON = SERVER_URL + '/api/user/get_my_cubegon';

const GetCubegonInfo = (id, tokenId) => {
  return new Promise(function(resolve, reject) {
    sendGetRequest({
      url: URL_GET_CUBEGON_INFO + (id ? `?id=${id}` : `?token_id=${tokenId}`),
      resolve, reject
    });
  });
};

const GetUserCubegons = (userId) => {
  return new Promise(function(resolve, reject) {
    if (!isUsingTestNetwork) {
      sendGetRequest({
        url: URL_GET_USER_CUBEGON + '?trainer_address=' + userId,
        resolve, reject
      });
    } else {
      window.getPlayerCubegoData(userId, getCallbackFunc(resolve, reject));
    }
  });
}

export const CubegonApi = {
  GetCubegonInfo,
  GetUserCubegons,
};