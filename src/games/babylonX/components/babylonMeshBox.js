import * as BABYLON from 'babylonjs';
import {BabylonComponent} from "./babylonComponent";
import {hexToColor3} from "../utils";
import {listMesh} from "../index";

export class BabylonMeshBox extends BabylonComponent {
  static create({scene}, props) {
    let options = {
      size: props.size || 1
    };
    if (props.color) {
      options.faceColors = [0, 1, 2, 3, 4, 5].map(() => hexToColor3(props.color));
    }
    let box = BABYLON.MeshBuilder.CreateBox(props.name || "box", options, scene);
    box.position = new BABYLON.Vector3(props.position.x, props.position.y, props.position.z);
    box.enableEdgesRendering();
    box.edgesWidth = 2.0;
    box.edgesColor = new BABYLON.Color4(0, 0, 0, 1);
    box.setPivotPoint(new BABYLON.Vector3(0, 0, 0));
    return box;
  }
}
