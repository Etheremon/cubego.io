import * as BABYLON from 'babylonjs';
import { BabylonComponent } from './babylonComponent';

export class BabylonHemisphericLight extends BabylonComponent {
  static create({ scene }, props) {
    let position = null;
    if (props.position) {
      position = new BABYLON.Vector3(props.position.x, props.position.y, props.position.z);
    } else {
      position = new BABYLON.Vector3(0, 0, 0);
    }
    const light = new BABYLON.HemisphericLight('hemiLight', position, scene);
    // light.diffuse = new BABYLON.Color3(1, 0, 0);
    // light.specular = new BABYLON.Color3(0, 1, 0);
    // light.groundColor = new BABYLON.Color3(0, 1, 0);
    return light;
  }
}
