import {BabylonComponent} from "./babylonComponent";

export class CastorGUIButton extends BabylonComponent {
  constructor() {
    super();
  }

  static create({guiSystem}, props) {
    let button = new CastorGUIButton();
    let options = {
      x: (guiSystem.getCanvasSize().width / 2 - 100),
      y: guiSystem.getCanvasSize().height - 125,
      w: 200,
      h: 50,
      value: "PLAY BATTLE"
    };
    let castorComponent = new GUIButton(props.id || "castorButton", options, guiSystem, props.onClick);
    button.renderer = castorComponent;
    if (props.visible === false) {
      button.visible = props.visible;
    }
    return button;
  }

  set visible(isVisible) {
    this.renderer.setVisible(isVisible, false);
  }
}
