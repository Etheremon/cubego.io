import {ThreeComponent} from "./threeComponent";
import * as THREE from "three";

export class ThreeGrid extends ThreeComponent {
  static create({scene}, props) {
    let grid = new THREE.GridHelper(props.size, props.divisions, props.color1, props.color2);
    scene.add(grid);
    return grid;
  }
}
