import {combineReducers} from "redux";
import {CloneDeep, ConvertToArray} from "../utils/objUtils";
import * as LS from "../services/localStorageService";
import {ModelActions} from "../actions/model";
import * as LogicUtils from "../utils/logicUtils";

// Note: Always store simplified models
const savedModelState = ConvertToArray(LS.GetItem(LS.Fields.savedModel));

const savedModel = (state=savedModelState, action) => {
  switch (action.type) {
    case ModelActions.SAVE_MODEL.init.key:
      let savedModel = CloneDeep(LogicUtils.GetSimplifiedModel(action.model));

      let newState;

      if (action.modelIndex >= 0) {
        newState = [
          ...state.slice(0, action.modelIndex),
          savedModel,
          ...state.slice(action.modelIndex + 1)
        ];
      } else {
        newState = [...state, savedModel];
      }
      LS.SetItem(LS.Fields.savedModel, newState);
      return newState;

    case ModelActions.DELETE_MODEL.init.key:
      let newState2 = [
        ...state.slice(0, action.modelIndex),
        ...state.slice(action.modelIndex + 1)
      ];

      LS.SetItem(LS.Fields.savedModel, newState2);
      return newState2;

    default:
      return state;
  }
};

const validatedModel = (state=null, action) => {
  switch (action.type) {
    case ModelActions.VALIDATE_MODEL.success.key:
      return {
        model: {
          ...action.model,
          spaceSize: {...action.model.modelSize}
        },
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