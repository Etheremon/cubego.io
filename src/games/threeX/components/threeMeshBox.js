import ThreeX from "../index";
import {ThreeObject3DComponent} from "./threeObject3DComponent";

export class ThreeMeshBox extends ThreeObject3DComponent {
  constructor() {
    super();
    this.props = {};
    this.originalOpacity = 1;
    this.boxHelper = null;
  }

  static create({scene, isWebGL}, props) {
    let meshContainer = new ThreeMeshBox();
    let size = props.size || 10;
    let color = parseInt(props.color, 16);
    let boxGeo = typeof(size) === 'number'
      ? new window.THREE.BoxBufferGeometry(size, size, size)
      : new window.THREE.BoxBufferGeometry(size.x, size.y, size.z);
    let material = null;

    if (props.materialId && props.variantId) {
      material = ThreeX.getMaterial(props.materialId, props.variantId, isWebGL);
    } else {
      material = new window.THREE.MeshBasicMaterial({color: color, transparent: true, depthWrite: false});
    }

    if (props.opacity) {
      material.opacity = props.opacity;
    }
    let cubeMesh = new window.THREE.Mesh(boxGeo, material);
    let frameColor = props.variantColor ? props.variantColor.replace('#', '') : 'cccccc';
    let wireFrameColor = parseInt(frameColor, 16);

    if (!props.noBox) {
      let boxHelper = new window.THREE.BoxHelper(cubeMesh, wireFrameColor);
      meshContainer.boxHelper = boxHelper;
      cubeMesh.add(boxHelper);
    }

    if (props.position) {
      cubeMesh.position.set(props.position.x, props.position.y, props.position.z);
    }
    if (props.visible === false) {
      cubeMesh.visible = false;
    }
    if (props.renderOrder) {
      cubeMesh.renderOrder = props.renderOrder;
    }
    meshContainer.setProps(props);
    meshContainer.renderer = cubeMesh;
    return meshContainer;
  }

  set color(color) {
    // this.renderer.material.color.setHex(parseInt(color, 16));
  }

  set position(position) {
    this.renderer.position.set(position.x, position.y, position.z);
  }

  set variantId(id) {
    if (!id) {
      return;
    }
    this.props.variantId = id;
    let material = ThreeX.getMaterial(this.props.materialId, this.props.variantId);
    if(material)
      this.renderer.material = material;
  }

  set materialId(id) {
    if (!id) {
      return;
    }
    this.props.materialId = id;
    let material = ThreeX.getMaterial(this.props.materialId, this.props.variantId);
    if(material)
      this.renderer.material = material;
  }

  set highlight(isHighLight) {
    let opacity = this.originalOpacity;
    if (isHighLight) {
      opacity = this.originalOpacity - 0.2;
    }
    this.renderer.material.opacity = opacity;
  }

  set size(size) {

  }
}
