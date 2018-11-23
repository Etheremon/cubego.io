import {ThreeComponent} from "./threeComponent";


export class ThreeDirectionalLight extends ThreeComponent {
  constructor() {
    super();
    this.helper = null;
    this.scene = null;
  }

  static create({scene, canvas, renderer}, props) {
    let threeDirectionalLight = new ThreeDirectionalLight();
    let directionalLight = new window.THREE.DirectionalLight(props.color || 0xffffff, 1);
    directionalLight.castShadow = true;
    directionalLight.shadow.bias = -0.0001;
    directionalLight.shadow.mapSize = new window.THREE.Vector2(512, 512);
    directionalLight.shadow.radius = 2;
    directionalLight.shadow.camera.near = 0;
    directionalLight.shadow.camera.far = 10000;
    directionalLight.shadow.camera.left = - canvas.width;
    directionalLight.shadow.camera.right = canvas.width;
    directionalLight.shadow.camera.top = canvas.height;
    directionalLight.shadow.camera.bottom = -canvas.height;

    // scene.add(new window.THREE.CameraHelper(directionalLight.shadow.camera));

    if (props.followCamera) {
      renderer.camera.orbitControl.addEventListener('change', () => {
        directionalLight.position.copy(renderer.camera.renderer.position);
      });
    }

    if (props.position) {
      directionalLight.position.set(props.position.x, props.position.y, props.position.z);
    }
    threeDirectionalLight.scene = scene;
    threeDirectionalLight.renderer = directionalLight;
    return threeDirectionalLight;
  }

  set target(targetPosition) {
    let targetObject = new window.THREE.Object3D();
    targetObject.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
    this.scene.add(targetObject);
    this.renderer.target = targetObject;
  }
}
