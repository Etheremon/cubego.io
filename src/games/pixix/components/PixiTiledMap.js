import * as PIXI from "pixi.js";
import PixiComponent from "./PixiComponent";
import AssetsManager from "../assetsManager";
import 'pixi-layers';
import {getGame} from "../pixiUtils";
import * as EasyStar from 'easystarjs';


const PERMITTED_PROPS = [
  'alpha',
  'x',
  'y',
  'scale',
  'anchor',
  'renderable',
  'interactiveChildren'
];

const LAYER_TYPE = {
  TILE: 'tile',
  OBJECT: 'object',
};

export default class PixiTiledMap extends PixiComponent {
  constructor(data, mapTexture) {
    super();
    this._tileSets = [];
    this._mapData = data;
    this.width = data.width;
    this.height = data.height;
    this.tileWidth = data.tileWidth;
    this.tileHeight = data.tileHeight;
    this._mapTexture = mapTexture;
    this._tileLayers = [];
    this._objectLayers = [];
    this._otherLayer = [];
    this._objects = null;
    this.collisionLayer = null;
    this.createTileSet();
  }

  findPath(fromX, fromY, toX, toY) {
    if (!this.collisionLayer) return;
    return this.collisionLayer.findPath(fromX, fromY, toX, toY);
  }

  checkCollision(x, y) {
    if (!this.collisionLayer) return true;
    return this.collisionLayer.checkCollision(x, y);
  }

  get objects() {
    if (this._objects !== null) {
      return this._objects;
    }
    this._objects = {};
    this._objectLayers.forEach((layer) => {
      layer.objects.forEach((object) => {
        this._objects[object.type] = object;
      });
    });
    return this._objects;
  }

  createMapRenderer() {
    let container = new PIXI.Container();
    this.createBGLayer(container);
    this.createMapLayer(container);
    container.pivot.set(this.width * this.tileWidth * this.props.anchor.x, this.height * this.tileHeight * this.props.anchor.y);
    return container;
  }

  createTileSet() {
    this._mapData.tileSets.forEach((tileSet) => {
      this._tileSets.push(PixiTileSet.fromTiledTileSet(tileSet, this._mapTexture));
    });
  }

  createBGLayer(container) {
    let background = new PIXI.Graphics();
    background.beginFill(0x000000, 0);
    background.drawRect(0, 0, this.width * this.tileWidth, this.height * this.tileHeight);
    background.endFill();
    container.addChild(background);
    return background
  }

  createMapLayer(container) {
    this._mapData.layers.forEach((layerData) => {
      if (layerData.name === 'Collision') {
        this.collisionLayer = PixiCollisionLayer.newFromTiledData(layerData);
      } else {
        switch (layerData.type) {
          case LAYER_TYPE.TILE:
            let tileLayer = PixiTileLayer.newFromTiledData(layerData, this._tileSets);
            this._tileLayers.push(tileLayer);
            container.addChild(tileLayer);
            break;
          case LAYER_TYPE.OBJECT:
            this._objectLayers.push(layerData);
            break;
          default:
            this._otherLayer.push(layerData);
        }
      }
    });
  }

  static create(parent = null, props = {anchor: {x: 0, y: 0}}) {
    let mapData = AssetsManager.resolveAsset(props.tmxSrc);
    let mapTexture = AssetsManager.resolveAsset(props.tileSetsSrc);
    let map = new PixiTiledMap(mapData.data, mapTexture);
    map.setProps(props, PERMITTED_PROPS);
    map.renderer = map.createMapRenderer();
    map.parent = parent;
    return map;
  }
}

class PixiCollisionLayer {
  constructor() {
    this.collisionsMap = [];
    this.layerData = null;
    this.tileHeight = 0;
    this.tileWidth = 0;
    this.width = 0;
    this.height = 0;
    this.tiles2D = [];
    this.easyStar = null;
  }

  findPath(starX, startY, targetX, targetY) {
    let startPosX = Math.floor(starX / this.tileWidth);
    let startPosY = Math.floor(startY / this.tileHeight);
    let targetPosX = Math.floor(targetX / this.tileWidth);
    let targetPosY = Math.floor(targetY / this.tileHeight);
    if (!this.easyStar) {
      this.easyStar = new EasyStar.js();
    }
    this.easyStar.setGrid(this.collisionsMap);
    this.easyStar.setAcceptableTiles([0]);
    return new Promise((resolve, reject) => {
      this.easyStar.findPath(startPosX, startPosY, targetPosX, targetPosY, (path) => {
        if (path === null) {
          reject("Path was not found.");
        } else {
          resolve(path);
        }
      });
      this.easyStar.calculate();
    });
  }

