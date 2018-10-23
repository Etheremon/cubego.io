import React, {Component} from 'react';
import {
  Animation,
  ArcRotateCamera,
  GUI, GUIImage, GUISimpleButton,
  HemisphericLight,
  MeshContainer,
  PointLight, Skybox,
  VoxelPlayer
} from '../babylonX';
import BabylonX from "../babylonX";
import idleGroundAnimation from "./animations/shareAnimation";
import {GetRandomInt} from "../../utils/utils";
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
    this.restartGame = this.restartGame.bind(this);
    this.startBtn = null;
    this.mainCamera = null;
    this.rePlayBtn = null;
    this.startImage = null;
    this.resultImage = null;
  }

  startGame() {
    this.startBtn.visible = false;
    this.startImage.visible = false;
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

  restartGame() {
    this.rePlayBtn.visible = false;
    this.resultImage.visible = false;
    this.mainCamera.attachControl = true;
    let logs = this.createDummyBattleLog();
    this.players[0].init();
    this.players[1].init();
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
        // MilkDrink.play(this.players[turn.player], turn.effects);
      }, 5000 * idx);
    });
    setTimeout(() => {
      this.mainCamera.attachControl = false;
      this.rePlayBtn.visible = true;
      this.resultImage.visible = true;
    }, 5000 * logs.length + 1000);
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
    BabylonX.loaders.addTexture('particle_circle_01', require('../../shared/particles/textures/circle_01.png'));
    BabylonX.loaders.addTexture('particle_circle_05', require('../../shared/particles/textures/circle_05.png'));
    BabylonX.loaders.addTexture('particle_cube', require('../../shared/particles/textures/cube.png'));
    BabylonX.loaders.addTexture('particle_flare', require('../../shared/particles/textures/flare.png'));
    BabylonX.loaders.addTexture('particle_projectile_141', require('../../shared/particles/textures/projectile_141.png'));
    BabylonX.loaders.addTexture('particle_scratch_01', require('../../shared/particles/textures/scratch_01.png'));
    BabylonX.loaders.addTexture('particle_window_04', require('../../shared/particles/textures/window_04.png'));
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

  render() {
    return (
      <MeshContainer position={{x: 0, y: 0, z: 0}}>
        {/*<Axis size={5}/>*/}
        <GUI>
          <GUIImage url={require('../../shared/img/game_ui/open.png')} width={'960px'} height={'540px'} ref={(image) => {
            this.startImage = image
          }}/>
          <GUIImage url={require('../../shared/img/game_ui/result.png')} width={'960px'} height={'540px'} visible={false} ref={(image) => {
            this.resultImage = image
          }}/>

          <GUISimpleButton left={'0px'} top={'200px'} value={'REPLAY GAME'} onClick={this.restartGame} width={'200px'}
                           ref={(button) => {
                             this.rePlayBtn = button
                           }} visible={false}/>
          <GUISimpleButton left={'0px'} top={'200px'} value={'START GAME'} onClick={this.startGame} width={'200px'} ref={(button) => {
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
