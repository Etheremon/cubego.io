import PixiComponent from "./PixiComponent";
import * as PIXI from "pixi.js";
import AssetsManager from "../assetsManager";

const PERMITTED_PROPS = [
  'alpha',
  'autoFit',
  'blendMode',
  'enabled',
  'matrix'
];

export default class PixiDisplacementFilter extends PixiComponent {

  static create(parent, props = {}) {
    let filter = new PixiDisplacementFilter();
    filter.setProps(props, PERMITTED_PROPS);
    let sprite = null;
    if (props['image']) {
      sprite = new PIXI.Sprite(PIXI.Texture.fromImage(props['image']));
    }
    if (props['src']) {
      sprite = new PIXI.Sprite(AssetsManager.resolveAsset(props['src']));
    }
    filter.renderer = new PIXI.filters.DisplacementFilter(sprite);

    parent.renderer.filters = [filter.renderer];
    return filter;
  }
}