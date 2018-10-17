import {renderer as ThreeXFiberRenderer} from "./renderer";

import {ThreeScene} from "../components/threeScene";

let rootContainer = null;
let scene;

function createRenderer(canvas, options) {
  scene = ThreeScene.create();
  scene.renderer = new window.THREE.WebGLRenderer({canvas, antialias: true, alpha: true});
  // scene.renderer = new window.THREE.CanvasRenderer({canvas, antialias: true, alpha: true});

  scene.canvas = canvas;
  return ThreeXFiberRenderer.createContainer(scene);
}

function render(element, container, options = {}) {
  rootContainer = createRenderer(container, options);
  ThreeXFiberRenderer.updateContainer(element, rootContainer, null);
  return ThreeXFiberRenderer.getPublicRootInstance(rootContainer);
}

function stopRender() {
  cancelAnimationFrame(scene.renderer.camera.requestAnimationFrameId);
}

export {
  render,
  stopRender
};
