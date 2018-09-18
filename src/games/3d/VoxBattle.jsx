import React, {Component} from 'react';
import {ArcRotateCamera, Axis, MeshBox, MeshContainer, PointLight, Voxel} from '../babylonX';
import {fullColorHex} from "../utils";

const SIZE = 0.2;

class VoxBattle extends Component {
  constructor(props) {
    super(props);
    this.state = {battle: props.battle};
  }

  renderPlayer(data, rotate) {
    return <Voxel data={data} key={rotate} size={SIZE} rotate={rotate}/>
  }

  renderPlayers(playerData) {
    if (!playerData) {
      return [];
    }
    return [
      <MeshContainer position={{x: 0, y: 0, z: -5}} key='player-1'>
        {this.renderPlayer(playerData[0], 1)}
      </MeshContainer>,
      <MeshContainer position={{x: 0, y: 0, z: 5}} key='player-2'>
        {this.renderPlayer(playerData[1], -1)}
      </MeshContainer>]
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  setPlayer(playerData) {
    this.setState({
      battle: {
        player: playerData
      }
    })
  }

  render() {
    return (
      <MeshContainer position={{x: 0, y: 0, z: 0}}>
        <Axis size={5}/>
        <ArcRotateCamera alpha={3.142} beta={0.934} radius={17} attachControl={true}/>
        <PointLight position={{x: 100, y: 100, z: 100}}/>
        <PointLight position={{x: -100, y: -100, z: -100}}/>
        {this.renderPlayers(this.state.battle.player)}
      </MeshContainer>
    );
  }
}

export default VoxBattle;
