import * as BABYLON from 'babylonjs';
import {BabylonComponent} from "./babylonComponent";

export class BabylonHemisphericLight extends BabylonComponent {
  static create({scene}, props) {
    let light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
    // light.diffuse = new BABYLON.Color3(1, 0, 0);
    // light.specular = new BABYLON.Color3(0, 1, 0);
    // light.groundColor = new BABYLON.Color3(0, 1, 0);
    return light;
  }
}
