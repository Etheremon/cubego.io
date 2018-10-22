import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import {renderer as BabylonRenderer} from "./renderer/index";
import {TYPES} from './components';
import {BabylonMeshContainer} from "./components/babylonMeshContainer";
import {LoadingScreen} from "./loading/LoadingScreen";

let rootContainer = null;
let scene, engine;
let loopStarted = false;
let root = null;
let assetsManager = null;
let loadingScreen = null;

const createRenderer = (canvas) => {
  engine = new BABYLON.Engine(canvas, true);
  loadingScreen = new LoadingScreen(canvas);
  engine.loadingScreen = loadingScreen;
  scene = new BABYLON.Scene(engine);

  // scene.useRightHandedSystem = true;
  root = BabylonMeshContainer.create(scene, {name: 'root', position: {x: 0, y: 0, z: 0}});
  root.scene = scene;
  root.engine = engine;
  root.canvas = canvas;
  assetsManager = new BABYLON.AssetsManager(scene);
  rootContainer = BabylonRenderer.createContainer(root);
  assetsManager.onFinish = startLoop;
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
export const HTMLGUIButton = TYPES.CASTOR_GUI_BUTTON;
export const HTMLGUIImage = TYPES.CASTOR_GUI_TEXTURE;
export const HTMLGUIText = TYPES.CASTOR_GUI_TEXT;

function addMesh(id, root, file) {
  return new Promise((resolve, reject) => {
    let task = assetsManager.addMeshTask(id, "", root, file);
    task.onSuccess = (taskData) => {
      resolve(taskData)
    };
    task.onError = (taskData, message, exception) => {
      console.error(message);
      reject(message)
    }
  });
}

function load() {
  assetsManager.load();
}

const loaders = {
  addMesh,
  load
};

const BabylonX = {render, loaders};
export default BabylonX;
