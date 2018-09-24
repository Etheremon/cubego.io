import {ThreeComponent} from "./threeComponent";
import * as THREE from "three";
import render from "../fiber/render";
import {getMousePositionOnCanvas} from "../fiber/utils";

export class ThreeCubeGoCustomCamera extends ThreeComponent {
  static create({renderer, canvas, scene}, props) {
    let threeCamera = new ThreeCubeGoCustomCamera();
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
    threeCamera.mouse = new THREE.Vector2();
    threeCamera.raycaster = new THREE.Raycaster();
    threeCamera.cacheCubeGeo = new THREE.BoxBufferGeometry(50, 50, 50);
    threeCamera.cacheCubeMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff});
    threeCamera.canvas = canvas;
    let rollOverGeo = new THREE.BoxBufferGeometry(50, 50, 50);
    let rollOverMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, opacity: 0.5, transparent: true});
    threeCamera.rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
    scene.add(rollOverMesh);
    canvas.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
    canvas.addEventListener('mousedown', this.onDocumentMouseDown.bind(this), false);
    return threeCamera;
  }

  onDocumentMouseDown(event) {
    event.preventDefault();
    let mousePos = getMousePositionOnCanvas(event);
    this.mouse.set((mousePos.x / canvas.width) * 2 - 1, -(mousePos.y / canvas.height) * 2 + 1);
    this.raycaster.setFromCamera(mouse, camera);
    let objects = [];
    let intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
      let intersect = intersects[0];
      let voxel = new THREE.Mesh(this.cacheCubeGeo, this.cacheCubeMaterial);
      voxel.position.copy(intersect.point).add(intersect.face.normal);
      voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
      this.parent.add(voxel);
      objects.push(voxel);
    }
  }

  onDocumentMouseMove(event) {
    event.preventDefault();
    let mousePos = getMousePositionOnCanvas(event);
    this.mouse.set((mousePos.x / this.canvas.width) * 2 - 1, -(mousePos.y / this.canvas.height) * 2 + 1);
    this.raycaster.setFromCamera(this.mouse, this.renderer);
    let objects = [];
    let intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
      let intersect = intersects[0];
      this.rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
      this.rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
    }
  }
}
