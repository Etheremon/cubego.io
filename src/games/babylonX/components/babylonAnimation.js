import * as BABYLON from 'babylonjs';
import {BabylonComponent} from "./babylonComponent";

const PERMITTED_PROPS = [
  'name',
  'targetProperty',
  'targetFPS',
  'loopMode',
  'enableBlending',
  'keys',
  'playOnStart',
  'scaleSpeed',
  'bezierCurveEase'
];

//bezierCurveEase get from http://cubic-bezier.com/

export class BabylonAnimation extends BabylonComponent {
  static create({scene}, props) {
    let animation = new BabylonAnimation();
    animation.setProps(props, PERMITTED_PROPS);
    let animationBox = new BABYLON.Animation(props.name || 'animation', props.targetProperty || '', props.targetFPS || 30, props.dataType,
      props.loopMode, props.enableBlending);
    animationBox.setKeys(props.keys);
    if (props.bezierCurveEase) {
      let bezierEase = new BABYLON.BezierCurveEase(...props.bezierCurveEase);
      animationBox.setEasingFunction(bezierEase);
    }

    animation.renderer = animationBox;
    animation.scene = scene;
    return animation;
  }

  set parent(parent) {
    parent.renderer.animations.push(this.renderer);
    this._parent = parent;
    if (this.props.playOnStart)
      this.scene.beginDirectAnimation(parent, [this.renderer], 0, 100, !!this.props.loop, this.props.scaleSpeed || 1);
  }

  play() {
    this.scene.beginDirectAnimation(this._parent, [this.renderer], 0, 100, !!this.props.loop, this.props.scaleSpeed || 1);
  }
}
