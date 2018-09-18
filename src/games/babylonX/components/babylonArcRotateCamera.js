import * as BABYLON from 'babylonjs';
import {BabylonComponent} from "./babylonComponent";

export class BabylonArcRotateCamera extends BabylonComponent {
  static create({scene, canvas}, props) {
    let camera = new BABYLON.ArcRotateCamera(props.name || 'camera', props.alpha || 0, props.beta || 0, props.radius || 10,
      props.target || new BABYLON.Vector3.Zero(), scene);
    if (props.attachControl)
      camera.attachControl(canvas, true, true);
    return camera;
  }
}
