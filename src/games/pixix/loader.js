import AssetsManager, {ASSET_TYPE} from "./assetsManager";
import * as tmx from "tmx-parser";
import * as path from "path";
import * as PIXI from "pixi.js";

let addedIds = [];
PIXI.loader.onProgress.add((_, data) => {
  AssetsManager.addAsset(data.name, data);
});

PIXI.loader.onError.add((_, data) => {
  console.warn('Error loading ' + data.name);
});

function addAsset(id, path) {
  if (addedIds.indexOf(id) > -1) return;
  addedIds.push(id);
  return PIXI.loader.add(`${ASSET_TYPE.IMAGE}/${id}`, path);
}

function addSpriteSheet(id, path, frameWidth, frameHeight) {
  if (!frameWidth || !frameWidth) {
    console.warn('Load SpriteSheet need frameWidth & frameWidth');
    return;
  }
  if (addedIds.indexOf(id) > -1) return;
  addedIds.push(id);
  return PIXI.loader.add(`${ASSET_TYPE.SPRITE_SHEET}/${id}/${frameWidth}/${frameHeight}`, path);
}

function addTmxMap(id, tmxPath) {
  if (addedIds.indexOf(id) > -1) return;
  return PIXI.loader
    .add(`${ASSET_TYPE.TMX}/${id}`, tmxPath)
    .use(tiledMapLoaderMiddleware);
}

function load() {
  return PIXI.loader.load();
}

function addLoadingCallback(fn) {
  PIXI.loader.onProgress.add(fn);
}

function addCompleteCallback(fn) {
  PIXI.loader.onComplete.add(fn);
}

function reset() {
  PIXI.loader.reset();
  PIXI.loader.onComplete.detachAll();
}

function tiledMapLoaderMiddleware(resource, next) {
  if (!(resource.extension === 'tmx')) return next();

  let route = path.dirname(resource.url.replace(this.baseUrl, ''));
  tmx.parse(resource.xhr.responseText, route, function (err, map) {
    if (err) throw err;
    resource.data = map;
    next();
  });
}

const Loader = {
  progress: PIXI.loader.progress,
  addLoadingCallback,
  addCompleteCallback,
  addAsset,
  addTmxMap,
  addSpriteSheet,
  load,
  reset,
};

export default Loader;
