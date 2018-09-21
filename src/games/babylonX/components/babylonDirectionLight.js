import * as BABYLON from 'babylonjs';
import {BabylonComponent} from "./babylonComponent";

export class BabylonDirectionLight extends BabylonComponent {
  static create({scene}, props) {
    let light = new BABYLON.DirectionalLight("directionLight", new BABYLON.Vector3(-1, -1, -1), scene);
    light.position = new BABYLON.Vector3(0, 0, 0);
    return light;
  }
}
