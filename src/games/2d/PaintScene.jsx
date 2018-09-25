import React, {Component} from 'react';
import {Container, Rectangle} from "../pixix/index";
import {fullColorHex} from "../utils";
import * as Utils from "../../utils/utils";

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
        let translatedPos = layer.cal2dPos ? layer.cal2dPos(i, j) : {x: i, y: j};
        elements.push(<Rectangle width={32} height={32}
                                 x={17 * translatedPos.x}
                                 y={17 * translatedPos.y}
                                 key={`${i}-${j}-${layer.idx}-${layer.z}`}

                                 fillColor={'0x' + (this.frames[i][j].color ? this.frames[i][j].color : '89e3f9')}
                                 alpha={this.frames[i][j].color ? 1 : 0.6}
                                 buttonMode={true}
                                 onClick={() => {
                                   this.props.onCellClicked && this.props.onCellClicked({
                                     [layer.x]: i,
                                     [layer.y]: j,
                                     [layer.z]: layer.idx,
                                   })
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

    Utils.ObjGetValues(layer.voxels).forEach((voxel) => {
      frame[voxel[layer.x]][voxel[layer.y]] = {
        voxel: voxel,
        color: voxel['color']['hex'] || fullColorHex(voxel['color']),
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
