import {combineReducers} from "redux";
import {CloneDeep} from "../utils/objUtils";
import * as LS from "../services/localStorageService";
import {ModelActions} from "../actions/model";

const savedModel = (state=LS.GetItem(LS.Fields.savedModel), action) => {
  switch (action.type) {
    case ModelActions.SAVE_MODEL.init.key:
      let savedModel = CloneDeep(action.model);
      LS.SetItem(LS.Fields.savedModel, savedModel);
      return savedModel;

    default:
      return state;
  }
};


const validatedModel = (state=null, action) => {
  switch (action.type) {
    case ModelActions.VALIDATE_MODEL.success.key:
      return {
        model: action.model,
        structure: action.structure,
        info: action.response,
      };

    default:
      return state;
  }
};


export const model = combineReducers({
  savedModel: savedModel,
  validatedModel: validatedModel,
});