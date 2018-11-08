import * as Utils from "./utils/utils";

// export const SERVER_URL = Utils.IsLocalhost ? 'http://127.0.0.1:8000' : 'https://www.cubego.io';
export const SERVER_URL = 'https://www.cubego.io';

export const PRESALE_DATE = 'Nov 24 2018 00:00 UTC';

export const ENABLE_MODEL_SUBMIT = !Utils.IsLiveServer;
export const SHOW_CLOSEST_MODEL = !Utils.IsLiveServer;