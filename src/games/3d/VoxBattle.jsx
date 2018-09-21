import React, {Component} from 'react';
import {
  Animation,
  ArcRotateCamera,
  Axis,
  DirectionLight,
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

    this.jumpAnimationKeys = [
      {frame: 0, value: 0},
      {frame: 50, value: 2},
      {frame: 100, value: 0}
    ];
    this.playerAttackAnimations = [];
    this.playerJumpAnimations = [];
  }

  createAttackAnimationKeys(rotate) {
    return [
      {frame: 0, value: 0},
      {frame: 50, value: 9 * rotate},
      {frame: 100, value: 0}
    ]
  };

  renderPlayer(data, rotate, idx) {
    return <Voxel data={data} key={rotate} size={SIZE * 0.9} rotate={rotate}>
      <Animation name='idle' targetProperty='scaling' targetFPS={60} loopMode={BABYLON.Animation.ANIMATIONTYPE_VECTOR3}
                 enableBlending={BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE}
                 keys={this.idleAnimationKeys} scaleSpeed={4}/>
      <Animation name='jump' targetProperty='position.y' targetFPS={60}
                 loopMode={BABYLON.Animation.ANIMATIONTYPE_VECTOR3}
                 enableBlending={BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE}
                 keys={this.jumpAnimationKeys} scaleSpeed={2}
                 ref={(ref) => {
                   this.playerJumpAnimations[idx] = ref
                 }}/>
      <Animation name='attack' targetProperty='position.z' targetFPS={60}
                 loopMode={BABYLON.Animation.ANIMATIONTYPE_FLOAT}
                 enableBlending={BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE} bezierCurveEase={[.8, .04, .86, .72]}
                 keys={this.createAttackAnimationKeys(rotate)} scaleSpeed={2} loop={true}
                 ref={(ref) => {
                   this.playerAttackAnimations[idx] = ref
                 }}/>
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
      this.playerAttackAnimations[0].play();
    }, 10000);
    setTimeout(() => {
      setInterval(()=>{
        this.playerAttackAnimations[1].play();
      }, 10000);
    }, 5000)
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