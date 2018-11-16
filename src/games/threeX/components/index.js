import {ThreeMeshContainer} from "./threeMeshContainer";
import {ThreePerspectiveCamera} from "./threePerspectiveCamera";
import {ThreeGrid} from "./threeGrid";
import {ThreeHemisphereLight} from "./threeHemisphereLight";
import {ThreeMeshBox} from "./threeMeshBox";
import {ThreeAxis} from "./threeAxis";
import {ThreeBox3Helper} from "./threeBox3Helper";
import {ThreeOrthographicCamera} from "./threeOrthographicCamera";
import {ThreePointLight} from "./threePointLight";
import {ThreePlane} from "./threePlane";
import {ThreeAmbientLight} from "./threeAmbientLight";
import {ThreeDirectionalLight} from "./threeDirectionalLight";
import {ThreeBackground} from "./threeBackground";

const TYPES = {
  MESH_CONTAINER: 'MESH_CONTAINER',
  PERSPECTIVE_CAMERA: 'PERSPECTIVE_CAMERA',
  GRID: 'GRID',
  HEMISPHERE_LIGHT: 'HEMISPHERE_LIGHT',
  MESH_BOX: 'MESH_BOX',
  AXIS: 'AXIS',
  BOX_HELPER: 'BOX_HELPER',
  ORTHOGRAPHIC_CAMERA: 'ORTHOGRAPHIC_CAMERA',
  POINT_LIGHT: 'POINT_LIGHT',
  PLANE: 'PLANE',
  AMBIENT_LIGHT: 'AMBIENT_LIGHT',
  DIRECTION_LIGHT: 'DIRECTION_LIGHT',
  BACKGROUND: 'BACKGROUND'
};

let mappingComponents = {};
mappingComponents[TYPES.MESH_CONTAINER] = ThreeMeshContainer;
mappingComponents[TYPES.PERSPECTIVE_CAMERA] = ThreePerspectiveCamera;
mappingComponents[TYPES.GRID] = ThreeGrid;
mappingComponents[TYPES.HEMISPHERE_LIGHT] = ThreeHemisphereLight;
mappingComponents[TYPES.POINT_LIGHT] = ThreePointLight;
mappingComponents[TYPES.MESH_BOX] = ThreeMeshBox;
mappingComponents[TYPES.AXIS] = ThreeAxis;
mappingComponents[TYPES.BOX_HELPER] = ThreeBox3Helper;
mappingComponents[TYPES.ORTHOGRAPHIC_CAMERA] = ThreeOrthographicCamera;
mappingComponents[TYPES.PLANE] = ThreePlane;
mappingComponents[TYPES.AMBIENT_LIGHT] = ThreeAmbientLight;
mappingComponents[TYPES.DIRECTION_LIGHT] = ThreeDirectionalLight;
mappingComponents[TYPES.BACKGROUND] = ThreeBackground;

const createComponent = (type, props, rootContainerInstance) => {
  return mappingComponents[type].create(rootContainerInstance, props);
};

export {createComponent, TYPES};
