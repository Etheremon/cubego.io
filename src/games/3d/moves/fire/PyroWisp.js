import {BaseMove} from "../BaseMove";
import * as BABYLON from "babylonjs";
import BabylonX from "../../../babylonX";

export default class PyroWisp extends BaseMove {
  constructor(player, {damage}) {
    super(player);
    this.speed = 0.01;
    this.numberOfFireball = 4;
    this.damage = damage;
  }

  playMove() {
    this.player.playSkeletonAnimation('attack_normal', false, 1);
    setTimeout(() => {
      for (let i = 0; i < this.numberOfFireball; i++) {
        setTimeout(() => {
          this._createFireBallParticle();
        }, i * 100);
      }
    }, 150);
  }

  _createFireBallParticle() {
    let matrix = this.player.playerMesh.getWorldMatrix();
    let matrixOpponent = this.player.opponent.playerMesh.getWorldMatrix();
    let start = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), matrix);
    start.y = 2;
    let end = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), matrixOpponent);
    end.y = 2;
    let controlPoint1 = 4 + Math.random() * 4;
    let controlPoint2 = 4 + Math.random() * 4;
    let cubicBezierVectors = BABYLON.Curve3.CreateCubicBezier(
      start,
      new BABYLON.Vector3(0, controlPoint1, 0),
      new BABYLON.Vector3(0, controlPoint1, 0),
      end,
      60
    );
    let points = cubicBezierVectors.getPoints();
    let path3d = new BABYLON.Path3D(points);
    // this.showPath(path3d, 0.5);
    let emitter = this._createParticle();
    let curve = path3d.getCurve();
    let i = 0;
    this.player.scene.registerBeforeRender(() => {
      emitter.position.y = curve[i].y;
      emitter.position.z = curve[i].z;
      i++;
      i = (i + 1) % (curve.length - 1);
    });
  }

  showPath(path3d, size) {
    size = size || 0.5;
    let curve = path3d.getCurve();
    let tgts = path3d.getTangents();
    let norms = path3d.getNormals();
    let binorms = path3d.getBinormals();
    let vcTgt, vcNorm, vcBinorm;
    let line = BABYLON.Mesh.CreateLines("curve", curve, this.scene);
    // for (var i = 0; i < curve.length; i++) {
    //   vcTgt = BABYLON.Mesh.CreateLines("tgt" + i, [curve[i], curve[i].add(tgts[i].scale(size))], scene);
    //   vcNorm = BABYLON.Mesh.CreateLines("norm" + i, [curve[i], curve[i].add(norms[i].scale(size))], scene);
    //   vcBinorm = BABYLON.Mesh.CreateLines("binorm" + i, [curve[i], curve[i].add(binorms[i].scale(size))], scene);
    //   vcTgt.color = BABYLON.Color3.Red();
    //   vcNorm.color = BABYLON.Color3.Green();
    //   vcBinorm.color = BABYLON.Color3.Blue();
    // }
  };

  _createParticle() {
    let fireBall = BABYLON.Mesh.CreateBox("fist", 0.4, this.scene);
    let matrix = this.player.playerMesh.getWorldMatrix();
    let isCollision = false;
    fireBall.position = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), matrix);
    let pSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);
    pSystem.emitter = fireBall;
    pSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    // pSystem.light = new BABYLON.PointLight("Omni1", new BABYLON.Vector3(0, 0, 0), this.scene);
    // pSystem.light.diffuse = new BABYLON.Color3(.8, 0, 0);
    // pSystem.light.range = 15;

    // pSystem.particleTexture = new BABYLON.Texture(require("../../../../shared/particles/textures/flare.png"), this.scene);
    pSystem.particleTexture = BabylonX.loaders.get('particle_flare').clone();

    pSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    pSystem.maxEmitBox = new BABYLON.Vector3(0, 0, 0);
    pSystem.color1 = new BABYLON.Color4(1.0, 0.05, 0.05, .9);
    pSystem.color2 = new BABYLON.Color4(0.85, 0.05, 0, .9);
    pSystem.colorDead = new BABYLON.Color4(.5, .02, 0, .5);
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
    let alpha = fireBall.position.z;
    this.player.scene.registerBeforeRender(() => {
      if (!isCollision) {
        if (fireBall.intersectsMesh(this.player.opponent.playerMesh, false)) {
          isCollision = true;
          this.player.opponent.hurt(this.damage / this.numberOfFireball);
          pSystem.stop();
          fireBall.dispose();
        } else {
          // pSystem.emitter.position = new BABYLON.Vector3(0, 1, alpha);
          for (let i2 = 0, max2 = pSystem.particles.length; i2 < max2; i2 += 1) {
            if (pSystem.particles[i2].age >= (pSystem.particles[i2].lifeTime * 0.05)) {
              pSystem.particles[i2].size -= 0.1;
            }
          }
          alpha -= 0.2;
        }
      }
    });
    pSystem.start();
    return fireBall;
  }

  static play(player, effects) {
    let move = new PyroWisp(player, effects);
    move.playMove();
  }
}
