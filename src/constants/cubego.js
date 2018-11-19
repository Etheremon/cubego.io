import * as ObjUtils from "../utils/objUtils";
import * as Utils from "../utils/utils";

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
  [CUBE_MATERIALS_MAP.diamond*100+1]: [0, 0, 1, 0, 0],
  [CUBE_MATERIALS_MAP.diamond*100+2]: [0, 0, 0, 1, 0],
  [CUBE_MATERIALS_MAP.diamond*100+3]: [0, 1, 0, 0, 0],
  [CUBE_MATERIALS_MAP.diamond*100+4]: [0, 0, 0, 0, 1],
  [CUBE_MATERIALS_MAP.diamond*100+5]: [1, 0, 0, 0, 0],
  [CUBE_MATERIALS_MAP.gold*100+1]: [0, 0, 0, 1, 1],
  [CUBE_MATERIALS_MAP.ice*100+1]: [1, 0, 1, 0, 0],
  [CUBE_MATERIALS_MAP.ice*100+2]: [0, 1, 0, 1, 0],
  [CUBE_MATERIALS_MAP.ice*100+3]: [0, 1, 1, 0, 0],
  [CUBE_MATERIALS_MAP.ice*100+4]: [1, 0, 0, 1, 0],
  [CUBE_MATERIALS_MAP.ice*100+5]: [1, 0, 0, 0, 1],
  [CUBE_MATERIALS_MAP.silver*100+1]: [1, 0, 0, 0, 1],
  [CUBE_MATERIALS_MAP.silver*100+2]: [0, 0, 1, 1, 0],
  [CUBE_MATERIALS_MAP.silver*100+3]: [0, 1, 1, 0, 0],
  [CUBE_MATERIALS_MAP.silver*100+4]: [1, 0, 0, 1, 0],
  [CUBE_MATERIALS_MAP.silver*100+5]: [0, 1, 0, 0, 1],
  [CUBE_MATERIALS_MAP.iron*100+1]: [0, 0, 0, 1, 1],
  [CUBE_MATERIALS_MAP.iron*100+2]: [1, 0, 0, 0, 0],
  [CUBE_MATERIALS_MAP.iron*100+3]: [0, 0, 0, 1, 0],
  [CUBE_MATERIALS_MAP.iron*100+4]: [0, 1, 1, 0, 0],
  [CUBE_MATERIALS_MAP.iron*100+5]: [0, 0, 1, 0, 0],
  [CUBE_MATERIALS_MAP.iron*100+6]: [0, 1, 0, 0, 0],
  [CUBE_MATERIALS_MAP.iron*100+7]: [1, 0, 0, 1, 0],
  [CUBE_MATERIALS_MAP.iron*100+8]: [0, 0, 0, 0, 1],
  [CUBE_MATERIALS_MAP.stone*100+1]: [1, 0, 0, 0, 0],
  [CUBE_MATERIALS_MAP.stone*100+2]: [0, 0, 0, 1, 0],
  [CUBE_MATERIALS_MAP.stone*100+3]: [0, 1, 1, 0, 0],
  [CUBE_MATERIALS_MAP.stone*100+4]: [0, 0, 1, 0, 0],
  [CUBE_MATERIALS_MAP.stone*100+5]: [0, 1, 0, 0, 0],
  [CUBE_MATERIALS_MAP.stone*100+6]: [1, 0, 0, 1, 0],
  [CUBE_MATERIALS_MAP.stone*100+7]: [0, 1, 0, 0, 1],
  [CUBE_MATERIALS_MAP.stone*100+8]: [0, 0, 0, 0, 1],
  [CUBE_MATERIALS_MAP.wood*100+1]: [0, 0, 0, 0, 1],
  [CUBE_MATERIALS_MAP.wood*100+2]: [0, 0, 0, 1, 1],
  [CUBE_MATERIALS_MAP.wood*100+3]: [0, 1, 1, 0, 0],
  [CUBE_MATERIALS_MAP.wood*100+4]: [0, 0, 1, 0, 0],
  [CUBE_MATERIALS_MAP.wood*100+5]: [1, 0, 1, 0, 1],
  [CUBE_MATERIALS_MAP.wood*100+6]: [0, 1, 0, 0, 0],
  [CUBE_MATERIALS_MAP.wood*100+7]: [0, 0, 0, 1, 0],
  [CUBE_MATERIALS_MAP.wood*100+8]: [1, 0, 0, 0, 0],
  [CUBE_MATERIALS_MAP.brick*100+1]: [0, 0, 0, 0, 1],
  [CUBE_MATERIALS_MAP.brick*100+2]: [0, 0, 0, 1, 0],
  [CUBE_MATERIALS_MAP.brick*100+3]: [1, 0, 0, 0, 0],
  [CUBE_MATERIALS_MAP.brick*100+4]: [0, 0, 1, 0, 0],
  [CUBE_MATERIALS_MAP.brick*100+5]: [0, 0, 1, 0, 0],
  [CUBE_MATERIALS_MAP.brick*100+6]: [0, 1, 0, 0, 0],
  [CUBE_MATERIALS_MAP.brick*100+7]: [0, 0, 0, 0, 1],
  [CUBE_MATERIALS_MAP.brick*100+8]: [1, 0, 0, 0, 0],
  [CUBE_MATERIALS_MAP.brick*100+9]: [0, 0, 0, 1, 0],
  [CUBE_MATERIALS_MAP.leaf*100+1]: [0, 1, 0, 0, 0],
  [CUBE_MATERIALS_MAP.leaf*100+2]: [0, 0, 1, 0, 0],
  [CUBE_MATERIALS_MAP.leaf*100+3]: [0, 0, 0, 1, 0],
  [CUBE_MATERIALS_MAP.leaf*100+4]: [0, 0, 0, 0, 1],
  [CUBE_MATERIALS_MAP.leaf*100+5]: [1, 0, 0, 0, 0],
  [CUBE_MATERIALS_MAP.leaf*100+6]: [0, 1, 0, 0, 0],
  [CUBE_MATERIALS_MAP.fur*100+1]: [0, 0, 0, 0, 1],
  [CUBE_MATERIALS_MAP.fur*100+2]: [0, 0, 0, 1, 0],
  [CUBE_MATERIALS_MAP.fur*100+3]: [1, 0, 0, 0, 0],
  [CUBE_MATERIALS_MAP.fur*100+4]: [0, 0, 1, 0, 0],
  [CUBE_MATERIALS_MAP.fur*100+5]: [0, 1, 0, 0, 0],
  [CUBE_MATERIALS_MAP.fur*100+6]: [0, 0, 0, 0, 1],
  [CUBE_MATERIALS_MAP.fur*100+7]: [0, 0, 0, 1, 0],
  [CUBE_MATERIALS_MAP.fur*100+8]: [0, 1, 0, 0, 0],
  [CUBE_MATERIALS_MAP.fur*100+9]: [1, 0, 0, 0, 0],
  [CUBE_MATERIALS_MAP.fur*100+10]: [0, 0, 1, 0, 0],
  [CUBE_MATERIALS_MAP.paper*100+1]: [0, 0, 0, 1, 0],
  [CUBE_MATERIALS_MAP.paper*100+2]: [0, 0, 0, 1, 0],
  [CUBE_MATERIALS_MAP.paper*100+3]: [0, 0, 1, 0, 0],
  [CUBE_MATERIALS_MAP.paper*100+4]: [1, 0, 0, 0, 0],
  [CUBE_MATERIALS_MAP.paper*100+5]: [0, 0, 1, 0, 0],
  [CUBE_MATERIALS_MAP.paper*100+6]: [0, 1, 0, 0, 0],
  [CUBE_MATERIALS_MAP.paper*100+7]: [0, 0, 0, 0, 1],
  [CUBE_MATERIALS_MAP.paper*100+8]: [0, 0, 0, 0, 1],
  [CUBE_MATERIALS_MAP.paper*100+9]: [1, 0, 0, 0, 0],
  [CUBE_MATERIALS_MAP.paper*100+10]: [0, 1, 0, 0, 0],
  [CUBE_MATERIALS_MAP.plastic*100+1]: [0, 0, 0, 1, 0],
  [CUBE_MATERIALS_MAP.plastic*100+2]: [1, 1, 1, 1, 1],
  [CUBE_MATERIALS_MAP.plastic*100+3]: [0, 0, 1, 0, 0],
  [CUBE_MATERIALS_MAP.plastic*100+4]: [1, 0, 0, 0, 0],
  [CUBE_MATERIALS_MAP.plastic*100+5]: [0, 1, 0, 0, 0],
  [CUBE_MATERIALS_MAP.plastic*100+6]: [0, 0, 0, 0, 1],
};

