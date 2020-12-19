import React, { Component } from 'react';
import BabylonX, {
  ArcRotateCamera,
  GUI, GUIImage, GUIImageButton,
  HemisphericLight,
  MeshContainer,
  PointLight, Skybox,
  VoxelPlayer,
} from '../babylonX';

import idleGroundAnimation from './animations/shareAnimation';
import { GetRandomInt } from '../../utils/utils';
import MOVES from './moves';
import HydroGun from './moves/water/HydroGun';
import FireBall from './moves/fire/FireBall';
import AirSlash from './moves/air/AirSlash';
import FireBreath from './moves/fire/FireBreath';
import MilkDrink from './moves/neutral/MilkDrink';
import GuardianShield from './moves/neutral/GuardianShield';
import RockThrow from './moves/earth/RockThrow';
import LeafThrow from './moves/grass/LeafThrow';
import PyroWisp from './moves/fire/PyroWisp';
import Tackle from './moves/neutral/Tackle';
import WindStrike from './moves/air/WindStrike';
import HealingWater from './moves/water/HealingWater';
import HydroBash from './moves/water/HydroBash';

const SIZE = 0.2;

const DEMO_BATTLE_MOVES = [
  WindStrike.getId(),
  HydroBash.getId(),
  FireBreath.getId(),
  MilkDrink.getId(),
  GuardianShield.getId(),
  LeafThrow.getId(),
  PyroWisp.getId(),
  Tackle.getId(),
  RockThrow.getId(),
  FireBall.getId(),
  HydroGun.getId(),
  AirSlash.getId(),
  HealingWater.getId(),
];
// Load map texture
const loadMapTexture = () => {
  const req = require.context('../../shared/battleground/map_1/', false, /.*\.png/);
  req.keys().forEach((key) => {
    req(key);
  });
};
loadMapTexture();

class VoxBattle extends Component {
  constructor(props) {
    super(props);
    this.state = { battle: props.battle, player0Data: null, player1Data: null };
    this.players = [null, null];
    this.backgroundIdx = Math.floor(1 + Math.random() * 4);
    this.skyboxImages = [
      require(`../../shared/skybox/${this.backgroundIdx}/skybox_px.jpg`),
      require(`../../shared/skybox/${this.backgroundIdx}/skybox_py.jpg`),
      require(`../../shared/skybox/${this.backgroundIdx}/skybox_pz.jpg`),
      require(`../../shared/skybox/${this.backgroundIdx}/skybox_nx.jpg`),
      require(`../../shared/skybox/${this.backgroundIdx}/skybox_ny.jpg`),
      require(`../../shared/skybox/${this.backgroundIdx}/skybox_nz.jpg`),
    ];
    this.clouds = [];
    this.startGame = this.startGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.changeCubegon = this.changeCubegon.bind(this);
    this.startBtn = null;
    this.mainCamera = null;
    this.rePlayBtn = null;
    this.startImage = null;
    this.resultImage = null;
    this.playerWinImage = null;
  }

  startGame() {
    this.startBtn.visible = false;
    this.startImage.visible = false;
    this.player0Image.visible = false;
    this.player1Image.visible = false;
    this.changePlayer1Btn.visible = false;
    this.changePlayer2Btn.visible = false;
    this.mainCamera.attachControl = true;
    this.animateCamera();
    if (this.clouds.length) {
      this.clouds.forEach((cloud) => {
        this.players[0].scene.beginAnimation(cloud, 0, 100, false, 0.5, () => {
          cloud.dispose();
        });
      });
    }
    const logs = this.createDummyBattleLog();
    setTimeout(() => {
      this.playGameSequence(logs);
    }, 5000);
  }

  animateCamera() {
    const keys = [
      {
        frame: 0,
        value: 60,
      },
      {
        frame: 100,
        value: 30,
      },
    ];
    this.mainCamera.beginAnimation('zoomIn', keys, 'radius');
  }

  restartGame() {
    this.rePlayBtn.visible = false;
    this.resultImage.visible = false;
    this.playerWinImage.visible = false;
    this.mainCamera.attachControl = true;
    const logs = this.createDummyBattleLog();
    this.players[0].init();
    this.players[1].init();
    setTimeout(() => {
      this.playGameSequence(logs);
    }, 5000);
  }

