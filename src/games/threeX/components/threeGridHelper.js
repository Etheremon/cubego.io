import {ThreeComponent} from "./threeComponent";


export class ThreeGridHelper extends ThreeComponent {
  static create({scene}, props) {
    let threeGrid = new ThreeGrid();
    let grid = new window.THREE.GridHelper(props.size, props.divisions, props.color1, props.color2);
    if (props.position) {
      grid.position.set(props.position.x, props.position.y, props.position.z);
    }
    threeGrid.renderer = grid;
    return threeGrid;
  }
}
