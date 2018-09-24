import {ThreeComponent} from "./threeComponent";
import * as THREE from "three";

export class ThreeAxis extends ThreeComponent {
  static create({scene}, props) {
    let threeAxis = new ThreeAxis();
    let axis = new THREE.AxesHelper(2000);
    threeAxis.renderer = axis;
    return threeAxis;
  }
}
