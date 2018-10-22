import * as BABYLON from 'babylonjs';
import {BabylonComponent} from "./babylonComponent";

export class BabylonArcRotateCamera extends BabylonComponent {
  static create({scene, canvas}, props) {
    let camera = new BabylonArcRotateCamera();
    let babylonCamera = new BABYLON.ArcRotateCamera(props.name || 'camera', props.alpha || 0, props.beta || 0, props.radius || 10,
      props.target || new BABYLON.Vector3.Zero(), scene);
    babylonCamera.lowerRadiusLimit = 10;
    babylonCamera.upperRadiusLimit = 60;
    camera.canvas = canvas;
    camera.renderer = babylonCamera;

    if (props.attachControl)
      babylonCamera.attachControl(canvas, false, true);
    return camera;
  }

  set attachControl(isAttachControl) {
    if (isAttachControl) {
      this.renderer.attachControl(this.canvas, false, true);
    } else {
      this.renderer.detachControl(this.canvas);
    }
  }
}