const _CUBE_MATERIALS = {
  [CUBE_MATERIALS_MAP.diamond]: {
    material_id: CUBE_MATERIALS_MAP.diamond,
    name: 'diamond',
    variants: {
      1: {color: '#93A2B3', emissive: '#1B0F55',},
      2: {color: '#ff0000', emissive: '#0c0043',},
      3: {color: '#00b35f', emissive: '#021409',},
      4: {color: '#c88d00', emissive: '#390000',},
      5: {color: '#c80046', emissive: '#0d0039',}
    },
    point: 3000,
    tier: CUBE_TIER_MAP.legend,
  },
  [CUBE_MATERIALS_MAP.gold]: {
    material_id: CUBE_MATERIALS_MAP.gold,
    name: 'gold',
    variants: {
      1: {color: '#ffffff', emissive: '#573107'}
    },
    point: 350,
    tier: CUBE_TIER_MAP.epic,
  },
  [CUBE_MATERIALS_MAP.ice]: {
    material_id: CUBE_MATERIALS_MAP.ice,
    name: 'ice',
    variants: {
      1: {color: '#5d6569', emissive: '#222222'},
      2: {color: '#8c2e44', emissive: '#250505'},
      3: {color: '#4b7046', emissive: '#13191e'},
      4: {color: '#823228', emissive: '#25051c'},
      5: {color: '#725e1a', emissive: '#250505'}
    },
    point: 300,
    tier: CUBE_TIER_MAP.epic,
  },
  [CUBE_MATERIALS_MAP.silver]: {
    material_id: CUBE_MATERIALS_MAP.silver,
    name: 'silver',
    variants: {
      1: {color: '#afafaf', emissive: '#181818'},
      2: {color: '#907898', emissive: '#100425'},
      3: {color: '#4eaafc', emissive: '#100425'},
      4: {color: '#dc3b3b', emissive: '#901090'},
      5: {color: '#af750d', emissive: '#4d0048'}
    },
    point: 300,
    tier: CUBE_TIER_MAP.epic,
  },
  [CUBE_MATERIALS_MAP.iron]: {
    material_id: CUBE_MATERIALS_MAP.iron,
    name: 'iron',
    variants: {
      1: {color: '#7a8287', emissive: '#1f1431'},
      2: {color: '#9d2f2f', emissive: '#100425'},
      3: {color: '#972f9d', emissive: '#100425'},
      4: {color: '#2f769d', emissive: '#2f0331'},
      5: {color: '#2f9d49', emissive: '#310319'},
      6: {color: '#9b810a', emissive: '#310319'},
      7: {color: '#9b450a', emissive: '#311303'},
      8: {color: '#665252', emissive: '#180c05'}
    },
    point: 55,
    tier: CUBE_TIER_MAP.rare,
  },
  [CUBE_MATERIALS_MAP.stone]: {
    material_id: CUBE_MATERIALS_MAP.stone,
    name: 'stone',
    variants: {
      1: {color: '#4a4a48', emissive: '#1e130c'},
      2: {color: '#5f2929', emissive: '#1e0c01'},
      3: {color: '#5f295b', emissive: '#1b0c02'},
      4: {color: '#0f2a3e', emissive: '#1b0c02'},
      5: {color: '#18433b', emissive: '#1b0c02'},
      6: {color: '#52451b', emissive: '#1b0c02'},
      7: {color: '#552d1c', emissive: '#160303'},
      8: {color: '#39261e', emissive: '#220501'}
    },
    point: 50,
    tier: CUBE_TIER_MAP.rare,
  },
  [CUBE_MATERIALS_MAP.wood]: {
    material_id: CUBE_MATERIALS_MAP.wood,
    name: 'wood',
    variants: {
      1: {color: '#89561b', emissive: '#3e0000'},
      2: {color: '#6b3030', emissive: '#340000'},
      3: {color: '#993cb6', emissive: '#340000'},
      4: {color: '#3e68a4', emissive: '#170822'},
      5: {color: '#7a3ea4', emissive: '#170822'},
      6: {color: '#3ea462', emissive: '#021100'},
      7: {color: '#b69034', emissive: '#66170c'},
      8: {color: '#cab47e', emissive: '#412a27'}
    },
    point: 50,
    tier: CUBE_TIER_MAP.rare,
  },
  [CUBE_MATERIALS_MAP.brick]: {
    material_id: CUBE_MATERIALS_MAP.brick,
    name: 'brick',
    variants: {
      1: {color: '#6b4d2b', emissive: '#2d0000'},
      2: {color: '#611717', emissive: '#160707'},
      3: {color: '#5c2c4e', emissive: '#0f0303'},
      4: {color: '#2c315c', emissive: '#000709'},
      5: {color: '#2c5c56', emissive: '#010009'},
      6: {color: '#2c5c34', emissive: '#050f00'},
      7: {color: '#825920', emissive: '#2f1b00'},
      8: {color: '#696969', emissive: '#2f1b00'},
      9: {color: '#10110d', emissive: '#090909'},
    },
    price: 0.0005,
    is_for_sale: true,
    point: 5,
    tier: CUBE_TIER_MAP.common,
  },
  [CUBE_MATERIALS_MAP.leaf]: {
    material_id: CUBE_MATERIALS_MAP.leaf,
    name: 'leaf',
    variants: {
      1: {color: '#646464', emissive: '#011603'},
      2: {color: '#441ba7', emissive: '#0d0d43'},
      3: {color: '#911414', emissive: '#200b25'},
      4: {color: '#e84603', emissive: '#221746'},
      5: {color: '#6608ed', emissive: '#160320'},
      6: {color: '#781a6d', emissive: '#0e0a1b'},
    },
    price: 0.0005,
    is_for_sale: true,
    point: 5,
    tier: CUBE_TIER_MAP.common,
  },
  [CUBE_MATERIALS_MAP.fur]: {
    material_id: CUBE_MATERIALS_MAP.fur,
    name: 'fur',
    variants: {
      1: {color: '#78593b', emissive: '#221822'},
      2: {color: '#7d2323', emissive: '#220808'},
      3: {color: '#7454c0', emissive: '#220808'},
      4: {color: '#3d78cd', emissive: '#000034'},
      5: {color: '#227553', emissive: '#0f2500'},

      6: {color: '#be9126', emissive: '#250000'},
      7: {color: '#a75419', emissive: '#250000'},
      8: {color: '#6e472c', emissive: '#2a0707'},
      9: {color: '#7e7e7f', emissive: '#090909'},
      10: {color: '#363637', emissive: '#090909'},
    },
    price: 0.0005,
    is_for_sale: true,
    point: 5,
    tier: CUBE_TIER_MAP.common,
  },
  [CUBE_MATERIALS_MAP.paper]: {
    material_id: CUBE_MATERIALS_MAP.paper,
    name: 'paper',
    variants: {
      1: {color: '#7f0000', emissive: '#7d2424'},
      2: {color: '#7f0043', emissive: '#91253f'},
      3: {color: '#0b3787', emissive: '#183f9d'},
      4: {color: '#450b87', emissive: '#4d1f82'},
      5: {color: '#0b8778', emissive: '#0a5178'},

      6: {color: '#0b8719', emissive: '#194d31'},
      7: {color: '#756808', emissive: '#8e6212'},
      8: {color: '#ac681c', emissive: '#8e3012'},
      9: {color: '#757575', emissive: '#64544f'},
      10: {color: '#2a2a29', emissive: '#0c0b0b'}
    },
    price: 0.0005,
    is_for_sale: true,
    point: 5,
    tier: CUBE_TIER_MAP.common,
  },
  [CUBE_MATERIALS_MAP.plastic]: {
    material_id: CUBE_MATERIALS_MAP.plastic,
    name: 'plastic',
    variants: {
      1: {color: '#d70000', emissive: '#000000'},
      2: {color: '#6500d7', emissive: '#7d2424'},
      3: {color: '#0032d7', emissive: '#7d2424'},
      4: {color: '#0071d7', emissive: '#7d2424'},
      5: {color: '#006919', emissive: '#7d2424'},
      6: {color: '#695000', emissive: '#7d2424'},
    },
    point: 1,
    tier: CUBE_TIER_MAP.basic,
  },
};

