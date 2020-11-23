import { sendPostRequest } from './utils';
import { SERVER_URL } from '../../config';

const URL_VALIDATE_MODEL = `${SERVER_URL}/api/cubego/validate`;
const URL_SUBMIT_MODEL = `${SERVER_URL}/api/cubego/register`;

const ValidateModel = (userId, structure) => new Promise((resolve, reject) => {
  sendPostRequest({
    url: URL_VALIDATE_MODEL,
    data: { trainer_address: userId, structure },
    resolve,
    reject,
  });
});

const SubmitModel = (userId, structure, name, energy, image) => new Promise((resolve, reject) => {
  sendPostRequest({
    url: URL_SUBMIT_MODEL,
    data: {
      trainer_address: userId,
      structure,
      name,
      _limit: energy,
      image,
    },
    resolve,
    reject,
  });
});

export const ModelApi = {
  ValidateModel,
  SubmitModel,
};
