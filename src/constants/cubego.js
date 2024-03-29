import * as ObjUtils from '../utils/objUtils';
import * as Utils from '../utils/utils';

export const CUBE_TIER = {
  1: {
    id: 1,
    name: 'legend',
  },
  2: {
    id: 1,
    name: 'epic',
  },
  3: {
    id: 1,
    name: 'rare',
  },
  4: {
    id: 1,
    name: 'common',
  },
  5: {
    id: 1,
    name: 'basic',
  },
};

export const CUBE_TIER_MAP = {
  legend: 1,
  epic: 2,
  rare: 3,
  common: 4,
  basic: 5,
};

export const CUBE_TYPES_MAP = {
  air: 0,
  grass: 1,
  water: 2,
  fire: 3,
  earth: 4,
};

export const CUBE_TYPES = {
  [CUBE_TYPES_MAP.air]: {
    id: CUBE_TYPES_MAP.air,
    name: 'air',
    img: require('../shared/img/types/air.png'),
  },
  [CUBE_TYPES_MAP.grass]: {
    id: CUBE_TYPES_MAP.grass,
    name: 'grass',
    img: require('../shared/img/types/grass.png'),
  },
  [CUBE_TYPES_MAP.water]: {
    id: CUBE_TYPES_MAP.water,
    name: 'water',
    img: require('../shared/img/types/water.png'),
  },
  [CUBE_TYPES_MAP.fire]: {
    id: CUBE_TYPES_MAP.fire,
    name: 'fire',
    img: require('../shared/img/types/fire.png'),
  },
  [CUBE_TYPES_MAP.earth]: {
    id: CUBE_TYPES_MAP.earth,
    name: 'earth',
    img: require('../shared/img/types/earth.png'),
  },
};

export const CUBE_MATERIALS_MAP = {
  diamond: 12,
  gold: 11,
  ice: 10,
  silver: 9,
  iron: 8,
  stone: 7,
  wood: 6,
  brick: 5,
  leaf: 4,
  fur: 3,
  paper: 2,
  plastic: 0,
};

