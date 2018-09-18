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
  'interactive',
  'buttonMode',
  'renderable',
  'animationSpeed',
  'loop'
];

export default class PixiAnimatedSprite extends PixiComponent {

  set alpha(a) {
    this._renderer.alpha = a;
  }

  play() {
    this._renderer.play();
  }

  stop() {
    this._renderer.stop();
  }

  set renderable(isRenderable) {
    this._renderer.renderable = isRenderable;
  }

  static create(parent, props = {}) {
    let animatedSprite = new PixiAnimatedSprite();
    animatedSprite.setProps(props, PERMITTED_PROPS);
    const textures = AssetsManager.resolveAsset(props['src']);
    animatedSprite.renderer = new PIXI.extras.AnimatedSprite(textures, true);
    if (props['autoPlay'] === true) {
      animatedSprite.renderer.play();
    }
    animatedSprite.parent = parent;
    return animatedSprite;
  }
}