import React, {Component} from 'react';
import {Container, Rectangle} from "../pixix/index";
import {fullColorHex} from "../utils";

class PaintScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layer: this.props.layer,
    };

    this.renderPixel = this.renderPixel.bind(this);
    this.updateLayer = this.updateLayer.bind(this);
  }

  updateLayer(layer) {
    console.log(layer.voxels[0][layer.z]);
    this.setState({layer});
  }

  renderPixel(layer) {
    if (!layer || !layer.voxels) {
      return [];
    }
    this.frames = this.initFrameData(layer);
    let elements = [];
    for (let i = 0; i < layer.size[layer.x]; i++) {
      for (let j = 0; j < layer.size[layer.y]; j++) {
        elements.push(<Rectangle width={32} height={32} x={17 * i} y={17 * (layer.size[layer.y]-j-1)} key={`${i}-${j}-${layer.z}`}
                                 fillColor={'0x' + (this.frames[i][j].color ? this.frames[i][j].color : '89e3f9')}
                                 alpha={this.frames[i][j].color ? 1 : 0.6}
                                 buttonMode={true}
                                 onClick={() => {
                                   // if (!!this.frames[i][j].color) {
                                   //   this.changeFrame(i, j);
                                   // }
                                 }}/>);
      }
    }

    return elements;
  }

  initFrameData(layer) {
    let frame = [];
    for (let i = 0; i < layer.size[layer.x]; i++) {
      frame[i] = [];
      for (let j = 0; j < layer.size[layer.y]; j++) frame[i][j] = {};
    }

    layer.voxels.forEach((voxel) => {
      frame[voxel[layer.x]][voxel[layer.y]] = {
        data: voxel,
        color: fullColorHex(layer.palette[voxel['colorIndex']])
      };
    });
    return frame;
  }

  render() {
    return (
      <Container x={100} y={10}>
        {this.renderPixel(this.state.layer)}
      </Container>
    );
  }
}

export default PaintScene;
