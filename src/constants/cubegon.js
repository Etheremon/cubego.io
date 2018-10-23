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
    img: require('../shared/img/icons/badge-challenger.png'),
  },
  elite: {
    id: 1,
    name: 'Elite',
    points: [6000, 25999],
    stats: [561, 640],
    img: require('../shared/img/icons/badge-elite.png'),
  },
  champion: {
    id: 2,
    name: 'Champion',
    points: [26000, 67999],
    stats: [641, 800],
    img: require('../shared/img/icons/badge-champion.png'),
  },
  god: {
    id: 3,
    name: 'God',
    points: [68000, 68000],
    stats: [801, 1000],
    img: require('../shared/img/icons/badge-god.png'),
  },
};