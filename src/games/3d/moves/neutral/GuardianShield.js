import {BaseMove} from "../BaseMove";
import * as BABYLON from "babylonjs";
import BabylonX from "../../../babylonX";

export default class GuardianShield extends BaseMove {
  constructor(player, {damage}) {
    super(player);
    this.speed = 0.01;
    this.damage = damage;
  }

  playMove() {
    this.player.playSkeletonAnimation('roar', false, 1);
    setTimeout(() => {
      this._createShieldParticle();
    }, 150);
  }

  _createShieldParticle() {
    let matrix = this.player.playerMesh.getWorldMatrix();
    let position = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), matrix);
    position.y += 1;
    let emitter = position;
    let pSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);
    // pSystem.particleTexture = new BABYLON.Texture(require("../../../../shared/particles/textures/cube.png"), this.scene);
    pSystem.particleTexture = BabylonX.loaders.get('particle_cube').clone();


    pSystem.emitter = emitter;
    let emitterType = new BABYLON.SphereParticleEmitter();
    emitterType.radius = 2;
    emitterType.radiusRange = 0;
    pSystem.particleEmitterType = emitterType;

    pSystem.minSize = 0.5;
    pSystem.maxSize = 1;

    pSystem.isBillboardBased = false;

    pSystem.minLifeTime = 50.0;
    pSystem.maxLifeTime = 50.0;

    pSystem.emitRate = 50;
    pSystem.manualEmitCount = 100;
    pSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    pSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    pSystem.minAngularSpeed = 0;
    pSystem.maxAngularSpeed = Math.PI;

    pSystem.color1 = new BABYLON.Color4(1.0, 0.05, 0.05, 1);
    pSystem.color2 = new BABYLON.Color4(0.85, 0.05, 0, 1);
    pSystem.colorDead = new BABYLON.Color4(.5, .02, 0, .5);

    pSystem.minEmitPower = 0;
    pSystem.maxEmitPower = 0;
    pSystem.updateSpeed = 0.005;
    pSystem.start();
    setTimeout(() => {
      pSystem.stop();
      pSystem.dispose();
    }, 2000);
  }

  static play(player, effects) {
    let move = new GuardianShield(player, effects);
    move.playMove();
  }
}
