import * as ObjUtils from "../utils/objUtils";
import * as Utils from "../utils/utils";

export const CUBE_TIER = {
  1: {
    id: 1,
    name: 'legendary',
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

export const CUBE_TYPES = {
  1: {
    id: 1,
    name: 'air',
    img: require('../shared/img/types/air.png'),
  },
  2: {
    id: 2,
    name: 'grass',
    img: require('../shared/img/types/grass.png'),
  },
  3: {
    id: 3,
    name: 'water',
    img: require('../shared/img/types/water.png'),
  },
  4: {
    id: 4,
    name: 'fire',
    img: require('../shared/img/types/fire.png'),
  },
  5: {
    id: 5,
    name: 'earth',
    img: require('../shared/img/types/earth.png'),
  },
};

export const CUBE_TYPES_MAP = {
  air: 1,
  grass: 2,
  water: 3,
  fire: 4,
  earth: 5,
};


export const SUB_MATERIAL_TYPE_POINTS = {
  [101]: [0, 0, 1, 0, 0],
  [102]: [0, 0, 0, 1, 0],
  [103]: [0, 1, 0, 0, 0],
  [104]: [0, 0, 0, 0, 1],
  [105]: [1, 0, 0, 0, 0],
  [201]: [0, 0, 0, 1, 1],
  [301]: [1, 0, 1, 0, 0],
  [302]: [0, 1, 0, 1, 0],
  [303]: [0, 1, 1, 0, 0],
  [304]: [1, 0, 0, 1, 0],
  [305]: [1, 0, 0, 0, 1],
  [401]: [1, 0, 0, 0, 1],
  [402]: [0, 0, 1, 1, 0],
  [403]: [0, 1, 1, 0, 0],
  [404]: [1, 0, 0, 1, 0],
  [405]: [0, 1, 0, 0, 1],
  [501]: [0, 0, 0, 1, 1],
  [502]: [1, 0, 0, 0, 0],
  [503]: [0, 0, 0, 1, 0],
  [504]: [0, 1, 1, 0, 0],
  [505]: [0, 0, 1, 0, 0],
  [506]: [0, 1, 0, 0, 0],
  [507]: [1, 0, 0, 1, 0],
  [508]: [0, 0, 0, 0, 1],
  [601]: [1, 0, 0, 0, 0],
  [602]: [0, 0, 0, 1, 0],
  [603]: [0, 1, 1, 0, 0],
  [604]: [0, 0, 1, 0, 0],
  [605]: [0, 1, 0, 0, 0],
  [606]: [1, 0, 0, 1, 0],
  [607]: [0, 1, 0, 0, 1],
  [608]: [0, 0, 0, 0, 1],
  [701]: [0, 0, 0, 0, 1],
  [702]: [0, 0, 0, 1, 1],
  [703]: [0, 1, 1, 0, 0],
  [704]: [0, 0, 1, 0, 0],
  [705]: [1, 0, 1, 0, 1],
  [706]: [0, 1, 0, 0, 0],
  [707]: [0, 0, 0, 1, 0],
  [708]: [1, 0, 0, 0, 0],
  [801]: [0, 0, 0, 0, 1],
  [802]: [0, 0, 0, 1, 0],
  [803]: [1, 0, 0, 0, 0],
  [804]: [0, 0, 1, 0, 0],
  [805]: [0, 0, 1, 0, 0],
  [806]: [0, 1, 0, 0, 0],
  [807]: [0, 0, 0, 0, 1],
  [808]: [1, 0, 0, 0, 0],
  [809]: [0, 0, 0, 1, 0],
  [901]: [0, 1, 0, 0, 0],
  [902]: [0, 0, 1, 0, 0],
  [903]: [0, 0, 0, 1, 0],
  [904]: [0, 0, 0, 0, 1],
  [905]: [1, 0, 0, 0, 0],
  [906]: [0, 1, 0, 0, 0],
  [1001]: [0, 0, 0, 0, 1],
  [1002]: [0, 0, 0, 1, 0],
  [1003]: [1, 0, 0, 0, 0],
  [1004]: [0, 0, 1, 0, 0],
  [1005]: [0, 1, 0, 0, 0],
  [1006]: [0, 0, 0, 0, 1],
  [1007]: [0, 0, 0, 1, 0],
  [1008]: [0, 1, 0, 0, 0],
  [1009]: [1, 0, 0, 0, 0],
  [1010]: [0, 0, 1, 0, 0],
  [1101]: [0, 0, 0, 1, 0],
  [1102]: [0, 0, 0, 1, 0],
  [1103]: [0, 0, 1, 0, 0],
  [1104]: [1, 0, 0, 0, 0],
  [1105]: [0, 0, 1, 0, 0],
  [1106]: [0, 1, 0, 0, 0],
  [1107]: [0, 0, 0, 0, 1],
  [1108]: [0, 0, 0, 0, 1],
  [1109]: [1, 0, 0, 0, 0],
  [1110]: [0, 1, 0, 0, 0],
  [1201]: [0, 0, 0, 1, 0],
  [1202]: [1, 1, 1, 1, 1],
  [1203]: [0, 0, 1, 0, 0],
  [1204]: [1, 0, 0, 0, 0],
  [1205]: [0, 1, 0, 0, 0],
  [1206]: [0, 0, 0, 0, 1],
};

const _CUBE_MATERIALS = {
  1: {
    class_id: 1,
    name: 'diamond',
    variants: {
      1: {color: '#b6ddf2', emissive: '#232a9b',},
      2: {color: '#f70000', emissive: '#430529',},
      3: {color: '#005521', emissive: '#005521',},
      4: {color: '#ffd100', emissive: '#a74400',},
      5: {color: '#909293', emissive: '#000000',}
    },
    point: 3000,
    tier: CUBE_TIER_MAP.legend,
  },
  2: {
    class_id: 2,
    name: 'gold',
    variants: {
      1: {color: '#ffffff', emissive: '#573107'}
    },
    point: 350,
    tier: CUBE_TIER_MAP.epic,
  },
  3: {
    class_id: 3,
    name: 'ice',
    variants: {
      1: {color: '#a7c7d7', emissive: '#282289'},
      2: {color: '#e81a4a', emissive: '#590404'},
      3: {color: '#4b7046', emissive: '#13191e'},
      4: {color: '#ff7800', emissive: '#480000'},
      5: {color: '#ffc200', emissive: '#7a2b00'}
    },
    point: 300,
    tier: CUBE_TIER_MAP.epic,
  },
  4: {
    class_id: 4,
    name: 'silver',
    variants: {
      1: {color: '#f2f2f2', emissive: '#5c5c5c'},
      2: {color: '#907898', emissive: '#100425'},
      3: {color: '#4eaafc', emissive: '#100425'},
      4: {color: '#ff0d0d', emissive: '#1b001b'},
      5: {color: '#af750d', emissive: '#4d0048'}
    },
    point: 300,
    tier: CUBE_TIER_MAP.epic,
  },
  5: {
    class_id: 5,
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
  6: {
    class_id: 6,
    name: 'stone',
    variants: {
      1: {color: '#c0c0c0', emissive: '#1e130c'},
      2: {color: '#7f0f0f', emissive: '#110000'},
      3: {color: '#781370', emissive: '#02061b'},
      4: {color: '#00599b', emissive: '#02061b'},
      5: {color: '#08701a', emissive: '#02061b'},
      6: {color: '#c09303', emissive: '#1b0a02'},
      7: {color: '#ac5b00', emissive: '#160202'},
      8: {color: '#2f2f2f', emissive: '#000000'}
    },
    point: 50,
    tier: CUBE_TIER_MAP.rare,
  },
  7: {
    class_id: 7,
    name: 'wood',
    variants: {
      1: {color: '#6b6a6a', emissive: '#050505'},
      2: {color: '#e82a2a', emissive: '#4a0101'},
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
  8: {
    class_id: 8,
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
  9: {
    class_id: 9,
    name: 'leaf',
    variants: {
      1: {color: '#646464', emissive: '#011603'},
      2: {color: '#441ba7', emissive: '#0d0d43'},
      3: {color: '#911414', emissive: '#200b25'},
      4: {color: '#e84603', emissive: '#221746'},
      5: {color: '#6608ed', emissive: '#160320'},
      6: {color: '#ff9042', emissive: '#705005'},
    },
    price: 0.0005,
    is_for_sale: true,
    point: 5,
    tier: CUBE_TIER_MAP.common,
  },
  10: {
    class_id: 10,
    name: 'fur',
    variants: {
      1: {color: '#f0b185', emissive: '#2f2a2a'},
      2: {color: '#7d2323', emissive: '#220808'},
      3: {color: '#7454c0', emissive: '#220808'},
      4: {color: '#3d78cd', emissive: '#000034'},
      5: {color: '#227553', emissive: '#0f2500'},

      6: {color: '#be9126', emissive: '#250000'},
      7: {color: '#a75419', emissive: '#250000'},
      8: {color: '#6e472c', emissive: '#2a0707'},
      9: {color: '#a2a2bb', emissive: '#3c3c3c'},
      10: {color: '#363637', emissive: '#090909'},
    },
    price: 0.0005,
    is_for_sale: true,
    point: 5,
    tier: CUBE_TIER_MAP.common,
  },
  11: {
    class_id: 11,
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
      9: {color: '#d7d7d7', emissive: '#a09895'},
      10: {color: '#2a2a29', emissive: '#0c0b0b'}
    },
    price: 0.0005,
    is_for_sale: true,
    point: 5,
    tier: CUBE_TIER_MAP.common,
  },
  12: {
    class_id: 12,
    name: 'plastic',
    variants: {
      1: {color: '#d70000', emissive: '#000000'},
      2: {color: '#6500d7', emissive: '#000000'},
      3: {color: '#0032d7', emissive: '#000000'},
      4: {color: '#0071d7', emissive: '#000000'},
      5: {color: '#006919', emissive: '#000000'},
      6: {color: '#96740b', emissive: '#312a2a'},
    },
    point: 1,
    tier: CUBE_TIER_MAP.basic,
  },
};

export const CUBE_MATERIALS = ObjUtils.CloneWithValueModify(_CUBE_MATERIALS, (cKey, cube) => {
  return {
    ...cube,
    class_id: parseInt(cKey),
    img: require(`../shared/img/cubegoes/${Utils.AddHeadingZero(cKey, 3)}.png`),
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

export const CUBE_MATERIALS_NAME_TO_ID = {
  diamond: 1,
  gold: 2,
  ice: 3,
  silver: 4,
  iron: 5,
  stone: 6,
  wood: 7,
  brick: 8,
  leaf: 9,
  fur: 10,
  paper: 11,
  plastic: 12,
};
