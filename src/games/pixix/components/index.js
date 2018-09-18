import PixiSprite from "./PixiSprite";
import PixiText from "./PixiText";
import PixiContainer from "./PixiContainer";
import PixiButton from "./PixiButton";
import PixiRectangle from "./PixiRectangle";
import PixiBitmapText from "./PixiBitmapText";
import PixiPolygon from "./PixiPolygon";
import PixiColorMatrixFilter from "./PixiColorMatrixFilter";
import PixiParticleContainer from "./PixiParticleContainer";
import PixiAnimatedSprite from "./PixiAnimatedSprite";
import PixiDisplacementFilter from "./PixiDisplacementFilter";
import PixiTiledMap from "./PixiTiledMap";
import PixiCamera from "./PixiCamera";
import PixiStage from "./PixiStage";

export const TYPES = {
  SPRITE: "Sprite",
  TEXT: "Text",
  CONTAINER: "Container",
  BUTTON: "Button",
  RECTANGLE: "Rectangle",
  BITMAP_TEXT: "BitmapText",
  POLYGON: "Polygon",
  COLOR_MATRIX_FILTER: "ColorMatrixFilter",
  PARTICLE_CONTAINER: "ParticleContainer",
  ANIMATED_SPRITE: "AnimatedSprite",
  DISPLACEMENT_FILTER: "DisplacementFilter",
  TILED_MAP: "TiledMap",
  CAMERA: "Camera",
  LAYER: "Layer",
  STAGE: "Stage"
};

let mappingComponent = {};

//TODO: change to DI
mappingComponent[TYPES.SPRITE] = PixiSprite;
mappingComponent[TYPES.TEXT] = PixiText;
mappingComponent[TYPES.CONTAINER] = PixiContainer;
mappingComponent[TYPES.BUTTON] = PixiButton;
mappingComponent[TYPES.RECTANGLE] = PixiRectangle;
mappingComponent[TYPES.BITMAP_TEXT] = PixiBitmapText;
mappingComponent[TYPES.POLYGON] = PixiPolygon;
mappingComponent[TYPES.COLOR_MATRIX_FILTER] = PixiColorMatrixFilter;
mappingComponent[TYPES.PARTICLE_CONTAINER] = PixiParticleContainer;
mappingComponent[TYPES.ANIMATED_SPRITE] = PixiAnimatedSprite;
mappingComponent[TYPES.DISPLACEMENT_FILTER] = PixiDisplacementFilter;
mappingComponent[TYPES.TILED_MAP] = PixiTiledMap;
mappingComponent[TYPES.CAMERA] = PixiCamera;
mappingComponent[TYPES.STAGE] = PixiStage;

function create(tag, parent, props) {
  return mappingComponent[tag].create(parent, props);
}

function isRegistered(tag) {
  return typeof mappingComponent[tag] !== 'undefined';
}

function createContainer(parent, props) {
  return mappingComponent[TYPES.CONTAINER].create(parent, props);
}

function createStage(game) {
  return mappingComponent[TYPES.STAGE].create(game);
}

function createFiberComponent(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
  return mappingComponent[type].create(null, props);
}

const Component = {
  create: create,
  isRegistered: isRegistered,
  createContainer: createContainer,
  createStage: createStage,
  createFiberComponent: createFiberComponent
};

export default Component;
