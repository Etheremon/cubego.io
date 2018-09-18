import * as PIXI from "pixi.js";
let assetsStore = {};

export const ASSET_TYPE = {
  IMAGE: '@img',
  SPRITE_SHEET: '@spriteSheet',
  TMX: '@tmx'
};

let resolve = {};
resolve[ASSET_TYPE.IMAGE] = function (params) {
  let r = assetsStore[params[1]];
  if (r) {
    return r.data.texture;
  } else {
    return PIXI.Texture.EMPTY;
  }
};
resolve[ASSET_TYPE.TMX] = function (params) {
  let r = assetsStore[params[1]];
  if (r) {
    return r.data;
  } else {
    return null;
  }
};
resolve[ASSET_TYPE.SPRITE_SHEET] = function (params) {
  let r = assetsStore[params[1]];
  if (r) {
    if (!r.frames) {
      const h = r.data.data.height / r.options.frameHeight;
      const w = r.data.data.width / r.options.frameWidth;
      r.frames = [];
      for (let i = 0; i < h * w; i++) {
        let rect = new PIXI.Rectangle(i % w * r.options.frameWidth,
          Math.floor(i / w) * r.options.frameHeight,
          r.options.frameWidth, r.options.frameHeight);
        r.frames.push(new PIXI.Texture(r.data.texture, rect));
      }
    }
    return r.frames;
  } else {
    return [PIXI.Texture.EMPTY];
  }
};

function resolveAsset(id) {
  let params = id.split('/');
  return resolve[params[0]](params);
}

function addAsset(name, data) {
  let nameData = name.split('/');
  let type = nameData[0];
  let id = nameData[1];
  assetsStore[id] = {type, id, name, data, options: {}};
  if (type === ASSET_TYPE.SPRITE_SHEET) {
    assetsStore[id].options.frameWidth = parseInt(nameData[2]);
    assetsStore[id].options.frameHeight = parseInt(nameData[3]);
  }
}

const AssetsManager = {
  resolveAsset: resolveAsset,
  addAsset: addAsset
};

export default AssetsManager;
