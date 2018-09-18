import PixiComponent from "./PixiComponent";
import * as PIXI from "pixi.js";
import AssetsManager from "../assetsManager";

const PERMITTED_PROPS = [
  'x',
  'y',
  'width',
  'height',
  'fillColor',
  'borderColor',
  'alpha'
];

export default class PixiRectangle extends PixiComponent {
  drawRectangle() {
    this._renderer.lineStyle(0, this.props.borderColor || 0xffffff, 1);
    this._renderer.beginFill(this.props.fillColor || 0xffffff, this.props.alpha || 1);
    this._renderer.drawRect(this.props.x || 0, this.props.y || 0, this.props.width || 50, this.props.height || 50);
    this._renderer.endFill();
  }

  set width(w) {
    this.props.width = w;
    this._renderer.clear();
    if (w) {
      this.drawRectangle();
    }
  }

  set height(h) {
    this.props.height = h;
    this._renderer.clear();
    if (h) {
      this.drawRectangle();
    }
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  set fillColor(color) {
    this.props.fillColor = color;
    this._renderer.clear();
    this.drawRectangle();
  }

  setButtonEffect() {
    this._renderer.on('pointerdown', this.pointerDown.bind(this));
    this._renderer.on('pointerup', this.onButtonUp.bind(this));
    this._renderer.on('pointerupoutside', this.onButtonUp.bind(this));
    this._renderer.on('pointerover', this.onButtonOver.bind(this));
    this._renderer.on('pointerout', this.onButtonOut.bind(this));
  }

  set sprite(src) {
    this._renderer.texture = AssetsManager.resolveAsset(src);
  }

  pointerDown() {
    this._onClick();
  }

  onButtonUp() {

  }

  onButtonOver() {
    this._renderer.tint = 0xcccccc;
  }

  onButtonOut() {
    this._renderer.tint = 0xffffff;
  }

  static create(parent, props = {}) {
    let rect = new PixiRectangle();
    rect.setProps(props, PERMITTED_PROPS);
    rect.renderer = new PIXI.Graphics();
    rect.drawRectangle();
    //TODO: group this function to PixiButton
    if (props.buttonMode) {
      rect.renderer.buttonMode = true;
      rect.renderer.interactive = true;
      rect.setButtonEffect();
      // parent.renderer.addChild(rect.renderer);
      if (typeof props.onClick === 'function') {
        rect.onClick = props.onClick;
      }
    }

    rect.parent = parent;
    return rect;
  }
}
