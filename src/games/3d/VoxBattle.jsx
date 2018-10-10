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

    this.playerAttackAnimations = [];
    this.playerJumpAnimations = [];
    this.players = [];

    this.testAnimationKeys = [
      {
        "frame": 0,
        "values": [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]
      }, {
        "frame": 1,
        "values": [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.02640176, 0.0, 1.0]
      }, {
        "frame": 2,
        "values": [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0559476577, 0.0, 1.0]
      }, {
        "frame": 3,
        "values": [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.087528, 0.0, 1.0]
      }, {
        "frame": 4,
        "values": [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.120033078, 0.0, 1.0]
      }, {
        "frame": 5,
        "values": [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.152353212, 0.0, 1.0]
      }, {
        "frame": 6,
        "values": [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.183378711, 0.0, 1.0]
      }, {
        "frame": 7,
        "values": [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.211999863, 0.0, 1.0]
      }, {
        "frame": 8,
        "values": [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.237107, 0.0, 1.0]
      }, {
        "frame": 9,
        "values": [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.257590383, 0.0, 1.0]
      }, {
        "frame": 10,
        "values": [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.272340328, 0.0, 1.0]
      }, {
        "frame": 11,
        "values": [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.280247152, 0.0, 1.0]
      }, {
        "frame": 12,
        "values": [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.2706265, 0.0, 1.0]
      }, {
        "frame": 13,
        "values": [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.200099319, 0.0, 1.0]
      }, {
        "frame": 14,
        "values": [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0967690647, 0.0, 1.0]
      }, {
        "frame": 15,
        "values": [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]
      }
    ]
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
      console.log(data);
      // data.loadedMeshes[3].position = new BABYLON.Vector3(0, -6.4, 0);
      data.loadedMeshes[2].rotation.y = -Math.PI / 4;
      // data.loadedMeshes[0].scaling = new BABYLON.Vector3(SIZE * 2, SIZE * 2, SIZE * 2);
    });


    fetch(`/assets/animations/run_ground.json`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
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

        // let ske2 = skeleton.clone('clonedSkeleton', 'clonedSkeleton');
        // this.players[0].skeleton = new BABYLON.Skeleton('player', 'player', this.players[0].scene);
        // this.players[0].skeleton.copyAnimationRange(skeleton, 'Mmotion_idle_fly', true);
        // console.log("this.players[0].playerMesh");
        // console.log(this.players[0].playerMesh);
        // let anim = this.players[0].scene.beginAnimation(this.players[0].skeleton, 0, 15, false, 1.0);
        // console.log("this.players[0].skeleton");
        // console.log(this.players[0].skeleton);
        // anim.waitAsync().then((data) => {
        //   console.log(data)
        // });
      });

    // BabylonX.loaders.addMesh('test_gltf', '/mons/', 'kyarishake.gltf').then((data) => {
    //   console.log(data);
    //   data.loadedMeshes[0].autoAnimate  = false;
    //   data.loadedMeshes[0].autoAnimateLoop  = false;
    // scene.stopAnimation(newMeshes[0])
    // this.players[0].skeleton = data.loadedSkeletons[0].clone("clonedSke");
    // this.players[0].skeleton.beginAnimation();
    //   this.players[0].scene.stopAnimation(data.loadedMeshes[0]);
    // });

    BabylonX.loaders.load();
    // setInterval(() => {
    //   this.players[0].playAnimation(['attack', 'scaling', 'jump'], false, 2);
    //   this.players[0].isAttacking = true;
    //   this.players[1].isAttacking = false;
    //
    //   setTimeout(() => {
    //     this.players[1].hurt(15);
    //   }, 500)
    // }, 6000);
    setTimeout(() => {
      // setInterval(() => {
      //   this.players[1].playAnimation(['attack', 'scaling', 'jump'], false, 2);
      //   this.players[0].isAttacking = false;
      //   this.players[1].isAttacking = true;
      //   setTimeout(() => {
      //     this.players[0].hurt(20);
      //   }, 500)
      // }, 6000);
      // this.players[0].collisionMesh = this.players[1].playerMesh;
      // this.players[1].collisionMesh = this.players[0].playerMesh;
      // this.players[0].playAnimation(['attack'], true, 1);
      // this.players[0].playAnimation(['test'], true, 2);
      // this.players[1].createFistParticle();
    }, 5000)
  }

  render() {
    return (
      <MeshContainer position={{x: 0, y: 0, z: 0}}>
        <Axis size={5}/>
        <GUI>
          <GUISimpleButton left={'-75px'} value={'1'}/>
          <GUISimpleButton left={'-25px'} value={'2'}/>
          <GUISimpleButton left={'25px'} value={'3'}/>
          <GUISimpleButton left={'75px'} value={'4'}/>
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
