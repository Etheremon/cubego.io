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
      1: {color: '#565530'},
      2: {color: '#874c44'},
    },
  },
  12: {
    name: 'plastic',
    variants: {
      1: {color: '#2a5626'},
      2: {color: '#654c42'},
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
      material_id: parseInt(cKey),
      variant_id: parseInt(vKey),
      materialKey: cube.name,
      img: require(`../shared/img/cubego-variants/${Utils.AddHeadingZero(cKey, 3)}_${Utils.AddHeadingZero(vKey, 2)}.png`),
    })),
  }
});

