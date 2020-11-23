import { ThreeObject3DComponent } from './threeObject3DComponent';

export class ThreeGrid extends ThreeObject3DComponent {
  static create({ scene }, props) {
    const threeGrid = new ThreeGrid();

    const config = {
      height: props.height || 500,
      width: props.width || 500,
      linesHeight: props.linesHeight || 10,
      linesWidth: props.linesWidth || 10,
      color: props.color || 0xffffff,
    };

    const material = new window.THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });

    const gridGeo = new window.THREE.BufferGeometry();
    const stepw = 2 * config.width / config.linesWidth;
    const steph = 2 * config.height / config.linesHeight;

    // width
    let j = 0;
    const colors = [];
    const color = new window.THREE.Color(config.color);
    const vertices = [];
    for (let i = -config.width; i <= config.width; i += stepw) {
      vertices.push(-config.height, 0, i, config.height, 0, i);
      color.toArray(colors, j);
      j += 3;
      color.toArray(colors, j);
      j += 3;
    }
    // height
    for (let i = -config.height; i <= config.height; i += steph) {
      vertices.push(i, 0, -config.width, i, 0, config.width);
      color.toArray(colors, j);
      j += 3;
      color.toArray(colors, j);
      j += 3;
    }
    gridGeo.addAttribute('position', new window.THREE.Float32BufferAttribute(vertices, 3));
    gridGeo.addAttribute('color', new window.THREE.Float32BufferAttribute(colors, 3));
    const line = new window.THREE.LineSegments(gridGeo, material);
    if (props.position) {
      line.position.set(props.position.x, props.position.y, props.position.z);
    }
    threeGrid.renderer = line;
    return threeGrid;
  }
}
