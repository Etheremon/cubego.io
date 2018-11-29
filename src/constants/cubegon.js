export const GON_STATUS = {
  INIT: 0,
  PENDING: 1,
  VALID: 2,
  DELETED: 3,
};

export const GON_FLAG = {
  NONE: 0,
  ORIGINAL: 1,
};

export const GON_TIER = {
  challenger: {
    id: 0,
    name: 'Challenger',
    points: [1, 5999],
    stats: [400, 559],
    img: require('../shared/img/badges/badge-challenger.png'),
    img_ne: require('../shared/img/badges/badge-challenger-ne.png'),
  },
  elite: {
    id: 1,
    name: 'Elite',
    points: [6000, 25999],
    stats: [560, 639],
    img: require('../shared/img/badges/badge-elite.png'),
    img_ne: require('../shared/img/badges/badge-elite-ne.png'),
  },
  champion: {
    id: 2,
    name: 'Champion',
    points: [26000, 67999],
    stats: [640, 799],
    img: require('../shared/img/badges/badge-champion.png'),
    img_ne: require('../shared/img/badges/badge-champion-ne.png'),
  },
  god: {
    id: 3,
    name: 'God',
    points: [68000, 120000],
    stats: [800, 1000],
    img: require('../shared/img/badges/badge-god.png'),
    img_ne: require('../shared/img/badges/badge-god-ne.png'),
  },
};

export const ENERGY_LIMIT_PRICE = {
  10: 0.05,
  20: 0.09,
  30: 0.12,
  50: 0.15,
};