
import {FiberNode} from "../fiber/FiberNode";

export class ThreeScene extends FiberNode {
  constructor() {
    super();
    this.scene = null;
    this.canvas = null;
  }

  static create() {
    let threeScene = new ThreeScene();
    threeScene.scene = new window.THREE.Scene();
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
