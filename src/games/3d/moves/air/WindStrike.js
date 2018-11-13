import {BaseMove} from "../BaseMove";
import * as BABYLON from "babylonjs";
import BabylonX from "../../../babylonX";

export default class WindStrike extends BaseMove {
  static getId() {
    return "wind_strike"
  }

  constructor(player, {damage}) {
    super(player);
  }

  playMove() {
    this.player.playSkeletonAnimation('attack_normal', false, 1);
    setTimeout(() => {
      this._createWindParticle();
    }, 150);
  }

  _createWindParticle() {
    let matrix = this.player.playerMesh.getWorldMatrix();
    let emitter = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), matrix);
    emitter.z = 1.5;
    let pSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);
    pSystem.emitter = emitter;

    let startMatrix = this.player.playerMesh.getWorldMatrix();
    let startPosition = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), startMatrix);
    let targetMatrix = this.player.opponent.playerMesh.getWorldMatrix();
    let targetPosition = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), targetMatrix);
    let direction = 1;
    if (targetPosition.z > startPosition.z) {
      direction = -1;
    }
    pSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    pSystem.particleTexture = BabylonX.loaders.get('particle_twirl_02').clone();
    pSystem.isBillboardBased = false;
    pSystem.textureMask = new BABYLON.Color4(1.0, 1.0, 1.0, 1.0);

    pSystem.color1 = new BABYLON.Color4(1, 1, 1.0, 0.7);
    pSystem.color2 = new BABYLON.Color4(1, 1, 1.0, 0.0);
    pSystem.colorDead = new BABYLON.Color4(1, 1, 1, 0.0);

    pSystem.minLifeTime = 0.1;
    pSystem.maxLifeTime = 0.1;

    pSystem.minSize = 0.1;
    pSystem.maxSize = 1.0;

    pSystem.minScaleX = 0.1;
    pSystem.maxScaleX = 1.2;
    pSystem.minScaleY = 0.1;
    pSystem.maxScaleY = 1.2;

    pSystem.addSizeGradient(1, 2);

    pSystem.minAngularSpeed = 1;
    pSystem.maxAngularSpeed = 2;

    pSystem.minInitialRotation = 0;
    pSystem.maxInitialRotation = Math.PI * 2;

    pSystem.minEmitPower = 2;
    pSystem.maxEmitPower = 5;
    pSystem.updateSpeed = 0.004;

    pSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0);
    pSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0);

    pSystem.emitRate = 500;

    pSystem.createPointEmitter(new BABYLON.Vector3(0, 8, -0.1), new BABYLON.Vector3(0, 8, 0.1));
    let alpha = emitter.z;

    this.player.scene.registerBeforeRender(() => {
      pSystem.emitter = new BABYLON.Vector3(0, 0, alpha);
      alpha -= direction * 0.01;
    });

    pSystem.start();
  }

  static play(player, effects) {
    let move = new WindStrike(player, effects);
    move.playMove();
  }
}
