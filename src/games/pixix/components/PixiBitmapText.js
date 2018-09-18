import PixiComponent from "./PixiComponent";
import * as PIXI from "pixi.js";
import PixiText from "./PixiText";

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

export default class PixiBitmapText extends PixiComponent {
  set value(text) {
    this._renderer.text.text = text;
    this.renderer.text.x = -this.renderer.text.width * this.props.anchor.x;
    this.renderer.text.y = -this.renderer.text.height * this.props.anchor.y;
  }

  set y(y) {
    this.props.y = y;
    this._renderer.y = y;
  }

  set alpha(a) {
    this._renderer.alpha = a;
  }

  set tint(color) {
    this.renderer.text.tint = color;
  }

  createTextRenderer() {
    let fontSize = this.props.size || 26;
    if (!this.props.fontFamily) {
      console.warn('BitmapFont need fontFamily property');
      return;
    }
    if (!this.props.anchor) {
      this.props.anchor = {
        x: 0,
        y: 0
      };
    }
    if (!this.props.x) {
      this.props.x = 0;
    }
    if (!this.props.y) {
      this.props.y = 0;
    }
    let fontFamily = this.props.fontFamily;
    let align = this.props.align || 'center';
    let tintColor = this.props.tint || 0xffffff;
    let options = {
      font: `${fontSize}px ${fontFamily}`,
      align: align,
      tint: tintColor
    };
    this.renderer = new PIXI.Container();
    this.renderer.text = new PIXI.extras.BitmapText((this.props.value || ' ').toString(), options);
    this.renderer.addChild(this.renderer.text);
    this.renderer.text.x -= this.renderer.text.width * this.props.anchor.x;
    this.renderer.text.y -= this.renderer.text.height * this.props.anchor.y;
  }

  static create(parent, props = {}) {
    if (props.language && props.language.code === 'en') {
      let text = new PixiBitmapText();
      text.setProps(props, PERMITTED_PROPS);
      text.createTextRenderer();
      text.parent = parent;
      return text;
    } else {
      return PixiText.create(parent, props);
    }
  }
}
