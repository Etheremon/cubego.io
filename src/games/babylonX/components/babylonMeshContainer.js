import * as BABYLON from 'babylonjs';
import {BabylonComponent} from "./babylonComponent";

export class BabylonMeshContainer extends BabylonComponent{
  static create(scene, props) {
    let box = new BABYLON.AbstractMesh(props.name || "mesh", scene);
    box.position = new BABYLON.Vector3(props.position.x, props.position.y, props.position.z);
    return box;
  }
}
