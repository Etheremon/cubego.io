import * as BABYLON from 'babylonjs';
import {BabylonComponent} from "./babylonComponent";

export class BabylonAnimation extends BabylonComponent {
  static create({scene}, props) {
    let animation = new BabylonAnimation();
    let animationBox = new BABYLON.Animation(props.name, "scaling.y", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    let keys = [];
    keys.push({
      frame: 0,
      value: 1
    });
    keys.push({
      frame: 50,
      value: 0.9
    });

    keys.push({
      frame: 100,
      value: 1
    });
    animationBox.setKeys(keys);
    animation.renderer = animationBox;
    animation.scene = scene;
    return animation;
  }

  set parent(parent) {
    parent.animations.push(this.renderer);
    let anim = this.scene.beginAnimation(parent, 0, 100, true, 4);
    console.log(anim);
  }
}