  changeCubegon(idx) {
    return () => {
      typeof this.props.changeCubegon === 'function' && this.props.changeCubegon(idx);
    };
  }

  createDummyBattleLog() {
    const logs = [];
    const moves = DEMO_BATTLE_MOVES.slice();
    for (let i = 0; i < 9; i++) {
      const randomMoveIdx = GetRandomInt(0, moves.length - 1);
      const moveId = moves[randomMoveIdx];
      moves.splice(randomMoveIdx, 1);
      logs.push({ moveId, effects: { damage: 20 }, player: i % 2 });
    }
    return logs;
  }

  playGameSequence(logs) {
    logs.forEach((turn, idx) => {
      setTimeout(() => {
        MOVES[turn.moveId].play(this.players[turn.player], turn.effects);
      }, 5000 * idx);
    });
    setTimeout(() => {
      this.mainCamera.attachControl = false;
      this.rePlayBtn.visible = true;
      this.resultImage.visible = true;
      this.playerWinImage.visible = true;
    }, 5000 * logs.length + 1000);
  }

  initPlayerAnimation(player, idx) {
    if (!player) return;
    if (this.players[0]) {
      this.players[0].opponent = player;
      player.opponent = this.players[0];
    }
    player.mountSkeleton(idleGroundAnimation, 'rootJT');
    player.playSkeletonAnimation('idle_ground', true, 1);
    this.players[idx] = player;
  }

  renderPlayers() {
    const player0 = this.state.player0Data ? (
      <MeshContainer position={{ x: 0, y: 0, z: -5 }} key="player-container-0">
        <VoxelPlayer
          key={this.state.player0Data}
          data={this.state.player0Data}
          size={SIZE * 0.9}
          rotate={1}
          ref={(ref) => {
            this.initPlayerAnimation(ref, 0);
          }}
        />
      </MeshContainer>
    ) : null;
    const player1 = this.state.player1Data ? (
      <MeshContainer position={{ x: 0, y: 0, z: 5 }} key="player-container-1">
        <VoxelPlayer
          key={this.state.player1Data}
          data={this.state.player1Data}
          size={SIZE * 0.9}
          rotate={-1}
          ref={(ref) => {
            this.initPlayerAnimation(ref, 1);
          }}
        />
      </MeshContainer>
    ) : null;
    return [player0, player1];
  }

  setPlayer(idx, playerData) {
    const updateData = {};
    updateData[`player${idx}Data`] = playerData;
    this.setState(updateData);
  }

