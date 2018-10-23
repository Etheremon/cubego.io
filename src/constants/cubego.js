import * as ObjUtils from "../utils/objUtils";
import * as Utils from "../utils/utils";

export const CUBE_TIER = {
  legend: 1,
  epic: 2,
  rare: 3,
  common: 4,
  basic: 5,
};

export const CUBE_TYPES = {
  1: {
    name: 'air',
  },
  2: {
    name: 'grass',
  },
  3: {
    name: 'water',
  },
  4: {
    name: 'fire',
  },
  5: {
    name: 'earth',
  },
};

const _CUBE_MATERIALS = {
  1: {
    class_id: 1,
    name: 'diamond',
    variants: {
      1: {color: '#93A2B3', emissive: '#1B0F55'},
      2: {color: '#ff0000', emissive: '#0c0043'},
      3: {color: '#00b35f', emissive: '#021409'},
      4: {color: '#c88d00', emissive: '#390000'},
      5: {color: '#c80046', emissive: '#0d0039'}
    },
    point: 3000,
    tier: CUBE_TIER.legend,
  },
  2: {
    class_id: 2,
    name: 'gold',
    variants: {
      1: {color: '#ffffff', emissive: '#573107'}
    },
    point: 350,
    tier: CUBE_TIER.epic,
  },
  3: {
    class_id: 3,
    name: 'ice',
    variants: {
      1: {color: '#5d6569', emissive: '#222222'},
      2: {color: '#8c2e44', emissive: '#250505'},
      3: {color: '#4b7046', emissive: '#13191e'},
      4: {color: '#823228', emissive: '#25051c'},
      5: {color: '#725e1a', emissive: '#250505'}
    },
    point: 300,
    tier: CUBE_TIER.epic,
  },
  4: {
    class_id: 4,
    name: 'silver',
    variants: {
      1: {color: '#afafaf', emissive: '#181818'},
      2: {color: '#907898', emissive: '#100425'},
      3: {color: '#4eaafc', emissive: '#100425'},
      4: {color: '#dc3b3b', emissive: '#901090'},
      5: {color: '#af750d', emissive: '#4d0048'}
    },
    point: 300,
    tier: CUBE_TIER.epic,
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
    tier: CUBE_TIER.rare,
  },
  6: {
    class_id: 6,
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
    tier: CUBE_TIER.rare,
  },
  7: {
    class_id: 7,
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
    tier: CUBE_TIER.rare,
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
    tier: CUBE_TIER.common,
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
      6: {color: '#781a6d', emissive: '#0e0a1b'},
    },
    price: 0.0005,
    is_for_sale: true,
    point: 5,
    tier: CUBE_TIER.common,
  },
  10: {
    class_id: 10,
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
    tier: CUBE_TIER.common,
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
      9: {color: '#757575', emissive: '#64544f'},
      10: {color: '#2a2a29', emissive: '#0c0b0b'}
    },
    price: 0.0005,
    is_for_sale: true,
    point: 5,
    tier: CUBE_TIER.common,
  },
  12: {
    class_id: 12,
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
    tier: CUBE_TIER.basic,
  },
};

export const CUBE_MATERIALS = ObjUtils.CloneWithModify(_CUBE_MATERIALS, (cKey, cube) => {
  return {
    ...cube,
    class_id: parseInt(cKey),
    img: require(`../shared/img/cubegoes/${Utils.AddHeadingZero(cKey, 3)}.png`),
    variants: ObjUtils.CloneWithModify(cube.variants, (vKey, variant) => ({
      ...variant,
      material_id: parseInt(cKey),
      variant_id: parseInt(vKey),
      materialKey: cube.name,
      img: require(`../shared/img/cubego-variants/${Utils.AddHeadingZero(cKey, 3)}_${Utils.AddHeadingZero(vKey, 2)}.png`),
      // img: cKey === '12' ? null : require(`../shared/img/cubego-variants/001_01.png`),
    })),
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
