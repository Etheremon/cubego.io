import {EDITOR_COLORS} from "../utils/constants";
import * as Utils from "../utils/utils";
import {CloneDeep} from "../utils/objUtils";

let emptyModel = {};

export class ToolManager {
  constructor(props) {
    this.tools = {};
    this.drawMode = null;
    this.history = {
      idx: props.models.length - 1,
      models: props.models,
    };

    Utils.ObjGetValues(props.tools).forEach((tool, idx) => {
      this.tools[tool.key] = tool;
      if (tool.type === ToolTypes.mode && tool.value === true) {
        this.drawMode = tool;
      }
    });

    this.onToolClicked = this.onToolClicked.bind(this);
    this.onCellClicked = this.onCellClicked.bind(this);
    this.addModel = this.addModel.bind(this);
    this.getToolValue = this.getToolValue.bind(this);
  }

  addModel({model}) {
    this.history.idx += 1;
    this.history.models[this.history.idx] = CloneDeep(model);
  }

  onToolClicked({key, value}) {
    if (!this.tools[key]) {
      console.warn("Unknown tool!");
    } else if (this.tools[key].type === ToolTypes.mode) {
      if (value === true) this.drawMode = this.tools[key];
    } else if (this.tools[key].type === ToolTypes.effect) {
      // TODO: check if the value is valid
      this.tools[key].value = value;
    } else if (this.tools[key].type === ToolTypes.action) {
      this.tools[key].onToolClicked({
        model: this.history.models[this.history.idx],
        effects: this.tools.filter(tool => tool.types === ToolTypes.effect),
        history: this.history,
      });
    }
  }

  onCellClicked({cell, cells=[]}) {
    if (!this.drawMode) {
      console.warn("no draw mode!");
    } else {
      let newModel = this.drawMode.onCellClicked({
        cell, cells,
        effects: this.tools.filter(tool => tool.types === ToolTypes.effect),
        models: this.history.models[this.history.idx],
      });

      this.history.idx += 1;
      this.history.models[this.history.idx] = newModel;
    }
  }

  get model() {
    return this.history.models[this.history.idx];
  }

  getToolValue(toolKey) {
    return this.tools[toolKey].value;
  }
}

export const ToolTypes = {
  mode: 'mode',       // draw mode
  effect: 'effect',   // effects
  action: 'action',   // single-used actions
};

export const Tools = {};

Tools.color = ({key='color', value=EDITOR_COLORS[0]}) => ({
  key,
  value,
  type: ToolTypes.effect,
});

Tools.draw = ({key='draw', value=true}) => ({
  key,
  value,
  type: ToolTypes.mode,
  onCellClicked: ({model, cell, effects}) => {
    return CloneDeep(model);
  },
});

Tools.erase = ({key='erase', value=false}) => ({
  key,
  value,
  type: ToolTypes.mode,
  onCellClicked: ({model, cell, effects}) => {
    return CloneDeep(model);
  },
});

Tools.clear = ({key='clear'}) => ({
  key,
  type: ToolTypes.action,
  onToolClicked: ({model, effects, history}) => {
    history.idx += 1;
    history.models[history.idx] = CloneDeep(emptyModel);
    history.models.length = history.idx+1;
  },
});

Tools.undo = ({key='undo'}) => ({
  key,
  type: ToolTypes.action,
  onToolClicked: ({model, effects, history}) => {
    if (history.idx > 0) history.idx -= 1;
  },
});

Tools.redo = ({key='redo'}) => ({
  key,
  type: ToolTypes.action,
  onToolClicked: ({model, effects, history}) => {
    if (history.idx < history.models.length-1) history.idx += 1;
  },
});