export const CUBE_MATERIALS = ObjUtils.CloneWithValueModify(_CUBE_MATERIALS, (cKey, cube) => {
  return {
    ...cube,
    material_id: parseInt(cKey),
    img: require(`../shared/img/store_cubegoes/${cube.name}.png`),
    icon: require(`../shared/img/cubego-icons/${Utils.AddHeadingZero(cKey, 3)}.png`),
    variants: ObjUtils.CloneWithValueModify(cube.variants, (vKey, variant) => ({
      ...variant,
      material_id: parseInt(cKey),
      variant_id: parseInt(vKey),
      materialKey: cube.name,
      img: require(`../shared/img/cubego-variants/${Utils.AddHeadingZero(cKey, 3)}_${Utils.AddHeadingZero(vKey, 2)}.png`),
      type_points: SUB_MATERIAL_TYPE_POINTS[parseInt(cKey)*100+parseInt(vKey)],
      // img: cKey === '12' ? null : require(`../shared/img/cubego-variants/001_01.png`),
    })),
    types: ObjUtils.CloneWithValueModify(CUBE_TYPES, (tKey) => {
      return Object.keys(cube.variants).filter(vKey => {
        return SUB_MATERIAL_TYPE_POINTS[parseInt(cKey)*100+parseInt(vKey)][tKey-1];
      })
    })
  }
});

