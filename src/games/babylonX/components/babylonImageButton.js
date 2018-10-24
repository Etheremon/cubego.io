import {BabylonComponent} from "./babylonComponent";
import * as GUI from 'babylonjs-gui';

export class BabylonGUIImageButton extends BabylonComponent {
  static create({scene}, props) {
    let guiSimpleButton = new BabylonGUIImageButton();
    let button = GUI.Button.CreateImageOnlyButton("but1", props.image || "");
    button.height = props.height || "40px";
    button.width = props.width || "40px";
    button.thickness = 0;
    button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    button.left = props.left || "-50px";
    button.top = props.top || "0px";
    if (props.onClick) {
      button.onPointerClickObservable.add(props.onClick);
    }
    guiSimpleButton.renderer = button;
    if (props.visible === false) {
      guiSimpleButton.visible = false;
    }
    return guiSimpleButton;
  }

  set parent(parent) {
    this._parent = parent;
    parent.renderer.addControl(this.renderer);
  }

  set visible(isVisible) {
    this.renderer.isVisible = isVisible;
  }
}
