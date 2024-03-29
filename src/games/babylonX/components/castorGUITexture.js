import { BabylonComponent } from './babylonComponent';

export class CastorGUITexture extends BabylonComponent {
  constructor() {
    super();
  }

  static create({ guiSystem }, props) {
    const texture = new CastorGUITexture();
    const options = {
      x: props.x || 0,
      y: props.y || 0,
      w: props.w || 50,
      h: props.h || 50,
    };
    const castorComponent = new GUITexture(props.id || 'castorTexture', props.image, options, guiSystem, props.onClick);
    texture.renderer = castorComponent;
    if (props.visible === false) {
      texture.visible = props.visible;
    }
    return texture;
  }

  set visible(isVisible) {
    this.renderer.setVisible(isVisible, false);
  }
}
