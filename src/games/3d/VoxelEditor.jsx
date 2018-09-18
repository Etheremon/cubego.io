import React, {Component} from 'react';
import {MeshBox, MeshContainer} from '../babylonX';

const SIZE = 0.5;

class VoxelEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frame: this.props.frame
    }
  }


  renderVoxel(frame) {
    let elements = [];
    for (let i = 0; i < frame.length; i++) {
      for (let j = 0; j < frame[0].length; j++) {
        for (let k = 0; k < frame[0][0].length; k++) {
          if (typeof frame[i][j][k] === 'object') {
            switch (frame[i][j][k].shape) {
              case 0:
                elements.push(<MeshBox size={SIZE*0.9} position={{x: - 8 * SIZE + SIZE * i, y: - SIZE * j, z: 8 * SIZE - SIZE * k}}
                                       key={`${i}-${j}-${k}`}
                                       color={frame[i][j][k].color}/>);
                break;
            }
          }
        }
      }
    }
    return elements;
  }

  setNewFrame(frame) {
    this.setState({
      frame: frame
    })
  }

  render() {
    return (
      <MeshContainer position={{x: 0, y: 0, z: 0}}>
        {this.renderVoxel(this.state.frame)}
      </MeshContainer>
    );
  }
}

export default VoxelEditor;
