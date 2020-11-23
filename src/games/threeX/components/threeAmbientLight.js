import { ThreeComponent } from './threeComponent';

export class ThreeAmbientLight extends ThreeComponent {
  constructor() {
    super();
    this.helper = null;
  }

  static create({}, props) {
    const threeAmbientLight = new ThreeAmbientLight();
    const ambientLight = new window.THREE.AmbientLight(0x000000, 1);

    const hemiLightHelper = new window.THREE.AmbientLight(ambientLight, 10);
    ambientLight.renderer = ambientLight;
    ambientLight.helper = hemiLightHelper;
    return threeAmbientLight;
  }
}
