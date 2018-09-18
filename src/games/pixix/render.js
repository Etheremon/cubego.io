import PixiUtils from "./pixiUtils.js";

function render(element, container, options = {}) {
  options.view = container;
  return PixiUtils.initGame(element, options);
}

export default render;