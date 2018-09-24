import {ThreeComponent} from "./threeComponent";
import * as THREE from "three";

export class ThreePerspectiveCamera extends ThreeComponent {
  static create({renderer, canvas, scene}, props) {
    let threeCamera = new ThreePerspectiveCamera();
    let camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 10000);
    camera.position.set(500, 800, 1300);
    camera.lookAt(0, 0, 0);
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
}
