import {FiberNode} from "../fiber/FiberNode";

export class ThreeComponent extends FiberNode{
  constructor() {
    super();
    this._renderer = null;
    this._parent = null;
  }

  set renderer(renderer) {
    this._renderer = renderer;
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
    child.parent = null;
    this._renderer.remove(child._renderer);
  }
}
