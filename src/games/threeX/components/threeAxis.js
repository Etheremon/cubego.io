import {ThreeComponent} from "./threeComponent";


export class ThreeAxis extends ThreeComponent {
  static create({scene}, props) {
    let threeAxis = new ThreeAxis();
    let axis = new window.THREE.AxesHelper(2000);
    threeAxis.renderer = axis;
    return threeAxis;
  }
}