export const SUB_MATERIAL_TYPE_POINTS = {
  1: {
    class: 0, point: 1, stats: [20, 20, 40, 20], types: [0, 0, 0, 1, 0],
  },
  2: {
    class: 0, point: 1, stats: [30, 20, 20, 30], types: [1, 1, 1, 1, 1],
  },
  3: {
    class: 0, point: 1, stats: [20, 30, 30, 20], types: [0, 0, 1, 0, 0],
  },
  4: {
    class: 0, point: 1, stats: [20, 20, 20, 40], types: [1, 0, 0, 0, 0],
  },
  5: {
    class: 0, point: 1, stats: [20, 40, 20, 20], types: [0, 1, 0, 0, 0],
  },
  6: {
    class: 0, point: 1, stats: [40, 20, 20, 20], types: [0, 0, 0, 0, 1],
  },
  201: {
    class: 2, point: 5, stats: [20, 20, 40, 20], types: [0, 0, 0, 1, 0],
  },
  202: {
    class: 2, point: 5, stats: [20, 20, 35, 25], types: [0, 0, 0, 1, 0],
  },
  203: {
    class: 2, point: 5, stats: [20, 30, 20, 30], types: [0, 0, 1, 0, 0],
  },
  204: {
    class: 2, point: 5, stats: [20, 30, 30, 20], types: [1, 0, 0, 0, 0],
  },
  205: {
    class: 2, point: 5, stats: [20, 20, 20, 40], types: [0, 0, 1, 0, 0],
  },
  206: {
    class: 2, point: 5, stats: [20, 40, 20, 20], types: [0, 1, 0, 0, 0],
  },
  207: {
    class: 2, point: 5, stats: [50, 10, 10, 30], types: [0, 0, 0, 0, 1],
  },
  208: {
    class: 2, point: 5, stats: [35, 20, 25, 40], types: [0, 0, 0, 0, 1],
  },
  209: {
    class: 2, point: 5, stats: [20, 20, 20, 40], types: [1, 0, 0, 0, 0],
  },
  210: {
    class: 2, point: 5, stats: [30, 35, 15, 20], types: [0, 1, 0, 0, 0],
  },
  301: {
    class: 3, point: 5, stats: [20, 20, 25, 35], types: [0, 0, 0, 0, 1],
  },
  302: {
    class: 3, point: 5, stats: [20, 20, 40, 20], types: [0, 0, 0, 1, 0],
  },
  303: {
    class: 3, point: 5, stats: [20, 30, 30, 20], types: [1, 0, 0, 0, 0],
  },
  304: {
    class: 3, point: 5, stats: [20, 30, 20, 30], types: [0, 0, 1, 0, 0],
  },
  305: {
    class: 3, point: 5, stats: [20, 40, 20, 20], types: [0, 1, 0, 0, 0],
  },
  306: {
    class: 3, point: 5, stats: [40, 20, 20, 20], types: [0, 0, 0, 0, 1],
  },
  307: {
    class: 3, point: 5, stats: [30, 20, 30, 20], types: [0, 0, 0, 1, 0],
  },
  308: {
    class: 3, point: 5, stats: [25, 20, 35, 20], types: [0, 1, 0, 0, 0],
  },
  309: {
    class: 3, point: 5, stats: [35, 15, 15, 35], types: [1, 0, 0, 0, 0],
  },
  310: {
    class: 3, point: 5, stats: [30, 30, 20, 20], types: [0, 0, 1, 0, 0],
  },
  401: {
    class: 4, point: 5, stats: [20, 40, 20, 20], types: [0, 1, 0, 0, 0],
  },
  402: {
    class: 4, point: 5, stats: [20, 30, 30, 20], types: [0, 0, 1, 0, 0],
  },
  403: {
    class: 4, point: 5, stats: [20, 20, 40, 20], types: [0, 0, 0, 1, 0],
  },
  404: {
    class: 4, point: 5, stats: [25, 20, 20, 35], types: [0, 0, 0, 0, 1],
  },
  405: {
    class: 4, point: 5, stats: [20, 25, 35, 20], types: [1, 0, 0, 0, 0],
  },
  406: {
    class: 4, point: 5, stats: [35, 15, 15, 35], types: [0, 1, 0, 0, 0],
  },
  501: {
    class: 5, point: 5, stats: [35, 20, 20, 25], types: [0, 0, 0, 0, 1],
  },
  502: {
    class: 5, point: 5, stats: [20, 20, 40, 20], types: [0, 0, 0, 1, 0],
  },
  503: {
    class: 5, point: 5, stats: [20, 30, 30, 20], types: [1, 0, 0, 0, 0],
  },
  504: {
    class: 5, point: 5, stats: [20, 35, 20, 25], types: [0, 0, 1, 0, 0],
  },
  505: {
    class: 5, point: 5, stats: [20, 30, 20, 30], types: [0, 0, 1, 0, 0],
  },
  506: {
    class: 5, point: 5, stats: [20, 40, 20, 20], types: [0, 1, 0, 0, 0],
  },
  507: {
    class: 5, point: 5, stats: [40, 20, 20, 20], types: [0, 0, 0, 0, 1],
  },
  508: {
    class: 5, point: 5, stats: [20, 20, 20, 40], types: [1, 0, 0, 0, 0],
  },
  509: {
    class: 5, point: 5, stats: [25, 20, 35, 20], types: [0, 0, 0, 1, 0],
  },
  601: {
    class: 6, point: 50, stats: [35, 20, 15, 30], types: [0, 0, 0, 0, 1],
  },
  602: {
    class: 6, point: 50, stats: [30, 20, 30, 20], types: [0, 0, 0, 1, 1],
  },
  603: {
    class: 6, point: 50, stats: [30, 20, 20, 30], types: [0, 1, 1, 0, 0],
  },
  604: {
    class: 6, point: 50, stats: [20, 30, 20, 30], types: [0, 0, 1, 0, 0],
  },
  605: {
    class: 6, point: 50, stats: [20, 10, 40, 30], types: [1, 0, 1, 0, 1],
  },
  606: {
    class: 6, point: 50, stats: [20, 40, 20, 20], types: [0, 1, 0, 0, 0],
  },
  607: {
    class: 6, point: 50, stats: [40, 20, 20, 20], types: [0, 0, 0, 1, 0],
  },
  608: {
    class: 6, point: 50, stats: [20, 20, 20, 40], types: [1, 0, 0, 0, 0],
  },
  701: {
    class: 7, point: 50, stats: [20, 20, 20, 40], types: [1, 0, 0, 0, 0],
  },
  702: {
    class: 7, point: 50, stats: [20, 20, 40, 20], types: [0, 0, 0, 1, 0],
  },
  703: {
    class: 7, point: 50, stats: [20, 30, 30, 20], types: [0, 1, 1, 0, 0],
  },
  704: {
    class: 7, point: 50, stats: [20, 50, 15, 15], types: [0, 0, 1, 0, 0],
  },
  705: {
    class: 7, point: 50, stats: [20, 40, 20, 20], types: [0, 1, 0, 0, 0],
  },
  706: {
    class: 7, point: 50, stats: [40, 20, 20, 20], types: [1, 0, 0, 1, 0],
  },
  707: {
    class: 7, point: 50, stats: [20, 20, 40, 20], types: [0, 1, 0, 0, 1],
  },
  708: {
    class: 7, point: 50, stats: [35, 20, 20, 25], types: [0, 0, 0, 0, 1],
  },
  801: {
    class: 8, point: 55, stats: [20, 20, 20, 40], types: [0, 0, 0, 1, 1],
  },
  802: {
    class: 8, point: 55, stats: [20, 20, 40, 20], types: [1, 0, 0, 0, 0],
  },
  803: {
    class: 8, point: 55, stats: [20, 30, 30, 20], types: [0, 0, 0, 1, 0],
  },
  804: {
    class: 8, point: 55, stats: [20, 30, 20, 30], types: [0, 1, 1, 0, 0],
  },
  805: {
    class: 8, point: 55, stats: [20, 40, 20, 20], types: [0, 0, 1, 0, 0],
  },
  806: {
    class: 8, point: 55, stats: [40, 20, 20, 20], types: [0, 1, 0, 0, 0],
  },
  807: {
    class: 8, point: 55, stats: [30, 20, 30, 20], types: [1, 0, 0, 1, 0],
  },
  808: {
    class: 8, point: 55, stats: [20, 20, 30, 30], types: [0, 0, 0, 0, 1],
  },
  901: {
    class: 9, point: 300, stats: [20, 20, 20, 40], types: [1, 0, 0, 0, 1],
  },
  902: {
    class: 9, point: 300, stats: [20, 20, 30, 30], types: [0, 0, 1, 1, 0],
  },
  903: {
    class: 9, point: 300, stats: [20, 30, 20, 30], types: [0, 1, 1, 0, 0],
  },
  904: {
    class: 9, point: 300, stats: [30, 20, 30, 40], types: [1, 0, 0, 1, 0],
  },
  905: {
    class: 9, point: 300, stats: [40, 30, 20, 10], types: [0, 1, 0, 0, 1],
  },
  1001: {
    class: 10, point: 300, stats: [20, 20, 20, 40], types: [1, 0, 1, 0, 0],
  },
  1002: {
    class: 10, point: 300, stats: [20, 20, 40, 20], types: [0, 1, 0, 1, 0],
  },
  1003: {
    class: 10, point: 300, stats: [20, 40, 20, 20], types: [0, 1, 1, 0, 0],
  },
  1004: {
    class: 10, point: 300, stats: [20, 30, 30, 20], types: [1, 0, 0, 1, 0],
  },
  1005: {
    class: 10, point: 300, stats: [40, 20, 20, 20], types: [1, 0, 0, 0, 1],
  },
  1101: {
    class: 11, point: 350, stats: [25, 25, 25, 25], types: [0, 0, 0, 1, 1],
  },
  1201: {
    class: 12, point: 3000, stats: [20, 20, 20, 40], types: [0, 0, 1, 0, 0],
  },
  1202: {
    class: 12, point: 3000, stats: [20, 20, 40, 20], types: [0, 0, 0, 1, 0],
  },
  1203: {
    class: 12, point: 3000, stats: [20, 40, 20, 20], types: [0, 1, 0, 0, 0],
  },
  1204: {
    class: 12, point: 3000, stats: [40, 20, 20, 20], types: [0, 0, 0, 0, 1],
  },
  1205: {
    class: 12, point: 3000, stats: [25, 25, 25, 25], types: [1, 0, 0, 0, 0],
  },
};

