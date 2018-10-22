import React, {Component} from 'react';
import {
  Animation,
  ArcRotateCamera,
  GUI, GUISimpleButton,
  HemisphericLight,
  MeshContainer,
  PointLight, Skybox,
  VoxelPlayer
} from '../babylonX';
import BabylonX from "../babylonX";
import idleGroundAnimation from "./animations/shareAnimation";
import {GetRandomInt} from "../../utils/utils";
import RockThrow from "./moves/earth/RockThrow";
import HydroGun from "./moves/water/HydroGun";
import DoubleCannon from "./moves/water/DoubleCannon";
import MOVES from "./moves";

const SIZE = 0.2;

//Load map texture
const loadMapTexture = () => {
  let req = require.context('../../shared/battleground/map_1/', false, /.*\.png/);
  req.keys().forEach(function (key) {
    req(key);
  });
};
loadMapTexture();

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
    this.backgroundIdx = Math.floor(1 + Math.random() * 4);
    this.skyboxImages = [
      require('../../shared/skybox/' + this.backgroundIdx + '/skybox_px.jpg'),
      require('../../shared/skybox/' + this.backgroundIdx + '/skybox_py.jpg'),
      require('../../shared/skybox/' + this.backgroundIdx + '/skybox_pz.jpg'),
      require('../../shared/skybox/' + this.backgroundIdx + '/skybox_nx.jpg'),
      require('../../shared/skybox/' + this.backgroundIdx + '/skybox_ny.jpg'),
      require('../../shared/skybox/' + this.backgroundIdx + '/skybox_nz.jpg')
    ];
    this.clouds = [];
    this.startGame = this.startGame.bind(this);
    this.startBtn = null;
    this.mainCamera = null;
  }

  startGame() {
    this.startBtn.visible = false;
    this.mainCamera.attachControl = true;
    if (this.clouds.length) {
      this.clouds.forEach((cloud) => {
        this.players[0].scene.beginAnimation(cloud, 0, 100, false, 0.5, () => {
          cloud.dispose();
        });
      });
    }
    let logs = this.createDummyBattleLog();
    setTimeout(() => {
      this.playGameSequence(logs);
    }, 5000);

  }

  createDummyBattleLog() {
    let logs = [];
    for (let i = 0; i < 9; i++) {
      logs.push({moveId: GetRandomInt(0, MOVES.length - 1), effects: {damage: 20}, player: i % 2})
    }
    return logs;
  }

  playGameSequence(logs) {
    logs.forEach((turn, idx) => {
      setTimeout(() => {
        MOVES[turn.moveId].play(this.players[turn.player], turn.effects);
      }, 5000 * idx);
    });
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
    let battleGroundFileName = require('../../shared/battleground/map_1/BattleMap1.babylon');
    battleGroundFileName = battleGroundFileName.substr(1);
    BabylonX.loaders.addMesh('battlemap1', '/', battleGroundFileName).then((data) => {
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
          this.clouds.push(mesh);
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
          this.clouds.push(mesh);
        }
      });

    });
    BabylonX.loaders.load();
  }

  componentWillUnmount() {
    this.mainCamera.attachControl = false;
  }

  createShieldParticle() {
    this.players[0].playSkeletonAnimation('roar', false, 1).then(() => {
    });
    setTimeout(() => {
      this.players[0].createShieldParticle();
    }, 150);
  }

  createFistParticle() {
    this.players[1].playSkeletonAnimation('attack_normal', false, 1);
    setTimeout(() => {
      this.players[1].createFistParticle();
    }, 150);
  }

  createHitAnimation() {
    this.players[0].isAttacking = true;
    this.players[0].playAnimation('attack', false, 3);
    this.players[0].playSkeletonAnimation('tackle', false, 1);
    setTimeout(() => {
      this.players[0].isAttacking = false;
    }, 1000);
  }

  createHitParticle() {
    this.players[0].createHitParticle();
  }

  createWaterParticle() {
    this.players[1].playSkeletonAnimation('attack_normal', false, 1).then(() => {
    });
    setTimeout(() => {
      this.players[1].createWaterParticle();
    }, 150);
  }

  createFireParticle() {
    this.players[0].createFireParticle();
  }

  createMissileParticle() {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        this.players[1].createMissileParticle();
      }, i * 100);
    }
  }

  createTackleAnimation() {
    this.players[1].playSkeletonAnimation('tackle', false, 1);
  }

  createScratchParticle() {
    this.players[1].playSkeletonAnimation('roar', false, 1).then(() => {
    });
    setTimeout(() => {
      this.players[0].createScratchParticle();
    }, 150);
  }

  createSmashUpParticle() {
    this.players[1].playSkeletonAnimation('smashup', false, 1);
  }

  render() {
    return (
      <MeshContainer position={{x: 0, y: 0, z: 0}}>
        {/*<Axis size={5}/>*/}
        <GUI>
          {/*<GUISimpleButton left={'-225px'} value={'1'} onClick={this.createScratchParticle.bind(this)}/>*/}
          {/*<GUISimpleButton left={'-175px'} value={'2'} onClick={this.createTackleAnimation.bind(this)}/>*/}
          {/*<GUISimpleButton left={'-125px'} value={'3'} onClick={this.createFireParticle.bind(this)}/>*/}
          {/*<GUISimpleButton left={'-75px'} value={'4'} onClick={this.createShieldParticle.bind(this)}/>*/}
          {/*<GUISimpleButton left={'-25px'} value={'5'} onClick={this.createFistParticle.bind(this)}/>*/}
          {/*<GUISimpleButton left={'25px'} value={'6'} onClick={this.createHitAnimation.bind(this)}/>*/}
          {/*<GUISimpleButton left={'75px'} value={'7'} onClick={this.createWaterParticle.bind(this)}/>*/}
          {/*<GUISimpleButton left={'125px'} value={'8'} onClick={this.createMissileParticle.bind(this)}/>*/}
          {/*<GUISimpleButton left={'175px'} value={'9'} onClick={this.createSmashUpParticle.bind(this)}/>*/}
          {/*<GUISimpleButton left={'225px'} value={'10'} onClick={this.createSmashUpParticle.bind(this)}/>*/}

          <GUISimpleButton left={'0px'} value={'START GAME'} onClick={this.startGame} width={'200px'} ref={(button) => {
            this.startBtn = button
          }}/>

        </GUI>

        <ArcRotateCamera alpha={3.148} beta={1.124} radius={60} ref={(camera) => {
          this.mainCamera = camera;
        }}/>
        <HemisphericLight position={{x: 0, y: 10, z: 0}}/>
        <PointLight position={{x: 100, y: 100, z: 100}}/>
        <PointLight position={{x: -100, y: -100, z: -100}}/>
        <Skybox imageUrls={this.skyboxImages}/>
        {this.renderPlayers(this.state.battle.player)}
      </MeshContainer>
    );
  }
}

export default VoxBattle;
