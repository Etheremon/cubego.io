import * as BABYLON from 'babylonjs';
import { BaseMove } from '../BaseMove';
import BabylonX from '../../../babylonX';

export default class WindStrike extends BaseMove {
  static getId() {
    return 'wind_strike';
  }

  constructor(player, { damage }) {
    super(player);
    this.damage = damage;
  }

  playMove() {
    this.player.playSkeletonAnimation('attack_normal', false, 1);
    setTimeout(() => {
      this._createWindParticle();
    }, 150);
  }

  _createWindParticle() {
    const startMatrix = this.player.playerMesh.getWorldMatrix();
    const startPosition = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), startMatrix);
    const targetMatrix = this.player.opponent.playerMesh.getWorldMatrix();
    const targetPosition = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), targetMatrix);
    let direction = 1;
    if (targetPosition.z > startPosition.z) {
      direction = -1;
    }
    const emitter = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), startMatrix);
    const pSystem = new BABYLON.ParticleSystem('particles', 2000, this.scene);
    pSystem.emitter = emitter;

    pSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    pSystem.particleTexture = BabylonX.loaders.get('particle_twirl_02').clone();
    pSystem.isBillboardBased = false;
    pSystem.textureMask = new BABYLON.Color4(1.0, 1.0, 1.0, 1.0);

    pSystem.color1 = new BABYLON.Color4(0, 0, 0, 0.7);
    pSystem.color2 = new BABYLON.Color4(0, 0, 0, 0.0);
    pSystem.colorDead = new BABYLON.Color4(1, 1, 1, 0.0);

    pSystem.minLifeTime = 0.05;
    pSystem.maxLifeTime = 0.05;

    pSystem.addSizeGradient(1, 2);

    pSystem.minAngularSpeed = 1;
    pSystem.maxAngularSpeed = 2;

    pSystem.minInitialRotation = 0;
    pSystem.maxInitialRotation = Math.PI * 2;

    pSystem.minEmitPower = 4;
    pSystem.maxEmitPower = 10;
    pSystem.updateSpeed = 0.004;
    pSystem.addSizeGradient(0, 0.7, 0.5);
    pSystem.addSizeGradient(0.5, 1.4, 1.6);
    pSystem.addSizeGradient(1.0, 0, 0.1);

    pSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0);
    pSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0);

    pSystem.emitRate = 1000;

    pSystem.createPointEmitter(new BABYLON.Vector3(0, 8, -0.1), new BABYLON.Vector3(0, 8, 0.1));
    let alpha = emitter.z - 0.5 * direction;

    let isCollision = false;

    const update = () => {
      if (!isCollision) {
        if ((direction > 0 && pSystem.emitter.z < targetPosition.z) || (direction < 0 && pSystem.emitter.z > targetPosition.z)) {
          isCollision = true;
          this.player.opponent.hurt(this.damage);
          pSystem.stop();
          this.scene.onBeforeRenderObservable.remove(update);
        } else {
          pSystem.emitter = new BABYLON.Vector3(0, 0, alpha);
          alpha -= direction * 0.2 * this.player.engine.getDeltaTime() / 60;
        }
      }
    };

    this.scene.onBeforeRenderObservable.add(update);

    pSystem.start();
  }

  static play(player, effects) {
    const move = new WindStrike(player, effects);
    move.playMove();
  }
}
