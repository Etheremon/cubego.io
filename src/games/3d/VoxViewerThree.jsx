import React, {Component} from 'react';
import ThreeX, {
  BoxHelper, Grid, HemisphereLight, MeshBox, MeshContainer, OrthographicCamera,
  PointLight,
} from "../threeX";
import {fullColorHex} from "../utils";
import {getMousePositionOnCanvas} from "../threeX/fiber/utils";

import {GetCellKey} from "../../utils/modelUtils";
import diamondMaterialConfig from './materials/Diamond.json';
import goldMaterialConfig from './materials/Gold.json';
import brickMaterialConfig from './materials/Brick.json';
import furMaterialConfig from './materials/Fur.json';
import iceMaterialConfig from './materials/Ice.json';
import ironMaterialConfig from './materials/Iron.json';
import leafMaterialConfig from './materials/Leaf.json';
import paperMaterialConfig from './materials/Paper.json';
import plasticMaterialConfig from './materials/Plastic.json';
import silverMaterialConfig from './materials/Silver.json';
import stoneMaterialConfig from './materials/Stone.json';
import woodMaterialConfig from './materials/Wood.json';
import {GetValues} from "../../utils/objUtils";

const SIZE = 50;
const SELECT_TOOL = 'move';
const DRAW_TOOL = 'draw';
const PAINT_TOOL = 'paint';
const ERASE_TOOL = 'erase';
const TOOL_KEYS = [SELECT_TOOL, DRAW_TOOL, PAINT_TOOL, ERASE_TOOL];

class VoxViewerThree extends Component {
  constructor(props) {
    super(props);
    this.state = {data: {}};
    this.mouse = new window.THREE.Vector2();
    this.raycaster = new window.THREE.Raycaster();
    this.objects = [];
    this.offsetVector = new window.THREE.Vector3(0, 0, 0);

    this.boxHelper = null;
    this.objectHovered = null;
    this.selectLayerColor = '0xffff00';
    this.featureSelected = '';
    this.updateGridIdx = 0;
    this.selectedDimension = null;
    this.selectedIdx = null;
    if (!props.tools) {
      this.tools = props.tools;
      this.hoverColor = '0x' + fullColorHex(props.tools.color.value);
    }
  }

  isSelectedLayer(position) {
    return position[this.selectedDimension] === this.selectedIdx;
  }

  renderVoxel(voxelData) {
    if (!voxelData.voxels) {
      return [];
    }
    let sizeX = voxelData.spaceSize.x[1] - voxelData.spaceSize.x[0] + 1;
    let sizeY = voxelData.spaceSize.y[1] - voxelData.spaceSize.y[0] + 1;
    this.updateGridIdx++;
    let x = SIZE * (voxelData.spaceSize.x[1] + voxelData.spaceSize.x[0]) / 2 - this.offsetVector.x + SIZE / 2;
    let z = SIZE * (voxelData.spaceSize.y[1] + voxelData.spaceSize.y[0]) / 2 - this.offsetVector.z + SIZE / 2;

    let elements = !this.props.viewOnly
      ? [<Grid width={sizeY * SIZE / 2} height={sizeX * SIZE / 2} linesHeight={sizeX} linesWidth={sizeY}
               color1={0xffffff} color2={0xffffff}
               position={{x: x, y: SIZE * this.state.data.spaceSize.z[0] - this.offsetVector.y, z: z}}
               key={`grid-${this.updateGridIdx}`}/>]
      : [];
    GetValues(voxelData.voxels).forEach((voxel) => {
      let position = {
        x: SIZE / 2 + SIZE * voxel.x - this.offsetVector.x,
        y: SIZE / 2 + SIZE * voxel.z - this.offsetVector.y,
        z: SIZE / 2 + SIZE * voxel.y - this.offsetVector.z
      };
      elements.push(<MeshBox size={SIZE} materialId={voxel.color.materialKey} highlight={this.isSelectedLayer(voxel)}
                             ref={(ref) => this.objects.push(ref)} variantColor={voxel.color.color}
                             position={position} variantEmissive={voxel.color.emissive}
                             key={`${GetCellKey(voxel.x, voxel.y, voxel.z)}`}/>)
    });

    return elements;
  }

