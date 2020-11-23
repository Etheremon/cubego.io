import * as GUI from 'babylonjs-gui';
import { BabylonComponent } from './babylonComponent';

export class BabylonGUISimpleButton extends BabylonComponent {
  static create({ scene }, props) {
    const guiSimpleButton = new BabylonGUISimpleButton();
    const button = GUI.Button.CreateSimpleButton('but1', props.value || '');
    button.height = props.height || '40px';
    button.width = props.width || '40px';
    button.color = 'white';
    button.background = 'green';
    button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    button.left = props.left || '-50px';
    button.top = props.top || '0px';
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
