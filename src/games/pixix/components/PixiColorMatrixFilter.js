import * as PIXI from "pixi.js";
import PixiComponent from "./PixiComponent";
import COLOR_MATRIX_TYPES from "./colorMatrixTypes";

const PERMITTED_PROPS = [
  'alpha',
  'autoFit',
  'blendMode',
  'enabled',
  'matrix'
];

export default class PixiColorMatrixFilter extends PixiComponent {

  static create(parent, props = {}) {
    let filter = new PixiColorMatrixFilter();
    filter.setProps(props, PERMITTED_PROPS);
    filter.renderer = new PIXI.filters.ColorMatrixFilter();
    switch (props.filter) {
      case COLOR_MATRIX_TYPES.DESATURATE:
        filter.renderer.desaturate();
        break;
      case COLOR_MATRIX_TYPES.GREYSCALE:
        filter.renderer.greyscale();
        break;
      case COLOR_MATRIX_TYPES.SEPIA:
        filter.renderer.sepia();
        break;
      default:
        break;
    }
    parent.renderer.filters = [filter.renderer];
    return filter;
  }
}
