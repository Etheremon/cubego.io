import {BabylonComponent} from "./babylonComponent";

export class CastorGUIText extends BabylonComponent {
  constructor() {
    super();
  }

  static create({guiSystem}, props) {
    let text = new CastorGUIText();
    let options = {
      x: props.x || 0,
      y: props.y || 0,
      w: props.w || 50,
      h: props.h || 50,
      text: props.text || '',
      centerHorizontal: false,
      centerVertical: false
    };
    let castorComponent = new GUIText(props.id || "castorText", options, guiSystem, props.onClick);
    text.renderer = castorComponent;
    if (props.visible === false) {
      text.visible = props.visible;
    }
    return text;
  }

  set visible(isVisible) {
    this.renderer.setVisible(isVisible, false);
  }
}
