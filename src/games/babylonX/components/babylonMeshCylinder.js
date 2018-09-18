import * as BABYLON from 'babylonjs';
import {BabylonComponent} from "./babylonComponent";
import {hexToColor3} from "../utils";

export class BabylonMeshCylinder extends BabylonComponent {
  static create({scene}, props) {
    let options = {
      height: props.height || 5,
      diameter: props.diameter || 5,
      faceColors: [0, 1, 2].map(() => hexToColor3(props.color))
    };
    let cone = BABYLON.MeshBuilder.CreateCylinder(props.name || "cone", options, scene);
    cone.position = new BABYLON.Vector3(props.position.x, props.position.y, props.position.z);
    return cone;
  }
}
