import {BabylonMeshSphere} from "./babylonMeshSphere";
import {BabylonMeshBox} from "./babylonMeshBox";
import {BabylonMeshContainer} from "./babylonMeshContainer";
import {BabylonMeshCylinder} from "./babylonMeshCylinder";
import {BabylonArcRotateCamera} from "./babylonArcRotateCamera";
import {BabylonPointLight} from "./babylonPointLight";
import {BabylonAxis} from "./babylonAxis";
const TYPES = {
  MESH_SPHERE: 'MESH_SPHERE',
  MESH_BOX: 'MESH_BOX',
  MESH_CONTAINER: 'MESH_CONTAINER',
  MESH_CYLINDER: 'MESH_CYLINDER',
  ARC_ROTATE_CAMERA: 'ARC_ROTATE_CAMERA',
  POINT_LIGHT: 'POINT_LIGHT',
  AXIS: 'AXIS'
};

let mappingComponents = {};
mappingComponents[TYPES.MESH_SPHERE] = BabylonMeshSphere;
mappingComponents[TYPES.MESH_BOX] = BabylonMeshBox;
mappingComponents[TYPES.MESH_CONTAINER] = BabylonMeshContainer;
mappingComponents[TYPES.MESH_CYLINDER] = BabylonMeshCylinder;
mappingComponents[TYPES.ARC_ROTATE_CAMERA] = BabylonArcRotateCamera;
mappingComponents[TYPES.POINT_LIGHT] = BabylonPointLight;
mappingComponents[TYPES.AXIS] = BabylonAxis;

const createComponent = (type, props, rootContainerInstance) => {
  return mappingComponents[type].create(rootContainerInstance, props);
};

export {createComponent, TYPES};
