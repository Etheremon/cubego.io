import { EDITOR_COLORS } from '../constants/general';
import * as Utils from '../utils/utils';
import * as ObjUtils from '../utils/objUtils';
import { CloneDeep, GetValues } from '../utils/objUtils';
import { GetCellKey } from '../utils/modelUtils';
import { CUBE_MATERIALS, CUBE_TIER_MAP } from '../constants/cubego';
import { GON_TIER } from '../constants/cubegon';
import * as Config from '../config';
import * as ArrayUtils from '../utils/arrayUtils';

export class ToolManager {
  constructor(props) {
    this._tools = {};
    this._model = undefined;
    this._layer = undefined;
    this._drawMode = null;
    this._stats = {
      gonTier: {
        stats: [0, 0],
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

  addModel({ model }) {
    this.history.idx += 1;
    this.history.models[this.history.idx] = CloneDeep(model);
    this.updateCurrent();
  }

  updateUserCubes(cubes) {
    this._userCubes = cubes;
    this.updateCurrent();
  }

  changeMode({ key }) {
    Object.keys(this._tools).forEach((key) => {
      if (this._tools[key].type === ToolTypes.mode) this._tools[key].value = false;
    });

    this._drawMode = this._tools[key];
    this._tools[key].value = true;
  }

  onToolClicked({ key, value }) {
    if (!this._tools[key]) {
      console.warn('Unknown tool!');
      return;
    }

    // TODO: check if the value is valid
    // ...

    // Case Tool Mode
    if (this._tools[key].type === ToolTypes.mode) {
      this.changeMode({ key });
    }

    // Case Tool Action
    if (this._tools[key].type === ToolTypes.action) {
      if (value !== undefined && value !== null) this._tools[key].value = value;
      const newModel = this._tools[key].onToolClicked({
        toolManager: this,
        key,
        value,
      });
      if (newModel) {
        this.addModel({ model: newModel });
      } else {
        this.updateCurrent();
      }
    }

    // Case Effect
    if (this._tools[key].type === ToolTypes.effect) {
      this._tools[key].value = value;
    }
  }

  onModeChangeTempStart({ key }) {
    if (this._drawMode.key !== key) {
      this._saved_mode = this._drawMode.key;
      this.changeMode({ key });
    }
  }

  onModeChangeTempStop({ key }) {
    if (this._saved_mode) {
      this.changeMode({ key: this._saved_mode });
      this._saved_mode = null;
    }
  }

  onCellClicked(cells = []) {
    if (!this._drawMode) {
      console.warn('no draw mode!');
    } else {
      const newModel = this._drawMode.onCellClicked({
        toolManager: this,
        tools: this._tools,
        model: this._model,
        cells,
      });

      if (newModel) {
        this.addModel({ model: newModel });
      } else {
        this.updateCurrent();
      }
    }
  }

  convertToSpaceSize(modelSize, oldSpaceSize, k) {
    if (!oldSpaceSize) oldSpaceSize = [0, 11];

    let x = modelSize[0]; let
      y = modelSize[1];
    // if (y-x+1 < 40) x -= 1;
    // if (y-x+1 < 40) y += 1;
    x -= 1;
    y += 1;

    return [Math.min(x, oldSpaceSize[0]), Math.max(oldSpaceSize[1], y)];
  }

  updateCurrent() {
    this._model = this.history.models[this.history.idx];
    if (!this._model) return null;

    const { x } = this._tools['view-2d'].value;
    const { y } = this._tools['view-2d'].value;
    const { z } = this._tools['view-2d'].value;

    // Calculate modelSize;
    const modelSize = { x: [1000, -1000], y: [1000, -1000], z: [1000, -1000] };
    const spaceSize = {};

    ObjUtils.ForEach(this._model.voxels, (cellId, cell) => {
      ['x', 'y', 'z'].forEach((k) => {
        modelSize[k][0] = Math.min(modelSize[k][0], cell[k]);
        modelSize[k][1] = Math.max(modelSize[k][1], cell[k]);
      });
    });
    ['x', 'y', 'z'].forEach((k) => {
      if (modelSize[k][0] > modelSize[k][1]) {
        modelSize[k][0] = 0;
        modelSize[k][1] = 0;
      }
      spaceSize[k] = this.convertToSpaceSize(modelSize[k], (this._model.spaceSize || {})[k], k);
    });

    const idx = Utils.BoundVal(this._tools['layer-index'].value, spaceSize[z[1]][0], spaceSize[z[1]][1]);
    this._tools['layer-index'].value = idx;
    const voxels = Utils.ObjFilter(this._model.voxels, (cell) => cell[z[1]] === idx);

    this._model.size = {
      x: modelSize.x[1] - modelSize.x[0] + 1,
      y: modelSize.y[1] - modelSize.y[0] + 1,
      z: modelSize.z[1] - modelSize.z[0] + 1,
    };
    this._model.modelSize = modelSize;
    this._model.spaceSize = spaceSize;
    this._layer = {
      voxels,
      idx,
      spaceSize,
      fromZ: z[0] === '+' ? spaceSize[z[1]][0] : spaceSize[z[1]][1],
      toZ: z[0] === '+' ? spaceSize[z[1]][1] : spaceSize[z[1]][0],
      x: x[1],
      y: y[1],
      z: z[1],
      cal2dPos: (i, j) => {
        i = (x[0] === '+') ? i - spaceSize[x[1]][0] : spaceSize[x[1]][1] - i;
        j = (y[0] === '+') ? j - spaceSize[y[1]][0] : spaceSize[y[1]][1] - j;
        return { x: i, y: j };
      },
      calOriginPos: (i, j) => {
        i = (x[0] === '+') ? spaceSize[x[1]][0] + i : spaceSize[x[1]][1] - i;
        j = (y[0] === '+') ? spaceSize[y[1]][0] + j : spaceSize[y[1]][1] - j;
        return { x: i, y: j };
      },
    };

    // Number of cubes
    this._stats.total = ObjUtils.GetValues(this._model.voxels).length;

    // Calculate #materials & points
    this._stats.materials = {};
    this._stats.points = 0;

    const typePoints = [0, 0, 0, 0, 0]; // air, grass, water, fire, earth
    const statPoints = [0, 0, 0, 0]; // attack, defense, hp, speed

    ObjUtils.ForEach(this._model.voxels, (cellId, cell) => {
      if (cell && !Utils.ObjIsEmpty(cell.color)) {
        const m_id = cell.color.material_id;
        this._stats.materials[m_id] = (this._stats.materials[m_id] || 0) + 1;
        this._stats.points += CUBE_MATERIALS[m_id].point;
        for (let i = 0; i <= 4; i += 1) typePoints[i] += cell.color.type_points[i];
        for (let i = 0; i <= 3; i += 1) statPoints[i] += cell.color.stat_points[i];
      }
    });

    const totalStatsPoint = ArrayUtils.Sum(statPoints);
    this._stats.stats_distribute = {
      attack: Utils.RoundToDecimalFloat(statPoints[0] / totalStatsPoint * 100, 2),
      defense: Utils.RoundToDecimalFloat(statPoints[1] / totalStatsPoint * 100, 2),
      health: Utils.RoundToDecimalFloat(statPoints[2] / totalStatsPoint * 100, 2),
      speed: Utils.RoundToDecimalFloat(statPoints[3] / totalStatsPoint * 100, 2),
    };
    this._stats.type = ArrayUtils.FindIndexOfFirstMax(typePoints);

    // Calculate cost & tier
    this._stats.cubeTiers = {};
    this._stats.total_cost = 0;
    this._stats.invalid_materials = [];

    ObjUtils.ForEach(this._stats.materials, (key, value) => {
      this._stats.cubeTiers[CUBE_MATERIALS[key].tier] = (this._stats.cubeTiers[CUBE_MATERIALS[key].tier] || 0) + value;

      if (CUBE_MATERIALS[key].is_for_sale && this._stats.total_cost >= 0) {
        this._stats.total_cost += CUBE_MATERIALS[key].price * Math.max(0, value - (this._userCubes[key] || 0));
      } else if (!CUBE_MATERIALS[key].is_for_sale && (this._userCubes[key] || 0) < value) {
        this._stats.invalid_materials.push(CUBE_MATERIALS[key].name);
        this._stats.total_cost = -1;
      }
    });

    this._stats.total_cost = Utils.RoundUpToDecimal(this._stats.total_cost, 4);
    this._stats.storage = this._userCubes;

    // Calculate gon tier
    this._stats.gonTier = { id: -1, showPoints: 0, stats: [0, 0] };
    if (this._stats.points >= GON_TIER.god.points[0] && this._stats.cubeTiers[CUBE_TIER_MAP.legend]) {
      this._stats.gonTier = { ...GON_TIER.god, showPoints: Math.min(this._stats.points, GON_TIER.god.points[1]) };
    } else if (this._stats.points >= GON_TIER.champion.points[0] && (this._stats.cubeTiers[CUBE_TIER_MAP.legend] || this._stats.cubeTiers[CUBE_TIER_MAP.epic])) {
      this._stats.gonTier = { ...GON_TIER.champion, showPoints: Math.min(this._stats.points, GON_TIER.champion.points[1]) };
    } else if (this._stats.points >= GON_TIER.elite.points[0]) {
      this._stats.gonTier = { ...GON_TIER.elite, showPoints: Math.min(this._stats.points, GON_TIER.elite.points[1]) };
    } else if (this._stats.points >= GON_TIER.challenger.points[0]) {
      this._stats.gonTier = { ...GON_TIER.challenger, showPoints: Math.min(this._stats.points, GON_TIER.challenger.points[1]) };
    }

    if (this._stats.points >= GON_TIER.champion.points[0] && !this._stats.cubeTiers[CUBE_TIER_MAP.epic] && !this._stats.cubeTiers[CUBE_TIER_MAP.legend]) {
      this._stats.gonTier.note = ('tier.need_epic');
    } else if (this._stats.points >= GON_TIER.god.points[0] && !this._stats.cubeTiers[CUBE_TIER_MAP.legend]) {
      this._stats.gonTier.note = ('tier.need_legend');
    }

    // Calculate power from points
    if (this._stats.gonTier.id >= 0) {
      const currentPoint = this._stats.points;
      const pointRange = this._stats.gonTier.points;
      const statsRange = this._stats.gonTier.stats;
      const estimated_stats = statsRange[0] + Math.round((currentPoint - pointRange[0]) / (pointRange[1] - pointRange[0]) * (statsRange[1] - statsRange[0]));
      this._stats.power = [Utils.CapValue(estimated_stats - 15, statsRange[0], statsRange[1]), Utils.CapValue(estimated_stats + 15, statsRange[0], statsRange[1])];
    }

    this._stats.err = '';
    if (this._userCubes && this._stats.invalid_materials.length) {
      this._stats.err = 'err.some_invalid_materials';
      this._stats.errValues = this._stats.invalid_materials;
    } else if (ObjUtils.GetLength(this._stats.materials) > Config.CUBEGON_MAX_MATERIALS) {
      this._stats.err = 'err.max_materials';
    } else if (this._stats.total > Config.CUBEGON_MAX_CUBE) {
      this._stats.err = 'err.max_cubes';
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
    return this._tools[toolKey] && this._tools[toolKey].isActive && this._tools[toolKey].isActive({ toolManager: this });
  }
}

export const ToolTypes = {
  mode: 'mode', // draw mode => this does not affect/change 3D model & 2D layer.
  effect: 'effect', // effects  => this does not affect/change 3D model & 2D layer.
  action: 'action', // single-used actions => this will affect/change either 3D model / 2D layer
};

export const Tools = {};

Tools.color = ({ key = 'color', value, ...extra }) => ({
  ...extra,
  key,
  value,
  type: ToolTypes.effect,
  options: EDITOR_COLORS,
});

Tools.move = ({ key = 'move', value = true, ...extra }) => ({
  ...extra,
  key,
  value,
  type: ToolTypes.mode,
  onCellClicked: ({ toolManager, cells }) => {
    const { z } = toolManager._tools['view-2d'].value;
    toolManager._tools['layer-index'].value = cells[0][z[1]];
  },
});

Tools.pickColor = ({ key = 'pickColor', value = true, ...extra }) => ({
  ...extra,
  key,
  value,
  type: ToolTypes.mode,
  onCellClicked: ({ toolManager, cells }) => {
    const cellIndex = `${cells[0].x}_${cells[0].y}_${cells[0].z}`;
    const variant = toolManager.model.voxels[cellIndex] ? toolManager.model.voxels[cellIndex].color : undefined;
    if (variant !== undefined) {
      toolManager.onToolClicked({ key: toolManager._tools.color.key, value: variant });
    }
  },
});

Tools.draw = ({ key = 'draw', value = true, ...extra }) => ({
  ...extra,
  key,
  value,
  type: ToolTypes.mode,
  onCellClicked: ({ tools, model, cells }) => {
    const newModel = CloneDeep(model);
    let updateIdx = 0;

    cells.forEach((cell) => {
      if (newModel.voxels[GetCellKey(cell.x, cell.y, cell.z)]) {
        updateIdx = newModel.voxels[GetCellKey(cell.x, cell.y, cell.z)].updateIdx;
        updateIdx = updateIdx ? updateIdx + 1 : 0;
      }

      newModel.voxels[GetCellKey(cell.x, cell.y, cell.z)] = {
        ...cell,
        color: CloneDeep(tools.color.value),
        updateIdx,
      };
    });

    return newModel;
  },
});

Tools.paint = ({ key = 'paint', value = true, ...extra }) => ({
  ...extra,
  key,
  value,
  type: ToolTypes.mode,
  onCellClicked: ({ tools, model, cells }) => {
    const newModel = CloneDeep(model);
    let updateIdx = 0;

    cells.forEach((cell) => {
      if (newModel.voxels[GetCellKey(cell.x, cell.y, cell.z)]) {
        updateIdx = newModel.voxels[GetCellKey(cell.x, cell.y, cell.z)].updateIdx;
        updateIdx = updateIdx ? updateIdx + 1 : 0;
      }
      newModel.voxels[GetCellKey(cell.x, cell.y, cell.z)] = {
        ...cell,
        color: CloneDeep(tools.color.value),
        updateIdx,
      };
    });

    return newModel;
  },
});

Tools.erase = ({ key = 'erase', value = false, ...extra }) => ({
  ...extra,
  key,
  value,
  type: ToolTypes.mode,
  onCellClicked: ({ model, cells }) => {
    const newModel = CloneDeep(model);
    cells.forEach((cell) => {
      delete newModel.voxels[GetCellKey(cell.x, cell.y, cell.z)];
    });
    return newModel;
  },
});

Tools.clear = ({ key = 'clear', ...extra }) => ({
  ...extra,
  key,
  type: ToolTypes.action,
  onToolClicked: ({ toolManager }) => {
    const newModel = CloneDeep(toolManager._model);
    newModel.voxels = {};
    return newModel;
  },
  isActive: ({ toolManager }) => (toolManager._model && !Utils.ObjIsEmpty(toolManager._model.voxels)),
});

Tools.clearLayer = ({ key = 'clear-layer', ...extra }) => ({
  ...extra,
  key,
  type: ToolTypes.action,
  onToolClicked: ({ toolManager }) => {
    const newModel = CloneDeep(toolManager._model);
    newModel.voxels = Utils.ObjFilter(
      newModel.voxels,
      (voxel) => voxel[toolManager._layer.z] !== toolManager._layer.idx,
    );
    return newModel;
  },
  isActive: ({ toolManager }) => (toolManager._layer && !Utils.ObjIsEmpty(toolManager._layer.voxels)),
});

Tools.copyLayer = ({ key = 'copy-layer', ...extra }) => ({
  ...extra,
  key,
  type: ToolTypes.action,
  onToolClicked: ({ toolManager }) => {
    toolManager._copied_layer = CloneDeep(toolManager._layer);
  },
  isActive: ({ toolManager }) => (toolManager._layer && !Utils.ObjIsEmpty(toolManager._layer.voxels)),
});

Tools.pasteLayer = ({ key = 'paste-layer', ...extra }) => ({
  ...extra,
  key,
  type: ToolTypes.action,
  onToolClicked: ({ toolManager }) => {
    const newModel = CloneDeep(toolManager._model);
    const copiedLayer = toolManager._copied_layer;
    const currentLayer = toolManager._layer;

    if (copiedLayer.z !== currentLayer.z) return;

    newModel.voxels = Utils.ObjFilter(newModel.voxels, (voxel) => voxel[currentLayer.z] !== currentLayer.idx);
    GetValues(copiedLayer.voxels).forEach((voxel) => {
      voxel[copiedLayer.z] = currentLayer.idx;
      newModel.voxels[GetCellKey(voxel.x, voxel.y, voxel.z)] = voxel;
    });

    return newModel;
  },
  isActive: ({ toolManager }) => (!!toolManager._copied_layer),
});

Tools.undo = ({ key = 'undo', ...extra }) => ({
  ...extra,
  key,
  type: ToolTypes.action,
  onToolClicked: ({ toolManager }) => {
    if (toolManager.history.idx > 0) toolManager.history.idx -= 1;
  },
  isActive: ({ toolManager }) => (toolManager.history.idx > 0),
});

Tools.redo = ({ key = 'redo', ...extra }) => ({
  ...extra,
  key,
  type: ToolTypes.action,
  onToolClicked: ({ toolManager }) => {
    if (toolManager.history.idx < toolManager.history.models.length - 1) toolManager.history.idx += 1;
  },
  isActive: ({ toolManager }) => (toolManager.history.idx < toolManager.history.models.length - 1),
});

const view2dOptions = {
  front: {
    viewKey: 'front',
    label: 'front_view',
    x: '+x',
    y: '-z',
    z: '-y',
  },
  side: {
    viewKey: 'side',
    label: 'side_view',
    x: '-y',
    y: '-z',
    z: '+x',
  },
  top: {
    viewKey: 'top',
    label: 'bottom_view',
    x: '+x',
    y: '+y',
    z: '+z',
  },
};
const view2dList = ['front', 'side', 'top'];
Tools.view2D = ({ key = 'view-2d', value = view2dOptions.front, ...extra }) => ({
  ...extra,
  key,
  value,
  type: ToolTypes.action,
  options: view2dOptions,
  onToolClicked: ({ toolManager, key, value }) => {
    const currentValue = toolManager._tools[key].value.viewKey;
    const nextValue = value || view2dList[(view2dList.indexOf(currentValue) + 1) % view2dList.length];

    toolManager._tools[key].value = { ...view2dOptions[nextValue] };
    toolManager._copied_layer = null;
  },
});

Tools.layerIndex = ({ key = 'layer-index', value = 0, ...extra }) => ({
  ...extra,
  key,
  value,
  type: ToolTypes.action,
  onToolClicked: ({ toolManager, value }) => {
  },
});
