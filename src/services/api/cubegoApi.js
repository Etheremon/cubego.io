import {sendGetRequest, sendPostRequest} from "./utils";
import {SERVER_URL} from "../../config";


const GetUserCubegoes = (userId) => {
  return {response: '', error: ''}
}


export const CubegoApi = {
  GetUserCubegoes,
};