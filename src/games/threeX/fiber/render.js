import {renderer as ThreeXFiberRenderer} from "./renderer";

import {ThreeScene} from "../components/threeScene";

let rootContainer = null;
let scene;

function isWebGLAvailable(canvas) {
  try {
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

function createRenderer(canvas, options) {
  scene = ThreeScene.create();
  if (!isWebGLAvailable(canvas)) {
    scene.renderer = new window.THREE.CanvasRenderer({canvas, alpha: true});
    scene.renderer.setPixelRatio(window.devicePixelRatio);
    scene.renderer.setSize(canvas.width, canvas.height);
    scene.isWebGL = false;
  } else {
    scene.isWebGL = true;
    scene.renderer = new window.THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    window.renderer = scene.renderer;
    scene.renderer.shadowMap.enabled = true;
    scene.renderer.shadowMap.type = window.THREE.PCFSoftShadowMap;
  }
  scene.canvas = canvas;
  return ThreeXFiberRenderer.createContainer(scene);
}

function render(element, container, options = {}) {
  rootContainer = createRenderer(container, options);
  if (!rootContainer) {

  }
  ThreeXFiberRenderer.updateContainer(element, rootContainer, null);
  return ThreeXFiberRenderer.getPublicRootInstance(rootContainer);
}

function unmountComponentAtNode(container) {
  if (container._reactRootContainer) {
    ThreeXFiberRenderer.unbatchedUpdates(() => {
      ThreeXFiberRenderer.updateContainer(null, null, null, () => {
        container._reactRootContainer = null;
      });
    });
    return true;
  } else {
    return false;
  }
}

function takeScreenshot() {
  if (!scene) {
    console.warn('ThreeX: Please init threeX before take a screenshot');
    return;
  }
  scene.renderer.render(scene.scene, scene.renderer.camera.renderer);
  return scene.renderer.domElement.toDataURL();
}

function stopRender() {
  unmountComponentAtNode(scene.canvas);
  cancelAnimationFrame(scene.renderer.camera.requestAnimationFrameId);
}

export {
  render,
  stopRender,
  takeScreenshot
};
