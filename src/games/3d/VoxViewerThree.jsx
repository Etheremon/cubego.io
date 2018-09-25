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
  }

  renderVoxel(voxelData) {
    if (!voxelData.voxels) {
      return [];
    }
    let divisions = Math.max(voxelData.size.x, voxelData.size.z);
    let elements = [<Grid size={divisions * 50} divisions={divisions} key='grid'
                          position={{x: 0, y: -SIZE * voxelData.size.x / 2, z: 0}}/>];
    Utils.ObjGetValues(voxelData.voxels).forEach((voxel) => {
      let color = voxel['color']['hex'] ? voxel['color']['hex'].replace('#', '') : fullColorHex(voxel['color']);
      elements.push(<MeshBox size={SIZE} ref={(ref) => {
        this.objects.push(ref._renderer)
      }}
                             position={{
                               x: SIZE / 2 + SIZE * voxel.x - SIZE * voxelData.size.x / 2,
                               y: SIZE / 2 + SIZE * voxel.y - SIZE * voxelData.size.x / 2,
                               z: SIZE / 2 + SIZE * voxel.z - SIZE * voxelData.size.z / 2
                             }}
                             key={`${voxel.x}-${voxel.y}-${voxel.z}-${voxel.updateIdx}`}
                             color={color}/>)
    });
    return elements;
  }

  setNewVoxelData(voxelData) {
    this.setState({
      data: voxelData || {}
    });
  }

  componentDidMount() {
    this.canvas = document.getElementById('canvas3D');
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    // canvas.addEventListener('mousedown', this.onMouseDown.bind(this), false);
  }

  onMouseMove(event) {
    event.preventDefault();
    let mousePos = getMousePositionOnCanvas(event, this.canvas);
    this.mouse.set((mousePos.x / this.canvas.width) * 2 - 1, -(mousePos.y / this.canvas.height) * 2 + 1);
    this.raycaster.setFromCamera(this.mouse, this.camera._renderer);
    let intersects = this.raycaster.intersectObjects(this.objects);
    if (intersects.length > 0) {
      let intersect = intersects[0];
      if (false) {//for adding
        let position = new THREE.Vector3().copy(intersect.point).add(intersect.face.normal);
        position.divideScalar(50).floor();
        position.multiplyScalar(50).addScalar(25);
        this.rollOverMesh.renderer.position.copy(position);
      } else {//for painting
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
        }} position={{x: -500, y: 800, z: -1300}} lookAt={{x: 0, y: 300, z: 0}} fov={45} near={1} far={5000}/>
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
