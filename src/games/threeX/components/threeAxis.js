import { ThreeComponent } from './threeComponent';

export class ThreeAxis extends ThreeComponent {
  static create({ scene }, props) {
    const threeAxis = new ThreeAxis();
    const axis = new window.THREE.AxesHelper(2000);
    threeAxis.renderer = axis;
    return threeAxis;
  }
}
