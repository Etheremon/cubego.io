import * as BABYLON from 'babylonjs';
import {BabylonComponent} from "./babylonComponent";

export class BabylonArcRotateCamera extends BabylonComponent {
  static create({scene, canvas}, props) {
    let camera = new BabylonArcRotateCamera();
    let babylonCamera = new BABYLON.ArcRotateCamera(props.name || 'camera', props.alpha || 0, props.beta || 0, props.radius || 10,
      props.target || new BABYLON.Vector3.Zero(), scene);
    babylonCamera.lowerRadiusLimit = 10;
    babylonCamera.upperRadiusLimit = 60;
    babylonCamera.wheelPrecision = 50;
    camera.canvas = canvas;
    camera.scene = scene;
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

  beginAnimation(name, keys, prop) {
    let anim = new BABYLON.Animation(name, prop, 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    anim.setKeys(keys);
    this.renderer.animations.push(anim);
    this.scene.beginAnimation(this.renderer, 0, 100, false);
  }
}
