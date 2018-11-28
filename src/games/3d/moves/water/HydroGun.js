import {BaseMove} from "../BaseMove";
import * as BABYLON from "babylonjs";
import {GetRandomInt} from "../../../../utils/utils";
import {hexToColor3} from "../../../babylonX/utils";
import BabylonX from "../../../babylonX";

export default class HydroGun extends BaseMove {
  static getId() {
    return "hydro_gun"
  }

  constructor(player, {damage}) {
    super(player);
    this.speed = 0.01;
    this.damage = damage;
  }

  playMove() {
    this.player.playSkeletonAnimation('attack_normal', false, 1);
    setTimeout(() => {
      this._createWaterParticle();
    }, 150);
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
    const update = () => {
      if (!isCollision) {
        if (this.player.opponent.checkCollision(water)) {
          isCollision = true;
          this.player.opponent.hurt(this.damage);
          pSystem.stop();
          water.dispose();
          this.scene.onBeforeRenderObservable.remove(update);
        } else {
          pSystem.emitter.position = new BABYLON.Vector3(x, y, alpha);
          alpha -= direction * 0.3;
        }
      }
    };
    this.scene.onBeforeRenderObservable.add(update);

    pSystem.start();
  }

  static play(player, effects) {
    let move = new HydroGun(player, effects);
    move.playMove();
  }
}
