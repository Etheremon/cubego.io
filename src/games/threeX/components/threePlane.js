import {ThreeComponent} from "./threeComponent";
import ThreeX from "../index";


export class ThreePlane extends ThreeComponent {
  constructor() {
    super();
  }

  static create({scene}, props) {
    let threePlane = new ThreePlane();
    let material;

    if (props.materialId) {
      material = ThreeX.getMaterial(props.materialId).clone();
    } else if (props.imageUrl) {
      let texture = window.THREE.ImageUtils.loadTexture(props.imageUrl);

      material = new window.THREE.MeshBasicMaterial({
        map: texture
      });
      material.transparent = true;
      material.color.setHex(0xffffff);
    }

    let geometry = new window.THREE.PlaneGeometry(props.width || 50, props.height || 50);
    let mesh = new window.THREE.Mesh(geometry, material);
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
