import {ThreeComponent} from "./threeComponent";
import * as THREE from "three";

export class ThreeGridHelper extends ThreeComponent {
  static create({scene}, props) {
    let threeGrid = new ThreeGrid();
    let grid = new THREE.GridHelper(props.size, props.divisions, props.color1, props.color2);
    if (props.position) {
      grid.position.set(props.position.x, props.position.y, props.position.z);
    }
    threeGrid.renderer = grid;
    return threeGrid;
  }
}
