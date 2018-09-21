import {EDITOR_COLORS} from "../utils/constants";
import * as Utils from "../utils/utils";
import {CloneDeep} from "../utils/objUtils";

let emptyModel = {};

export class ToolManager {
  constructor(props) {
    this.tools = {};
    this._model = undefined;
    this._layer = undefined;
    this._numLayers = 0; 
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
    this.updateCurrent = this.updateCurrent.bind(this);

    this.updateCurrent();
  }

  addModel({model}) {
    this.history.idx += 1;
    this.history.models[this.history.idx] = CloneDeep(model);

    this.updateCurrent();
  }

  onToolClicked({key, value}) {
    if (!this.tools[key]) {
      console.warn("Unknown tool!");
      return;
    }

    // TODO: check if the value is valid
    // Case All Tools (includes effects)
    this.tools[key].value = value;

    // Case Tool Mode
    if (this.tools[key].type === ToolTypes.mode) {
      // Only 1 mode at a time
      Object.keys(this.tools).forEach((key) => {
        if (this.tools[key].type === ToolTypes.mode)
          this.tools[key].value = false;
      });

      // Set mode
      this.drawMode = this.tools[key];
      this.tools[key].value = true;
    }

    // Case Tool Action
    if (this.tools[key].type === ToolTypes.action) {
      this.tools[key].onToolClicked({
        toolManager: this,
        key: key,
        value: value,
      });
      this.updateCurrent();
    }
  }

  onCellClicked({cell, cells=[]}) {
    if (!this.drawMode) {
      console.warn("no draw mode!");
    } else {

      console.log("drawing", cell, cells);

      let newModel = this.drawMode.onCellClicked({
        tools: this.tools, model: this._model, cell, cells,
      });

      this.history.idx += 1;
      this.history.models[this.history.idx] = newModel;

      this.updateCurrent();
    }
  }

  updateCurrent() {
    this._model = this.history.models[this.history.idx];
    if (!this._model) return null;

    let x = this.tools['view-2d'].x;
    let y = this.tools['view-2d'].y;
    let z = this.tools['view-2d'].z;

    this._numLayers = this._model.size[z];
    let layerIdx = Utils.BoundVal(this.tools['layer-index'].value, 1, this._numLayers);
    this.tools['layer-index'].value = layerIdx;

    this._layer = {
      size: this._model.size,
      palette: this._model.palette,
      voxels: Utils.ObjFilter(this._model.voxels, cell => cell[z] === layerIdx-1),
      idx: layerIdx-1,
      x, y, z
    };

    console.log("current model", this._model);
  }

  get model() {
    return this._model;
  }

  get layer() {
    return this._layer;
  }
  
  get numLayers() {
    return this._numLayers;
  }

  getToolValue(toolKey) {
    return this.tools[toolKey].value;
  }
}

export const ToolTypes = {
  mode: 'mode',       // draw mode => this does not affect/change 3D model & 2D layer.
  effect: 'effect',   // effects  => this does not affect/change 3D model & 2D layer.
  action: 'action',   // single-used actions => this will affect/change either 3D model / 2D layer
};

export const Tools = {};

Tools.color = ({key='color', value=EDITOR_COLORS[0]}) => ({
  key,
  value,
  type: ToolTypes.effect,
  options: EDITOR_COLORS,
});

Tools.draw = ({key='draw', value=true}) => ({
  key,
  value,
  type: ToolTypes.mode,
  onCellClicked: ({tools, model, cell, effects}) => {
    let newModel = CloneDeep(model);
    console.log(newModel, tools.color);
    model['voxels'][`${cell.x}-${cell.y}-${cell.z}`] = {
      ...cell,
      color: CloneDeep(tools.color.value),
    };
    return newModel;
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
  onToolClicked: ({toolManager}) => {
    toolManager.history.idx += 1;
    toolManager.history.models[toolManager.history.idx] = CloneDeep(emptyModel);
    toolManager.history.models.length = toolManager.history.idx+1;
  },
});

Tools.undo = ({key='undo'}) => ({
  key,
  type: ToolTypes.action,
  onToolClicked: ({toolManager}) => {
    if (toolManager.history.idx > 0) toolManager.history.idx -= 1;
  },
});

Tools.redo = ({key='redo'}) => ({
  key,
  type: ToolTypes.action,
  onToolClicked: ({toolManager}) => {
    if (toolManager.history.idx < toolManager.history.models.length-1)
      toolManager.history.idx += 1;
  },
});

Tools.view2D = ({key='view-2d', value={key: 'front', label: 'front_view'}}) => ({
  key,
  value,
  type: ToolTypes.action,
  options: [{
    key: 'front',
    label: 'front_view',
  }, {
    key: 'side',
    label: 'side_view',
  }, {
    key: 'top',
    label: 'top_view',
  }],
  x: 'x',
  y: 'y',
  z: 'z',
  onToolClicked: ({toolManager, key, value}) => {
    if (value.key === 'front') {
      toolManager.tools[key].x = 'x';
      toolManager.tools[key].y = 'y';
      toolManager.tools[key].z = 'z';
    } else if (value.key === 'side') {
      toolManager.tools[key].x = 'z';
      toolManager.tools[key].y = 'y';
      toolManager.tools[key].z = 'x';
    } else if (value.key === 'top') {
      toolManager.tools[key].x = 'x';
      toolManager.tools[key].y = 'z';
      toolManager.tools[key].z = 'y';
    }
  }
});

Tools.layerIndex = ({key='layer-index', value=0}) => ({
  key,
  value,
  type: ToolTypes.action,
  onToolClicked: ({toolManager, value}) => {
  }
});