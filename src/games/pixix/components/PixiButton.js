import PixiComponent from "./PixiComponent";
import AssetsManager from "../assetsManager";
import * as PIXI from "pixi.js";

const PERMITTED_PROPS = [
  'alpha',
  'x',
  'y',
  'src',
  'image',
  'anchor',
  'scale'
];

export default class PixiButton extends PixiComponent {
  set tint(color) {
    this.props.tint = color;
    this._renderer.tint = color;
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  set disabled(isDisabled) {
    this._isDisabled = isDisabled;
  }

  set sprite(src) {
    let texture = AssetsManager.resolveAsset(src);
    this._renderer.texture = texture;
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
    let button = new PixiButton();
    button.setProps(props, PERMITTED_PROPS);
    let texture = null;
    if (props['image']) {
      texture = PIXI.Texture.fromImage(props['image']);
    }
    if (props['src']) {
      texture = AssetsManager.resolveAsset(props['src']);
    }
    button.renderer = new PIXI.Sprite(texture);
    button.renderer.buttonMode = true;
    button.renderer.interactive = true;
    button.setButtonEffect();
    if (typeof props.onClick === 'function') {
      button.onClick = props.onClick;
    }
    parent.renderer.addChild(button.renderer);
    return button;
  }
}