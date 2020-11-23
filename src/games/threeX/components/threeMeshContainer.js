import { ThreeObject3DComponent } from './threeObject3DComponent';

export class ThreeMeshContainer extends ThreeObject3DComponent {
  static create({ scene }, props) {
    const meshContainer = new ThreeMeshContainer();
    const container = new window.THREE.Object3D();
    meshContainer.renderer = container;
    return meshContainer;
  }
}
