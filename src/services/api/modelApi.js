import {sendPostRequest} from "./utils";
import {SERVER_URL} from "../../config";

const URL_VALIDATE_MODEL = SERVER_URL + '/api/cubego/validate';
const URL_SUBMIT_MODEL = SERVER_URL + '/api/cubego/register';

const ValidateModel = (userId, structure) => {
  return new Promise(function(resolve, reject) {
    sendPostRequest({
      url: URL_VALIDATE_MODEL,
      data: {trainer_address: userId, structure: structure},
      resolve, reject
    });
  });
};

const SubmitModel = (userId, structure, name, energy, image) => {
  return new Promise(function(resolve, reject) {
    sendPostRequest({
      url: URL_SUBMIT_MODEL,
      data: {
        trainer_address: userId,
        structure: structure,
        name: name,
        _limit: energy,
        image: image,
      },
      resolve, reject
    })
  });
};

export const ModelApi = {
  ValidateModel,
  SubmitModel,
};