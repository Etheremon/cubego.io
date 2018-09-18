import * as BABYLON from 'babylonjs';
import {BabylonComponent} from "./babylonComponent";
import {hexToColor3} from "../utils";

export class BabylonMeshSphere extends BabylonComponent{
  static create({scene}, props) {
    let options = {
      diameter: 5
    };
    let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", options, scene);
    let material = new BABYLON.StandardMaterial('color', scene);
    material.alpha = 1;
    material.diffuseColor = hexToColor3(props.color);
    sphere.material = material;
    sphere.position = new BABYLON.Vector3(props.position.x, props.position.y, props.position.z);
    return sphere;
  }
}
