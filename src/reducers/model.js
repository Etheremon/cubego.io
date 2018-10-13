import * as ActionTypes from '../actions/action_types';
import {combineReducers} from "redux";
import {CloneDeep} from "../utils/objUtils";
import * as LS from "../services/localStorageService";

const savedModel = (state=LS.GetItem(LS.Fields.savedModel), action) => {
  switch (action.type) {
    case ActionTypes.SAVE_MODEL:
      let savedModel = CloneDeep(action.model);
      LS.SetItem(LS.Fields.savedModel, savedModel);
      return savedModel;
    default:
      return state;
  }
};

export const model = combineReducers({
  savedModel: savedModel,
});