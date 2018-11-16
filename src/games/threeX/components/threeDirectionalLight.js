import {ThreeComponent} from "./threeComponent";


export class ThreeDirectionalLight extends ThreeComponent {
  constructor() {
    super();
    this.helper = null;
  }

  static create({scene, canvas, renderer}, props) {
    let threeDirectionalLight = new ThreeDirectionalLight();
    let directionalLight = new window.THREE.DirectionalLight(props.color || 0xffffff, 2);
    directionalLight.castShadow = true;
    directionalLight.shadow.bias = -0.0001;
    directionalLight.shadow.mapSize = new window.THREE.Vector2(512, 512);
    directionalLight.shadow.radius = 2;
    directionalLight.shadow.camera.near = -1000;
    directionalLight.shadow.camera.far = 5000;
    directionalLight.shadow.camera.left = -2 * canvas.width;
    directionalLight.shadow.camera.right = 2 * canvas.width;
    directionalLight.shadow.camera.top = -2 * canvas.height;
    directionalLight.shadow.camera.bottom = 2 * canvas.height;

    // scene.add(new window.THREE.CameraHelper(directionalLight.shadow.camera));

    if (props.followCamera) {
      renderer.camera.orbitControl.addEventListener('change', () => {
        directionalLight.position.copy(renderer.camera.renderer.position);
      });
    }

    if (props.position) {
      directionalLight.position.set(props.position.x, props.position.y, props.position.z);
    }
    threeDirectionalLight.renderer = directionalLight;
    return threeDirectionalLight;
  }
}
