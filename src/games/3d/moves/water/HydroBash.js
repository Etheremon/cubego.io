import {BaseMove} from "../BaseMove";
import * as BABYLON from "babylonjs";
import BabylonX from "../../../babylonX";

export default class HydroBash extends BaseMove {
  static getId() {
    return "hydro_bash"
  }

  constructor(player, {damage}) {
    super(player);
    this.speed = 0.01;
    this.numberOfIce = 2;
    this.damage = damage;
    this.chargingTime = 2000;
  }

  playMove() {
    this.player.playSkeletonAnimation('roar', false, 1);
    setTimeout(() => {
      this._createBeamParticle();
    }, 150);
  }

  _createBeamParticle() {
    let direction = 1;
    let startMatrix = this.player.playerMesh.getWorldMatrix();
    let startPosition = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), startMatrix);
    let targetMatrix = this.player.opponent.playerMesh.getWorldMatrix();
    let targetPosition = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), targetMatrix);

    if (targetPosition.z < startPosition.z) {
      direction = -1;
    }
    let position = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), startMatrix);
    position.y += 1;
    let hilt1 = BABYLON.Mesh.CreateCylinder("box", 0, 0, 0, 0, this.scene);
    hilt1.position = position;
    hilt1.rotation.x = direction * Math.PI / 2;
    let emitter = hilt1;
    let pSystem = new BABYLON.ParticleSystem("particles", 1000, this.scene);
    pSystem.particleTexture = BabylonX.loaders.get('particle_star').clone();

    pSystem.minSize = 0.5;
    pSystem.maxSize = 1;
    pSystem.minLifeTime = 4;
    pSystem.maxLifeTime = 4;
    pSystem.minEmitPower = 2;
    pSystem.maxEmitPower = 2;

    pSystem.minAngularSpeed = 0;
    pSystem.maxAngularSpeed = Math.PI;

    pSystem.emitter = emitter;
    pSystem.updateSpeed = 0.07;
    pSystem.emitRate = 200;
    pSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    pSystem.color1 = new BABYLON.Color4(0, 0, 1, 1);
    pSystem.color2 = new BABYLON.Color4(0, 1, 0, 1);
    pSystem.colorDead = new BABYLON.Color4(1, 0, 0, 1);


    pSystem.minEmitBox = new BABYLON.Vector3(0, 1.5, 0);
    pSystem.maxEmitBox = new BABYLON.Vector3(0, 1.5, 0);

    pSystem.start();

    setTimeout(() => {
      pSystem.stop();
      pSystem.dispose();
    }, 2000);
  }

  static play(player, effects) {
    let move = new HydroBash(player, effects);
    move.playMove();
  }
}
