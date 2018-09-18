import {renderer as PixiXFiberRenderer} from "./renderer";
import PixiUtils from "../pixiUtils";
import {renderer as BabylonRenderer} from "../../babylonX/renderer";

let rootContainer = null;

function createRenderer(container, options) {
  options.view = container;
  let game = PixiUtils.initGame(null, options);
  return PixiXFiberRenderer.createContainer(game.stage);
}

function render(element, container, options = {}) {
  if (!rootContainer) {
    rootContainer = createRenderer(container, options);
  }
  PixiXFiberRenderer.updateContainer(element, rootContainer, null);
  return BabylonRenderer.getPublicRootInstance(rootContainer);
}

export default render;
