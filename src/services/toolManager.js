import {EDITOR_COLORS} from "../constants/general";
import * as Utils from "../utils/utils";
import {CloneDeep} from "../utils/objUtils";
import {GetCellKey} from "../utils/modelUtils";

export class ToolManager {
  constructor(props) {
    this._tools = {};
    this._model = undefined;
    this._layer = undefined;
    this._numLayers = 0;
    this._drawMode = null;
    this.history = {
      idx: props.models.length - 1,
      models: props.models,
    };

    Utils.ObjGetValues(props.tools).forEach((tool, idx) => {
      this._tools[tool.key] = tool;
      if (tool.type === ToolTypes.mode && tool.value === true) {
        this._drawMode = tool;
      }
    });

    this.onToolClicked = this.onToolClicked.bind(this);
    this.onCellClicked = this.onCellClicked.bind(this);
    this.addModel = this.addModel.bind(this);
    this.getToolValue = this.getToolValue.bind(this);
    this.updateCurrent = this.updateCurrent.bind(this);
    this.onModeChangeTempStart = this.onModeChangeTempStart.bind(this);
    this.onModeChangeTempStop = this.onModeChangeTempStop.bind(this);
    this.changeMode = this.changeMode.bind(this);

    this.updateCurrent();
  }

  addModel({model}) {
    this.history.idx += 1;
    this.history.models[this.history.idx] = CloneDeep(model);

    this.updateCurrent();
  }

  changeMode({key}) {
    Object.keys(this._tools).forEach((key) => {
      if (this._tools[key].type === ToolTypes.mode)
        this._tools[key].value = false;
    });

    this._drawMode = this._tools[key];
    this._tools[key].value = true;
  }

  onToolClicked({key, value}) {
    if (!this._tools[key]) {
      console.warn("Unknown tool!");
      return;
    }

    // TODO: check if the value is valid
    // ...

    // Case Tool Mode
    if (this._tools[key].type === ToolTypes.mode) {
      this.changeMode({key});
    }

    // Case Tool Action
    if (this._tools[key].type === ToolTypes.action) {
      if (value !== undefined && value !== null)
        this._tools[key].value = value;
      let newModel = this._tools[key].onToolClicked({
        toolManager: this,
        key: key,
        value: value,
      });
      if (newModel) {
        this.addModel({model: newModel});
      } else {
        this.updateCurrent();
      }
    }

    // Case Effect
    if (this._tools[key].type === ToolTypes.effect) {
      this._tools[key].value = value;
    }
  }

  onModeChangeTempStart({key}) {
    if (this._drawMode.key !== key) {
      this._saved_mode = this._drawMode.key;
      this.changeMode({key});
    }
  }

  onModeChangeTempStop({key}) {
    if (this._saved_mode) {
      this.changeMode({key: this._saved_mode});
      this._saved_mode = null;
    }
  }

  onCellClicked(cells=[]) {
    if (!this._drawMode) {
      console.warn("no draw mode!");
    } else {

      let newModel = this._drawMode.onCellClicked({
        toolManager: this,
        tools: this._tools, model: this._model, cells,
      });

      if (newModel) {
        this.addModel({model: newModel});
      } else {
        this.updateCurrent();
      }
    }
  }

