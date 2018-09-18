import * as BABYLON from 'babylonjs';
import {renderer as BabylonRenderer} from "./renderer/index";
import {TYPES} from './components';
import {BabylonMeshContainer} from "./components/babylonMeshContainer";

let rootContainer = null;
let scene, engine;
let loopStarted = false;
// let arController = null;
let camera = null;
let rootMarker = null;
// let v = null;
let root = null;
export let listMesh = [];

const createRenderer = (canvas) => {
  engine = new BABYLON.Engine(canvas, true);
  scene = new BABYLON.Scene(engine);
  scene.useRightHandedSystem = true;
  window.scene = scene;
  rootMarker = new BABYLON.AbstractMesh('markerRoot', scene);
  rootMarker.wasVisible = false;
  rootMarker.markerMatrix = new Float64Array(12);
  root = BabylonMeshContainer.create(scene, {name: 'root', position: {x: 0, y: 0, z: 0}});
  root.parent = rootMarker;
  rootContainer = BabylonRenderer.createContainer(root);
  startLoop();

  return rootContainer;
};
// let cameraPara = require('../data/camera_para.dat');
// const cameraParamOnLoad = function () {
//   console.log('Load Camera param Success');
//   arController = new window.ARController(640, 480, cameraParam);
//   arController.debugSetup();
//   arController.loadMarker(require('../data/patt.hiro'), function (markerId) {
//     scene.registerBeforeRender(() => {
//       if (!isARMode) {
//         return;
//       }
//       if (!arController) {
//         return;
//       }
//       v = document.getElementById('video');
//       rootMarker.visible = false;
//       rootMarker.getChildMeshes().forEach(function (mesh) {
//         mesh.isVisible = false;
//       });
//
//       arController.detectMarker(v);
//       let markerNum = arController.getMarkerNum();
//       console.log(markerNum);
//       if (markerNum > 0) {
//         if (rootMarker.visible) {
//           arController.getTransMatSquareCont(markerId, 2, rootMarker.markerMatrix, rootMarker.markerMatrix);
//         } else {
//           arController.getTransMatSquare(markerId, 2, rootMarker.markerMatrix);
//         }
//         let glMat = new Float64Array(16);
//         arController.transMatToGLMat(rootMarker.markerMatrix, glMat);
//         let matrix = BABYLON.Matrix.FromArray(glMat);
//         // rootMarker.setPreTransformMatrix(matrix);
//         camera._computedViewMatrix = matrix;
//         rootMarker.getChildMeshes().forEach(function (mesh) {
//           mesh.isVisible = true
//         });
//       } else {
//         rootMarker.isVisible = false;
//         rootMarker.getChildMeshes().forEach(function (mesh) {
//           mesh.isVisible = false;
//         });
//       }
//       arController.debugDraw();
//     });
//   });
// };
// let cameraParam = new window.ARCameraParam(cameraPara, cameraParamOnLoad, (error) => {
//   console.log('Error: ' + error);
// });

// let isARMode = false;

// export function changeToARMode() {
//   navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: "environment"}}).then((stream) => {
//     v = document.getElementById('video');
//     v.srcObject = stream;
//     camera = new BABYLON.Camera("Camera", new BABYLON.Vector3.Zero(), scene);
//     scene.activeCamera = camera;
//     let matrix = BABYLON.Matrix.FromArray(arController.getCameraMatrix());
//     camera.freezeProjectionMatrix(matrix);
//     isARMode = true;
//   });
// }

const startLoop = () => {
  if (!loopStarted) {
    loopStarted = true;
    engine.runRenderLoop(() => {
      scene.render();
    });
  }
};

const render = (element, canvas) => {
  if (!rootContainer) {
    rootContainer = createRenderer(canvas);
  }
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

const BabylonX = {render};
export default BabylonX;
