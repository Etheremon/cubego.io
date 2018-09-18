import React, {Component} from 'react';
import {Container, Rectangle} from "../pixix/index";
import {fullColorHex} from "../utils";

class PaintScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      layerSelected: 0
    };

    this.selectedColorIdx = 0;
  }

  renderPixel() {
    if (!this.state.data.voxels) {
      return [];
    }
    this.frames = this.initFrameData();
    let elements = [];
    for (let i = 0; i < this.state.data.size.y; i++) {
      for (let j = 0; j < this.state.data.size.z; j++) {
        elements.push(<Rectangle width={20} height={20} x={12 * i} y={250 - 12 * j} key={`${i}-${j}`}
                                 fillColor={'0x' + this.frames[i][j].color}
                                 buttonMode={true}
                                 onClick={() => {
                                   if (!!this.frames[i][j].color) {
                                     this.changeFrame(i, j);
                                   }
                                 }}/>);
      }
    }

    return elements;
  }

  initFrameData() {
    let frame = [];
    for (let i = 0; i < this.state.data.size.y; i++) {
      frame[i] = [];
      for (let j = 0; j < this.state.data.size.z; j++) {
        frame[i][j] = {};
      }
    }
    this.state.data.voxels.forEach((voxel) => {
      if (voxel.x === this.state.layerSelected) {
        frame[voxel.y][voxel.z] = {
          data: voxel,
          color: fullColorHex(this.state.data.palette[voxel.colorIndex])
        };
      }
    });
    return frame;
  }

  changeSelectedColor(colorIdx) {
    this.selectedColorIdx = colorIdx;
  }

  renderColor() {
    if (!this.state.data.palette) {
      return [];
    }
    let colors = [];
    for (let i = 0; i < this.state.data.palette.length; i++) {
      colors.push(<Rectangle width={20} height={20} x={300} y={12 * i} key={`layer-${i}`}
                             fillColor={'0x' + fullColorHex(this.state.data.palette[i])}
                             buttonMode={true}
                             onClick={() => {
                               this.changeSelectedColor(i)
                             }}/>)
    }
    return colors;
  }

  changeLayer(idx) {
    this.setState({layerSelected: idx})
  }

  changeFrame(i, j) {
    this.frames[i][j].data.colorIndex = this.selectedColorIdx;
    if (!this.frames[i][j].data.updateIdx) {
      this.frames[i][j].data.updateIdx = 0;
    }
    this.frames[i][j].data.updateIdx += 1;
    this.forceUpdate();
    this.props.changeFrame(this.state.data);
  }

  renderLayer() {
    if (!this.state.data.size) {
      return [];
    }
    let colors = [];
    for (let i = 0; i < this.state.data.size.x; i++) {
      colors.push(<Rectangle width={20} height={20} x={350} y={12 * i} key={`layer-${i}`}
                             fillColor={'0x000ccc'}
                             buttonMode={true}
                             onClick={() => {
                               this.changeLayer(i)
                             }}/>)
    }
    return colors;
  }

  setNewVoxelData(voxelData) {
    this.setState({
      data: voxelData
    })
  }


  render() {
    return (
      <Container x={10} y={10}>
        {this.renderPixel()}
        {this.renderColor()}
        {this.renderLayer()}
      </Container>
    );
  }
}

export default PaintScene;
