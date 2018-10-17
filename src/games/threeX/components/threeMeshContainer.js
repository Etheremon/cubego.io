import {ThreeComponent} from "./threeComponent";


export class ThreeMeshContainer extends ThreeComponent {
  static create({scene}, props) {
    let meshContainer = new ThreeMeshContainer();
    let container = new window.THREE.Object3D();
    meshContainer.renderer = container;
    return meshContainer;
  }
}
