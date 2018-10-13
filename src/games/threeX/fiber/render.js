import {renderer as ThreeXFiberRenderer} from "./renderer";
import * as THREE from "three";
import 'three-orbitcontrols';
import {ThreeScene} from "../components/threeScene";

let rootContainer = null;
let scene;

function createRenderer(canvas, options) {
  scene = ThreeScene.create();
  scene.renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true});
  // scene.renderer.setClearColor(0x203040, 0.8);
  scene.canvas = canvas;
  return ThreeXFiberRenderer.createContainer(scene);
}

function render(element, container, options = {}) {
  rootContainer = createRenderer(container, options);
  ThreeXFiberRenderer.updateContainer(element, rootContainer, null);
  return ThreeXFiberRenderer.getPublicRootInstance(rootContainer);
}

export default render;
