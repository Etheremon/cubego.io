import * as BABYLON from 'babylonjs';
import {BabylonComponent} from "./babylonComponent";

export class BabylonPointLight extends BabylonComponent {
  static create({scene}, props) {
    let position = new BABYLON.Vector3.Zero();
    if (props.position) {
      position = new BABYLON.Vector3(props.position.x, props.position.y, props.position.z);
    }
    let pointLight = new BABYLON.PointLight(props.name || "PointLight", position, scene);
    pointLight.lightmapMode = BABYLON.Light.LIGHTMAP_SHADOWSONLY;
    return pointLight;
  }
}
