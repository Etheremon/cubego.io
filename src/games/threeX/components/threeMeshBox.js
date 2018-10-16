import {ThreeComponent} from "./threeComponent";
import * as THREE from "three";
import ThreeX from "../index";
import {fullColorHex} from "../../utils";

export class ThreeMeshBox extends ThreeComponent {
  constructor() {
    super();
    this.props = {};
  }

  static create({scene}, props) {
    this.props = props;
    let meshContainer = new ThreeMeshBox();
    let size = props.size || 10;
    let color = parseInt(props.color, 16);
    let boxGeo = new THREE.BoxBufferGeometry(size, size, size);
    let material = null;

    if (props.materialId) {
      material = ThreeX.getMaterial(props.materialId).clone();
      if (props.variantColor) {
        let variantColor = parseInt(props.variantColor.replace('#', ''), 16);
        material.color.setHex(variantColor);
      }
      if (props.variantEmissive) {
        let variantEmissive = parseInt(props.variantEmissive.replace('#', ''), 16);
        material.emissive.setHex(variantEmissive);
      }
    } else {
      material = new THREE.MeshBasicMaterial({color: color, transparent: true});
    }
    let cubeMesh = new THREE.Mesh(boxGeo, material);
    let wireFrameColor = parseInt(props.wireFrameColor || 'ffffff', 16);
    let boxHelper = new THREE.BoxHelper(cubeMesh, wireFrameColor);

    cubeMesh.add(boxHelper);
    if (props.position) {
      cubeMesh.position.set(props.position.x, props.position.y, props.position.z);
    }
    meshContainer.renderer = cubeMesh;
    return meshContainer;
  }

  set color(color) {
    this.renderer.material.color.setHex(parseInt(color, 16));
  }

  set position(position) {
    this.renderer.position.set(position.x, position.y, position.z);
  }

  set variantColor(color) {
    this.props.variantColor = color;
    let variantColor = parseInt(this.props.variantColor.replace('#', ''), 16);
    this.renderer.material.color.setHex(variantColor);
  }

  set variantEmissive(color) {
    this.props.variantEmissive = color;
    let variantEmissive = parseInt(this.props.variantEmissive.replace('#', ''), 16);
    this.renderer.material.emissive.setHex(variantEmissive);
  }

  set materialId(id) {
    if (!id) {
      return;
    }
    let material = ThreeX.getMaterial(id).clone();
    if (this.props.variantColor) {
      let variantColor = parseInt(this.props.variantColor.replace('#', ''), 16);
      material.color.setHex(variantColor);
    }
    if (this.props.variantEmissive) {
      let variantEmissive = parseInt(this.props.variantEmissive.replace('#', ''), 16);
      material.emissive.setHex(variantEmissive);
    }
    this.renderer.material = material;
  }
}
