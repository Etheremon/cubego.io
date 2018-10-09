import {ThreeComponent} from "./threeComponent";
import * as THREE from "three";

export class ThreeGrid extends ThreeComponent {
  static create({scene}, props) {
    let threeGrid = new ThreeGrid();

    let config = {
      height: props.height || 500,
      width: props.width || 500,
      linesHeight: props.linesHeight || 10,
      linesWidth: props.linesWidth || 10,
      color: props.color || 0xffffff
    };

    let material = new THREE.LineBasicMaterial({vertexColors: THREE.VertexColors});

    let gridGeo = new THREE.BufferGeometry(),
      stepw = 2 * config.width / config.linesWidth,
      steph = 2 * config.height / config.linesHeight;

    //width
    let j = 0;
    let colors = [];
    let color = new THREE.Color(config.color);
    let vertices = [];
    for (let i = -config.width; i <= config.width; i += stepw) {
      vertices.push(-config.height, 0, i, config.height, 0, i);
      color.toArray(colors, j);
      j += 3;
      color.toArray(colors, j);
      j += 3;
    }
    //height
    for (let i = -config.height; i <= config.height; i += steph) {
      vertices.push(i, 0, -config.width, i, 0, config.width);
      color.toArray(colors, j);
      j += 3;
      color.toArray(colors, j);
      j += 3;
    }
    gridGeo.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    gridGeo.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    let line = new THREE.LineSegments(gridGeo, material);
    if (props.position) {
      line.position.set(props.position.x, props.position.y, props.position.z);
    }
    threeGrid.renderer = line;
    return threeGrid;
  }
}
