import {BabylonComponent} from "./babylonComponent";
import * as GUI from 'babylonjs-gui';

export class BabylonGUI extends BabylonComponent {
  static create({scene}, props) {
    let gui = new BabylonGUI();
    let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene);
    gui.renderer = advancedTexture;
    return gui;
  }
}
