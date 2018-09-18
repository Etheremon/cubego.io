import * as PIXI from "pixi.js";
import PixiComponent from "./PixiComponent";
import 'pixi-layers'

export default class PixiStage extends PixiComponent {
  removeChildren() {
    this.renderer.removeChildren();
  }

  static create(game) {
    let pixiStage = new PixiStage();
    pixiStage.renderer = new PIXI.display.Stage();
    pixiStage.renderer.group.enableSort = true;
    return pixiStage;
  }
}