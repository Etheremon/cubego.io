import {ThreeObject3DComponent} from "./threeObject3DComponent";


export class ThreeBackground extends ThreeObject3DComponent {
  constructor() {
    super();
  }

  static create({scene}, props) {
    let threeBackground = new ThreeBackground();
    let texture = new window.THREE.TextureLoader().load(props.imageUrl);
    scene.background = texture;
    return threeBackground;
  }

  set position(pos) {
    this.renderer.position.set(pos.x, pos.y, pos.z);
  }
}