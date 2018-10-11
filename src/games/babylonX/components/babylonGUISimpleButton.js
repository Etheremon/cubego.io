import {BabylonComponent} from "./babylonComponent";
import * as GUI from 'babylonjs-gui';

export class BabylonGUISimpleButton extends BabylonComponent {
  static create({scene}, props) {
    let guiSimpleButton = new BabylonGUISimpleButton();
    let button = GUI.Button.CreateSimpleButton("but1", props.value || "");
    button.width = 0.2;
    button.height = "40px";
    button.width = "40px";
    button.color = "white";
    button.background = "green";
    button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    button.left = props.left || "-50px";
    if (props.onClick) {
      button.onPointerClickObservable.add(props.onClick);
    }

    guiSimpleButton.renderer = button;
    return guiSimpleButton;
  }

  set parent(parent) {
    this._parent = parent;
    parent.renderer.addControl(this.renderer);
  }
}
