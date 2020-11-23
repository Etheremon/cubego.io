export class BabylonComponent {
  constructor() {
    this._renderer = null;
    this._parent = null;
  }

  get renderer() {
    return this._renderer;
  }

  set renderer(renderer) {
    this._renderer = renderer;
  }

  setProps(props) {
    this.props = {};
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        this.props[key] = props[key];
      }
    }
  }
}
