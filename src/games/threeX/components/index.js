import {ThreeMeshContainer} from "./threeMeshContainer";
import {ThreePerspectiveCamera} from "./threePerspectiveCamera";
import {ThreeGrid} from "./threeGrid";
import {ThreeHemisphereLight} from "./threeHemisphereLight";
import {ThreeMeshBox} from "./threeMeshBox";
import {ThreeAxis} from "./threeAxis";

const TYPES = {
  MESH_CONTAINER: 'MESH_CONTAINER',
  PERSPECTIVE_CAMERA: 'PERSPECTIVE_CAMERA',
  GRID: 'GRID',
  HEMISPHERE_LIGHT: 'HEMISPHERE_LIGHT',
  MESH_BOX: 'MESH_BOX',
  AXIS: 'AXIS'
};

let mappingComponents = {};
mappingComponents[TYPES.MESH_CONTAINER] = ThreeMeshContainer;
mappingComponents[TYPES.PERSPECTIVE_CAMERA] = ThreePerspectiveCamera;
mappingComponents[TYPES.GRID] = ThreeGrid;
mappingComponents[TYPES.HEMISPHERE_LIGHT] = ThreeHemisphereLight;
mappingComponents[TYPES.MESH_BOX] = ThreeMeshBox;
mappingComponents[TYPES.AXIS] = ThreeAxis;

const createComponent = (type, props, rootContainerInstance) => {
  return mappingComponents[type].create(rootContainerInstance, props);
};

export {createComponent, TYPES};