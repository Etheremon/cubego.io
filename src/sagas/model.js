import {call, fork, put, select, takeLatest, all} from 'redux-saga/effects';

import {GetLoggedInUserId} from "../reducers/selectors";
import * as ModelUtils from "../utils/logicUtils";

import {URLS} from "../constants/general";
import {ModelActions} from "../actions/model";
import {ModelApi} from "../services/api/modelApi";


function* validateModel({userId, model, history}) {
  if (!userId) userId = yield select(GetLoggedInUserId);
  userId = userId || '0xf65e814c5150738c9b0a10df5328322a2b7af95a';
  let structure = ModelUtils.GetStructure(model);

  yield put(ModelActions.VALIDATE_MODEL.request.func({userId, model, structure}));

  const {response, error} = yield call(ModelApi.ValidateModel, userId, structure);
  if (!error) {
    yield put(ModelActions.VALIDATE_MODEL.success.func({userId, model, structure, response}));
    history && history.push(`/${URLS.REVIEW_GON}`);
  } else {
    yield put(ModelActions.VALIDATE_MODEL.fail.func({userId, model, structure, error}));

  }
}

function* watchValidateModel() {
  yield takeLatest(ModelActions.VALIDATE_MODEL.init.key, validateModel);
}


function* submitModel({userId, model, structure, energy, name, image, history}) {
  if (!userId) userId = yield select(GetLoggedInUserId);
  userId = userId || '0xf65e814c5150738c9b0a10df5328322a2b7af95a';

  if (!structure) structure = ModelUtils.GetStructure(model);
  if (image) image = image.split(',')[1];

  yield put(ModelActions.SUBMIT_MODEL.request.func({userId, structure, name, energy, image}));

  const {response, error} = yield call(ModelApi.SubmitModel, userId, structure, name, energy, image);
  console.log("submit model:", response, error);

  if (!error) {
    yield put(ModelActions.SUBMIT_MODEL.success.func({userId, structure, name, energy, image, response}));
    alert("submitted");
  } else {
    yield put(ModelActions.SUBMIT_MODEL.fail.func({userId, structure, name, energy, image, error}));
    alert("error. open console log to check");
  }
}

function* watchSubmitModel() {
  yield takeLatest(ModelActions.SUBMIT_MODEL.init.key, submitModel);
}

export function* watchAll() {
  yield all([
    fork(watchValidateModel),
    fork(watchSubmitModel)
  ]);
}