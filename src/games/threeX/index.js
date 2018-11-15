import {render, stopRender, takeScreenshot} from "./fiber/render";
import {TYPES} from "./components";
import {getMaterial, loadMaterial} from "./loaders";

export const MeshContainer = TYPES.MESH_CONTAINER;
export const PerspectiveCamera = TYPES.PERSPECTIVE_CAMERA;
export const Grid = TYPES.GRID;
export const HemisphereLight = TYPES.HEMISPHERE_LIGHT;
export const MeshBox = TYPES.MESH_BOX;
export const Axis = TYPES.AXIS;
export const BoxHelper = TYPES.BOX_HELPER;
export const OrthographicCamera = TYPES.ORTHOGRAPHIC_CAMERA;
export const PointLight = TYPES.POINT_LIGHT;
export const Plane = TYPES.PLANE;
export const AmbientLight = TYPES.AMBIENT_LIGHT;
export const DirectionalLight = TYPES.DIRECTION_LIGHT;
export const Background = TYPES.BACKGROUND;

const Tools = {takeScreenshot};

const ThreeX = {render, loadMaterial, getMaterial, stopRender, Tools};
export default ThreeX;
