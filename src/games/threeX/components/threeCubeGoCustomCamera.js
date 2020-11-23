import { ThreeComponent } from './threeComponent';

import render from '../fiber/render';
import { getMousePositionOnCanvas } from '../fiber/utils';

export class ThreeCubeGoCustomCamera extends ThreeComponent {
  static create({ renderer, canvas, scene }, props) {
    const threeCamera = new ThreeCubeGoCustomCamera();
    const camera = new window.THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 10000);
    camera.position.set(500, 800, 1300);
    camera.lookAt(0, 0, 0);
    const controls = new window.THREE.OrbitControls(camera, canvas);
    controls.update();
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    threeCamera.renderer = camera;
    threeCamera.mouse = new window.THREE.Vector2();
    threeCamera.raycaster = new window.THREE.Raycaster();
    threeCamera.cacheCubeGeo = new window.THREE.BoxBufferGeometry(50, 50, 50);
    threeCamera.cacheCubeMaterial = new window.THREE.MeshBasicMaterial({ color: 0x0000ff });
    threeCamera.canvas = canvas;
    const rollOverGeo = new window.THREE.BoxBufferGeometry(50, 50, 50);
    const rollOverMaterial = new window.THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });
    threeCamera.rollOverMesh = new window.THREE.Mesh(rollOverGeo, rollOverMaterial);
    scene.add(rollOverMesh);
    canvas.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
    canvas.addEventListener('mousedown', this.onDocumentMouseDown.bind(this), false);
    return threeCamera;
  }

  onDocumentMouseDown(event) {
    event.preventDefault();
    const mousePos = getMousePositionOnCanvas(event);
    this.mouse.set((mousePos.x / canvas.width) * 2 - 1, -(mousePos.y / canvas.height) * 2 + 1);
    this.raycaster.setFromCamera(mouse, camera);
    const objects = [];
    const intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
      const intersect = intersects[0];
      const voxel = new window.THREE.Mesh(this.cacheCubeGeo, this.cacheCubeMaterial);
      voxel.position.copy(intersect.point).add(intersect.face.normal);
      voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
      this.parent.add(voxel);
      objects.push(voxel);
    }
  }

  onDocumentMouseMove(event) {
    event.preventDefault();
    const mousePos = getMousePositionOnCanvas(event);
    this.mouse.set((mousePos.x / this.canvas.width) * 2 - 1, -(mousePos.y / this.canvas.height) * 2 + 1);
    this.raycaster.setFromCamera(this.mouse, this.renderer);
    const objects = [];
    const intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
      const intersect = intersects[0];
      this.rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
      this.rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
    }
  }
}
