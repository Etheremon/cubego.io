import React, {Component} from 'react';
import {
  Animation,
  ArcRotateCamera,
  Axis, GUI, GUISimpleButton,
  HemisphericLight,
  MeshContainer,
  PointLight, Skybox,
  VoxelPlayer
} from '../babylonX';
import BabylonX from "../babylonX";
import idleGroundAnimation from "./animations/idle_ground";

const SIZE = 0.2;

class VoxBattle extends Component {
  constructor(props) {
    super(props);
    this.state = {battle: props.battle};
    this.idleAnimationKeys = [
      {frame: 0, value: new BABYLON.Vector3.One()},
      {frame: 30, value: new BABYLON.Vector3(1, 0.97, 1)},
      {frame: 50, value: new BABYLON.Vector3(1, 0.84, 1)},
      {frame: 80, value: new BABYLON.Vector3(1, 0.92, 1)},
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
    this.players = [null, null];
  }

  createAttackAnimationKeys(rotate) {
    return [
      {frame: 0, value: 0},
      {frame: 10, value: -1 * rotate},
      {frame: 60, value: 9 * rotate},
      {frame: 70, value: 9 * rotate},
      {frame: 100, value: 0}
    ]
  };

  initPlayerAnimation(player, idx) {
    if (this.players[0]) {
      this.players[0].opponent = player;
      player.opponent = this.players[0];
    }
    player.mountSkeleton(idleGroundAnimation, 'rootJT');
    player.playSkeletonAnimation('idle_ground', true, 1);
    player.die = () => {
      player.playSkeletonAnimation('die', false, 1);
      if (idx === 0) {
        this.players[1].playSkeletonAnimation('winning', true, 1);
      } else {
        this.players[0].playSkeletonAnimation('winning', true, 1);
      }
      setTimeout(() => {
        player.destroyAll();
      }, 5000);
    };
    this.players[idx] = player;
  }

  renderPlayer(data, rotate, idx) {
    return <VoxelPlayer data={data} key={idx} size={SIZE * 0.9} rotate={rotate} ref={(ref) => {
      this.initPlayerAnimation(ref, idx);
    }}>
      <Animation name='idle' targetProperty='scaling' targetFPS={60} loopMode={BABYLON.Animation.ANIMATIONTYPE_VECTOR3}
                 dataType={BABYLON.Animation.ANIMATIONTYPE_VECTOR3}
                 enableBlending={false}
                 keys={this.idleAnimationKeys} scaleSpeed={4} playOnStart={true}/>
      <Animation name='jump' targetProperty='position.y' targetFPS={60}
                 dataType={BABYLON.Animation.ANIMATIONTYPE_FLOAT}
                 loopMode={BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE}
                 enableBlending={false}
                 keys={this.jumpAnimationKeys} scaleSpeed={1}/>
      <Animation name='scaling' targetProperty='scaling' targetFPS={60}
                 loopMode={BABYLON.Animation.ANIMATIONTYPE_VECTOR3}
                 enableBlending={false}
                 keys={this.attackScalingAnimationKeys} scaleSpeed={1}/>
      <Animation name='attack' targetProperty='position.z' targetFPS={60}
                 dataType={BABYLON.Animation.ANIMATIONTYPE_FLOAT}
                 loopMode={BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT}
                 enableBlending={false}
                 keys={this.createAttackAnimationKeys(rotate)} scaleSpeed={1} loop={true}/>
    </VoxelPlayer>
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
    BabylonX.loaders.addMesh('battlemap1', '/assets/battleground/map_1/unity/', 'BattleMap1.babylon').then((data) => {
      data.loadedMeshes.forEach((mesh) => {
        if (mesh.name.match(/^Cloud_\d+_l$/g)) {
          let anim = new BABYLON.Animation("cloudFly", "position.z", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
          let keys = [];
          keys.push({
            frame: 0,
            value: mesh.position.z
          });
          keys.push({
            frame: 100,
            value: mesh.position.z + 100
          });
          anim.setKeys(keys);
          mesh.animations.push(anim);
          this.players[0].scene.beginAnimation(mesh, 0, 100, false, 0.5, () => {
            mesh.dispose();
          });
        } else if (mesh.name.match(/^Cloud_\d+_r$/g)) {
          let anim = new BABYLON.Animation("cloudFly", "position.z", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
          let keys = [];

          keys.push({
            frame: 0,
            value: mesh.position.z
          });

          keys.push({
            frame: 100,
            value: mesh.position.z - 100
          });
          anim.setKeys(keys);
          mesh.animations.push(anim);
          this.players[0].scene.beginAnimation(mesh, 0, 100, false, 0.5, () => {
            mesh.dispose();
          });
        }
      })
    });
    BabylonX.loaders.load();
  }

  createShieldParticle() {
    this.players[0].playSkeletonAnimation('roar', false, 1).then(() => {
    });
    setTimeout(() => {
      this.players[0].createShieldParticle();
    }, 150);
  }

  createFistParticle() {
    this.players[1].playSkeletonAnimation('attack_normal', false, 1).then(() => {
    });
    setTimeout(() => {
      this.players[1].createFireParticle();
    }, 150);
  }

  createHitAnimation() {
    this.players[0].isAttacking = true;
    this.players[0].playAnimation('attack', false, 3);
    setTimeout(() => {
      this.players[0].isAttacking = false;
    }, 1000);
  }

  createHitParticle() {
    this.players[0].createHitParticle();
  }

  render() {
    return (
      <MeshContainer position={{x: 0, y: 0, z: 0}}>
        <Axis size={5}/>
        <GUI>
          <GUISimpleButton left={'-75px'} value={'1'} onClick={this.createShieldParticle.bind(this)}/>
          <GUISimpleButton left={'-25px'} value={'2'} onClick={this.createFistParticle.bind(this)}/>
          <GUISimpleButton left={'25px'} value={'3'} onClick={this.createHitAnimation.bind(this)}/>
          <GUISimpleButton left={'75px'} value={'4'}/>
        </GUI>
        <ArcRotateCamera alpha={3.148} beta={1.124} radius={60} attachControl={true}/>
        <HemisphericLight position={{x: 0, y: 10, z: 0}}/>
        <PointLight position={{x: 100, y: 100, z: 100}}/>
        <PointLight position={{x: -100, y: -100, z: -100}}/>
        <Skybox/>
        {this.renderPlayers(this.state.battle.player)}
      </MeshContainer>
    );
  }
}

export default VoxBattle;
