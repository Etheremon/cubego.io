import * as Utils from "./utils/utils";
import {CUBE_TIER, CUBE_TIER_MAP} from "./constants/cubego";

let _currentTime = new Date();

_currentTime.setMinutes(Math.floor(_currentTime.getMinutes()/10)*10);

export const PRESALE_DATE = Utils.IsLiveServer ? 'Nov 24 2018 1:00 UTC' : _currentTime.toUTCString();
export const START_PRESALE = Date.now() > (new Date(PRESALE_DATE)).getTime();

export const ENABLE_MODEL_SUBMIT = true;//!Utils.IsLiveServer;
export const SHOW_CLOSEST_MODEL = Utils.IsLocalhost;

export const PRESALE_PACK_DISCOUNT = [{id: 1, discount: 0}, {id: 3, discount: 0}, {id: 6, discount: 0.05}, {id: 10, discount: 0.1}];

export const TIME_TO_REFRESH = 15 * 60 * 1000;

export const CUBEGON_MAX_CUBE = 2000;
export const CUBEGON_MAX_MATERIALS = 4;
export const CLAIM_AIRDROP_OFFSET = 2;

// CASE TEST CONFIG
let _ethToEmont, _ultimatePrice, _epicPrice, _rarePrice;

if (window.currentNetwork === window.NETWORKS.rinkeby) {
  _ethToEmont = 2000;
  _ultimatePrice = 1.02;
  _epicPrice = 0.5;
  _rarePrice = 0.3;
}
// CASE LIVE CONFIG
else {
  _ethToEmont = 1500;
  _ultimatePrice = 1.25;
  _epicPrice = 0.7;
  _rarePrice = 0.4;
}


// export const SERVER_URL = 'http://localhost:8080';
export const SERVER_URL = window.currentNetwork === window.NETWORKS.rinkeby ? 'http://test.cubego.io' : 'https://www.cubego.io';
export const IMAGE_URL = window.currentNetwork === window.NETWORKS.rinkeby ? 'http://test.cubego.io/cubego_image_test': 'https://www.cubego.io/cubego_image';

export const ethToEmont = _ethToEmont;

export const ultimatePack = {
  name: 'ultimate pack',
  quantity: 200,
  price_eth: _ultimatePrice,
  price_emont: _ultimatePrice * ethToEmont,
  cubes: [
    {type: 'gold', quantity: 16, tier: CUBE_TIER[CUBE_TIER_MAP.epic].name},
    {type: 'ice', quantity: 18, tier: CUBE_TIER[CUBE_TIER_MAP.epic].name},
    {type: 'silver', quantity: 18, tier: CUBE_TIER[CUBE_TIER_MAP.epic].name},
    {type: 'iron', quantity: 48, tier: CUBE_TIER[CUBE_TIER_MAP.rare].name},
    {type: 'stone', quantity: 50, tier: CUBE_TIER[CUBE_TIER_MAP.rare].name},
    {type: 'wood', quantity: 50, tier: CUBE_TIER[CUBE_TIER_MAP.rare].name},
  ],
};

export const presaleCubegoes = [
  {
    pack_id: 4,
    name: 'gold pack',
    type: 'gold',
    quantity: 40,
    price_eth: _epicPrice,
    price_emont: _epicPrice * ethToEmont,
    power: 350,
    tier: CUBE_TIER[CUBE_TIER_MAP.epic].name
  },
  {
    pack_id: 5,
    name: 'ice pack',
    type: 'ice',
    quantity: 45,
    price_eth: _epicPrice,
    price_emont: _epicPrice * ethToEmont,
    power: 300,
    tier: CUBE_TIER[CUBE_TIER_MAP.epic].name
  },
  {
    pack_id: 6,
    name: 'silver pack',
    type: 'silver',
    quantity: 45,
    price_eth: _epicPrice,
    price_emont: _epicPrice * ethToEmont,
    power: 300,
    tier: CUBE_TIER[CUBE_TIER_MAP.epic].name
  },
  {
    pack_id: 1,
    name: 'iron pack',
    type: 'iron',
    quantity: 120,
    price_eth: _rarePrice,
    price_emont: _rarePrice * ethToEmont,
    power: 55,
    tier: CUBE_TIER[CUBE_TIER_MAP.rare].name
  },
  {
    pack_id: 2,
    name: 'stone pack',
    type: 'stone',
    quantity: 125,
    price_eth: _rarePrice,
    price_emont: _rarePrice * ethToEmont,
    power: 50,
    tier: CUBE_TIER[CUBE_TIER_MAP.rare].name
  },
  {
    pack_id: 3,
    name: 'wood pack',
    type: 'wood',
    quantity: 125,
    price_eth: _rarePrice,
    price_emont: _rarePrice * ethToEmont,
    power: 50,
    tier: CUBE_TIER[CUBE_TIER_MAP.rare].name
  },
];