import * as ObjUtils from "../utils/objUtils";
import * as Utils from "../utils/utils";

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
    name: 'diamond',
    variants: {
      1: {color: '#123456'},
      2: {color: '#654321'},
    },
  },
  2: {
    name: 'gold',
    variants: {
      1: {color: '#2e5626'},
      2: {color: '#652837'},
    },
  },
  3: {
    name: 'ice',
    variants: {
      1: {color: '#195610'},
      2: {color: '#311f65'},
    },
  },
  4: {
    name: 'silver',
    variants: {
      1: {color: '#45ed2c'},
      2: {color: '#126545'},
    },
  },
  5: {
    class_id: 5,
    name: 'iron',
    variants: {
      1: {color: '#195610'},
      2: {color: '#bca247'},
    },
  },
  6: {
    name: 'stone',
    variants: {
      1: {color: '#562247'},
      2: {color: '#126545'},
    },
  },
  7: {
    name: 'wood',
    variants: {
      1: {color: '#195610'},
      2: {color: '#655a2e'},
    },
  },
  8: {
    name: 'brick',
    variants: {
      1: {color: '#155636'},
      2: {color: '#126545'},
    },
  },
  9: {
    name: 'leaf',
    variants: {
      1: {color: '#202c1a'},
      2: {color: '#576513'},
    },
  },
  10: {
    name: 'fur',
    variants: {
      1: {color: '#26a4e4'},
      2: {color: '#4b4b4b'},
    },
  },
  11: {
    name: 'paper',
    variants: {
      1: {color: '#565530', emissive: '#dddddd'},
      2: {color: '#874c44'},
    },
  },
  12: {
    name: 'plastic',
    variants: {
      1: {r: 140, g: 102, b: 177, a: 1, color: '#8c66b1'},
      2: {r: 163, g: 77, b: 163, a: 1, color: '#a34da3'},
      3: {r: 228, g: 55, b: 153, a: 1, color: '#E43799'},
      4: {r: 248, g: 79, b: 175, a: 1, color: '#F84FAF'},
      5: {r: 221, g: 147, b: 223, a: 1, color: '#DD93DF'},
      6: {r: 210, g: 211, b: 253, a: 1, color: '#D2D3FD'},
      7: {r: 236, g: 246, b: 254, a: 1, color: '#ECF6FE'},
      8: {r: 250, g: 254, b: 255, a: 1, color: '#FAFEFF'},
      9: {r: 255, g: 106, b: 112, a: 1, color: '#FF6A70'},
      10: {r: 255, g: 91, b: 98, a: 1, color: '#FF5B62'},
      11: {r: 251, g: 75, b: 87, a: 1, color: '#FB4B57'},
      12: {r: 199, g: 67, b: 79, a: 1, color: '#C7434F'},
      13: {r: 119, g: 64, b: 74, a: 1, color: '#77404A'},
      14: {r: 64, g: 61, b: 67, a: 1, color: '#403D43'},
      15: {r: 47, g: 54, b: 56, a: 1, color: '#2F3638'},
      16: {r: 63, g: 66, b: 66, a: 1, color: '#3F4242'},
      17: {r: 49, g: 166, b: 138, a: 1, color: '#31A68A'},
      18: {r: 28, g: 167, b: 119, a: 1, color: '#1CA777'},
      19: {r: 44, g: 180, b: 101, a: 1, color: '#2CB465'},
      20: {r: 90, g: 174, b: 102, a: 1, color: '#5AAE66'},
      21: {r: 139, g: 157, b: 129, a: 1, color: '#8B9D81'},
      22: {r: 144, g: 161, b: 167, a: 1, color: '#90A1A7'},
      23: {r: 106, g: 189, b: 195, a: 1, color: '#6ABDC3'},
      24: {r: 95, g: 205, b: 207, a: 1, color: '#5FCDCF'},
      25: {r: 56, g: 159, b: 198, a: 1, color: '#389FC6'},
      26: {r: 75, g: 150, b: 175, a: 1, color: '#4B96AF'},
      27: {r: 154, g: 149, b: 132, a: 1, color: '#9A9584'},
      28: {r: 213, g: 162, b: 123, a: 1, color: '#D5A27B'},
      29: {r: 244, g: 189, b: 139, a: 1, color: '#F4BD8B'},
      30: {r: 251, g: 213, b: 133, a: 1, color: '#FBD585'},
      31: {r: 251, g: 227, b: 99, a: 1, color: '#FBE363'},
      32: {r: 250, g: 232, b: 96, a: 1, color: '#FAE860'},
    },
  },
};

export const CUBE_MATERIALS = ObjUtils.CloneWithModify(_CUBE_MATERIALS, (cKey, cube) => {
  return {
    ...cube,
    class_id: parseInt(cKey),
    img: require(`../shared/img/cubegoes/${Utils.AddHeadingZero(cKey, 3)}.png`),
    variants: ObjUtils.CloneWithModify(cube.variants, (vKey, variant) => ({
      ...variant,
      variant: variant,
      material_id: parseInt(cKey),
      variant_id: parseInt(vKey),
      materialKey: cube.name,
      img: cKey === '12' ? null : require(`../shared/img/cubego-variants/${Utils.AddHeadingZero(cKey, 3)}_${Utils.AddHeadingZero(vKey, 2)}.png`),
    })),
  }
});

export const CUBE_MATERIALS_NAME_TO_ID = {
  plastic: 12,
};
