import {BaseMove} from "../BaseMove";
import * as BABYLON from "babylonjs";
import BabylonX from "../../../babylonX";
import {hexToColor3} from "../../../babylonX/utils";
import {GetRandomInt} from "../../../../utils/utils";

export default class HealingWater extends BaseMove {
  static getId() {
    return "healing_water"
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
      this._createWaterShieldParticle();
    }, 150);

    setTimeout(() => {
      this.player.playSkeletonAnimation('attack_normal', false, 1);
      setTimeout(() => {
        this._createWaterParticle();
      }, 150)
    }, this.chargingTime + 1000);
  }

  _createWaterShieldParticle() {
    let matrix = this.player.playerMesh.getWorldMatrix();
    let position = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), matrix);
    position.y += 1;
    let emitter = position;
    let pSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);
    pSystem.particleTexture = BabylonX.loaders.get('particle_flare').clone();

    pSystem.emitter = emitter;
    let emitterType = new BABYLON.SphereParticleEmitter();
    emitterType.radius = 2;
    emitterType.radiusRange = 0;
    pSystem.particleEmitterType = emitterType;

    pSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    pSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    pSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    pSystem.minSize = 0.1;
    pSystem.maxSize = 0.5;

    pSystem.minLifeTime = 0.3;
    pSystem.maxLifeTime = 0.5;

    pSystem.emitRate = 500;

    pSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    pSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    pSystem.minAngularSpeed = 0;
    pSystem.maxAngularSpeed = Math.PI;

    pSystem.addVelocityGradient(0, 0);
    pSystem.addVelocityGradient(1.0, -5, -10);

    pSystem.minEmitPower = 1;
    pSystem.maxEmitPower = 1;
    pSystem.updateSpeed = 0.005;
    pSystem.start();
    setTimeout(() => {
      pSystem.stop();
    }, this.chargingTime);
  }

  _createWaterParticle() {
    let isCollision = false;
    let direction = 1;
    let options = {
      size: 0.01,
      faceColors: [0, 1, 2, 3, 4, 5].map(() => hexToColor3('#FFFFFF'))
    };

    let water = BABYLON.MeshBuilder.CreateBox("water", options, this.player.scene);
    water.scaling.z = 3;
    let startMatrix = this.player.playerMesh.getWorldMatrix();
    let startPosition = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), startMatrix);
    let targetMatrix = this.player.opponent.playerMesh.getWorldMatrix();
    let targetPosition = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), targetMatrix);

    if (targetPosition.z > startPosition.z) {
      direction = -1;
    }
    water.position = startPosition;
    let x = GetRandomInt(0, 5) / 10;
    let y = 1 + GetRandomInt(0, 5) / 10;
    water.position.x = x;
    water.position.y = y;
    let pSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);
    pSystem.emitter = water;
    pSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // pSystem.particleTexture = new BABYLON.Texture(require("../../../../shared/particles/textures/projectile_141.png"), this.scene);
    pSystem.particleTexture = BabylonX.loaders.get('particle_projectile_141').clone();

    pSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    pSystem.maxEmitBox = new BABYLON.Vector3(0, 0, 0);
    pSystem.minScaleX = 2;
    pSystem.maxScaleX = 2;
    pSystem.minLifeTime = 0.2;
    pSystem.maxLifeTime = 0.5;
    pSystem.emitRate = 10;
    pSystem.direction1 = new BABYLON.Vector3(0, 5, 0);
    pSystem.direction2 = new BABYLON.Vector3(0, 5, 0);
    pSystem.minAngularSpeed = 0;
    pSystem.maxAngularSpeed = 0;
    pSystem.minEmitPower = 0;
    pSystem.maxEmitPower = 0;
    pSystem.updateSpeed = 0.1;
    pSystem.gravity = new BABYLON.Vector3(0, 0, 0);
    let alpha = water.position.z;
    this.player.scene.registerBeforeRender(() => {
      if (!isCollision) {
        if (water.intersectsMesh(this.player.opponent.playerMesh, false)) {
          isCollision = true;
          this.player.opponent.hurt(this.damage / this.numberOfIce);
          pSystem.stop();
          water.dispose();
        } else {
          pSystem.emitter.position = new BABYLON.Vector3(x, y, alpha);
          alpha -= direction * 0.3;
        }
      }
    });
    pSystem.start();
  }

  static play(player, effects) {
    let move = new HealingWater(player, effects);
    move.playMove();
  }
}
