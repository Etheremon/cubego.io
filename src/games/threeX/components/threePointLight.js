import { ThreeComponent } from './threeComponent';

export class ThreePointLight extends ThreeComponent {
  constructor() {
    super();
    this.helper = null;
  }

  static create({ scene }, props) {
    const threePointLight = new ThreePointLight();
    const pointLight = new window.THREE.PointLight(props.color || 0xffffff, 1, 0);
    if (props.position) {
      pointLight.position.set(props.position.x, props.position.y, props.position.z);
    }
    const pointLightHelper = new window.THREE.PointLightHelper(pointLight, 1);
    scene.add(pointLightHelper);
    threePointLight.renderer = pointLight;
    return threePointLight;
  }
}
