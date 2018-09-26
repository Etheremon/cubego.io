import {ThreeComponent} from "./threeComponent";
import * as THREE from "three";

export class ThreeBox3Helper extends ThreeComponent {
  constructor() {
    super();
    this.boxMesh = null;
  }

  static create({scene}, props) {
    let threeBox = new ThreeBox3Helper();
    let min = new THREE.Vector3();
    let max = new THREE.Vector3();
    let box = new THREE.Box3(min, max);
    let helper = new THREE.Box3Helper(box, 0xffff00);
    threeBox.renderer = helper;
    threeBox.boxMesh = box;
    return threeBox;
  }

  set min(min) {
    this.boxMesh.min = min;
  }

  set max(max) {
    this.boxMesh.max = max;
  }

  setFromCenterAndSize(center, size) {
    this.boxMesh.setFromCenterAndSize(center, size);
  }
}
