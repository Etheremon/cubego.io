import {renderer as PixiXFiberRenderer} from "./renderer";
import PixiUtils from "../pixiUtils";

let rootContainer = null;
let game = null;

function createRenderer(container, options) {
  options.view = container;
  game = PixiUtils.initGame(null, options);
  return PixiXFiberRenderer.createContainer(game.stage);
}

function render(element, container, options = {}) {
  if (!rootContainer) {
    rootContainer = createRenderer(container, options);
  }
  PixiXFiberRenderer.updateContainer(element, rootContainer, null);
  return PixiXFiberRenderer.getPublicRootInstance(rootContainer);
}

export function getGame() {
  return game;
}

export default render;
