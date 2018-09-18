import * as PIXI from "pixi.js";
import PixiComponent from "./PixiComponent";

const PERMITTED_PROPS = [
  'alpha',
  'x',
  'y',
  'value',
  'fontFamily',
  'size',
  'align',
  'tint',
  'anchor'
];

export default class PixiText extends PixiComponent {
  set value(text) {
    this._renderer.text = text;
  }

  set y(y) {
    this._renderer.y = y;
  }

  set alpha(a) {
    this._renderer.alpha = a;
  }

  set tint(color) {
    this.renderer.fill = [color];
  }

  createTextRenderer() {
    const style = new PIXI.TextStyle({
      fontFamily: "Verdana, Geneva, sans-serif",
      fontSize: this.props.size - 4 || 26,
      fill: [
        this.props.tint || 'white'
      ],
    });
    this._renderer = new PIXI.Text(this.props.value, style);
  }

  static create(parent, props = {}) {
    let text = new PixiText();
    text.setProps(props, PERMITTED_PROPS);
    text.createTextRenderer();
    text.parent = parent;
    return text;
  }
}
