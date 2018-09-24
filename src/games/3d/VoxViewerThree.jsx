import React, {Component} from 'react';
import {Grid, HemisphereLight, MeshBox, MeshContainer, PerspectiveCamera} from "../threeX";
import * as Utils from "../../utils/utils";
import {fullColorHex} from "../utils";

const SIZE = 50;

class VoxViewerThree extends Component {
  constructor(props) {
    super(props);
    this.state = {data: {}}
  }

  renderVoxel(voxelData) {
    if (!voxelData.voxels) {
      return [];
    }
    let divisions = Math.max(voxelData.size.x, voxelData.size.z);
    let elements = [<Grid size={divisions * 50} divisions={divisions}
                          position={{x: -SIZE / 2, y: -SIZE * voxelData.size.y / 2, z: -SIZE / 2}}/>];
    Utils.ObjGetValues(voxelData.voxels).forEach((voxel) => {
      let color = voxel['color']['hex'] ? voxel['color']['hex'].replace('#', '') : fullColorHex(voxel['color']);
      elements.push(<MeshBox size={SIZE}
                             position={{
                               x: -SIZE * voxelData.size.x / 2 + SIZE * voxel.x,
                               y: -SIZE * voxelData.size.y / 2 + SIZE / 2 + SIZE * voxel.y,
                               z: SIZE * voxelData.size.z / 2 - SIZE * voxel.z
                             }}
                             key={`${voxel.x}-${voxel.y}-${voxel.z}-${voxel.updateIdx}`}
                             color={color}/>)
    });
    return elements;
  }

  setNewVoxelData(voxelData) {
    this.setState({
      data: voxelData || {}
    })
  }

  render() {
    return (
      <MeshContainer position={{x: 0, y: 0, z: 0}}>
        <PerspectiveCamera/>
        <HemisphereLight/>
        {this.renderVoxel(this.state.data)}
      </MeshContainer>
    );
  }
}

export default VoxViewerThree;
