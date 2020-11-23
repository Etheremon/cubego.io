import * as BABYLON from 'babylonjs';
import { BaseMove } from '../BaseMove';
import BabylonX from '../../../babylonX';

export default class FireBreath extends BaseMove {
  static getId() {
    return 'fire_breath';
  }

  constructor(player, { damage }) {
    super(player);
    this.damage = damage;
  }

  playMove() {
    this.player.playSkeletonAnimation('attack_normal', false, 1);
    setTimeout(() => {
      this._createFireBreathParticle();
    }, 150);
  }

  _createFireBreathParticle() {
    const fountain = this.player.playerMesh;
    const smokeSystem = new BABYLON.ParticleSystem('particles', 1000, this.scene);
    // smokeSystem.particleTexture = new BABYLON.Texture(require("../../../../shared/particles/textures/cube.png"), this.scene);
    smokeSystem.particleTexture = BabylonX.loaders.get('particle_cube').clone();
    smokeSystem.emitter = fountain;

    smokeSystem.minEmitBox = new BABYLON.Vector3(-0.2, 1.5, 1.5);
    smokeSystem.maxEmitBox = new BABYLON.Vector3(0.2, 1, 1.5);

    smokeSystem.color1 = new BABYLON.Color4(0.02, 0.02, 0.02, 0.02);
    smokeSystem.color2 = new BABYLON.Color4(0.02, 0.02, 0.02, 0.02);
    smokeSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

    smokeSystem.minSize = 1;
    smokeSystem.maxSize = 3;

    smokeSystem.minLifeTime = 0.3;
    smokeSystem.maxLifeTime = 1.5;

    smokeSystem.emitRate = 350;

    smokeSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    smokeSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    smokeSystem.direction1 = new BABYLON.Vector3(-1.5, -1.5, 30);
    // smokeSystem.direction2 = new BABYLON.Vector3(1.5, 8, 1.5);

    smokeSystem.minAngularSpeed = 0;
    smokeSystem.maxAngularSpeed = Math.PI;

    smokeSystem.minEmitPower = 0.5;
    smokeSystem.maxEmitPower = 1.5;
    smokeSystem.updateSpeed = 0.005;

    smokeSystem.start();

    const fireSystem = new BABYLON.ParticleSystem('particles', 2000, this.scene);

    // fireSystem.particleTexture = new BABYLON.Texture(require("../../../../shared/particles/textures/cube.png"), this.scene);
    fireSystem.particleTexture = BabylonX.loaders.get('particle_cube').clone();

    fireSystem.emitter = fountain;

    fireSystem.minEmitBox = new BABYLON.Vector3(-0.2, 1.5, 1.5);
    fireSystem.maxEmitBox = new BABYLON.Vector3(0.2, 1, 1.5);
    fireSystem.color1 = new BABYLON.Color4(1, 0.5, 0, 1.0);
    fireSystem.color2 = new BABYLON.Color4(1, 0.5, 0, 1.0);
    fireSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

    fireSystem.minSize = 0.3;
    fireSystem.maxSize = 1;

    fireSystem.minLifeTime = 0.2;
    fireSystem.maxLifeTime = 0.4;

    fireSystem.emitRate = 600;

    fireSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    fireSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    fireSystem.direction1 = new BABYLON.Vector3(0, 0, 30);
    // fireSystem.direction2 = new BABYLON.Vector3(0, 4, 0);

    fireSystem.minAngularSpeed = 0;
    fireSystem.maxAngularSpeed = Math.PI;

    fireSystem.minEmitPower = 1;
    fireSystem.maxEmitPower = 3;
    fireSystem.updateSpeed = 0.007;

    fireSystem.start();
    setTimeout(() => {
      this.player.opponent.hurt(this.damage);
      smokeSystem.stop();
      fireSystem.stop();
    }, 1000);
  }

  static play(player, effects) {
    const move = new FireBreath(player, effects);
    move.playMove();
  }
}
