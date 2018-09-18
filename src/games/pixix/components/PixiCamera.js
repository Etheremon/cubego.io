import * as PIXI from "pixi.js";
import PixiComponent from "./PixiComponent";

const PERMITTED_PROPS = [
  'alpha',
  'x',
  'y',
  'scale',
  'renderable',
  'interactiveChildren'
];

export default class PixiCamera extends PixiComponent {

  set position(position) {
    this._renderer.position.set(position.x, position.y);
  }

  follow(targetPosition) {
    if (this.checkBounds(targetPosition)) {
      this._renderer.pivot.set(targetPosition.x, targetPosition.y);
    }
  }

  set viewport(rect) {
    this._viewport = {
      x1: rect.x,
      y1: rect.y,
      x2: rect.x + rect.width,
      y2: rect.y + rect.height,
      width: rect.width,
      height: rect.height
    };
  }

  set bounds(rect) {
    this._bounds = {
      x1: rect.x,
      y1: rect.y,
      x2: rect.x + rect.width,
      y2: rect.y + rect.height,
      width: rect.width,
      height: rect.height
    };
  }

  checkBounds(targetPosition) {
    //Will implement for camera feature
    return true;
  }

  removeChildren() {
    this.renderer.removeChildren();
  }

  static create(parent = null, props = {}) {
    let camera = new PixiCamera();
    camera.setProps(props, PERMITTED_PROPS);
    camera.renderer = new PIXI.Container();
    camera.parent = parent;
    return camera;
  }
}