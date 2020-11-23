import * as BABYLON from 'babylonjs';
import { BabylonComponent } from './babylonComponent';
import { hexToColor3 } from '../utils';

export class BabylonPlane extends BabylonComponent {
  static create({ scene }, props) {
    const options = {
      size: props.size || 1,
    };
    if (props.color) {
      options.faceColors = [0, 1, 2, 3, 4, 5].map(() => hexToColor3(props.color));
    }
    const box = BABYLON.MeshBuilder.CreatePlane(props.name || 'box', options, scene);
    box.position = new BABYLON.Vector3(props.position.x, props.position.y, props.position.z);
    box.setPivotPoint(new BABYLON.Vector3(0, 0, 0));
    return box;
  }
}
