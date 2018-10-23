import {BaseMove} from "../BaseMove";
import * as BABYLON from "babylonjs";
import {GetRandomInt} from "../../../../utils/utils";
import {hexToColor3} from "../../../babylonX/utils";
import BabylonX from "../../../babylonX";

export default class DoublePunch extends BaseMove {
  constructor(player, {damage}) {
    super(player);
    this.speed = 1;
    this.numberOfPunchs = 2;
    this.damage = damage;
  }

  playMove() {
    this.player.playSkeletonAnimation('attack_normal', false, 1);
    setTimeout(() => {
      for (let i = 0; i < this.numberOfPunchs; i++) {
        setTimeout(() => {
          this._createPunchParticle();
        }, i * 100);
      }
    }, 150);
  }

  _createPunchParticle() {
    let isCollision = false;
    let direction = 1;
    let options = {
      size: 0.4,
      faceColors: [0, 1, 2, 3, 4, 5].map(() => hexToColor3('#0000ff'))
    };

    let seed = BABYLON.MeshBuilder.CreateBox("seed", options, this.player.scene);
    let startMatrix = this.player.playerMesh.getWorldMatrix();
    let startPosition = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), startMatrix);
    let targetMatrix = this.player.opponent.playerMesh.getWorldMatrix();
    let targetPosition = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), targetMatrix);

    if (targetPosition.z > startPosition.z) {
      direction = -1;
    }
    seed.position = startPosition;
    let x = GetRandomInt(0, 5) / 10;
    let y = 1 + GetRandomInt(0, 5) / 10;
    seed.position.x = x;
    seed.position.y = y;
    let pSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);
    pSystem.emitter = seed;
    pSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    pSystem.particleTexture = BabylonX.loaders.get('particle_flare');
    pSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    pSystem.maxEmitBox = new BABYLON.Vector3(0, 0, 0);
    pSystem.color1 = new BABYLON.Color4(0.059, 0.714, 0.110, .9);
    pSystem.color2 = new BABYLON.Color4(0.059, 0.714, 0.306, .9);
    pSystem.colorDead = new BABYLON.Color4(0.878, 0.902, 0.043, .5);
    pSystem.minSize = 0.75;
    pSystem.maxSize = 1.0;
    pSystem.minLifeTime = 0.075;
    pSystem.maxLifeTime = 0.1;
    pSystem.emitRate = 400;
    pSystem.gravity = new BABYLON.Vector3(0, 0, 0);
    pSystem.direction1 = new BABYLON.Vector3(0, .05, 0);
    pSystem.direction2 = new BABYLON.Vector3(0, -.05, 0);
    pSystem.minAngularSpeed = 1.5;
    pSystem.maxAngularSpeed = 2.5;
    pSystem.minEmitPower = 0.4;
    pSystem.maxEmitPower = 0.75;
    pSystem.updateSpeed = 0.008;
    let alpha = seed.position.z;
    this.player.scene.registerBeforeRender(() => {
      if (!isCollision) {
        if (seed.intersectsMesh(this.player.opponent.playerMesh, false)) {
          isCollision = true;
          this.player.opponent.hurt(this.damage / this.numberOfSeeds);
          pSystem.stop();
          seed.dispose();
        } else {
          pSystem.emitter.position = new BABYLON.Vector3(x, y, alpha);
          for (let i2 = 0, max2 = pSystem.particles.length; i2 < max2; i2 += 1) {
            if (pSystem.particles[i2].age >= (pSystem.particles[i2].lifeTime * 0.05)) {
              pSystem.particles[i2].size -= 0.1;
            }
          }

          alpha -= direction * this.speed;
        }
      }
    });
  }

  static play(player, effects) {
    let move = new DoublePunch(player, effects);
    move.playMove();
  }
}
