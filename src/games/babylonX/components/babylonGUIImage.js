import * as GUI from 'babylonjs-gui';
import { BabylonGUIComponent } from './babylonGUIComponent';

export class BabylonGUIImage extends BabylonGUIComponent {
  constructor() {
    super();
  }

  static create({ scene, options, canvas }, props) {
    const guiImage = new BabylonGUIImage();
    guiImage.calculateScalingUI(options, canvas);
    let image;
    if (props.image) {
      image = new BABYLON.GUI.Image('but', props.image);
    } else {
      image = new BABYLON.GUI.Image('but');
    }
    image.left = props.left ? parseInt(props.left, 10) * guiImage.uiScaling : '0px';
    image.height = props.height || '50px';
    image.width = props.width || '50px';
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
      img = document.createElement('img');
    }
    img.src = data;
    this.renderer.domImage = img;
  }

  set visible(isVisible) {
    this.renderer.isVisible = isVisible;
  }
}
