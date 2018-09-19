import React, {Component} from 'react';
import {ArcRotateCamera, Axis, DirectionLight, HemisphericLight, MeshContainer, PointLight, Voxel} from '../babylonX';
import BabylonX from "../babylonX";

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

  componentDidMount(){
    BabylonX.loaders.addMesh('monu9', '/battleground/monu9/','monu9.obj' ).then((data) => {
      data.loadedMeshes[0].position = new BABYLON.Vector3(0, -2, 0);
      data.loadedMeshes[0].rotation.y = -Math.PI / 4;

      data.loadedMeshes[0].scaling = new BABYLON.Vector3(SIZE * 2, SIZE * 2, SIZE * 2);
      data.loadedMeshes[0].receiveShadows = true;
      let light = window.scene.lights[0];
      let shadowGenerator = new BABYLON.ShadowGenerator(1024, light, true);
      shadowGenerator.getShadowMap().renderList.push(data.loadedMeshes[0]);
      shadowGenerator.useBlurExponentialShadowMap = true;
      shadowGenerator.depthScale = 2500;
      shadowGenerator.bias = 0.01;
    });
    BabylonX.loaders.load();

  }

  render() {
    return (
      <MeshContainer position={{x: 0, y: 0, z: 0}}>
        <Axis size={5}/>
        <ArcRotateCamera alpha={3.142} beta={1.18} radius={17} attachControl={true}/>
        <PointLight position={{x: 100, y: 100, z: 100}}/>
        <PointLight position={{x: 100, y: 100, z: -100}}/>
        <HemisphericLight/>
        <DirectionLight/>
        {this.renderPlayers(this.state.battle.player)}
      </MeshContainer>
    );
  }
}

export default VoxBattle;
