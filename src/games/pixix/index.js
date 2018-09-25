import render from './render';
import {TYPES} from "./components/index";
import Loader from "./loader";
import PixiUtils from "./pixiUtils";
import Game from "./game";
import Scene from "./scene";
import Component from "./component";
import Builder from "./builder";
import COLOR_MATRIX_TYPES from "./components/colorMatrixTypes";
import {render as fiberRender} from "./fiber/index";
import {getGame} from "./fiber/render";

export const ColorMatrixTypes = COLOR_MATRIX_TYPES;
export const Sprite = TYPES.SPRITE;
export const Text = TYPES.TEXT;
export const Container = TYPES.CONTAINER;
export const Button = TYPES.BUTTON;
export const Rectangle = TYPES.RECTANGLE;
export const BitmapText = TYPES.BITMAP_TEXT;
export const Polygon = TYPES.POLYGON;
export const ColorMatrixFilter = TYPES.COLOR_MATRIX_FILTER;
export const ParticleContainer = TYPES.PARTICLE_CONTAINER;
export const AnimatedSprite = TYPES.ANIMATED_SPRITE;
export const DisplacementFilter = TYPES.DISPLACEMENT_FILTER;
export const TiledMap = TYPES.TILED_MAP;
export const Camera = TYPES.CAMERA;
export const Layer = TYPES.LAYER;

const PixiX = {
  render: render,
  fiberRender: fiberRender,
  getGame: getGame,
  Loader: Loader,
  changeScene: PixiUtils.changeScene,
  Game: Game,
  Scene: Scene,
  Component: Component,
  createElement: Builder.createElement,
};
export default PixiX;
