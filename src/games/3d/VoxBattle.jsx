import React, {Component} from 'react';
import {
  Animation,
  ArcRotateCamera,
  Axis,
  HemisphericLight,
  MeshContainer,
  PointLight, Skybox,
  Voxel
} from '../babylonX';
import BabylonX from "../babylonX";

const SIZE = 0.2;

class VoxBattle extends Component {
  constructor(props) {
    super(props);
    this.state = {battle: props.battle};
    this.idleAnimationKeys = [
      {frame: 0, value: new BABYLON.Vector3.One()},
      {frame: 50, value: new BABYLON.Vector3(1.1, 0.8, 1.1)},
      {frame: 100, value: new BABYLON.Vector3.One()}
    ];

    this.attackScalingAnimationKeys = [
      {frame: 0, value: new BABYLON.Vector3.One()},
      {frame: 10, value: new BABYLON.Vector3(1.3, 0.4, 1.3)},
      {frame: 11, value: new BABYLON.Vector3(0.8, 1.4, 0.8)},
      {frame: 40, value: new BABYLON.Vector3.One()},
      {frame: 59, value: new BABYLON.Vector3(0.8, 1.4, 0.8)},
      {frame: 60, value: new BABYLON.Vector3(1.3, 0.4, 1.3)},
      {frame: 70, value: new BABYLON.Vector3.One()},
      {frame: 100, value: new BABYLON.Vector3.One()}
    ];

    this.jumpAnimationKeys = [
      {frame: 0, value: 0},
      {frame: 10, value: 0},
      {frame: 40, value: 1},
      {frame: 60, value: 0},
      {frame: 100, value: 0}
    ];

    this.playerAttackAnimations = [];
    this.playerJumpAnimations = [];
    this.players = [];
  }

  createAttackAnimationKeys(rotate) {
    return [
      {frame: 0, value: 0},
      {frame: 60, value: 9 * rotate},
      {frame: 70, value: 9 * rotate},
      {frame: 100, value: 0}
    ]
  };

  renderPlayer(data, rotate, idx) {
    return <Voxel data={data} key={idx} size={SIZE * 0.9} rotate={rotate} ref={(ref) => {
      this.players[idx] = ref
    }}>
      <Animation name='idle' targetProperty='scaling' targetFPS={60} loopMode={BABYLON.Animation.ANIMATIONTYPE_VECTOR3}
                 enableBlending={BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE}
                 keys={this.idleAnimationKeys} scaleSpeed={4} playOnStart={true}/>
      <Animation name='jump' targetProperty='position.y' targetFPS={60}
                 loopMode={BABYLON.Animation.ANIMATIONTYPE_FLOAT}
                 enableBlending={BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE}
                 keys={this.jumpAnimationKeys} scaleSpeed={1}/>
      <Animation name='scaling' targetProperty='scaling' targetFPS={60}
                 loopMode={BABYLON.Animation.ANIMATIONTYPE_VECTOR3}
                 enableBlending={BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE}
                 keys={this.attackScalingAnimationKeys} scaleSpeed={1}/>
      <Animation name='attack' targetProperty='position.z' targetFPS={60}
                 loopMode={BABYLON.Animation.ANIMATIONTYPE_FLOAT}
                 enableBlending={BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE}
                 keys={this.createAttackAnimationKeys(rotate)} scaleSpeed={1} loop={true}/>
    </Voxel>
  }

  renderPlayers(playerData) {
    if (!playerData) {
      return [];
    }
    return [
      <MeshContainer position={{x: 0, y: 0, z: -5}} key='player-1'>
        {this.renderPlayer(playerData[0], 1, 0)}
      </MeshContainer>,
      <MeshContainer position={{x: 0, y: 0, z: 5}} key='player-2'>
        {this.renderPlayer(playerData[1], -1, 1)}
      </MeshContainer>
    ]
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

  componentDidMount() {
    BabylonX.loaders.addMesh('monu9', '/battleground/monu9/', 'monu9.obj').then((data) => {
      data.loadedMeshes[0].position = new BABYLON.Vector3(0, -2, 0);
      data.loadedMeshes[0].rotation.y = -Math.PI / 4;
      data.loadedMeshes[0].scaling = new BABYLON.Vector3(SIZE * 2, SIZE * 2, SIZE * 2);
    });
    BabylonX.loaders.load();

    setInterval(() => {
      this.players[0].playAnimation(['attack', 'scaling', 'jump'], false, 2);
      setTimeout(() => {
        this.players[1].hurt(15);
      }, 500)
    }, 6000);
    setTimeout(() => {
      setInterval(() => {
        this.players[1].playAnimation(['attack', 'scaling', 'jump'], false, 2);
        setTimeout(() => {
          this.players[0].hurt(20);
        }, 500)
      }, 6000);
    }, 3000)
  }

  render() {
    return (
      <MeshContainer position={{x: 0, y: 0, z: 0}}>
        <Axis size={5}/>
        <ArcRotateCamera alpha={3.148} beta={1.124} radius={60} attachControl={true}/>
        <HemisphericLight/>
        <PointLight position={{x: 100, y: 100, z: 100}}/>
        <PointLight position={{x: -100, y: -100, z: -100}}/>
        <Skybox/>
        {this.renderPlayers(this.state.battle.player)}
      </MeshContainer>
    );
  }
}

export default VoxBattle;
