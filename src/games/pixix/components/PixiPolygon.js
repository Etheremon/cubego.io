import PixiComponent from "./PixiComponent";
import * as PIXI from "pixi.js";

const PERMITTED_PROPS = [
  'x',
  'y',
  'width',
  'height',
  'fillColor',
  'borderColor',
  'alpha',
  'path'
];

export default class PixiPolygon extends PixiComponent {
  drawPolygon() {
    if (!this.props.path) {
      console.warn('PixiRectangle need path property');
      return;
    }
    this._renderer.lineStyle(0, this.props.borderColor || 0xffffff, 1);
    this._renderer.beginFill(this.props.fillColor || 0xffffff, this.props.alpha || 1);
    this._renderer.drawPolygon(this.props.path);
    this._renderer.endFill();
  }

  static create(parent, props = {}) {
    let polygon = new PixiPolygon();
    polygon.setProps(props, PERMITTED_PROPS);
    polygon.renderer = new PIXI.Graphics();
    polygon.drawPolygon();
    polygon.parent = parent;
    return polygon;
  }
}