  updateCurrent() {
    this._model = this.history.models[this.history.idx];
    if (!this._model) return null;

    let x = this._tools['view-2d'].value.x;
    let y = this._tools['view-2d'].value.y;
    let z = this._tools['view-2d'].value.z;
    let size = this._model.size;

    this._numLayers = size[z[1]];
    let layerIdx = Utils.BoundVal(this._tools['layer-index'].value, 1, this._numLayers);
    this._tools['layer-index'].value = layerIdx;

    let zIdx = z[0] === '+' ? layerIdx - 1 : this._numLayers - layerIdx;
    let voxels = Utils.ObjFilter(this._model.voxels, cell => cell[z[1]] === zIdx);

    this._layer = {
      voxels,
      idx: zIdx,
      size: size,
      x: x[1], y: y[1], z: z[1],
      cal2dPos: (i, j) => {
        i = (x[0] === '+') ? i : size[x[1]]-1-i;
        j = (y[0] === '+') ? j : size[y[1]]-1-j;
        return {x: i, y: j};
      }
    };
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

  get tools() {
    return this._tools;
  }

  get drawMode() {
    return this._drawMode;
  }

  getToolValue(toolKey) {
    return this._tools[toolKey].value;
  }

  isToolAvailable(toolKey) {
    return this._tools[toolKey] && this._tools[toolKey].isActive && this._tools[toolKey].isActive({toolManager: this});
  }
}

export const ToolTypes = {
  mode: 'mode',       // draw mode => this does not affect/change 3D model & 2D layer.
  effect: 'effect',   // effects  => this does not affect/change 3D model & 2D layer.
  action: 'action',   // single-used actions => this will affect/change either 3D model / 2D layer
};

export const Tools = {};

Tools.color = ({key='color', value=EDITOR_COLORS[0], ...extra}) => ({
  ...extra,
  key,
  value,
  type: ToolTypes.effect,
  options: EDITOR_COLORS,
});

Tools.move = ({key='move', value=true, ...extra}) => ({
  ...extra,
  key,
  value,
  type: ToolTypes.mode,
  onCellClicked: ({toolManager, cells}) => {
    let z = toolManager._tools['view-2d'].value.z;
    toolManager._tools['layer-index'].value = z[0] === '+' ? cells[0][z[1]]+1 : toolManager._numLayers-cells[0][z[1]];
  },
});

Tools.draw = ({key='draw', value=true, ...extra}) => ({
  ...extra,
  key,
  value,
  type: ToolTypes.mode,
  onCellClicked: ({tools, model, cells}) => {
    let newModel = CloneDeep(model);
    let updateIdx = 0;

    cells.forEach((cell) => {
      if (newModel['voxels'][GetCellKey(cell.x, cell.y, cell.z)]) {
        updateIdx = newModel['voxels'][GetCellKey(cell.x, cell.y, cell.z)].updateIdx;
        updateIdx = updateIdx ? updateIdx + 1 : 0;
      }

      newModel['voxels'][GetCellKey(cell.x, cell.y, cell.z)] = {
        ...cell,
        color: CloneDeep(tools.color.value),
        updateIdx
      };
    });

    return newModel;
  },
});

Tools.paint = ({key='paint', value=true, ...extra}) => ({
  ...extra,
  key,
  value,
  type: ToolTypes.mode,
  onCellClicked: ({tools, model, cells}) => {
    let newModel = CloneDeep(model);
    let updateIdx = 0;

    cells.forEach((cell) => {
      if (newModel['voxels'][GetCellKey(cell.x, cell.y, cell.z)]) {
        updateIdx = newModel['voxels'][GetCellKey(cell.x, cell.y, cell.z)].updateIdx;
        updateIdx = updateIdx ? updateIdx + 1 : 0;
      }

      newModel['voxels'][GetCellKey(cell.x, cell.y, cell.z)] = {
        ...cell,
        color: CloneDeep(tools.color.value),
        updateIdx
      };
    });

    return newModel;
  },
});

Tools.erase = ({key='erase', value=false, ...extra}) => ({
  ...extra,
  key,
  value,
  type: ToolTypes.mode,
  onCellClicked: ({model, cells}) => {
    let newModel = CloneDeep(model);
    cells.forEach(cell => {
      delete newModel['voxels'][GetCellKey(cell.x, cell.y, cell.z)];
    });
    return newModel;
  },
});

Tools.clear = ({key='clear', ...extra}) => ({
  ...extra,
  key,
  type: ToolTypes.action,
  onToolClicked: ({toolManager}) => {
    let newModel = CloneDeep(toolManager._model);
    newModel.voxels = {};
    return newModel;
  },
  isActive: ({toolManager}) => (toolManager._model && !Utils.ObjIsEmpty(toolManager._model.voxels)),
});

Tools.clearLayer = ({key='clear-layer', ...extra}) => ({
  ...extra,
  key,
  type: ToolTypes.action,
  onToolClicked: ({toolManager}) => {
    let newModel = CloneDeep(toolManager._model);
    newModel.voxels = Utils.ObjFilter(
      newModel.voxels,
      (voxel) => voxel[toolManager._layer.z] !== toolManager._layer.idx,
    );
    return newModel;
  },
  isActive: ({toolManager}) => (toolManager._layer && !Utils.ObjIsEmpty(toolManager._layer.voxels)),
});

Tools.copyLayer = ({key='copy-layer', ...extra}) => ({
  ...extra,
  key,
  type: ToolTypes.action,
  onToolClicked: ({toolManager}) => {
    toolManager._copied_layer = CloneDeep(toolManager._layer);
  },
  isActive: ({toolManager}) => (toolManager._layer && !Utils.ObjIsEmpty(toolManager._layer.voxels)),
});

Tools.pasteLayer = ({key='paste-layer', ...extra}) => ({
  ...extra,
  key,
  type: ToolTypes.action,
  onToolClicked: ({toolManager}) => {
    let newModel = CloneDeep(toolManager._model);
    let copiedLayer = toolManager._copied_layer;
    let currentLayer = toolManager._layer;

    if (copiedLayer.z !== currentLayer.z) return;

    newModel.voxels = Utils.ObjFilter(newModel.voxels, (voxel) => {
      return voxel[currentLayer.z] !== currentLayer.idx;
    });
    Utils.ObjGetValues(copiedLayer.voxels).forEach(voxel => {
      voxel[copiedLayer.z] = currentLayer.idx;
      newModel.voxels[`${voxel.x}-${voxel.y}-${voxel.z}`] = voxel;
    });

    return newModel;
  },
  isActive: ({toolManager}) => (!!toolManager._copied_layer),
});

Tools.undo = ({key='undo', ...extra}) => ({
  ...extra,
  key,
  type: ToolTypes.action,
  onToolClicked: ({toolManager}) => {
    if (toolManager.history.idx > 0) toolManager.history.idx -= 1;
  },
  isActive: ({toolManager}) => (toolManager.history.idx > 0),
});

Tools.redo = ({key='redo', ...extra}) => ({
  ...extra,
  key,
  type: ToolTypes.action,
  onToolClicked: ({toolManager}) => {
    if (toolManager.history.idx < toolManager.history.models.length-1)
      toolManager.history.idx += 1;
  },
  isActive: ({toolManager}) => (toolManager.history.idx < toolManager.history.models.length - 1),
});

let view2dOptions = {
  front: {
    viewKey: 'front',
    label: 'front_view',
    x: '-y', y: '-z', z: '-x',
  },
  side: {
    viewKey: 'side',
    label: 'side_view',
    x: '+x', y: '-z', z: '-y',
  },
  top: {
    viewKey: 'top',
    label: 'bottom_view',
    x: '-y', y: '+x', z: '+z',
  }
};
let view2dList = ['front', 'side', 'top'];
Tools.view2D = ({key='view-2d', value=view2dOptions.front, ...extra}) => ({
  ...extra,
  key,
  value,
  type: ToolTypes.action,
  options: view2dOptions,
  onToolClicked: ({toolManager, key, value}) => {
    let currentValue = toolManager._tools[key].value.viewKey;
    let nextValue = value ? value : view2dList[(view2dList.indexOf(currentValue) + 1) % view2dList.length];

    toolManager._tools[key].value = {...view2dOptions[nextValue]};
    toolManager._copied_layer = null;
  }
});

Tools.layerIndex = ({key='layer-index', value=0, ...extra}) => ({
  ...extra,
  key,
  value,
  type: ToolTypes.action,
  onToolClicked: ({toolManager, value}) => {
  }
});
