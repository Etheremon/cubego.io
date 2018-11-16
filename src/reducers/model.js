import {combineReducers} from "redux";
import {CloneDeep, ConvertToArray} from "../utils/objUtils";
import * as LS from "../services/localStorageService";
import {ModelActions} from "../actions/model";
import * as LogicUtils from "../utils/logicUtils";

const savedModelState = (ConvertToArray(LS.GetItem(LS.Fields.savedModel))).map((item) => {
  return LogicUtils.GetFullModel(item)
})

const savedModel = (state=savedModelState, action) => {
  switch (action.type) {
    case ModelActions.SAVE_MODEL.init.key:
      let savedModel = CloneDeep(action.model);
      let arraySimplifiedModel = ConvertToArray(LS.GetItem(LS.Fields.savedModel));
      let newArraySavedModel
      if (action.modelIndex >= 0) {
        newArraySavedModel = [...arraySimplifiedModel.slice(0, action.modelIndex),
          LogicUtils.GetSimplifiedModel(savedModel),
          ...arraySimplifiedModel.slice(action.modelIndex + 1)];
        LS.SetItem(LS.Fields.savedModel, newArraySavedModel);
        return [...state.slice(0, action.modelIndex), savedModel,
          ...state.slice(action.modelIndex + 1)];
      } else {
        newArraySavedModel = [...arraySimplifiedModel, LogicUtils.GetSimplifiedModel(savedModel)];
        LS.SetItem(LS.Fields.savedModel, newArraySavedModel);
        return [...state, savedModel];
      }

    case ModelActions.DELETE_MODEL.init.key:
      let arrSimplifiedModel = ConvertToArray(LS.GetItem(LS.Fields.savedModel));
      let newArrSavedModel = [...arrSimplifiedModel.slice(0, action.modelIndex),
        ...arrSimplifiedModel.slice(action.modelIndex + 1)];
      LS.SetItem(LS.Fields.savedModel, newArrSavedModel);
      return [...state.slice(0, action.modelIndex),
        ...state.slice(action.modelIndex + 1)];

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
        stats: action.stats,
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