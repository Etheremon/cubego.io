import {renderer as ThreeXFiberRenderer} from "./renderer";
import * as THREE from "three";
import 'three-orbitcontrols';

let rootContainer = null;
let scene, camera, renderer, cube, grid, projector, plane, controls, mouse, raycaster, rollOverMesh, canvas;
let radius = 300, theta = 90, phi = 60;
let cubeGeo, cubeMaterial;
let objects = [];

function createRenderer(container, options) {
  canvas = container;
  camera = new THREE.PerspectiveCamera(45, container.width / container.height, 1, 10000);
  camera.position.set(500, 800, 1300);
  camera.lookAt(0, 0, 0);
  controls = new THREE.OrbitControls(camera);

  scene = new THREE.Scene();
  scene.background = new THREE.Color().setHSL(0.6, 0, 1);
  renderer = new THREE.WebGLRenderer({canvas: container});
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  cubeGeo = new THREE.BoxBufferGeometry( 50, 50, 50 );
  cubeMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff});

  let rollOverGeo = new THREE.BoxBufferGeometry(50, 50, 50);
  let rollOverMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, opacity: 0.5, transparent: true});
  rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
  scene.add(rollOverMesh);

  let geometry = new THREE.PlaneBufferGeometry(1000, 1000);
  geometry.rotateX(-Math.PI / 2);
  plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({visible: false}));
  scene.add(plane);
  objects.push(plane);

  let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
  hemiLight.color.setHSL(0.6, 1, 0.6);
  hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);

  let gridHelper = new THREE.GridHelper(1000, 20);
  scene.add(gridHelper);

  let hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
  scene.add(hemiLightHelper);
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  controls.update();
  animate();
  return ThreeXFiberRenderer.createContainer(scene);
}

function onDocumentMouseDown(event) {
  event.preventDefault();
  let mousePos = getMousePositionOnCanvas(event);
  mouse.set((mousePos.x / canvas.width) * 2 - 1, -(mousePos.y / canvas.height) * 2 + 1);
  raycaster.setFromCamera(mouse, camera);
  let intersects = raycaster.intersectObjects(objects);
  if (intersects.length > 0) {
    let intersect = intersects[0];
    let voxel = new THREE.Mesh(cubeGeo, cubeMaterial);
    voxel.position.copy(intersect.point).add(intersect.face.normal);
    voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
    scene.add(voxel);
    objects.push(voxel);
  }
  render();
}

function getMousePositionOnCanvas(event) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

function onDocumentMouseMove(event) {
  event.preventDefault();
  let mousePos = getMousePositionOnCanvas(event);
  mouse.set((mousePos.x / canvas.width) * 2 - 1, -(mousePos.y / canvas.height) * 2 + 1);
  raycaster.setFromCamera(mouse, camera);
  let intersects = raycaster.intersectObjects(objects);
  if (intersects.length > 0) {
    let intersect = intersects[0];
    rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
    rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
  }
  render();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function render(element, container, options = {}) {
  if (!rootContainer) {
    rootContainer = createRenderer(container, options);
  }
  ThreeXFiberRenderer.updateContainer(element, rootContainer, null);
  return ThreeXFiberRenderer.getPublicRootInstance(rootContainer);
}

export default render;
