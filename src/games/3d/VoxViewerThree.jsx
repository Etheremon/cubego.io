import React, {Component} from 'react';
import ThreeX, {
  AmbientLight, Background, DirectionalLight,
  Grid, HemisphereLight, MeshBox, MeshContainer, OrthographicCamera, Plane,
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
import {ObjIsEmpty} from "../../utils/utils";

const SIZE = 50;
const SELECT_TOOL = 'move';
const DRAW_TOOL = 'draw';
const PAINT_TOOL = 'paint';
const ERASE_TOOL = 'erase';
const PICK_COLOR_TOOL = 'pickColor';
const TOOL_KEYS = [SELECT_TOOL, DRAW_TOOL, PAINT_TOOL, ERASE_TOOL, PICK_COLOR_TOOL];
const ARROW_DISTANCE = 100;

class VoxViewerThree extends Component {
  constructor(props) {
    super(props);
    this.state = {data: {}, unMounted: false, takingScreenshot: false};
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
      this.hoverColor = '0x' + props.tools.color.value.color.replace('#', '');
    }
    this.light = null;
    this.rendererObjects = [];
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  renderVoxel(voxelData) {
    if (!voxelData.voxels) {
      return [];
    }
    let size = {};
    size.x = voxelData.spaceSize.x[1] - voxelData.spaceSize.x[0] + 1;
    size.y = voxelData.spaceSize.y[1] - voxelData.spaceSize.y[0] + 1;
    size.z = voxelData.spaceSize.z[1] - voxelData.spaceSize.z[0] + 1;

    this.updateGridIdx++;
    let x = SIZE * (voxelData.spaceSize.x[1] + voxelData.spaceSize.x[0]) / 2 - this.offsetVector.x + SIZE / 2;
    let z = SIZE * (voxelData.spaceSize.y[1] + voxelData.spaceSize.y[0]) / 2 - this.offsetVector.z + SIZE / 2;
    let elements = !this.props.viewOnly && !this.state.takingScreenshot
      ? [
        <Plane imageUrl={require('../../shared/img/assets/triangle.png')} key={`arrow`}
               position={{
                 x: x,
                 y: SIZE * this.state.data.spaceSize.z[0] - this.offsetVector.y,
                 z: size.y * SIZE / 2 + z + ARROW_DISTANCE
               }}
               rotation={{x: Math.PI / 2, y: Math.PI, z: 0}}
        />,
        <Grid width={size.y * SIZE / 2} height={size.x * SIZE / 2} linesHeight={size.x} linesWidth={size.y}
              color1={0xffffff} color2={0xffffff}
              position={{x: x, y: SIZE * this.state.data.spaceSize.z[0] - this.offsetVector.y, z: z}}
              key={`grid-${this.updateGridIdx}`}/>]
      : [];
    if (!this.props.viewOnly && this.state.takingScreenshot) {
      elements.push(<Background textureId={'bg-capture'} key={'background'}/>);
    }

    GetValues(voxelData.voxels).forEach((voxel) => {
      let position = {
        x: SIZE / 2 + SIZE * voxel.x - this.offsetVector.x,
        y: SIZE / 2 + SIZE * voxel.z - this.offsetVector.y,
        z: SIZE / 2 + SIZE * voxel.y - this.offsetVector.z
      };
      elements.push(<MeshBox size={SIZE} materialId={voxel.color.materialKey} variantId={voxel.color.variant_id}
                             ref={(ref) => this.objects.push(ref)} position={position}
                             key={`${GetCellKey(voxel.x, voxel.y, voxel.z)}`}/>);
    });

    if (!this.props.viewOnly && this.state.showLayer && !this.state.takingScreenshot) {
      let hPos = {};
      let hSize = {};
      let correctLabel = {x: 'x', y: 'z', z: 'y'};
      ['x', 'y', 'z'].forEach((k) => {
        hSize[correctLabel[k]] = (k === this.selectedDimension) ? SIZE + 1 : size[k] * SIZE;
        hPos[correctLabel[k]] = (k === this.selectedDimension)
          ? SIZE / 2 + SIZE * this.selectedIdx - this.offsetVector[correctLabel[k]]
          : SIZE * (voxelData.spaceSize[k][1] + voxelData.spaceSize[k][0]) / 2 - this.offsetVector[correctLabel[k]] + SIZE / 2;
      });
      elements.push(<MeshBox size={hSize} position={hPos} color={'ffffff'} opacity={0.15} shadow={false}
                             key={`highlight-layer-${this.updateGridIdx}`}/>);
    }
    return elements;
  }

  setNewVoxelData(voxelData) {
    this.offsetVector = new window.THREE.Vector3(SIZE * Math.floor(voxelData.size.x / 2), SIZE * Math.floor(voxelData.size.z / 2), SIZE * Math.floor(voxelData.size.y / 2));
    this.objects = [];
    this.setState({
      data: voxelData || {}
    }, () => {
      this.updateBoundingBox();
    });
  }

  componentDidUpdate() {
    this.rendererObjects = this.getRendererObjects();
  }

  takeScreenshot() {
    return ThreeX.loadTexture('bg-capture', require('../../shared/img/background/background_capture.jpg')).then(() => {
      return new Promise((resolve, reject) => {
        this.setState({
          takingScreenshot: true
        }, () => {
          let data = ThreeX.Tools.takeScreenshot();
          this.setState({
            takingScreenshot: false
          });
          resolve(data);
        });
      });
    })

  }

  setNewTools(tools) {
    this.tools = tools;
    this.hoverColor = '0x' + tools.color.value.color.replace('#', '');
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

  toggleLayer(isShowingLayer) {
    this.setState({showLayer: isShowingLayer});
  }

  calculateSelectedLayer() {
    switch (this.tools['view-2d'].value.viewKey) {
      case 'front':
        this.selectedDimension = 'y';
        break;
      case 'top':
        this.selectedDimension = 'z';
        break;
      case 'side':
        this.selectedDimension = 'x';
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
    this.light.target = center;
  }

  componentDidMount() {
    this.canvas = document.getElementById('canvas3D');
    if (!this.props.viewOnly) {
      this.canvas.addEventListener('mousemove', this.onMouseMove, false);
      this.canvas.addEventListener('mousedown', this.onMouseDown, false);
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
    if (this.props.tools && !ObjIsEmpty(this.props.tools)) {
      this.setNewTools(this.props.tools);
    }
    this.toggleLayer(!!this.props.showLayer);
  }

  destroy() {
    this.canvas.removeEventListener('mousemove', this.onMouseMove, false);
    this.canvas.removeEventListener('mousedown', this.onMouseDown, false);
    this.setState({unMounted: true});
  }

  getRendererObjects() {
    return this.objects.filter((object) => {
      return !!object
    }).map((object) => {
      return object.renderer
    })
  }

  onMouseDown(event) {
    event.preventDefault();

    let mousePos = getMousePositionOnCanvas(event, this.canvas);
    this.mouse.set((mousePos.x / this.canvas.width) * 2 - 1, -(mousePos.y / this.canvas.height) * 2 + 1);
    this.raycaster.setFromCamera(this.mouse, this.camera._renderer);
    let intersects = this.raycaster.intersectObjects(this.rendererObjects);
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
    let intersects = this.raycaster.intersectObjects(this.rendererObjects);
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
      case PICK_COLOR_TOOL:
        this.showColorPickerCube(intersect);
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
    this.rollOverMesh.renderer.visible = true;
    let position = intersect.object.position.clone();
    this.rollOverMesh.renderer.position.copy(position);
    this.objectHovered = this.rollOverMesh.renderer;
    this.updateHoverBoxColor(intersect.object.material.color);
    this.objectHovered.material.opacity = 0.6;
  }

  showPaintingCube(intersect) {
    this.rollOverMesh.renderer.visible = true;
    let position = intersect.object.position.clone();
    this.updateHoverBoxColor(this.hoverColor);
    this.rollOverMesh.renderer.position.copy(position);
  }

  showColorPickerCube(intersect) {
    this.rollOverMesh.renderer.visible = true;
    let position = intersect.object.position.clone();
    this.rollOverMesh.renderer.position.copy(position);
    this.objectHovered = this.rollOverMesh.renderer;
    this.updateHoverBoxColor(intersect.object.material.color);
    this.objectHovered.material.opacity = 0.8;
  }

  render() {
    if (this.state.unMounted) {
      return <MeshContainer/>;
    }

    return (
      <MeshContainer position={{x: 0, y: 0, z: 0}}>
        <OrthographicCamera lookAt={{x: 0, y: 300, z: 0}} fov={45} near={1} far={5000} ref={(ref) => {
          this.camera = ref
        }} position={{x: 1000, y: 1600, z: 2600}}/>
        {/*<AmbientLight/>*/}
        {/*<HemisphereLight position={{x: 0, y: 0, z: 0}}/>*/}

        {/*<PointLight position={{x: 1000, y: 0, z: 0}}/>*/}
        {/*<PointLight position={{x: -1000, y: 0, z: 0}}/>*/}

        {/*<PointLight position={{x: 0, y: 0, z: -1000}}/>*/}
        {/*<PointLight position={{x: 0, y: 0, z: 1000}}/>*/}
        <DirectionalLight position={{x: -1000, y: 1000, z: 1000}} followCamera={true} ref={(ref) => this.light = ref}/>
        {!this.props.viewOnly ?
          <MeshBox size={SIZE + 1} color='ff0000' ref={(ref) => {
            this.rollOverMesh = ref;
          }} wireFrameColor='000000' visible={false}/> : null
        }
        {this.renderVoxel(this.state.data)}
      </MeshContainer>
    );
  }
}

export default VoxViewerThree;