const _CUBE_MATERIALS = {
  [CUBE_MATERIALS_MAP.diamond]: {
    material_id: CUBE_MATERIALS_MAP.diamond,
    name: 'diamond',
    sub_materials: {
      [CUBE_MATERIALS_MAP.diamond * 100 + 1]: { color: '#85f0ff', emissive: '#3d20c8' },
      [CUBE_MATERIALS_MAP.diamond * 100 + 2]: { color: '#f70000', emissive: '#430529' },
      [CUBE_MATERIALS_MAP.diamond * 100 + 3]: { color: '#005521', emissive: '#005521' },
      [CUBE_MATERIALS_MAP.diamond * 100 + 4]: { color: '#ffd100', emissive: '#a74400' },
      [CUBE_MATERIALS_MAP.diamond * 100 + 5]: { color: '#909293', emissive: '#000000' },
    },
    point: 3000,
    tier: CUBE_TIER_MAP.legend,
  },
  [CUBE_MATERIALS_MAP.gold]: {
    material_id: CUBE_MATERIALS_MAP.gold,
    name: 'gold',
    sub_materials: {
      [CUBE_MATERIALS_MAP.gold * 100 + 1]: { color: '#ffffff', emissive: '#573107' },
    },
    point: 350,
    tier: CUBE_TIER_MAP.epic,
  },
  [CUBE_MATERIALS_MAP.ice]: {
    material_id: CUBE_MATERIALS_MAP.ice,
    name: 'ice',
    sub_materials: {
      [CUBE_MATERIALS_MAP.ice * 100 + 1]: { color: '#a7c7d7', emissive: '#282289' },
      [CUBE_MATERIALS_MAP.ice * 100 + 2]: { color: '#a2004c', emissive: '#842121' },
      [CUBE_MATERIALS_MAP.ice * 100 + 3]: { color: '#4b7046', emissive: '#13191e' },
      [CUBE_MATERIALS_MAP.ice * 100 + 4]: { color: '#ff7800', emissive: '#480000' },
      [CUBE_MATERIALS_MAP.ice * 100 + 5]: { color: '#f2c535', emissive: '#a04b00' },
    },
    point: 300,
    tier: CUBE_TIER_MAP.epic,
  },
  [CUBE_MATERIALS_MAP.silver]: {
    material_id: CUBE_MATERIALS_MAP.silver,
    name: 'silver',
    sub_materials: {
      [CUBE_MATERIALS_MAP.silver * 100 + 1]: { color: '#f2f2f2', emissive: '#5c5c5c' },
      [CUBE_MATERIALS_MAP.silver * 100 + 2]: { color: '#907898', emissive: '#100425' },
      [CUBE_MATERIALS_MAP.silver * 100 + 3]: { color: '#4eaafc', emissive: '#100425' },
      [CUBE_MATERIALS_MAP.silver * 100 + 4]: { color: '#ff0d0d', emissive: '#1b001b' },
      [CUBE_MATERIALS_MAP.silver * 100 + 5]: { color: '#af750d', emissive: '#4d0048' },
    },
    point: 300,
    tier: CUBE_TIER_MAP.epic,
  },
  [CUBE_MATERIALS_MAP.iron]: {
    material_id: CUBE_MATERIALS_MAP.iron,
    name: 'iron',
    sub_materials: {
      [CUBE_MATERIALS_MAP.iron * 100 + 1]: { color: '#7a8287', emissive: '#1f1431' },
      [CUBE_MATERIALS_MAP.iron * 100 + 2]: { color: '#9d2f2f', emissive: '#100425' },
      [CUBE_MATERIALS_MAP.iron * 100 + 3]: { color: '#972f9d', emissive: '#100425' },
      [CUBE_MATERIALS_MAP.iron * 100 + 4]: { color: '#2f769d', emissive: '#2f0331' },
      [CUBE_MATERIALS_MAP.iron * 100 + 5]: { color: '#2f9d49', emissive: '#310319' },
      [CUBE_MATERIALS_MAP.iron * 100 + 6]: { color: '#9b810a', emissive: '#310319' },
      [CUBE_MATERIALS_MAP.iron * 100 + 7]: { color: '#9b450a', emissive: '#311303' },
      [CUBE_MATERIALS_MAP.iron * 100 + 8]: { color: '#665252', emissive: '#180c05' },
    },
    point: 55,
    tier: CUBE_TIER_MAP.rare,
  },
  [CUBE_MATERIALS_MAP.stone]: {
    material_id: CUBE_MATERIALS_MAP.stone,
    name: 'stone',
    sub_materials: {
      [CUBE_MATERIALS_MAP.stone * 100 + 1]: { color: '#c0c0c0', emissive: '#1e130c' },
      [CUBE_MATERIALS_MAP.stone * 100 + 2]: { color: '#7f0f0f', emissive: '#110000' },
      [CUBE_MATERIALS_MAP.stone * 100 + 3]: { color: '#781370', emissive: '#02061b' },
      [CUBE_MATERIALS_MAP.stone * 100 + 4]: { color: '#00599b', emissive: '#02061b' },
      [CUBE_MATERIALS_MAP.stone * 100 + 5]: { color: '#08701a', emissive: '#02061b' },
      [CUBE_MATERIALS_MAP.stone * 100 + 6]: { color: '#c09303', emissive: '#1b0a02' },
      [CUBE_MATERIALS_MAP.stone * 100 + 7]: { color: '#ac5b00', emissive: '#160202' },
      [CUBE_MATERIALS_MAP.stone * 100 + 8]: { color: '#2f2f2f', emissive: '#000000' },
    },
    point: 50,
    tier: CUBE_TIER_MAP.rare,
  },
  [CUBE_MATERIALS_MAP.wood]: {
    material_id: CUBE_MATERIALS_MAP.wood,
    name: 'wood',
    sub_materials: {
      [CUBE_MATERIALS_MAP.wood * 100 + 1]: { color: '#6b6a6a', emissive: '#050505' },
      [CUBE_MATERIALS_MAP.wood * 100 + 2]: { color: '#e82a2a', emissive: '#4a0101' },
      [CUBE_MATERIALS_MAP.wood * 100 + 3]: { color: '#993cb6', emissive: '#340000' },
      [CUBE_MATERIALS_MAP.wood * 100 + 4]: { color: '#3e68a4', emissive: '#170822' },
      [CUBE_MATERIALS_MAP.wood * 100 + 5]: { color: '#7a3ea4', emissive: '#170822' },
      [CUBE_MATERIALS_MAP.wood * 100 + 6]: { color: '#3ea462', emissive: '#021100' },
      [CUBE_MATERIALS_MAP.wood * 100 + 7]: { color: '#b69034', emissive: '#66170c' },
      [CUBE_MATERIALS_MAP.wood * 100 + 8]: { color: '#cab47e', emissive: '#412a27' },
    },
    point: 50,
    tier: CUBE_TIER_MAP.rare,
  },
  [CUBE_MATERIALS_MAP.brick]: {
    material_id: CUBE_MATERIALS_MAP.brick,
    name: 'brick',
    sub_materials: {
      [CUBE_MATERIALS_MAP.brick * 100 + 1]: { color: '#6b4d2b', emissive: '#2d0000' },
      [CUBE_MATERIALS_MAP.brick * 100 + 2]: { color: '#611717', emissive: '#160707' },
      [CUBE_MATERIALS_MAP.brick * 100 + 3]: { color: '#5c2c4e', emissive: '#0f0303' },
      [CUBE_MATERIALS_MAP.brick * 100 + 4]: { color: '#2c315c', emissive: '#000709' },
      [CUBE_MATERIALS_MAP.brick * 100 + 5]: { color: '#2c5c56', emissive: '#010009' },
      [CUBE_MATERIALS_MAP.brick * 100 + 6]: { color: '#2c5c34', emissive: '#050f00' },
      [CUBE_MATERIALS_MAP.brick * 100 + 7]: { color: '#825920', emissive: '#2f1b00' },
      [CUBE_MATERIALS_MAP.brick * 100 + 8]: { color: '#696969', emissive: '#2f1b00' },
      [CUBE_MATERIALS_MAP.brick * 100 + 9]: { color: '#10110d', emissive: '#090909' },
    },
    price: 0.0005,
    is_for_sale: true,
    point: 5,
    tier: CUBE_TIER_MAP.common,
  },
  [CUBE_MATERIALS_MAP.leaf]: {
    material_id: CUBE_MATERIALS_MAP.leaf,
    name: 'leaf',
    sub_materials: {
      [CUBE_MATERIALS_MAP.leaf * 100 + 1]: { color: '#a5ff74', emissive: '#011603' },
      [CUBE_MATERIALS_MAP.leaf * 100 + 2]: { color: '#441ba7', emissive: '#0d0d43' },
      [CUBE_MATERIALS_MAP.leaf * 100 + 3]: { color: '#911414', emissive: '#200b25' },
      [CUBE_MATERIALS_MAP.leaf * 100 + 4]: { color: '#e84603', emissive: '#221746' },
      [CUBE_MATERIALS_MAP.leaf * 100 + 5]: { color: '#6608ed', emissive: '#160320' },
      [CUBE_MATERIALS_MAP.leaf * 100 + 6]: { color: '#ff9042', emissive: '#705005' },
    },
    price: 0.0005,
    is_for_sale: true,
    point: 5,
    tier: CUBE_TIER_MAP.common,
  },
  [CUBE_MATERIALS_MAP.fur]: {
    material_id: CUBE_MATERIALS_MAP.fur,
    name: 'fur',
    sub_materials: {
      [CUBE_MATERIALS_MAP.fur * 100 + 1]: { color: '#f0b185', emissive: '#2f2a2a' },
      [CUBE_MATERIALS_MAP.fur * 100 + 2]: { color: '#7d2323', emissive: '#220808' },
      [CUBE_MATERIALS_MAP.fur * 100 + 3]: { color: '#7454c0', emissive: '#220808' },
      [CUBE_MATERIALS_MAP.fur * 100 + 4]: { color: '#3d78cd', emissive: '#000034' },
      [CUBE_MATERIALS_MAP.fur * 100 + 5]: { color: '#227553', emissive: '#0f2500' },

      [CUBE_MATERIALS_MAP.fur * 100 + 6]: { color: '#be9126', emissive: '#250000' },
      [CUBE_MATERIALS_MAP.fur * 100 + 7]: { color: '#a75419', emissive: '#250000' },
      [CUBE_MATERIALS_MAP.fur * 100 + 8]: { color: '#6e472c', emissive: '#2a0707' },
      [CUBE_MATERIALS_MAP.fur * 100 + 9]: { color: '#a2a2bb', emissive: '#3c3c3c' },
      [CUBE_MATERIALS_MAP.fur * 100 + 10]: { color: '#363637', emissive: '#090909' },
    },
    price: 0.0005,
    is_for_sale: true,
    point: 5,
    tier: CUBE_TIER_MAP.common,
  },
  [CUBE_MATERIALS_MAP.paper]: {
    material_id: CUBE_MATERIALS_MAP.paper,
    name: 'paper',
    sub_materials: {
      [CUBE_MATERIALS_MAP.paper * 100 + 1]: { color: '#eb6128', emissive: '#912727' },
      // [CUBE_MATERIALS_MAP.paper * 100 + 1]: {color: '#7f0000', emissive: '#7d2424'},
      [CUBE_MATERIALS_MAP.paper * 100 + 2]: { color: '#f773c8', emissive: '#af3692' },
      [CUBE_MATERIALS_MAP.paper * 100 + 3]: { color: '#0b3787', emissive: '#183f9d' },
      [CUBE_MATERIALS_MAP.paper * 100 + 4]: { color: '#450b87', emissive: '#4d1f82' },
      [CUBE_MATERIALS_MAP.paper * 100 + 5]: { color: '#0b8778', emissive: '#0a5178' },

      [CUBE_MATERIALS_MAP.paper * 100 + 6]: { color: '#0b8719', emissive: '#194d31' },
      [CUBE_MATERIALS_MAP.paper * 100 + 7]: { color: '#edc291', emissive: '#522e1f' },
      [CUBE_MATERIALS_MAP.paper * 100 + 8]: { color: '#ac681c', emissive: '#8e3012' },
      [CUBE_MATERIALS_MAP.paper * 100 + 9]: { color: '#d2d2d2', emissive: '#373636' },
      [CUBE_MATERIALS_MAP.paper * 100 + 10]: { color: '#2a2a29', emissive: '#0c0b0b' },
    },
    price: 0.0005,
    is_for_sale: true,
    point: 5,
    tier: CUBE_TIER_MAP.common,
  },
  [CUBE_MATERIALS_MAP.plastic]: {
    material_id: CUBE_MATERIALS_MAP.plastic,
    name: 'plastic',
    sub_materials: {
      [CUBE_MATERIALS_MAP.plastic * 100 + 1]: { color: '#d70000', emissive: '#000000' },
      [CUBE_MATERIALS_MAP.plastic * 100 + 2]: { color: '#6500d7', emissive: '#000000' },
      [CUBE_MATERIALS_MAP.plastic * 100 + 3]: { color: '#0032d7', emissive: '#000000' },
      [CUBE_MATERIALS_MAP.plastic * 100 + 4]: { color: '#0071d7', emissive: '#000000' },
      [CUBE_MATERIALS_MAP.plastic * 100 + 5]: { color: '#006919', emissive: '#000000' },
      [CUBE_MATERIALS_MAP.plastic * 100 + 6]: { color: '#c5a200', emissive: '#501700' },
    },
    point: 1,
    tier: CUBE_TIER_MAP.basic,
  },
};

