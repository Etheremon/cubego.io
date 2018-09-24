import {renderer as ThreeXFiberRenderer} from "./renderer";
import * as THREE from "three";
import 'three-orbitcontrols';
import {ThreeScene} from "../components/threeScene";

let rootContainer = null;
let scene, camera, mouse, raycaster, rollOverMesh, canvas;
let radius = 300, theta = 90, phi = 60;
let cubeGeo, cubeMaterial;
let objects = [];

function createRenderer(canvas, options) {
  scene = ThreeScene.create();
  scene.renderer = new THREE.WebGLRenderer({canvas, antialias: true});
  scene.canvas = canvas;
  // raycaster = new THREE.Raycaster();
  // mouse = new THREE.Vector2();

  // cubeGeo = new THREE.BoxBufferGeometry( 50, 50, 50 );
  // cubeMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff});

  // let rollOverGeo = new THREE.BoxBufferGeometry(50, 50, 50);
  // let rollOverMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, opacity: 0.5, transparent: true});
  // rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
  // scene.add(rollOverMesh);

  // let geometry = new THREE.PlaneBufferGeometry(1000, 1000);
  // geometry.rotateX(-Math.PI / 2);
  // plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({visible: false}));
  // scene.add(plane);
  // objects.push(plane);

  // let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
  // hemiLight.color.setHSL(0.6, 1, 0.6);
  // hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  // hemiLight.position.set(0, 50, 0);
  // scene.add(hemiLight);
  // let hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
  // scene.add(hemiLightHelper);

  // let gridHelper = new THREE.GridHelper(1000, 20);
  // scene.add(gridHelper);

  // container.addEventListener('mousemove', onDocumentMouseMove, false);
  // container.addEventListener( 'mousedown', onDocumentMouseDown, false );
  // animate();
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

function render(element, container, options = {}) {
  if (!rootContainer) {
    rootContainer = createRenderer(container, options);
  }
  ThreeXFiberRenderer.updateContainer(element, rootContainer, null);
  return ThreeXFiberRenderer.getPublicRootInstance(rootContainer);
}

export default render;
