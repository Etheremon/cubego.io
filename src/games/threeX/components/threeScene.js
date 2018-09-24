import * as THREE from "three";
import {FiberNode} from "../fiber/FiberNode";

export class ThreeScene extends FiberNode {
  constructor() {
    super();
    this.scene = null;
    this.canvas = null;
  }

  static create() {
    let threeScene = new ThreeScene();
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0x203040);
    threeScene.scene = scene;
    return threeScene;
  }

  addChild(child) {
    super.addChild(child);
    this.scene.add(child._renderer);
  }

  removeChild(child) {
    super.removeChild(child);
    this.scene.remove(child._renderer);
  }
}
