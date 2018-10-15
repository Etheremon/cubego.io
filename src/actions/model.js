import {action} from "./action_utils";
import * as types from "./action_types";

export const saveModel = (model) => action(types.SAVE_MODEL, {model});
export const clearModel = (model) => action(types.CLEAR_MODEL, {model});