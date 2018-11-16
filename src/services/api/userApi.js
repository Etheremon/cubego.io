import {getCallbackFunc, sendGetRequest, sendPostRequest} from "./utils";
import {SERVER_URL} from "../../config";

const URL_GET_USER_INFO = SERVER_URL + '/api/user/get_info';
const URL_UPDATE_USER_INFO = SERVER_URL + '/api/user/update_info';
const URL_GET_USER_CUBEGON = SERVER_URL + '/api/user/get_my_cubegon';

const GetUserInfo = (userId) => {
  return new Promise(function(resolve, reject) {
    sendGetRequest({
      url: URL_GET_USER_INFO + '?trainer_address=' + userId,
      resolve, reject
    });
  });
};


const UpdateUserInfo = (userId, email, username, signature, refer_code) => {
  return new Promise(function(resolve, reject) {
    sendPostRequest({
      url: URL_UPDATE_USER_INFO,
      data: {
        trainer_address: userId,
        email,
        username,
        signature,
        refer_code,
      },
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
};

window.test = GetUserCubegons;

export const UserApi = {
  GetUserInfo,
  UpdateUserInfo,
  GetUserCubegons
};