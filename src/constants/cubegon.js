export const GON_STATUS = {
  INIT: 0,
  PENDING: 1,
  VALID: 2,
  DELETED: 3,
};

export const GON_TIER = {
  challenger: {
    id: 0,
    name: 'Challenger',
    points: [1, 5999],
    stats: [400, 560],
    img: require('../shared/img/badges/badge-challenger.png'),
    img_ne: require('../shared/img/badges/badge-challenger-ne.png'),
  },
  elite: {
    id: 1,
    name: 'Elite',
    points: [6000, 25999],
    stats: [561, 640],
    img: require('../shared/img/badges/badge-elite.png'),
    img_ne: require('../shared/img/badges/badge-elite-ne.png'),
  },
  champion: {
    id: 2,
    name: 'Champion',
    points: [26000, 67999],
    stats: [641, 800],
    img: require('../shared/img/badges/badge-champion.png'),
    img_ne: require('../shared/img/badges/badge-champion-ne.png'),
  },
  god: {
    id: 3,
    name: 'God',
    points: [68000, 68000],
    stats: [801, 1000],
    img: require('../shared/img/badges/badge-god.png'),
    img_ne: require('../shared/img/badges/badge-god-ne.png'),
  },
};

export const ENERGY_LIMIT_PRICE = {
  10: 0.05,
  20: 0.09,
  50: 0.12,
  100: 0.15,
};