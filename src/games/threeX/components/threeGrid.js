import {ThreeComponent} from "./threeComponent";
import * as THREE from "three";

export class ThreeGrid extends ThreeComponent {
  static create({scene}, props) {
    let threeGrid = new ThreeGrid();
    console.log(props);
    let grid = new THREE.GridHelper(props.size, props.divisions, props.color1, props.color2);
    if (props.position) {
      grid.position.set(props.position.x, props.position.y, props.position.z);
    }
    window.grid = grid;
    threeGrid.renderer = grid;
    return threeGrid;
  }

  set parent(parent) {
    console.log(parent);
  }
}
