import * as BABYLON from 'babylonjs';
import { BabylonComponent } from './babylonComponent';
import { hexToColor3 } from '../utils';

export class BabylonMeshSphere extends BabylonComponent {
  static create({ scene }, props) {
    const options = {
      diameter: 5,
    };
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', options, scene);
    const material = new BABYLON.StandardMaterial('color', scene);
    material.alpha = 1;
    material.diffuseColor = hexToColor3(props.color);
    sphere.material = material;
    sphere.position = new BABYLON.Vector3(props.position.x, props.position.y, props.position.z);
    return sphere;
  }
}
