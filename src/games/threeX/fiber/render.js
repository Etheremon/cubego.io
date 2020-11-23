import { renderer as ThreeXFiberRenderer } from './renderer';

import { ThreeScene } from '../components/threeScene';

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
    scene.renderer = new window.THREE.CanvasRenderer({ canvas, alpha: true });
    scene.renderer.setPixelRatio(window.devicePixelRatio);
    scene.renderer.setSize(canvas.width, canvas.height);
    scene.isWebGL = false;
  } else {
    scene.isWebGL = true;
    scene.renderer = new window.THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
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
  }
  return false;
}

function takeScreenshot(size) {
  if (!scene) {
    console.warn('ThreeX: Please init threeX before take a screenshot');
    return;
  }
  scene.renderer.render(scene.scene, scene.renderer.camera.renderer);
  const data = scene.renderer.domElement.toDataURL();
  if (size) {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img');
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = size.width;
        canvas.height = size.height;
        ctx.drawImage(this, 0, 0, size.width, size.height);
        const dataURI = canvas.toDataURL();
        resolve(dataURI);
      };
      img.src = data;
    });
  }
  return Promise.resolve(data);
}

function exportToFacebook() {
  return new Promise((resolve, reject) => {
    const exporter = new window.THREE.GLTFExporter();
    exporter.parse(scene.scene, (result) => {
      resolve(result);
    }, { binary: true, forcePowerOfTwoTextures: true, forceIndices: true });
  });
}

function stopRender() {
  unmountComponentAtNode(scene.canvas);
  cancelAnimationFrame(scene.renderer.camera.requestAnimationFrameId);
}

export {
  render,
  stopRender,
  takeScreenshot,
  exportToFacebook,
};
