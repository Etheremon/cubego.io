import React, {Component} from 'react';
import {
  Axis,
  BoxHelper,
  Grid,
  HemisphereLight,
  MeshBox,
  MeshContainer,
  OrthographicCamera,
} from "../threeX";
import * as Utils from "../../utils/utils";
import {fullColorHex} from "../utils";
import {getMousePositionOnCanvas} from "../threeX/fiber/utils";
import * as THREE from "three";

const SIZE = 50;
const DRAW_TOOL = 'draw';
const PAINT_TOOL = 'paint';
const ERASE_TOOL = 'erase';
const TOOL_KEYS = [DRAW_TOOL, PAINT_TOOL, ERASE_TOOL];

class VoxViewerThree extends Component {
  constructor(props) {
    super(props);
    this.state = {data: {}};
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.objects = [];
    this.offsetVector = new THREE.Vector3(0, 0, 0);

    this.boxHelper = null;
    this.tools = props.tools;
    this.objectHovered = null;
    this.hoverColor = '0x' + fullColorHex(props.tools.color.value);
    this.selectLayerColor = '0xffff00';
    this.featureKeyDown = '';
    this.featureSelected = '';
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
      elements.push(<MeshBox size={SIZE} ref={(ref) => {
        this.objects.push(ref)
      }}
                             position={position} color={color} key={`${voxel.x}-${voxel.y}-${voxel.z}`}/>)
    });
    return elements;
  }

  setNewVoxelData(voxelData) {
    this.offsetVector = new THREE.Vector3(SIZE * Math.floor(voxelData.size.x / 2), SIZE * voxelData.size.z / 2, Math.floor(SIZE * voxelData.size.y / 2));
    this.objects = [];
    this.setState({
      data: voxelData || {}
    }, () => {
      this.updateHighLightLayer();
    });
  }

  setNewTools(tools) {
    this.tools = tools;
    this.hoverColor = '0x' + fullColorHex(this.tools.color.value);
    TOOL_KEYS.forEach((toolKey) => {
      if (tools[toolKey].value) {
        this.featureSelected = toolKey;
      }
    });
    this.updateHoverBoxColor(this.hoverColor);
    this.updateHighLightLayer();
  }

  updateHoverBoxColor(color) {
    this.rollOverMesh.renderer.material.color.setHex(color);
  }

  updateHighLightLayer() {
    let center = {x: 0, y: 0, z: 0};

    let size = {x: this.state.data.size.x * SIZE, y: this.state.data.size.z * SIZE, z: this.state.data.size.y * SIZE};

    switch (this.tools['view-2d'].value.key) {
      case 'front':
        center.x = -SIZE / 2 + this.state.data.size.x * SIZE - this.offsetVector.x - (this.tools['layer-index'].value - 1) * SIZE;
        size.x = SIZE;
        break;
      case 'top':
        center.y = -SIZE / 2 + this.state.data.size.z * SIZE - this.offsetVector.y - (this.tools['layer-index'].value - 1) * SIZE;
        size.y = SIZE;
        break;
      case 'side':
        center.z = -SIZE / 2 + this.state.data.size.y * SIZE - this.offsetVector.z - (this.tools['layer-index'].value - 1) * SIZE;
        size.z = SIZE;
        break;
    }

    this.boxHelper.setFromCenterAndSize(center, size);
  }

  componentDidMount() {
    this.canvas = document.getElementById('canvas3D');
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    document.addEventListener('keydown', this.onDocumentKeyDown.bind(this), false);
    document.addEventListener('keyup', this.onDocumentKeyUp.bind(this), false);
    this.updateHoverBoxColor();
  }

  componentWillUnmount() {
    this.canvas = document.getElementById('canvas3D');
    this.canvas.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
    this.canvas.removeEventListener('mousedown', this.onMouseDown.bind(this), false);
    document.removeEventListener('keydown', this.onDocumentKeyDown.bind(this), false);
    document.removeEventListener('keyup', this.onDocumentKeyUp.bind(this), false);
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
      case 68: // d
        if (!this.featureKeyDown)
          this.featureKeyDown = DRAW_TOOL;
        break;
      case 69: // e
        if (!this.featureKeyDown)
          this.featureKeyDown = ERASE_TOOL;
        break;
      case 80: //p
        if (!this.featureKeyDown)
          this.featureKeyDown = PAINT_TOOL;
        break;
    }

  }

  onDocumentKeyUp(event) {
    switch (event.keyCode) {
      case 68: // d
      case 69: // e
      case 80: // p
        this.featureKeyDown = null;
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
      if (this.featureKeyDown === 'd') {
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
    if (this.objectHovered) {
      this.objectHovered.material.opacity = 1;
    }
    this.rollOverMesh.renderer.visible = false;
    let mousePos = getMousePositionOnCanvas(event, this.canvas);
    this.mouse.set((mousePos.x / this.canvas.width) * 2 - 1, -(mousePos.y / this.canvas.height) * 2 + 1);
    this.raycaster.setFromCamera(this.mouse, this.camera._renderer);
    let intersects = this.raycaster.intersectObjects(this.getRendererObject());
    if (intersects.length > 0) {
      this.hoverBehaviour(intersects[0]);
    }
  }

  hoverBehaviour(intersect) {
    this.rollOverMesh.renderer.visible = false;
    switch (this.featureKeyDown) {
      case DRAW_TOOL:
        this.showAddingCube(intersect);
        break;
      case ERASE_TOOL:
        this.showDeleteCube(intersect);
        break;
      case PAINT_TOOL:
        this.showPaintingCube(intersect);
        break;
      default:
        switch (this.featureSelected) {
          case DRAW_TOOL:
            this.showAddingCube(intersect);
            break;
          case ERASE_TOOL:
            this.showDeleteCube(intersect);
            break;
          case PAINT_TOOL:
            this.showPaintingCube(intersect);
            break;
          default:
            this.rollOverMesh.renderer.visible = true;
            let position = intersect.object.position.clone();
            this.rollOverMesh.renderer.position.copy(position);
            this.updateHoverBoxColor(this.selectLayerColor);
            break;
        }
        break;
    }
  }

  showAddingCube(intersect) {
    this.rollOverMesh.renderer.visible = true;
    let position = new THREE.Vector3().copy(intersect.point).add(intersect.face.normal).clone();
    position.divideScalar(SIZE).floor();
    position.multiplyScalar(SIZE).addScalar(SIZE / 2);
    this.rollOverMesh.renderer.position.copy(position);
    this.objectHovered = this.rollOverMesh.renderer;
    this.objectHovered.material.opacity = 0.8;
    this.updateHoverBoxColor(this.hoverColor);
    this.rollOverMesh.renderer.position.copy(position);
  }

  showDeleteCube(intersect) {
    intersect.object.material.opacity = 0.5;
    this.objectHovered = intersect.object;
  }

  showPaintingCube(intersect) {
    this.rollOverMesh.renderer.visible = true;
    let position = intersect.object.position.clone();
    this.updateHoverBoxColor(this.hoverColor);
    this.rollOverMesh.renderer.position.copy(position);
  }

  render() {
    return (
      <MeshContainer position={{x: 0, y: 0, z: 0}}>
        {/*<Axis/>*/}
        <OrthographicCamera ref={(ref) => {
          this.camera = ref
        }} position={{x: 1000, y: 1600, z: 2600}} lookAt={{x: 0, y: 300, z: 0}} fov={45} near={1} far={5000}/>
        <HemisphereLight/>
        <MeshBox size={SIZE + 1} color='ff0000' ref={(ref) => {
          this.rollOverMesh = ref
        }}/>
        <BoxHelper ref={(ref) => {
          this.boxHelper = ref
        }}/>
        {this.renderVoxel(this.state.data)}
      </MeshContainer>
    );
  }
}

export default VoxViewerThree;