  setNewVoxelData(voxelData) {
    this.offsetVector = new window.THREE.Vector3(SIZE * Math.floor(voxelData.size.x / 2), SIZE * voxelData.size.z / 2, Math.floor(SIZE * voxelData.size.y / 2));
    this.objects = [];
    this.setState({
      data: voxelData || {}
    }, () => {
      this.updateBoundingBox();
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
    if (this.state.data.spaceSize) {
      this.updateBoundingBox();
    }
    this.calculateSelectedLayer();
    this.forceUpdate();
  }

  calculateSelectedLayer() {
    switch (this.tools['view-2d'].value.viewKey) {
      case 'front':
        this.selectedDimension = 'x';
        break;
      case 'top':
        this.selectedDimension = 'z';
        break;
      case 'side':
        this.selectedDimension = 'y';
        break;
    }
    this.selectedIdx = this.tools['layer-index'].value;
  }

  updateHoverBoxColor(color) {
    this.rollOverMesh.renderer.material.color.setHex(color);
  }

  updateBoundingBox() {
    let min = {
      x: SIZE * this.state.data.spaceSize.x[0] - this.offsetVector.x,
      y: SIZE * this.state.data.spaceSize.z[0] - this.offsetVector.y,
      z: SIZE * this.state.data.spaceSize.y[0] - this.offsetVector.z
    };

    let max = {
      x: SIZE + SIZE * this.state.data.spaceSize.x[1] - this.offsetVector.x,
      y: SIZE + SIZE * this.state.data.spaceSize.z[1] - this.offsetVector.y,
      z: SIZE + SIZE * this.state.data.spaceSize.y[1] - this.offsetVector.z
    };

    let center = {
      x: (max.x + min.x) / 2,
      y: (max.y + min.y) / 2,
      z: (max.z + min.z) / 2
    };
    if (this.boxHelper) this.boxHelper.min = min;
    if (this.boxHelper) this.boxHelper.max = max;
    this.camera.orbitControlTarget = center;
  }

  componentDidMount() {
    this.canvas = document.getElementById('canvas3D');
    if (!this.props.viewOnly) {
      this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this), false);
      this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    }
    ThreeX.loadMaterial('diamond', diamondMaterialConfig);
    ThreeX.loadMaterial('gold', goldMaterialConfig);
    ThreeX.loadMaterial('brick', brickMaterialConfig);
    ThreeX.loadMaterial('ice', iceMaterialConfig);
    ThreeX.loadMaterial('iron', ironMaterialConfig);
    ThreeX.loadMaterial('leaf', leafMaterialConfig);
    ThreeX.loadMaterial('paper', paperMaterialConfig);
    ThreeX.loadMaterial('plastic', plasticMaterialConfig);
    ThreeX.loadMaterial('silver', silverMaterialConfig);
    ThreeX.loadMaterial('stone', stoneMaterialConfig);
    ThreeX.loadMaterial('wood', woodMaterialConfig);
    ThreeX.loadMaterial('fur', furMaterialConfig);

    if (!this.props.viewOnly) {
      this.updateHoverBoxColor();
    }
    if (this.props.data) {
      this.setNewVoxelData(this.props.data);
    }
    if (this.props.tools) {
      this.setNewTools(this.props.tools);
    }
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
    this.canvas.removeEventListener('mousedown', this.onMouseDown.bind(this), false);
  }

  getRendererObject() {
    return this.objects.filter((object) => {
      return !!object
    }).map((object) => {
      return object.renderer
    });
  }

  onMouseDown(event) {
    let mousePos = getMousePositionOnCanvas(event, this.canvas);
    this.mouse.set((mousePos.x / this.canvas.width) * 2 - 1, -(mousePos.y / this.canvas.height) * 2 + 1);
    this.raycaster.setFromCamera(this.mouse, this.camera._renderer);
    let intersects = this.raycaster.intersectObjects(this.getRendererObject());
    if (intersects.length > 0) {
      let intersect = intersects[0];
      let position;
      if (this.featureSelected === DRAW_TOOL) {
        position = new window.THREE.Vector3().copy(intersect.point).add(intersect.face.normal).clone();
      } else {
        position = intersect.object.position.clone();
      }
      let cubePos = position.add(this.offsetVector).divideScalar(SIZE).floor();
      this.props.onCellClicked && this.props.onCellClicked({
        ['x']: cubePos.x,
        ['y']: cubePos.z,
        ['z']: cubePos.y,
      });
      this.rollOverMesh.renderer.visible = false;
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
        this.showSelectingCube(intersect);
        break;
    }
  }

  showSelectingCube(intersect) {
    this.rollOverMesh.renderer.visible = true;
    let position = intersect.object.position.clone();
    this.rollOverMesh.renderer.position.copy(position);
    this.updateHoverBoxColor(this.selectLayerColor);
  }

  showAddingCube(intersect) {
    this.rollOverMesh.renderer.visible = true;
    let position = new window.THREE.Vector3().copy(intersect.point).add(intersect.face.normal).clone();
    position.divideScalar(SIZE).floor();
    position.multiplyScalar(SIZE).addScalar(SIZE / 2);
    this.rollOverMesh.renderer.position.copy(position);
    this.objectHovered = this.rollOverMesh.renderer;
    this.objectHovered.material.opacity = 0.8;
    this.updateHoverBoxColor(this.hoverColor);
    this.rollOverMesh.renderer.position.copy(position);
  }

  showDeleteCube(intersect) {
    intersect.object.material.opacity = 0.3;
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
        {/*/!*<Axis/>*!/*/}
        <OrthographicCamera lookAt={{x: 0, y: 300, z: 0}} fov={45} near={1} far={5000} ref={(ref) => {
          this.camera = ref
        }} position={{x: 1000, y: 1600, z: 2600}}/>
        <HemisphereLight/>
        <PointLight position={{x: 0, y: 400, z: 0}}/>
        <PointLight position={{x: 200, y: 400, z: 200}}/>
        <PointLight position={{x: -200, y: -400, z: -200}}/>

        {!this.props.viewOnly ?
          <MeshBox size={SIZE + 1} color='ff0000' ref={(ref) => {
            this.rollOverMesh = ref
          }} wireFrameColor='000000'/> : null
        }

        {!this.props.viewOnly ?
          <BoxHelper ref={(ref) => {
            this.boxHelper = ref
          }}/> : null
        }
        {this.renderVoxel(this.state.data)}
      </MeshContainer>
    );
  }
}

export default VoxViewerThree;
