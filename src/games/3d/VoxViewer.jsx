import React, {Component} from 'react';
import {ArcRotateCamera, Axis, HemisphericLight, MeshBox, MeshContainer, PointLight} from '../babylonX';
import {fullColorHex} from "../utils";

const SIZE = 0.5;

class VoxViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {data: {}}
  }

  renderVoxel(voxelData) {
    if (!voxelData.voxels) {
      return [];
    }
    let elements = [];
    voxelData.voxels.forEach((voxel) => {
      let color = fullColorHex(voxelData.palette[voxel.colorIndex]);
      elements.push(<MeshBox size={SIZE} position={{
        x: -SIZE * voxelData.size.y / 2 + SIZE * voxel.y,
        y: -SIZE * voxelData.size.z / 2 + SIZE * voxel.z,
        z: SIZE * voxelData.size.x / 2 - SIZE * voxel.x
      }}
                               key={`${voxelData.size.x} - ${voxelData.size.y} - ${voxel.x}-${voxel.y}-${voxel.z}-${voxel.updateIdx}`}
                             color={color}/>)
    });
    return elements;
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  setNewVoxelData(voxelData) {
    this.setState({
      data: voxelData
    })
  }

  render() {
    return (
      <MeshContainer position={{x: 0, y: 0, z: 0}}>
        <Axis size={5}/>
        <ArcRotateCamera alpha={2.18} beta={1.37} radius={17} attachControl={true}/>
        <PointLight position={{x: 100, y: 100, z: 100}}/>
        <PointLight position={{x: -100, y: -100, z: -100}}/>
        <HemisphericLight/>
        {this.renderVoxel(this.state.data)}
      </MeshContainer>
    );
  }
}

export default VoxViewer;
