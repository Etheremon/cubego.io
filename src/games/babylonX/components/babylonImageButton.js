import * as GUI from 'babylonjs-gui';
import { BabylonGUIComponent } from './babylonGUIComponent';

export class BabylonGUIImageButton extends BabylonGUIComponent {
  static create({ scene, options, canvas }, props) {
    const guiSimpleButton = new BabylonGUIImageButton();
    guiSimpleButton.calculateScalingUI(options, canvas);

    const button = GUI.Button.CreateImageOnlyButton('but1', props.image || '');
    button.height = props.height || '40px';
    button.width = props.width || '40px';
    button.thickness = 0;
    button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    button.left = props.left ? parseInt(props.left, 10) * guiSimpleButton.uiScaling : '0px';
    button.top = props.top ? parseInt(props.top, 10) * guiSimpleButton.uiScaling : '0px';
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
