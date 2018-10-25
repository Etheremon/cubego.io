import {ThreeComponent} from "./threeComponent";


export class ThreeAmbientLight extends ThreeComponent {
  constructor() {
    super();
    this.helper = null;
  }

  static create({}, props) {
    let threeAmbientLight = new ThreeAmbientLight();
    let ambientLight = new window.THREE.AmbientLight(0x000000);

    let hemiLightHelper = new window.THREE.AmbientLight(ambientLight, 10);
    ambientLight.renderer = ambientLight;
    ambientLight.helper = hemiLightHelper;
    return threeAmbientLight;
  }
}
