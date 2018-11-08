import {FiberNode} from "../fiber/FiberNode";

export class ThreeComponent extends FiberNode {
  constructor() {
    super();
    this._renderer = null;
    this._parent = null;
  }

  set renderer(renderer) {
    this._renderer = renderer;
  }

  get renderer() {
    return this._renderer;
  }

  set parent(parent) {
    this._parent = parent;
  }

  get parent() {
    return this._parent;
  }

  addChild(child) {
    super.addChild(child);
    child.parent = parent;
    this._renderer.add(child._renderer);
  }

  removeChild(child) {
    super.removeChild(child);
    if (this._renderer && child._renderer) {
      this._renderer.remove(child._renderer);
    }
    child.destroy();
    child = undefined;
  }

  destroy() {

  }

  setProps(props) {
    this.props = {};
    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        this.props[key] = props[key];
      }
    }
  }
}
