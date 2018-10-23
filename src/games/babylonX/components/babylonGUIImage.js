import {BabylonComponent} from "./babylonComponent";
import * as GUI from 'babylonjs-gui';

export class BabylonGUIImage extends BabylonComponent {
  static create({scene}, props) {
    let guiImage = new BabylonGUIImage();
    let image = new BABYLON.GUI.Image("but", props.url);
    image.height = props.height || "40px";
    image.width = props.width || "40px";
    image.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    guiImage.renderer = image;
    if (props.visible === false) {
      guiImage.visible = false;
    }
    return guiImage;
  }

  set parent(parent) {
    this._parent = parent;
    parent.renderer.addControl(this.renderer);
  }

  set visible(isVisible) {
    this.renderer.isVisible = isVisible;
  }
}
