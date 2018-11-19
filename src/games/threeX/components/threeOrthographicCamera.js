import {ThreeComponent} from "./threeComponent";


export class ThreeOrthographicCamera extends ThreeComponent {
  constructor() {
    super();
    this.requestAnimationFrameId = null;
    this.orbitControl = null;
  }

  static create({renderer, canvas, scene}, props) {
    let threeCamera = new ThreeOrthographicCamera();
    let camera = new window.THREE.OrthographicCamera(-canvas.width, canvas.width, canvas.height, -canvas.height, 1, 10000);
    if (props.position) {
      camera.position.set(props.position.x, props.position.y, props.position.z);
    }
    if (props.lookAt) {
      camera.lookAt(props.lookAt.x, props.lookAt.y, props.lookAt.z);
    }
    let controls = new window.THREE.OrbitControls(camera, canvas);
    if (props.orbitControlTarget) {
      controls.target.set(props.orbitControlTarget.x, props.orbitControlTarget.y, props.orbitControlTarget.z);
    }
    controls.update();
    threeCamera.orbitControl = controls;
    const animate = () => {
      threeCamera.requestAnimationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    threeCamera.renderer = camera;
    renderer.camera = threeCamera;
    return threeCamera;
  }

  lookAt(position) {
    this.renderer.lookAt(position.x, position.y, position.z);
  }

  set orbitControlTarget(target) {
    this.orbitControl.target.set(target.x, target.y, target.z);
  }
}
