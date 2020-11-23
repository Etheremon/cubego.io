import React, { Component } from 'react';
import {
  ArcRotateCamera, Axis, HemisphericLight, MeshBox, MeshContainer, PointLight,
} from '../babylonX';
import { fullColorHex } from '../utils';
import { GetValues } from '../../utils/objUtils';
import { GetCellKey } from '../../utils/modelUtils';

const SIZE = 0.5;

class VoxViewer extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  renderVoxel(voxelData) {
    if (!voxelData.voxels) {
      return [];
    }

    const elements = [];
    GetValues(voxelData.voxels).forEach((voxel) => {
      const color = voxel.color.hex ? voxel.color.hex.replace('#', '') : fullColorHex(voxel.color);
      elements.push(<MeshBox
        size={SIZE}
        position={{
          x: -SIZE * voxelData.size.x / 2 + SIZE * voxel.x,
          y: -SIZE * voxelData.size.y / 2 + SIZE * voxel.y,
          z: SIZE * voxelData.size.z / 2 - SIZE * voxel.z,
        }}
        key={`${GetCellKey(voxel.x, voxel.y, voxel.z)}_${voxel.updateIdx}`}
        color={color}
      />);
    });
    return elements;
  }

  setNewVoxelData(voxelData) {
    this.setState({
      data: voxelData || {},
    });
  }

  render() {
    return (
      <MeshContainer position={{ x: 0, y: 0, z: 0 }}>
        <Axis size={5} />
        <ArcRotateCamera alpha={2.18} beta={1.37} radius={17} attachControl />
        <PointLight position={{ x: 100, y: 100, z: 100 }} />
        <PointLight position={{ x: -100, y: -100, z: -100 }} />
        <HemisphericLight />
        {this.renderVoxel(this.state.data)}
      </MeshContainer>
    );
  }
}

export default VoxViewer;
