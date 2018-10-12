import {ThreeComponent} from "./threeComponent";
import * as THREE from "three";
import ThreeX from "../index";
import {fullColorHex} from "../../utils";

export class ThreeMeshBox extends ThreeComponent {
  static create({scene}, props) {
    let meshContainer = new ThreeMeshBox();
    let size = props.size || 10;
    let color = parseInt(props.color, 16);
    let boxGeo = new THREE.BoxBufferGeometry(size, size, size);
    let material = null;

    if (props.materialId) {
      material = ThreeX.getMaterial(props.materialId).clone();
      let variantColor = parseInt(props.variant.color.replace('#', ''), 16);
      material.color.setHex(variantColor);
    } else {
      material = new THREE.MeshBasicMaterial({color: color, transparent: true});
    }
    let cubeMesh = new THREE.Mesh(boxGeo, material);
    let wireFrameColor = parseInt(props.wireFrameColor || 'ffffff', 16);
    let boxHelper = new THREE.BoxHelper(cubeMesh, wireFrameColor);

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

  set position(position) {
    this.renderer.position.set(position.x, position.y, position.z);
  }
}
