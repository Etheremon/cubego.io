import {ThreeComponent} from "./threeComponent";


export class ThreeDirectionalLight extends ThreeComponent {
  constructor() {
    super();
    this.helper = null;
  }

  static create({scene}, props) {
    let threeDirectionalLight = new ThreeDirectionalLight();
    let directionalLight = new window.THREE.DirectionalLight(props.color || 0xffffff, 1.6);
    if (props.position) {
      directionalLight.position.set(props.position.x, props.position.y, props.position.z);
    }
    threeDirectionalLight.renderer = directionalLight;
    return threeDirectionalLight;
  }
}
