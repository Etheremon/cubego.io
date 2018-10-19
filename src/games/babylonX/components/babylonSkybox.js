import * as BABYLON from 'babylonjs';
import {BabylonComponent} from "./babylonComponent";
import {hexToColor3} from "../utils";

export class BabylonSkybox extends BabylonComponent {
  static create({scene}, props) {

    let skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
    let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(props.texture, scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    return skybox;
  }
}
