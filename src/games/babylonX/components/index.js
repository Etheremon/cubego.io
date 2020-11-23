import { BabylonMeshSphere } from './babylonMeshSphere';
import { BabylonMeshBox } from './babylonMeshBox';
import { BabylonMeshContainer } from './babylonMeshContainer';
import { BabylonMeshCylinder } from './babylonMeshCylinder';
import { BabylonArcRotateCamera } from './babylonArcRotateCamera';
import { BabylonPointLight } from './babylonPointLight';
import { BabylonAxis } from './babylonAxis';
import { BabylonVoxelPlayer } from './babylonVoxelPlayer';
import { BabylonHemisphericLight } from './babylonHemisphericLight';
import { BabylonDirectionLight } from './babylonDirectionLight';
import { BabylonAnimation } from './babylonAnimation';
import { BabylonPlane } from './babylonPlane';
import { BabylonSkybox } from './babylonSkybox';
import { BabylonGUI } from './babylonGUI';
import { BabylonGUISimpleButton } from './babylonGUISimpleButton';
import { CastorGUIButton } from './castorGUIButton';
import { CastorGUITexture } from './castorGUITexture';
import { CastorGUIText } from './castorGUIText';
import { BabylonGUIImage } from './babylonGUIImage';
import { BabylonGUIImageButton } from './babylonImageButton';

const TYPES = {
  MESH_SPHERE: 'MESH_SPHERE',
  MESH_BOX: 'MESH_BOX',
  MESH_CONTAINER: 'MESH_CONTAINER',
  MESH_CYLINDER: 'MESH_CYLINDER',
  ARC_ROTATE_CAMERA: 'ARC_ROTATE_CAMERA',
  POINT_LIGHT: 'POINT_LIGHT',
  AXIS: 'AXIS',
  VOXEL_PLAYER: 'VOXEL_PLAYER',
  HEMISPHERIC_LIGHT: 'HEMISPHERIC_LIGHT',
  DIRECTION_LIGHT: 'DIRECTION_LIGHT',
  ANIMATION: 'ANIMATION',
  PLANE: 'PLANE',
  SKY_BOX: 'SKYBOX',
  GUI: 'GUI',
  GUI_IMAGE: 'GUI_IMAGE',
  GUI_SIMPLE_BUTTON: 'GUI_SIMPLE_BUTTON',
  GUI_IMAGE_BUTTON: 'GUI_IMAGE_BUTTON',
  CASTOR_GUI_BUTTON: 'CASTOR_GUI_BUTTON',
  CASTOR_GUI_TEXTURE: 'CASTOR_GUI_TEXTURE',
  CASTOR_GUI_TEXT: 'CASTOR_GUI_TEXT',
};

const mappingComponents = {};
mappingComponents[TYPES.MESH_SPHERE] = BabylonMeshSphere;
mappingComponents[TYPES.MESH_BOX] = BabylonMeshBox;
mappingComponents[TYPES.MESH_CONTAINER] = BabylonMeshContainer;
mappingComponents[TYPES.MESH_CYLINDER] = BabylonMeshCylinder;
mappingComponents[TYPES.ARC_ROTATE_CAMERA] = BabylonArcRotateCamera;
mappingComponents[TYPES.POINT_LIGHT] = BabylonPointLight;
mappingComponents[TYPES.AXIS] = BabylonAxis;
mappingComponents[TYPES.VOXEL_PLAYER] = BabylonVoxelPlayer;
mappingComponents[TYPES.HEMISPHERIC_LIGHT] = BabylonHemisphericLight;
mappingComponents[TYPES.DIRECTION_LIGHT] = BabylonDirectionLight;
mappingComponents[TYPES.ANIMATION] = BabylonAnimation;
mappingComponents[TYPES.PLANE] = BabylonPlane;
mappingComponents[TYPES.SKY_BOX] = BabylonSkybox;
mappingComponents[TYPES.GUI] = BabylonGUI;
mappingComponents[TYPES.GUI_SIMPLE_BUTTON] = BabylonGUISimpleButton;
mappingComponents[TYPES.CASTOR_GUI_BUTTON] = CastorGUIButton;
mappingComponents[TYPES.CASTOR_GUI_TEXTURE] = CastorGUITexture;
mappingComponents[TYPES.CASTOR_GUI_TEXT] = CastorGUIText;
mappingComponents[TYPES.GUI_IMAGE] = BabylonGUIImage;
mappingComponents[TYPES.GUI_IMAGE_BUTTON] = BabylonGUIImageButton;

const createComponent = (type, props, rootContainerInstance) => mappingComponents[type].create(rootContainerInstance, props);

export { createComponent, TYPES };
