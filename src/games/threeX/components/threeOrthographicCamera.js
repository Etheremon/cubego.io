import {ThreeComponent} from "./threeComponent";
import * as THREE from "three";

export class ThreeOrthographicCamera extends ThreeComponent {
  static create({renderer, canvas, scene}, props) {
    let threeCamera = new ThreeOrthographicCamera();
    let camera = new THREE.OrthographicCamera(-canvas.width, canvas.width, canvas.height, -canvas.height, 1, 10000);
    if (props.position) {
      camera.position.set(props.position.x, props.position.y, props.position.z);
    }
    if (props.lookAt) {
      camera.lookAt(props.lookAt.x, props.lookAt.y, props.lookAt.z);
    }
    let controls = new THREE.OrbitControls(camera, canvas);
    controls.update();
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    threeCamera.renderer = camera;
    return threeCamera;
  }

  lookAt(position) {
    this.renderer.lookAt(position.x, position.y, position.z);
  }
}
