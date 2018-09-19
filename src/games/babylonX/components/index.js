import {BabylonMeshSphere} from "./babylonMeshSphere";
import {BabylonMeshBox} from "./babylonMeshBox";
import {BabylonMeshContainer} from "./babylonMeshContainer";
import {BabylonMeshCylinder} from "./babylonMeshCylinder";
import {BabylonArcRotateCamera} from "./babylonArcRotateCamera";
import {BabylonPointLight} from "./babylonPointLight";
import {BabylonAxis} from "./babylonAxis";
import {BabylonVoxel, BabylonVoxelBuilder} from "./babylonVoxel";
import {BabylonHemisphericLight} from "./babylonHemisphericLight";
import {BabylonDirectionLight} from "./babylonDirectionLight";
import {BabylonAnimation} from "./babylonAnimation";
const TYPES = {
  MESH_SPHERE: 'MESH_SPHERE',
  MESH_BOX: 'MESH_BOX',
  MESH_CONTAINER: 'MESH_CONTAINER',
  MESH_CYLINDER: 'MESH_CYLINDER',
  ARC_ROTATE_CAMERA: 'ARC_ROTATE_CAMERA',
  POINT_LIGHT: 'POINT_LIGHT',
  AXIS: 'AXIS',
  VOXEL: 'VOXEL',
  HEMISPHERIC_LIGHT: 'HEMISPHERIC_LIGHT',
  DIRECTION_LIGHT: 'DIRECTION_LIGHT',
  ANIMATION: 'ANIMATION'
};

let mappingComponents = {};
mappingComponents[TYPES.MESH_SPHERE] = BabylonMeshSphere;
mappingComponents[TYPES.MESH_BOX] = BabylonMeshBox;
mappingComponents[TYPES.MESH_CONTAINER] = BabylonMeshContainer;
mappingComponents[TYPES.MESH_CYLINDER] = BabylonMeshCylinder;
mappingComponents[TYPES.ARC_ROTATE_CAMERA] = BabylonArcRotateCamera;
mappingComponents[TYPES.POINT_LIGHT] = BabylonPointLight;
mappingComponents[TYPES.AXIS] = BabylonAxis;
mappingComponents[TYPES.VOXEL] = BabylonVoxel;
mappingComponents[TYPES.HEMISPHERIC_LIGHT] = BabylonHemisphericLight;
mappingComponents[TYPES.DIRECTION_LIGHT] = BabylonDirectionLight;
mappingComponents[TYPES.ANIMATION] = BabylonAnimation;

const createComponent = (type, props, rootContainerInstance) => {
  return mappingComponents[type].create(rootContainerInstance, props);
};

export {createComponent, TYPES};