  checkCollision(x, y) {
    let posX = Math.floor(x / this.tileWidth);
    let posY = Math.floor(y / this.tileHeight);

    let currentTile = this.collisionsMap[posY][posX];
    if (currentTile) {
      return false;
    }
    let right = this.collisionsMap[posY][posX + 1];
    if (right) {
      return false;
    }
    let down = this.collisionsMap[posY + 1][posX];
    if (down) {
      return false;
    }
    let downRight = this.collisionsMap[posY + 1][posX + 1];
    if (downRight) {
      return false;
    }
    return true;
  }

  static newFromTiledData(layerData) {
    let layer = new PixiCollisionLayer();
    layer.layerData = layerData;
    layer.tileHeight = layerData.map.tileHeight;
    layer.tileWidth = layerData.map.tileWidth;
    layer.width = layerData.map.width;
    layer.height = layerData.map.height;
    layer.createCollision();
    return layer;
  }

  createCollision() {
    let tiles = this.layerData.tiles;
    while (tiles.length) this.tiles2D.push(tiles.splice(0, this.width));
    for (let i = 0; i < this.height; i++) {
      this.collisionsMap[i] = [];
      for (let j = 0; j < this.width; j++) {
        this.collisionsMap[i][j] = this.tiles2D[i][j] === undefined ? 0 : 1;
      }
    }
  }
}

class PixiTileLayer extends PIXI.Container {
  constructor() {
    super();
    this._tiles = [];
  }

  static newFromTiledData(layerData, tileSets) {
    let group = new PIXI.display.Group(parseInt(layerData.name) || 0, true);
    let layer = new PIXI.display.Layer(group);
    layer.group.enableSort = true;
    getGame().stage.renderer.addChild(layer);
    let tileLayer = new PixiTileLayer();
    tileLayer.parentGroup = group;
    tileLayer.layerData = layerData;
    tileLayer.createTile(tileSets);
    return tileLayer;
  }

  createTile(tileSets) {
    for (let y = 0; y < this.layerData.map.height; y++) {
      for (let x = 0; x < this.layerData.map.width; x++) {
        let i = x + (y * this.layerData.map.width);

        if (this.layerData.tiles[i] && this.layerData.tiles[i].gid && this.layerData.tiles[i].gid !== 0) {
          let tileSet = PixiTileLayer.findTileSet(this.layerData.tiles[i].gid, tileSets);
          let tile = new PixiTile(this.layerData.tiles[i], tileSet, this.layerData.horizontalFlips[i],
            this.layerData.verticalFlips[i], this.layerData.diagonalFlips[i]);
          tile.animationSpeed = 0.1;
          tile.play();
          tile.x = x * (this.layerData.map.tileWidth);
          tile.y = y * (this.layerData.map.tileHeight) + (this.layerData.map.tileHeight - tile.textures[0].height);

          tile._x = x;
          tile._y = y;

          if (tileSet.tileOffset) {
            tile.x += tileSet.tileOffset.x;
            tile.y += tileSet.tileOffset.y;
          }

          this._tiles.push(tile);
          this.addChild(tile);
        }
      }
    }
  }

  static findTileSet(gid, tileSets) {
    let tileSet;
    for (let i = tileSets.length - 1; i >= 0; i--) {
      tileSet = tileSets[i];
      if (tileSet.firstGid <= gid) break;
    }
    return tileSet;
  }
}

class PixiTile extends PIXI.extras.AnimatedSprite {
  constructor(tileData, tileSet, horizontalFlip, verticalFlip, diagonalFlip) {
    let textures = PixiTile.getTextures(tileData, tileSet);
    super(textures);
  }

  static getTextures(tileData, tileSet) {
    let textures = [];
    if (tileData.animations.length) {
      tileData.animations.forEach(function (frame) {
        textures.push(tileSet.textures[frame.tileId])
      }, this);
    } else {
      textures.push(tileSet.textures[tileData.gid - tileSet.firstGid])
    }
    return textures;
  }
}

class PixiTileSet {
  constructor(texture) {
    this._baseTexture = texture;
    this._textures = [];
  }

  static fromTiledTileSet(tileSetData, baseTexture) {
    let tileSet = new PixiTileSet(baseTexture);
    tileSet.margin = tileSetData.margin || 0;
    tileSet.image = tileSetData.image;
    tileSet.tileHeight = tileSetData.tileHeight;
    tileSet.tileWidth = tileSetData.tileWidth;
    tileSet.spacing = tileSetData.spacing || 0;
    tileSet.firstGid = tileSetData.firstGid;
    tileSet.createTileTextures();
    return tileSet;
  }

  get textures() {
    return this._textures;
  }

  createTileTextures() {
    for (let y = this.margin; y < this.image.height; y += this.tileHeight + this.spacing) {
      for (let x = this.margin; x < this.image.width; x += this.tileWidth + this.spacing) {
        this._textures.push(new PIXI.Texture(this._baseTexture, new PIXI.Rectangle(x, y, this.tileWidth, this.tileHeight)))
      }
    }
  }
}
