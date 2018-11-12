import React, {Component} from 'react';
import {
  ArcRotateCamera,
  GUI, GUIImage, GUIImageButton,
  HemisphericLight,
  MeshContainer,
  PointLight, Skybox,
  VoxelPlayer
} from '../babylonX';
import BabylonX from "../babylonX";
import idleGroundAnimation from "./animations/shareAnimation";
import {GetRandomInt} from "../../utils/utils";
import MOVES from "./moves";
import HydroGun from "./moves/water/HydroGun";
import FireBall from "./moves/fire/FireBall";
import AirSlash from "./moves/air/AirSlash";
import FireBreath from "./moves/fire/FireBreath";
import MilkDrink from "./moves/neutral/MilkDrink";
import GuardianShield from "./moves/neutral/GuardianShield";
import RockThrow from "./moves/earth/RockThrow";
import LeafThrow from "./moves/grass/LeafThrow";
import PyroWisp from "./moves/fire/PyroWisp";
import Tackle from "./moves/neutral/Tackle";

const SIZE = 0.2;
const DEMO_BATTLE_LOGS = [
  {moveId: HydroGun.getId(), effects: {damage: 20}, player: 1},
  {moveId: FireBall.getId(), effects: {damage: 20}, player: 0},
  {moveId: AirSlash.getId(), effects: {damage: 20}, player: 1},
  {moveId: FireBreath.getId(), effects: {damage: 20}, player: 0},
  {moveId: MilkDrink.getId(), effects: {damage: 20}, player: 1},
  {moveId: GuardianShield.getId(), effects: {damage: 0}, player: 0},
  {moveId: LeafThrow.getId(), effects: {damage: 0}, player: 1},
  {moveId: PyroWisp.getId(), effects: {damage: 20}, player: 0},
  {moveId: Tackle.getId(), effects: {damage: 20}, player: 1},
  {moveId: MilkDrink.getId(), effects: {damage: 30}, player: 0},
  {moveId: RockThrow.getId(), effects: {damage: 20}, player: 1},
  {moveId: FireBall.getId(), effects: {damage: 20}, player: 0},
  {moveId: HydroGun.getId(), effects: {damage: 20}, player: 1},
  {moveId: PyroWisp.getId(), effects: {damage: 20}, player: 0},
  {moveId: AirSlash.getId(), effects: {damage: 20}, player: 1},
  {moveId: FireBreath.getId(), effects: {damage: 20}, player: 0}
];
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
    this.animateCamera();
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

  animateCamera() {
    let keys = [
      {
        frame: 0,
        value: 60
      },
      {
        frame: 100,
        value: 30
      }
    ];
    this.mainCamera.beginAnimation('zoomIn', keys, 'radius');
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
    return DEMO_BATTLE_LOGS;
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
    }}/>
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
    BabylonX.loaders.addTexture('particle_star', require('../../shared/particles/textures/star.jpg'));

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

  destroy() {
    this.mainCamera.attachControl = false;
  }

  render() {
    return (
      <MeshContainer position={{x: 0, y: 0, z: 0}}>
        {/*<Axis size={5}/>*/}
        <GUI>
          <GUIImage image={require('../../shared/img/game_ui/open.png')} width={`${960/960 * 100}%`} height={`${540/540 * 100}%`}
                    ref={(image) => {
                      this.startImage = image
                    }}/>
          <GUIImage image={require('../../shared/img/game_ui/battle-result.png')} width={`${542/960 * 100}%`} height={`${489/540 * 100}%`}
                    visible={false} ref={(image) => {
            this.resultImage = image
          }}/>

          <GUIImageButton left={'0px'} top={`${200/540 * 100}%`} value={'REPLAY GAME'} onClick={this.restartGame} width={`${200/960 * 100}%`}
                          image={require('../../shared/img/game_ui/replay_game.png')} height={`${75/540 * 100}%`}
                          ref={(button) => {
                            this.rePlayBtn = button
                          }} visible={false}/>
          <GUIImageButton left={'0px'} top={`${200/540 * 100}%`} value={'START GAME'} onClick={this.startGame} width={`${200/960 * 100}%`}
                          image={require('../../shared/img/game_ui/start_game.png')} height={`${75/540 * 100}%`}
                          ref={(button) => {
                            this.startBtn = button
                          }}/>

        </GUI>

        <ArcRotateCamera alpha={3.148} beta={1.124} radius={60} wheelPrecision={50} ref={(camera) => {
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
