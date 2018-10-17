import {ThreeComponent} from "./threeComponent";


export class ThreeHemisphereLight extends ThreeComponent {
  constructor() {
    super();
    this.helper = null;
  }

  static create({}, props) {
    let threeHemiLight = new ThreeHemisphereLight();
    let hemiLight = new window.THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    let hemiLightHelper = new window.THREE.HemisphereLightHelper(hemiLight, 10);
    threeHemiLight.renderer = hemiLight;
    threeHemiLight.helper = hemiLightHelper;
    return threeHemiLight;
  }
}