export const CUBE_MATERIALS = ObjUtils.CloneWithValueModify(_CUBE_MATERIALS, (cKey, cube) => ({
  ...cube,
  material_id: parseInt(cKey),
  img: require(`../shared/img/store_cubegoes/${cube.name}.png`),
  icon: require(`../shared/img/cubego-icons/${Utils.AddHeadingZero(cKey, 3)}.png`),
  sub_materials: ObjUtils.CloneWithValueModify(cube.sub_materials, (vKey, variant) => ({
    ...variant,
    material_id: parseInt(cKey),
    sub_material_id: parseInt(vKey),
    materialKey: cube.name,
    img: require(`../shared/img/cubego-variants/${Utils.AddHeadingZero(cKey, 3)}_${Utils.AddHeadingZero(vKey % 100, 2)}.png`),
    type_points: SUB_MATERIAL_TYPE_POINTS[vKey].types,
    stat_points: SUB_MATERIAL_TYPE_POINTS[vKey].stats,
    // img: cKey === '12' ? null : require(`../shared/img/cubego-sub_materials/001_01.png`),
  })),
  types: ObjUtils.CloneWithValueModify(CUBE_TYPES, (tKey) => Object.keys(cube.sub_materials).filter((vKey) => SUB_MATERIAL_TYPE_POINTS[vKey].types[tKey])),
}));
