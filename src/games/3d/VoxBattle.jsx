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

const skill = (player) => {

};

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
    this.players = [];
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

  renderPlayer(data, rotate, idx) {
    return <VoxelPlayer data={data} key={idx} size={SIZE * 0.9} rotate={rotate} ref={(ref) => {
      this.players[idx] = ref
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

  mount(obj, ske, boneName) {
    let matricesWeights = [];
    let floatIndices = [];
    let boneIndice = -1;
    for (let i = 0; i < ske.bones.length; i++) {
      if (ske.bones[i].name === boneName) {
        boneIndice = i;
        break;
      }
    }
    if (boneIndice === -1) {
      console.log("Could not find bone");
      return;
    }
    for (let ii = 0; ii < obj.getTotalVertices(); ii++) {
      matricesWeights[ii * 4 + 0] = 1.0;
      matricesWeights[ii * 4 + 1] = 0.0;
      matricesWeights[ii * 4 + 2] = 0.0;
      matricesWeights[ii * 4 + 3] = 0.0;
      floatIndices[ii * 4 + 0] = boneIndice;
      floatIndices[ii * 4 + 1] = boneIndice;
      floatIndices[ii * 4 + 2] = boneIndice;
      floatIndices[ii * 4 + 3] = boneIndice;
    }
    obj.skeleton = ske;

    obj.setVerticesData(BABYLON.VertexBuffer.MatricesWeightsKind, matricesWeights, false);
    obj.setVerticesData(BABYLON.VertexBuffer.MatricesIndicesKind, floatIndices, false);
  };


  componentDidMount() {
    BabylonX.loaders.addMesh('battlemap1', '/assets/battleground/map_1/unity/', 'BattleMap1.babylon').then((data) => {
      data.loadedMeshes[2].rotation.y = -Math.PI / 4;
    });


    BabylonX.loaders.load();
    setTimeout(() => {
      let json = idleGroundAnimation;
      let skeleton = BABYLON.Skeleton.Parse(json, this.players[1].scene);
      this.mount(this.players[1].playerMesh, skeleton, 'rootJT');

      let skeletonViewer = new BABYLON.Debug.SkeletonViewer(skeleton, this.players[1].playerMesh, this.players[1].scene);
      skeletonViewer.isEnabled = true;
      skeletonViewer.color = BABYLON.Color3.Red();

      this.players[1].scene.beginAnimation(skeleton, 0, 50, true, 1.0);

      let ske2 = skeleton.clone('ske2', 'ske2');
      this.mount(this.players[0].playerMesh, ske2, 'rootJT');

      let skeletonViewer2 = new BABYLON.Debug.SkeletonViewer(ske2, this.players[0].playerMesh, this.players[0].scene);
      skeletonViewer2.isEnabled = true;
      skeletonViewer2.color = BABYLON.Color3.Red();

      this.players[0].scene.beginAnimation(ske2, 0, 50, true, 1.0);
    }, 5000)
  }

  createShieldParticle() {
    this.players[0].createShieldParticle();
  }

  createFistParticle() {
    this.players[1].createFireParticle();
  }

  createHitAnimation() {
    this.players[0].playAnimation('attack', false, 3);
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
          <GUISimpleButton left={'75px'} value={'4'} onClick={this.createHitParticle.bind(this)}/>
        </GUI>
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
