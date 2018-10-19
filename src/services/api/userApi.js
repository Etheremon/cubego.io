import {sendGetRequest, sendPostRequest} from "./utils";
import {SERVER_URL} from "../../config";

const URL_GET_USER_INFO = SERVER_URL + '/api/user/get_info';
const URL_UPDATE_USER_INFO = SERVER_URL + '/api/user/update_info';

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


export const UserApi = {
  GetUserInfo,
  UpdateUserInfo,
};