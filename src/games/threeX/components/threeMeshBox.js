import {ThreeComponent} from "./threeComponent";
import * as THREE from "three";

export class ThreeMeshBox extends ThreeComponent {
  static create({scene}, props) {
    let meshContainer = new ThreeMeshBox();
    let size = props.size || 10;
    let color = parseInt(props.color, 16);
    let boxGeo = new THREE.BoxBufferGeometry(size, size, size);
    let boxMaterial = new THREE.MeshBasicMaterial({color: color});
    let cubeMesh = new THREE.Mesh(boxGeo, boxMaterial);
    let boxHelper = new THREE.BoxHelper(cubeMesh, 0xffffff);
    cubeMesh.add(boxHelper);
    if (props.position) {
      cubeMesh.position.set(props.position.x, props.position.y, props.position.z);
    }
    meshContainer.renderer = cubeMesh;
    return meshContainer;
  }

  set color(color) {
    this.renderer.material.color.setHex(parseInt(color, 16));
  }
}
