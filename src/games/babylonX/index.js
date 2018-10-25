import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import {renderer as BabylonRenderer} from "./renderer/index";
import {TYPES} from './components';
import {BabylonMeshContainer} from "./components/babylonMeshContainer";
import {LoadingScreen} from "./loader/LoadingScreen";
import {_createAssetsManager} from './loader';
import loaders from "./loader";

let rootContainer = null;
let scene, engine;
let loopStarted = false;
let root = null;
let loadingScreen = null;

const createRenderer = (canvas) => {
  engine = new BABYLON.Engine(canvas, true);
  loadingScreen = new LoadingScreen(canvas);
  engine.loadingScreen = loadingScreen;
  scene = new BABYLON.Scene(engine);
  root = BabylonMeshContainer.create(scene, {name: 'root', position: {x: 0, y: 0, z: 0}});
  root.scene = scene;
  root.engine = engine;
  root.canvas = canvas;
  _createAssetsManager(scene, startLoop);
  rootContainer = BabylonRenderer.createContainer(root);
  return rootContainer;
};

const startLoop = () => {
  if (!loopStarted) {
    loopStarted = true;
    engine.runRenderLoop(() => {
      scene.render();
    });
  }
};

const render = (element, canvas) => {
  rootContainer = createRenderer(canvas);
  BabylonRenderer.updateContainer(element, rootContainer, null);
  return BabylonRenderer.getPublicRootInstance(rootContainer);
};

const stopRender = () => {
  scene.dispose();
  engine.stopRenderLoop();
  rootContainer = null;
  scene = null;
  engine = null;
  loopStarted = false;
  root = null;
  loadingScreen = null;
};

export const MeshSphere = TYPES.MESH_SPHERE;
export const MeshCylinder = TYPES.MESH_CYLINDER;
export const MeshBox = TYPES.MESH_BOX;
export const MeshContainer = TYPES.MESH_CONTAINER;
export const ArcRotateCamera = TYPES.ARC_ROTATE_CAMERA;
export const PointLight = TYPES.POINT_LIGHT;
export const Axis = TYPES.AXIS;
export const VoxelPlayer = TYPES.VOXEL_PLAYER;
export const HemisphericLight = TYPES.HEMISPHERIC_LIGHT;
export const DirectionLight = TYPES.DIRECTION_LIGHT;
export const Animation = TYPES.ANIMATION;
export const Plane = TYPES.PLANE;
export const Skybox = TYPES.SKY_BOX;
export const GUI = TYPES.GUI;
export const GUISimpleButton = TYPES.GUI_SIMPLE_BUTTON;
export const GUIImageButton = TYPES.GUI_IMAGE_BUTTON;
export const GUIImage = TYPES.GUI_IMAGE;
export const HTMLGUIButton = TYPES.CASTOR_GUI_BUTTON;
export const HTMLGUIImage = TYPES.CASTOR_GUI_TEXTURE;
export const HTMLGUIText = TYPES.CASTOR_GUI_TEXT;

const BabylonX = {render, loaders, stopRender};
export default BabylonX;