  componentDidMount() {
    const battleGroundFileName = require('../../shared/battleground/map_1/BattleMap1.babylon');
    BabylonX.loaders.addTexture('particle_circle_01', require('../../shared/particles/textures/circle_01.png'));
    BabylonX.loaders.addTexture('particle_circle_05', require('../../shared/particles/textures/circle_05.png'));
    BabylonX.loaders.addTexture('particle_cube', require('../../shared/particles/textures/cube.png'));
    BabylonX.loaders.addTexture('particle_flare', require('../../shared/particles/textures/flare.png'));
    BabylonX.loaders.addTexture(
      'particle_projectile_141', require('../../shared/particles/textures/projectile_141.png'),
    );
    BabylonX.loaders.addTexture('particle_scratch_01', require('../../shared/particles/textures/scratch_01.png'));
    BabylonX.loaders.addTexture('particle_window_04', require('../../shared/particles/textures/window_04.png'));
    BabylonX.loaders.addTexture('particle_star', require('../../shared/particles/textures/star.jpg'));
    BabylonX.loaders.addTexture('particle_twirl_02', require('../../shared/particles/textures/twirl_02.png'));

    // eslint-disable-next-line no-undef
    BabylonX.loaders.addMesh('battlemap1', `${DOMAIN_ROOT}/`, battleGroundFileName).then((data) => {
      data.loadedMeshes.forEach((mesh) => {
        if (mesh.name.match(/^Cloud_\d+_l$/g)) {
          const anim = new BABYLON.Animation(
            'cloudFly',
            'position.z',
            60,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE,
          );
          const keys = [];
          keys.push({
            frame: 0,
            value: mesh.position.z,
          });
          keys.push({
            frame: 100,
            value: mesh.position.z + 100,
          });
          anim.setKeys(keys);
          mesh.animations.push(anim);
          this.clouds.push(mesh);
        } else if (mesh.name.match(/^Cloud_\d+_r$/g)) {
          const anim = new BABYLON.Animation('cloudFly', 'position.z', 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
          const keys = [];

          keys.push({
            frame: 0,
            value: mesh.position.z,
          });

          keys.push({
            frame: 100,
            value: mesh.position.z - 100,
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
      <MeshContainer position={{ x: 0, y: 0, z: 0 }}>
        {/* <Axis size={5}/> */}
        <GUI>
          <GUIImage
            image={require('../../shared/img/game_ui/open.png')}
            width={`${960 / 960 * 100}%`}
            height={`${540 / 540 * 100}%`}
            ref={(image) => { this.startImage = image; }}
          />
          <GUIImage
            image={this.state.player1Data ? this.state.player1Data.image : null}
            width={`${150 / 960 * 100}%`}
            height={`${150 / 540 * 100}%`}
            left={-250}
            ref={(image) => { this.player1Image = image; }}
          />
          <GUIImage
            image={this.state.player0Data ? this.state.player0Data.image : null}
            width={`${150 / 960 * 100}%`}
            height={`${150 / 540 * 100}%`}
            left={250}
            ref={(image) => { this.player0Image = image; }}
          />
          <GUIImage
            image={require('../../shared/img/game_ui/battle-result.png')}
            width={`${542 / 960 * 100}%`}
            height={`${489 / 540 * 100}%`}
            visible={false}
            ref={(image) => { this.resultImage = image; }}
          />
          <GUIImage
            image={this.state.player0Data ? this.state.player0Data.image : null}
            width={`${300 / 960 * 100}%`}
            height={`${300 / 540 * 100}%`}
            visible={false}
            ref={(image) => { this.playerWinImage = image; }}
          />

          <GUIImageButton
            top={200}
            value="REPLAY GAME"
            onClick={this.restartGame}
            width={`${200 / 960 * 100}%`}
            image={require('../../shared/img/game_ui/replay_game.png')}
            height={`${75 / 540 * 100}%`}
            ref={(button) => {
              this.rePlayBtn = button;
            }}
            visible={false}
          />

          <GUIImageButton
            top={200}
            value="START GAME"
            onClick={this.startGame}
            width={`${200 / 960 * 100}%`}
            image={require('../../shared/img/game_ui/start_game.png')}
            height={`${75 / 540 * 100}%`}
            ref={(button) => {
              this.startBtn = button;
            }}
          />

          <GUIImageButton
            left={-300}
            top={150}
            value="CHANGE CUBEGON"
            onClick={this.changeCubegon(1)}
            width={`${100 / 960 * 100}%`}
            image={require('../../shared/img/game_ui/change_cubegons.png')}
            height={`${40 / 540 * 100}%`}
            ref={(button) => {
              this.changePlayer1Btn = button;
            }}
          />
          <GUIImageButton
            left={300}
            top={-150}
            value="CHANGE CUBEGON"
            onClick={this.changeCubegon(0)}
            width={`${100 / 960 * 100}%`}
            image={require('../../shared/img/game_ui/change_cubegons.png')}
            height={`${40 / 540 * 100}%`}
            ref={(button) => {
              this.changePlayer2Btn = button;
            }}
          />

        </GUI>

        <ArcRotateCamera
          alpha={3.148}
          beta={1.124}
          radius={60}
          wheelPrecision={50}
          ref={(camera) => {
            this.mainCamera = camera;
          }}
        />
        <HemisphericLight position={{ x: 0, y: 10, z: 0 }} />
        <PointLight position={{ x: 100, y: 100, z: 100 }} />
        <PointLight position={{ x: -100, y: -100, z: -100 }} />
        <Skybox imageUrls={this.skyboxImages} />
        {this.renderPlayers()}
      </MeshContainer>
    );
  }
}

export default VoxBattle;
