import {ThreeComponent} from "./threeComponent";


export class ThreeDirectionalLight extends ThreeComponent {
  constructor() {
    super();
    this.helper = null;
  }

  static create({scene, canvas}, props) {
    let threeDirectionalLight = new ThreeDirectionalLight();
    let directionalLight = new window.THREE.DirectionalLight(props.color || 0xffffff, 2);
    directionalLight.castShadow = true;
    directionalLight.shadow.bias = -0.0038;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = -1000;
    directionalLight.shadow.camera.far = 2000;
    directionalLight.shadow.camera.left = -canvas.width;
    directionalLight.shadow.camera.right = canvas.width;
    directionalLight.shadow.camera.top = -canvas.height;
    directionalLight.shadow.camera.bottom = canvas.height;

    // scene.add(new window.THREE.CameraHelper(directionalLight.shadow.camera));

    if (props.position) {
      directionalLight.position.set(props.position.x, props.position.y, props.position.z);
    }
    threeDirectionalLight.renderer = directionalLight;
    return threeDirectionalLight;
  }
}
