import * as BABYLON from 'babylonjs';
import { BaseMove } from '../BaseMove';
import BabylonX from '../../../babylonX';

export default class HydroBash extends BaseMove {
  static getId() {
    return 'hydro_bash';
  }

  constructor(player, { damage }) {
    super(player);
    this.speed = 0.01;
    this.damage = damage;
  }

  playMove() {
    this.player.playSkeletonAnimation('roar', false, 1);
    setTimeout(() => {
      this._createBeamParticle();
    }, 150);
  }

  _createBeamParticle() {
    let direction = 1;
    const startMatrix = this.player.playerMesh.getWorldMatrix();
    const startPosition = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), startMatrix);
    const targetMatrix = this.player.opponent.playerMesh.getWorldMatrix();
    const targetPosition = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), targetMatrix);

    if (targetPosition.z < startPosition.z) {
      direction = -1;
    }
    const position = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), startMatrix);
    position.y += 1;
    const hilt1 = BABYLON.Mesh.CreateCylinder('box', 0, 0, 0, 0, this.scene);
    hilt1.position = position;
    hilt1.rotation.x = direction * Math.PI / 2;
    const emitter = hilt1;
    const pSystem = new BABYLON.ParticleSystem('particles', 1000, this.scene);
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

    pSystem.addSizeGradient(0, 1, 1);
    pSystem.addSizeGradient(0.8, 1, 1);
    pSystem.addSizeGradient(1.0, 5, 5);

    pSystem.minEmitBox = new BABYLON.Vector3(0, 1.5, 0);
    pSystem.maxEmitBox = new BABYLON.Vector3(0, 1.5, 0);

    pSystem.start();

    setTimeout(() => {
      pSystem.stop();
      pSystem.dispose();
      this.player.opponent.hurt(this.damage);
    }, 2000);
  }

  static play(player, effects) {
    const move = new HydroBash(player, effects);
    move.playMove();
  }
}
