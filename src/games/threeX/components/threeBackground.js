import { ThreeComponent } from './threeComponent';
import { getTexture } from '../loaders';

export class ThreeBackground extends ThreeComponent {
  constructor() {
    super();
  }

  static create({ scene }, props) {
    const threeBackground = new ThreeBackground();
    let texture;
    if (props.imageUrl) {
      texture = new window.THREE.TextureLoader().load(props.imageUrl);
    }
    if (props.textureId) {
      texture = getTexture(props.textureId);
    }
    scene.background = texture;
    threeBackground.scene = scene;
    return threeBackground;
  }

  set position(pos) {
    this.renderer.position.set(pos.x, pos.y, pos.z);
  }

  destroy() {
    this.scene.background = null;
  }
}
