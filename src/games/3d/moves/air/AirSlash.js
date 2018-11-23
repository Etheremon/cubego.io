import {BaseMove} from "../BaseMove";
import * as BABYLON from "babylonjs";
import BabylonX from "../../../babylonX";

export default class AirSlash extends BaseMove {
  static getId() {
    return "air_slash"
  }

  constructor(player, {damage}) {
    super(player);
    this.speed = 0.01;
    this.damage = damage;
  }

  playMove() {
    this.player.playSkeletonAnimation('attack_normal', false, 1);
    setTimeout(() => {
      this._createScratchParticle();
    }, 150);
  }

  _createScratchParticle() {
    let matrix = this.player.opponent.playerMesh.getWorldMatrix();
    let emitter = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), matrix);
    emitter.y = 1.5;
    let pSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);
    pSystem.emitter = emitter;
    pSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    pSystem.particleTexture = BabylonX.loaders.get('particle_scratch_01').clone();

    pSystem.minInitialRotation = 0;
    pSystem.maxInitialRotation = 4;
    pSystem.color1 = new BABYLON.Color4(0.0, 0.95, 1, 1);
    pSystem.color2 = new BABYLON.Color4(0.0, 0.9, 1, 1);
    pSystem.colorDead = new BABYLON.Color4(0, .06, 1, .5);
    pSystem.minSize = 5.0;
    pSystem.maxSize = 5.0;
    pSystem.minLifeTime = 3;
    pSystem.maxLifeTime = 5;
    pSystem.manualEmitCount = 1;
    pSystem.minAngularSpeed = 0;
    pSystem.maxAngularSpeed = 0;
    pSystem.minEmitPower = 0;
    pSystem.maxEmitPower = 0;
    pSystem.updateSpeed = 0.1;
    pSystem.minScaleX = 1;
    pSystem.minScaleY = 1;
    pSystem.start();
    this.player.opponent.hurt(this.damage);
    setTimeout(() => {
      pSystem.stop();
    }, 50);
  }

  static play(player, effects) {
    let move = new AirSlash(player, effects);
    move.playMove();
  }
}
