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

  setProps(props, permitProps) {
    this.props = {};
    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        if (permitProps.indexOf(key) > -1) {
          this.props[key] = props[key];
        }
      }
    }
  }
}
