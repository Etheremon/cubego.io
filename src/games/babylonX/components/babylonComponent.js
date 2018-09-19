export class BabylonComponent {
  constructor() {
    this._renderer = null;
  }

  get renderer() {
    return this._renderer;
  }

  set renderer(renderer) {
    this._renderer = renderer;
  }
}
