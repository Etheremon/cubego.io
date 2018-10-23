import {call, put, select, takeLatest, all} from 'redux-saga/effects';

import {GetLoggedInUserId} from "../reducers/selectors";
import * as ModelUtils from "../utils/logicUtils";

import {ModelActions} from "../actions/model";
import {ModelApi} from "../services/api/modelApi";


function* validateModel({userId, model, stats, callbackFunc}) {
  if (!userId) userId = yield select(GetLoggedInUserId);
  userId = userId || '0xf65e814c5150738c9b0a10df5328322a2b7af95a';
  let structure = ModelUtils.GetStructure(model);

  yield put(ModelActions.VALIDATE_MODEL.request.func({userId, model, stats, structure}));

  const {response, error, response_code} = yield call(ModelApi.ValidateModel, userId, structure);
  if (!error) {
    yield put(ModelActions.VALIDATE_MODEL.success.func({userId, model, stats, structure, response}));
    callbackFunc && callbackFunc(response_code, response);
  } else {
    yield put(ModelActions.VALIDATE_MODEL.fail.func({userId, model, stats, structure, error}));
    callbackFunc && callbackFunc(response_code, error);
  }
}


function* submitModel({userId, model, structure, energy, name, image, callbackFunc}) {
  if (!userId) userId = yield select(GetLoggedInUserId);
  userId = userId || '0xf65e814c5150738c9b0a10df5328322a2b7af95a';

  if (!structure) structure = ModelUtils.GetStructure(model);
  if (image) image = image.split(',')[1];

  yield put(ModelActions.SUBMIT_MODEL.request.func({userId, structure, name, energy, image}));

  const {response, error, response_code} = yield call(ModelApi.SubmitModel, userId, structure, name, energy, image);

  if (!error) {
    yield put(ModelActions.SUBMIT_MODEL.success.func({userId, structure, name, energy, image, response}));
    callbackFunc && callbackFunc(response_code, response);
  } else {
    yield put(ModelActions.SUBMIT_MODEL.fail.func({userId, structure, name, energy, image, error}));
    callbackFunc && callbackFunc(response_code, error);
  }
}


export function* watchAll() {
  yield all([
    takeLatest(ModelActions.VALIDATE_MODEL.init.key, validateModel),
    takeLatest(ModelActions.SUBMIT_MODEL.init.key, submitModel),
  ]);
}