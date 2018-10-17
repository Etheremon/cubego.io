import {ThreeComponent} from "./threeComponent";


export class ThreeBox3Helper extends ThreeComponent {
  constructor() {
    super();
    this.boxMesh = null;
  }

  static create({scene}, props) {
    let threeBox = new ThreeBox3Helper();
    let min = new window.THREE.Vector3();
    let max = new window.THREE.Vector3(1, 1, 1);
    let box = new window.THREE.Box3(min, max);
    let helper = new window.THREE.Box3Helper(box, 0xffff00);
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
