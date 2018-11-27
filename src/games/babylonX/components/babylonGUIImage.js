import {BabylonComponent} from "./babylonComponent";
import * as GUI from 'babylonjs-gui';

export class BabylonGUIImage extends BabylonComponent {
  static create({scene}, props) {
    let guiImage = new BabylonGUIImage();
    let image;
    if (props.image) {
      image = new BABYLON.GUI.Image("but", props.image);
    } else {
      image = new BABYLON.GUI.Image("but");
    }
    image.left = props.left || "0px";

    image.height = props.height || "40px";
    image.width = props.width || "40px";
    image.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    guiImage.renderer = image;
    if (props.visible === false) {
      guiImage.visible = false;
    }
    if (props.imageData) {
      guiImage.imageData = props.imageData;
    }
    return guiImage;
  }

  set parent(parent) {
    this._parent = parent;
    parent.renderer.addControl(this.renderer);
  }

  set image(imageUrl) {
    this.renderer.source = imageUrl;
  }

  set imageData(data) {
    let img = this.renderer.domImage;
    if (!img) {
      img = document.createElement("img");
    }
    img.src = data;
    this.renderer.domImage = img;
  }

  set visible(isVisible) {
    this.renderer.isVisible = isVisible;
  }
}
