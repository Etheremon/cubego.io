import {EDITOR_COLORS} from "../constants/general";
import * as Utils from "../utils/utils";
import * as ObjUtils from "../utils/objUtils";
import {CloneDeep, GetValues} from "../utils/objUtils";
import {GetCellKey} from "../utils/modelUtils";
import {CUBE_MATERIALS, CUBE_TIER} from "../constants/cubego";
import {GON_TIER} from "../constants/cubegon";

export class ToolManager {
  constructor(props) {
    this._tools = {};
    this._model = undefined;
    this._layer = undefined;
    this._drawMode = null;
    this._stats = {
      gonTier: {
        stats: [0, 0]
      },
    };
    this.history = {
      idx: props.models.length - 1,
      models: props.models,
    };
    this._userCubes = {};

    GetValues(props.tools).forEach((tool, idx) => {
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
    this.convertToSpaceSize = this.convertToSpaceSize.bind(this);
    this.updateUserCubes = this.updateUserCubes.bind(this);

    this.updateCurrent();
  }

  addModel({model}) {
    this.history.idx += 1;
    this.history.models[this.history.idx] = CloneDeep(model);
    this.updateCurrent();
  }

  updateUserCubes(cubes) {
    this._userCubes = cubes;
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

  convertToSpaceSize(modelSize) {
    let x = modelSize[0], y = modelSize[1];
    if (y-x+1 < 12) {
      let val = 12 - (y-x+1);
      return [x-Math.floor(val/2), y+Math.ceil(val/2)]
    }
    if (y-x+1 < 40) x -= 1;
    if (y-x+1 < 40) y += 1;
    return [x, y];
  }

  updateCurrent() {
    this._model = this.history.models[this.history.idx];
    if (!this._model) return null;

    let x = this._tools['view-2d'].value.x;
    let y = this._tools['view-2d'].value.y;
    let z = this._tools['view-2d'].value.z;

    // Calculate modelSize;
    let modelSize = {x: [1000, -1000], y: [1000, -1000], z: [1000, -1000]};
    let spaceSize = {};

    ObjUtils.ForEach(this._model.voxels, (cellId, cell) => {
      ['x', 'y', 'z'].forEach(k => {
        modelSize[k][0] = Math.min(modelSize[k][0], cell[k]);
        modelSize[k][1] = Math.max(modelSize[k][1], cell[k]);
      });
    });
    ['x', 'y', 'z'].forEach(k => {
      if (modelSize[k][0] > modelSize[k][1]) {
        modelSize[k][0] = 0;
        modelSize[k][1] = 0;
      }
      spaceSize[k] = this.convertToSpaceSize(modelSize[k]);
    });

    let idx = Utils.BoundVal(this._tools['layer-index'].value, spaceSize[z[1]][0], spaceSize[z[1]][1]);
    this._tools['layer-index'].value = idx;
    let voxels = Utils.ObjFilter(this._model.voxels, cell => cell[z[1]] === idx);

    this._model.size = {
      x: modelSize.x[1]-modelSize.x[0]+1,
      y: modelSize.y[1]-modelSize.y[0]+1,
      z: modelSize.z[1]-modelSize.z[0]+1,
    };
    this._model.modelSize = modelSize;
    this._model.spaceSize = spaceSize;
    this._layer = {
      voxels,
      idx,
      spaceSize,
      fromZ: z[0] === '+' ? spaceSize[z[1]][0] : spaceSize[z[1]][1],
      toZ: z[0] === '+' ? spaceSize[z[1]][1] : spaceSize[z[1]][0],
      x: x[1], y: y[1], z: z[1],
      cal2dPos: (i, j) => {
        i = (x[0] === '+') ? i-spaceSize[x[1]][0] : spaceSize[x[1]][1]-i;
        j = (y[0] === '+') ? j-spaceSize[y[1]][0] : spaceSize[y[1]][1]-j;
        return {x: i, y: j};
      },
      calOriginPos: (i, j) => {
        i = (x[0] === '+') ? spaceSize[x[1]][0]+i : spaceSize[x[1]][1]-i;
        j = (y[0] === '+') ? spaceSize[y[1]][0]+j : spaceSize[y[1]][1]-j;
        return {x: i, y: j};
      }
    };

    // Number of cubes
    this._stats.total = ObjUtils.GetValues(this._model.voxels).length;

    // Calculate #materials & points
    this._stats.materials = {};
    this._stats.points = 0;

    ObjUtils.ForEach(this._model.voxels, (cellId, cell) => {
      this._stats.materials[cell.color.material_id] = (this._stats.materials[cell.color.material_id] || 0) + 1;
      this._stats.points += CUBE_MATERIALS[cell.color.material_id].point;
    });

    // Calculate power from points
    this._stats.power = [this._stats.total - 10, this._stats.total + 10];

    // Calculate cost & tier
    this._stats.cubeTiers = {};
    this._stats.total_cost = 0;
    this._stats.invalid_materials = [];

    ObjUtils.ForEach(this._stats.materials, (key, value) => {
      this._stats.cubeTiers[CUBE_MATERIALS[key].tier] = (this._stats.cubeTiers[CUBE_MATERIALS[key].tier] || 0) + value;
      if (CUBE_MATERIALS[key].is_for_sale && this._stats.total_cost >= 0)
        this._stats.total_cost += CUBE_MATERIALS[key].price * Math.max(0, value - this._userCubes[key]);
      else if (!CUBE_MATERIALS[key].is_for_sale && this._userCubes[key] < value) {
        this._stats.invalid_materials.push(CUBE_MATERIALS[key].name);
        this._stats.total_cost = -1;
      }
    });
    this._stats.total_cost = Utils.RoundDownToDecimal(this._stats.total_cost, 4);
    this._stats.storage = this._userCubes;

    // Calculate gon tier
    this._stats.gonTier = {id: -1, showPoints: 0, stats: [0, 0]};
    if (this._stats.points >= GON_TIER.god.points[0] && this._stats.cubeTiers[CUBE_TIER.legend]) {
      this._stats.gonTier = {...GON_TIER.god, showPoints: Math.min(this._stats.points, GON_TIER.god.points[1])};
    } else if (this._stats.points >= GON_TIER.champion.points[0] && this._stats.cubeTiers[CUBE_TIER.epic]) {
      this._stats.gonTier = {...GON_TIER.champion, showPoints: Math.min(this._stats.points, GON_TIER.champion.points[1])};
    } else if (this._stats.points >= GON_TIER.elite.points[0]) {
      this._stats.gonTier = {...GON_TIER.elite, showPoints: Math.min(this._stats.points, GON_TIER.elite.points[1])};
    } else if (this._stats.points >= GON_TIER.challenger.points[0]) {
      this._stats.gonTier = {...GON_TIER.challenger, showPoints: Math.min(this._stats.points, GON_TIER.challenger.points[1])};
    }

    if (this._stats.points >= GON_TIER.champion.points[0] && !this._stats.cubeTiers[CUBE_TIER.epic]) {
      this._stats.gonTier.note = ('tier.need_epic');
    } else if (this._stats.points >= GON_TIER.god.points[0] && !this._stats.cubeTiers[CUBE_TIER.legend]) {
      this._stats.gonTier.note = ('tier.need_legend');
    }
  }

  get stats() {
    return this._stats;
  }

  get userCubes() {
    return this._userCubes || {};
  }

  get model() {
    return this._model;
  }

  get layer() {
    return this._layer || {};
  }

  get tools() {
    return this._tools;
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

Tools.color = ({key='color', value, ...extra}) => ({
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
    toolManager._tools['layer-index'].value = cells[0][z[1]];
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
    GetValues(copiedLayer.voxels).forEach(voxel => {
      voxel[copiedLayer.z] = currentLayer.idx;
      newModel.voxels[GetCellKey(voxel.x, voxel.y, voxel.z)] = voxel;
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
