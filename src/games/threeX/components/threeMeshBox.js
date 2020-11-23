import ThreeX from '../index';
import { ThreeObject3DComponent } from './threeObject3DComponent';

export class ThreeMeshBox extends ThreeObject3DComponent {
  constructor() {
    super();
    this.props = {};
    this.originalOpacity = 1;
    this.boxHelper = null;
  }

  static create({ scene, isWebGL }, props) {
    const meshContainer = new ThreeMeshBox();
    const size = props.size || 10;
    const color = parseInt(props.color, 16);
    const boxGeo = typeof (size) === 'number'
      ? new window.THREE.BoxBufferGeometry(size, size, size)
      : new window.THREE.BoxBufferGeometry(size.x, size.y, size.z);
    let material = null;

    if (props.materialId && props.variantId) {
      material = ThreeX.getMaterial(props.materialId, props.variantId, isWebGL);
    } else {
      material = new window.THREE.MeshBasicMaterial({ color, transparent: true, depthWrite: false });
    }

    if (props.opacity) {
      material.opacity = props.opacity;
    }
    const cubeMesh = new window.THREE.Mesh(boxGeo, material);
    if (props.shadow !== false) {
      cubeMesh.castShadow = true;
      cubeMesh.receiveShadow = true;
    }

    const wireFrameColor = material.color.clone();

    if (!props.noBox) {
      const boxHelper = new window.THREE.BoxHelper(cubeMesh, wireFrameColor);
      meshContainer.boxHelper = boxHelper;
      boxHelper.material.opacity = 0.2;
      boxHelper.material.transparent = true;
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
    this.renderer.material.color.setHex(parseInt(color, 16));
  }

  set position(position) {
    this.renderer.position.set(position.x, position.y, position.z);
  }

  set variantId(id) {
    if (!id) {
      return;
    }
    this.props.variantId = id;
    const material = ThreeX.getMaterial(this.props.materialId, this.props.variantId);
    if (material) {
      this.renderer.material = material;
      const wireFrameColor = material.color.clone();
      this.boxHelper.material.color = wireFrameColor;
    }
  }

  set materialId(id) {
    if (!id) {
      return;
    }
    this.props.materialId = id;
    const material = ThreeX.getMaterial(this.props.materialId, this.props.variantId);
    if (material) {
      this.renderer.material = material;
      const wireFrameColor = material.color.clone();
      this.boxHelper.material.color = wireFrameColor;
    }
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
