import React, {Component} from 'react';
import {Axis, Grid, HemisphereLight, MeshBox, MeshContainer, PerspectiveCamera} from "../threeX";
import * as Utils from "../../utils/utils";
import {fullColorHex} from "../utils";
import {getMousePositionOnCanvas} from "../threeX/fiber/utils";
import * as THREE from "three";

const SIZE = 50;

class VoxViewerThree extends Component {
  constructor(props) {
    super(props);
    this.state = {data: {}};
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.objects = [];
    this.offsetVector = new THREE.Vector3(0, 0, 0);
    this.isShiftDown = false;
  }

  renderVoxel(voxelData) {
    if (!voxelData.voxels) {
      return [];
    }
    let divisions = Math.max(voxelData.size.x, voxelData.size.y);
    let elements = [<Grid size={divisions * SIZE} divisions={divisions} key='grid' color1={0xffffff} color2={0xffffff}
                          position={{x: 0, y: -SIZE * voxelData.size.z / 2, z: 0}}/>];
    Utils.ObjGetValues(voxelData.voxels).forEach((voxel) => {
      let position = {
        x: SIZE / 2 + SIZE * voxel.x - this.offsetVector.x,
        y: SIZE / 2 + SIZE * voxel.z - this.offsetVector.y,
        z: SIZE / 2 + SIZE * voxel.y - this.offsetVector.z
      };
      let color = voxel['color']['hex'] ? voxel['color']['hex'].replace('#', '') : fullColorHex(voxel['color']);
      elements.push(<MeshBox size={SIZE} ref={(ref) => {this.objects.push(ref)}}
                             position={position} color={color} key={`${voxel.x}-${voxel.y}-${voxel.z}`}/>)
    });
    return elements;
  }

  setNewVoxelData(voxelData) {
    console.log(voxelData);
    this.offsetVector = new THREE.Vector3(SIZE * Math.floor(voxelData.size.x / 2), SIZE * voxelData.size.z / 2, Math.floor(SIZE * voxelData.size.y / 2));
    this.objects = [];
    this.setState({
      data: voxelData || {}
    });
  }

  setNewTools(tools) {
    let colorHex = '0x' + fullColorHex(tools.color.value);
    this.rollOverMesh.renderer.material.color.setHex(colorHex);
  }

  componentDidMount() {
    this.canvas = document.getElementById('canvas3D');
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    document.addEventListener('keydown', this.onDocumentKeyDown.bind(this), false)
    document.addEventListener('keyup', this.onDocumentKeyUp.bind(this), false)
  }

  getRendererObject() {
    return this.objects.filter((object) => {
      return !!object
    }).map((object) => {
      return object.renderer
    });
  }

  onDocumentKeyDown(event) {
    switch (event.keyCode) {
      case 16:
        this.isShiftDown = true;
        break
    }

  }

  onDocumentKeyUp(event) {
    switch (event.keyCode) {
      case 16:
        this.isShiftDown = false;
        break;
    }
  }

  onMouseDown(event) {
    let mousePos = getMousePositionOnCanvas(event, this.canvas);
    this.mouse.set((mousePos.x / this.canvas.width) * 2 - 1, -(mousePos.y / this.canvas.height) * 2 + 1);
    this.raycaster.setFromCamera(this.mouse, this.camera._renderer);
    let intersects = this.raycaster.intersectObjects(this.getRendererObject());
    if (intersects.length > 0) {
      let intersect = intersects[0];
      let position;
      if (this.isShiftDown) {
        position = new THREE.Vector3().copy(intersect.point).add(intersect.face.normal).clone();
      } else {
        position = intersect.object.position.clone();
      }
      let cubePos = position.add(this.offsetVector).divideScalar(SIZE).floor();
      this.props.onCellClicked && this.props.onCellClicked({
        ['x']: cubePos.x,
        ['y']: cubePos.z,
        ['z']: cubePos.y,
      })
    }
  }

  onMouseMove(event) {
    event.preventDefault();
    let mousePos = getMousePositionOnCanvas(event, this.canvas);
    this.mouse.set((mousePos.x / this.canvas.width) * 2 - 1, -(mousePos.y / this.canvas.height) * 2 + 1);
    this.raycaster.setFromCamera(this.mouse, this.camera._renderer);
    let intersects = this.raycaster.intersectObjects(this.getRendererObject());
    if (intersects.length > 0) {
      let intersect = intersects[0];
      if (this.isShiftDown) {
        let position = new THREE.Vector3().copy(intersect.point).add(intersect.face.normal);
        position.divideScalar(50).floor();
        position.multiplyScalar(50).addScalar(25);
        this.rollOverMesh.renderer.position.copy(position);
      } else {
        this.rollOverMesh.renderer.position.copy(intersect.object.position);
      }
    }
  }

  render() {
    return (
      <MeshContainer position={{x: 0, y: 0, z: 0}}>
        <Axis/>
        <PerspectiveCamera ref={(ref) => {
          this.camera = ref
        }} position={{x: 500, y: 800, z: 1300}} lookAt={{x: 0, y: 300, z: 0}} fov={45} near={1} far={5000}/>
        <HemisphereLight/>
        <MeshBox size={SIZE + 1} color='ff0000' ref={(ref) => {
          this.rollOverMesh = ref
        }}/>
        {this.renderVoxel(this.state.data)}
      </MeshContainer>
    );
  }
}

export default VoxViewerThree;
