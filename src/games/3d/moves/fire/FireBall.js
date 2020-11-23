import * as BABYLON from 'babylonjs';
import { BaseMove } from '../BaseMove';
import BabylonX from '../../../babylonX';

export default class FireBall extends BaseMove {
  static getId() {
    return 'fire_ball';
  }

  constructor(player, { damage }) {
    super(player);
    this.speed = 0.01;
    this.damage = damage;
  }

  playMove() {
    this.player.playSkeletonAnimation('attack_normal', false, 1);
    setTimeout(() => {
      this._createFireBallParticle();
    }, 150);
  }

  _createFireBallParticle() {
    let isCollision = false;
    const fireBall = BABYLON.Mesh.CreateSphere('fist', 16, 0.5, this.scene);
    const startMatrix = this.player.playerMesh.getWorldMatrix();
    const startPosition = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), startMatrix);
    const targetMatrix = this.player.opponent.playerMesh.getWorldMatrix();
    const targetPosition = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), targetMatrix);
    let direction = 1;
    if (targetPosition.z > startPosition.z) {
      direction = -1;
    }
    fireBall.position = startPosition;
    const pSystem = new BABYLON.ParticleSystem('particles', 2000, this.scene);
    pSystem.emitter = fireBall;
    pSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    pSystem.light = new BABYLON.PointLight('Omni1', new BABYLON.Vector3(0, 0, 0), this.scene);
    pSystem.light.diffuse = new BABYLON.Color3(0.8, 0, 0);
    pSystem.light.range = 15;

    pSystem.particleTexture = BabylonX.loaders.get('particle_flare').clone();

    pSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    pSystem.maxEmitBox = new BABYLON.Vector3(0, 0, 0);
    pSystem.color1 = new BABYLON.Color4(1.0, 0.05, 0.05, 0.9);
    pSystem.color2 = new BABYLON.Color4(0.85, 0.05, 0, 0.9);
    pSystem.colorDead = new BABYLON.Color4(0.5, 0.02, 0, 0.5);
    pSystem.minSize = 0.75;
    pSystem.maxSize = 1.0;
    pSystem.minLifeTime = 0.075;
    pSystem.maxLifeTime = 0.1;
    pSystem.emitRate = 400;
    pSystem.gravity = new BABYLON.Vector3(0, 0, 0);
    pSystem.direction1 = new BABYLON.Vector3(0, 0.05, 0);
    pSystem.direction2 = new BABYLON.Vector3(0, -0.05, 0);
    pSystem.minAngularSpeed = 1.5;
    pSystem.maxAngularSpeed = 2.5;
    pSystem.minEmitPower = 0.4;
    pSystem.maxEmitPower = 0.75;
    pSystem.updateSpeed = 0.008;
    let alpha = fireBall.position.z;
    const update = () => {
      if (!isCollision) {
        if (this.player.opponent.checkCollision(fireBall)) {
          isCollision = true;
          this.player.opponent.hurt(this.damage);
          pSystem.stop();
          fireBall.dispose();
          this.scene.onBeforeRenderObservable.remove(update);
        } else {
          pSystem.emitter.position = new BABYLON.Vector3(0, 1, alpha);
          for (let i2 = 0, max2 = pSystem.particles.length; i2 < max2; i2 += 1) {
            if (pSystem.particles[i2].age >= (pSystem.particles[i2].lifeTime * 0.05)) {
              pSystem.particles[i2].size -= 0.1;
            }
          }

          alpha -= direction * 0.2;
        }
      }
    };
    this.scene.onBeforeRenderObservable.add(update);

    pSystem.start();
  }

  static play(player, effects) {
    const move = new FireBall(player, effects);
    move.playMove();
  }
}
