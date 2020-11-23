import * as GUI from 'babylonjs-gui';
import { BabylonComponent } from './babylonComponent';

export class BabylonGUI extends BabylonComponent {
  static create({ scene }, props) {
    const gui = new BabylonGUI();
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene);
    gui.renderer = advancedTexture;
    return gui;
  }
}
