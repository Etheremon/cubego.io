import PixiComponent from "./PixiComponent";
import AssetsManager from "../assetsManager";
import * as PIXI from "pixi.js";

const PERMITTED_PROPS = [
  'alpha',
  'x',
  'y',
  'src',
  'image',
  'scale',
  'anchor',
  'rotation',
  'renderable',
  'animationSpeed'
];

export default class PixiSprite extends PixiComponent {
  set alpha(a) {
    this.props.alpha = a;
    this._renderer.alpha = a;
  }

  set rotation(rot) {
    this.props.rotation = rot;
    this._renderer.rotation = rot;
  }

  get rotation() {
    return this.renderer.rotation;
  }

  set tint(color) {
    this.props.tint = color;
    this._renderer.tint = color;
  }

  set onClick(fn) {
    this._renderer.on('pointerdown', fn);
  }

  set sprite(src) {
    let texture = AssetsManager.resolveAsset(src);
    this._renderer.texture = texture;
  }

  set scale(scale) {
    this._renderer.scale = scale;
  }

  set interactive(isInteractive) {
    this._renderer.interactive = isInteractive;
  }

  set buttonMode(isButtonMode) {
    this._renderer.isButtonMode = isButtonMode;
  }

  static create(parent, props = {}) {
    let sprite = new PixiSprite();
    sprite.setProps(props, PERMITTED_PROPS);
    let texture = null;
    if (props['image']) {
      texture = PIXI.Texture.fromImage(props['image']);
    }
    if (props['src']) {
      texture = AssetsManager.resolveAsset(props['src']);
    }
    sprite.renderer = new PIXI.Sprite(texture);
    if (typeof props.onClick === 'function') {
      sprite.onClick = props.onClick;
    }
    sprite.parent = parent;
    return sprite;
  }
}