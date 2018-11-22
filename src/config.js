import * as Utils from "./utils/utils";

export const SERVER_URL = Utils.IsLiveServer ? 'https://www.cubego.io' : 'http://test.cubego.io';
export const IMAGE_URL = Utils.IsLiveServer ? 'https://www.cubego.io/cubego_image' : 'http://test.cubego.io/cubego_image_test';

let _currentTime = new Date();
_currentTime.setMinutes(Math.round(_currentTime.getMinutes()/10)*10);

export const PRESALE_DATE = Utils.IsLiveServer ? 'Nov 24 2018 1:00 UTC' : _currentTime.toUTCString();
export const START_PRESALE = Date.now() > (new Date(PRESALE_DATE)).getTime();

export const ENABLE_MODEL_SUBMIT = Utils.IsLocalhost;
export const SHOW_CLOSEST_MODEL = Utils.IsLocalhost;

export const PRESALE_PACK_DISCOUNT = [{id: 1, discount: 0}, {id: 3, discount: 0}, {id: 6, discount: 0.05}, {id: 10, discount: 0.1}];

export const TIME_TO_REFRESH = 15 * 60 * 1000;