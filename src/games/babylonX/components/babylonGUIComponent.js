import {BabylonComponent} from "./babylonComponent";

export class BabylonGUIComponent extends BabylonComponent {
  constructor() {
    super();
    this.uiScaling = 1;
  }

  calculateScalingUI(options, canvas) {
    if (!options.width || !canvas) return;
    this.uiScaling = canvas.width / options.width;
  }
}
