import {ThreeComponent} from "./threeComponent";
import * as THREE from "three";

export class ThreeMeshContainer extends ThreeComponent {
  static create({scene}, props) {
    let meshContainer = new ThreeMeshContainer();
    let container = new THREE.Object3D();
    meshContainer.renderer = container;
    return meshContainer;
  }
}
