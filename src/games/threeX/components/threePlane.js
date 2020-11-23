import ThreeX from '../index';
import { ThreeObject3DComponent } from './threeObject3DComponent';

export class ThreePlane extends ThreeObject3DComponent {
  constructor() {
    super();
  }

  static create({ scene }, props) {
    const threePlane = new ThreePlane();
    let material;

    if (props.materialId) {
      material = ThreeX.getMaterial(props.materialId).clone();
    } else if (props.imageUrl) {
      const texture = new window.THREE.TextureLoader().load(props.imageUrl);

      material = new window.THREE.MeshBasicMaterial({
        map: texture,
      });
      material.transparent = true;
      material.color.setHex(0xffffff);
    } else {
      material = new window.THREE.MeshBasicMaterial({
        color: 0xffffff, transparent: true, depthWrite: false, opacity: 0,
      });
    }

    const geometry = new window.THREE.PlaneGeometry(props.width || 50, props.height || 50);
    const mesh = new window.THREE.Mesh(geometry, material);
    if (props.position) {
      mesh.position.set(props.position.x, props.position.y, props.position.z);
    }
    if (props.rotation) {
      mesh.rotation.set(props.rotation.x, props.rotation.y, props.rotation.z);
    }
    threePlane.renderer = mesh;
    return threePlane;
  }

  set position(pos) {
    this.renderer.position.set(pos.x, pos.y, pos.z);
  }
}
