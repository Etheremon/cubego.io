import {sendGetRequest} from "./utils";
import {SERVER_URL} from "../../config";

const URL_GET_USER_INFO = SERVER_URL + '/api/user/get_info';

const GetUserInfo = (userId) => {
  return new Promise(function(resolve, reject) {
    sendGetRequest({
      url: URL_GET_USER_INFO + '?trainer_address=' + userId,
      resolve, reject
    });
  });
};


export const UserApi = {
  GetUserInfo,
};