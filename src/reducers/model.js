import {combineReducers} from "redux";
import {CloneDeep, ConvertToArray} from "../utils/objUtils";
import * as LS from "../services/localStorageService";
import {ModelActions} from "../actions/model";
import * as LogicUtils from "../utils/logicUtils";

const savedModel = (state=[], action) => {
  const savedModelState = (ConvertToArray(LS.GetItem(LS.Fields.savedModel))).map((item) => {
    return item.model ? {model: LogicUtils.GetFullModel(item.model), image: item.image} : {model: LogicUtils.GetFullModel(item), image: null}
  })
  switch (action.type) {
    case ModelActions.SAVE_MODEL.init.key:
      let savedModel = CloneDeep(action.model);
      let arraySimplifiedModel = savedModelState;
      let newArraySavedModel
      if (action.modelIndex >= 0) {
        newArraySavedModel = [...arraySimplifiedModel.slice(0, action.modelIndex), 
                                { model: LogicUtils.GetSimplifiedModel(savedModel), image: action.image },
                              ...arraySimplifiedModel.slice(action.modelIndex + 1)];
        LS.SetItem(LS.Fields.savedModel, newArraySavedModel);
        return [...state.slice(0, action.modelIndex), { model: savedModel, image: action.image },
                ...state.slice(action.modelIndex + 1)];
      } else {
        newArraySavedModel = [...arraySimplifiedModel, {model: LogicUtils.GetSimplifiedModel(savedModel), image: action.image}];
        LS.SetItem(LS.Fields.savedModel, newArraySavedModel);
        return [...state, { model: savedModel, image: action.image} ];
      }
      
    case ModelActions.DELETE_MODEL.init.key:
      let arrSimplifiedModel = savedModelState;
      let newArrSavedModel = [...arrSimplifiedModel.slice(0, action.modelIndex), 
                                ...arrSimplifiedModel.slice(action.modelIndex + 1)];
      LS.SetItem(LS.Fields.savedModel, newArrSavedModel);
      return [...state.slice(0, action.modelIndex),
              ...state.slice(action.modelIndex + 1)];

    default:
      return savedModelState;
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