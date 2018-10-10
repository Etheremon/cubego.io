import * as BABYLON from 'babylonjs';
import {BabylonComponent} from "./babylonComponent";
import {fullColorHex} from "../../utils";
import React from "react";
import {BabylonMeshBox} from "./babylonMeshBox";
import {hexToColor3} from "../utils";
import {BabylonMeshContainer} from "./babylonMeshContainer";

const HURT_COLOR = BABYLON.Color3.White();

export class BabylonVoxelPlayer extends BabylonComponent {
  constructor() {
    super();
    this.healthPercent = 100;
    this.collisionMesh = null;
    this.isCollision = false;
  }

  static create({scene}, props) {
    let voxelPlayer = new BabylonVoxelPlayer();
    let containerMesh = BabylonMeshContainer.create({scene}, {
      name: props.name || 'voxelPlayer',
      position: {x: 0, y: 0, z: 0}
    });
    if (props.rotate === -1)
      containerMesh.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.WORLD);

    voxelPlayer.renderer = containerMesh;
    voxelPlayer.scene = scene;
    voxelPlayer.createPlayerMesh(props.size, props.data, props.rotate);
    voxelPlayer.createFakeShadow();
    voxelPlayer.createHealthBar();
    scene.registerBeforeRender(() => {
      voxelPlayer.renderer.position.z = voxelPlayer.playerMesh.position.z;
      voxelPlayer.playerMesh.position.z = 0;
      voxelPlayer.sps.setParticles();
    });
    voxelPlayer.registerBeforeRender();
    return voxelPlayer;
  }

  set parent(parent) {
    this._parent = parent;
    this.renderer.parent = parent;
  }

  registerBeforeRender() {
    this.scene.registerBeforeRender(() => {
      if (!this.collisionMesh) return;
      if (this.playerMesh.intersectsMesh(this.collisionMesh, true)) {
        if (!this.isCollision) {
          this.isCollision = true;
        }
      } else {
        this.isCollision = false;
      }
    });
  }

  hurt(percent) {
    this.healthPercent -= percent;
    if (this.healthPercent < 0) {
      this.healthPercent = 0;
    }
    this.updateHealthBar();
  }

  createPlayerMesh(size, data, rotate) {
    let elements = [];
    let spsVoxel = new BABYLON.SolidParticleSystem('playerMesh', this.scene, {isPickable: true});
    data.voxels.forEach((voxel) => {
      let meshBox = BabylonMeshBox.create({scene: this.scene}, {size: size * 1, position: {x: 0, y: 0, z: 0}});
      spsVoxel.addShape(meshBox, 1);
      elements.push(meshBox);
    });
    spsVoxel.initParticles = function () {
      elements.forEach((element, idx) => {
        let voxel = data.voxels[idx];
        let position = {
          x: -size * data.size.y / 2 + size * voxel.y,
          y: size * voxel.z,
          z: size * data.size.x / 2 - size * voxel.x
        };
        let color = hexToColor3(fullColorHex(data.palette[voxel.colorIndex]));
        this.particles[idx].position = position;
        this.particles[idx].color = color;
        this.particles[idx].originalColor = color;
      });
    };
    let playerMesh = spsVoxel.buildMesh();
    spsVoxel.computeBoundingBox = true;
    elements.forEach((element) => {
      element.dispose();
    });
    spsVoxel.updateParticle = (p) => {
      if (this.isCollision && !this.isAttacking) {
        p.color = HURT_COLOR;
      } else {
        p.color = p.originalColor;
      }
    };
    spsVoxel.initParticles();
    spsVoxel.setParticles();
    this.sps = spsVoxel;
    let pivotAt = new BABYLON.Vector3(0, -1.8, 0);
    let translation = playerMesh.position.subtract(pivotAt);
    playerMesh.setPivotMatrix(BABYLON.Matrix.Translation(translation.x, translation.y, translation.z));
    playerMesh.parent = this.renderer;
    this.playerMesh = playerMesh;
  }

  createFakeShadow() {
    let greenMat = new BABYLON.StandardMaterial("greenMat", scene);
    greenMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
    greenMat.alpha = 0.3;
    let fakeShadow = BABYLON.MeshBuilder.CreateGround("fakeShadow", {width: 2, height: 2}, scene);
    fakeShadow.position.y = -0.01;
    fakeShadow.material = greenMat;
    fakeShadow.parent = this.renderer;
    this.shadow = fakeShadow;
  }

  createHealthBar() {
    let greenMat = new BABYLON.StandardMaterial("greenMat", scene);
    greenMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
    greenMat.alpha = 0.5;
    let healthMat = new BABYLON.StandardMaterial("redMat", scene);
    healthMat.diffuseColor = new BABYLON.Color3(1, 0, 0);

    this.healthBarBg = BABYLON.MeshBuilder.CreatePlane('healthBar', {width: 5, height: 0.3}, scene);
    this.healthBarBg.position.y = 5;
    this.healthBarBg.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
    this.healthBarBg.material = greenMat;
    this.healthBarBg.parent = this.renderer;

    this.healthBar = BABYLON.MeshBuilder.CreatePlane('healthBar', {width: 5, height: 0.3}, scene);
    this.healthBar.position.z = -0.01;
    this.healthBar.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
    this.healthBar.material = healthMat;
    this.healthBar.parent = this.healthBarBg;
    this.updateHealthBar();
  }

  updateHealthBar() {
    this.healthBar.scaling.x = this.healthPercent / 100;
    this.healthBar.position.x = (100 - this.healthPercent) / 100 * -2.5;
  }

  playAnimation(animations, loop, scaleSpeed) {
    let listAnimation = [];
    console.log(this.playerMesh);
    this.renderer.animations.forEach((animation) => {
      if (animations.indexOf(animation.name) > -1) {
        listAnimation.push(animation);
      }
      let animation1 = this.scene.beginDirectAnimation(this.playerMesh, listAnimation, 0, 100, loop, scaleSpeed);
      animation1.waitAsync().then(() => {
        console.log('okay');
      })
    });
  }

  createShieldParticle() {
    // Emitter object
    let emitter = this.renderer;

    // Create a particle system
    let particleSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("assets/particle/circle_01.png", this.scene);

    // Where the particles come from
    particleSystem.emitter = emitter; // the starting object, the emitter
    let emitterType = new BABYLON.SphereParticleEmitter();
    emitterType.radius = 4;
    emitterType.radiusRange = 0;
    particleSystem.particleEmitterType = emitterType;

    // Colors of all particles
    // particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    // particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    // particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle (random between...
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.5;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 50.0;
    particleSystem.maxLifeTime = 50.0;

    // Emission rate
    particleSystem.emitRate = 1500;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 0;
    particleSystem.maxEmitPower = 0;
    particleSystem.updateSpeed = 0.005;

    // No billboard
    particleSystem.isBillboardBased = false;

    // Start the particle system
    particleSystem.start();
    setTimeout(() => {
      particleSystem.dispose();
    }, 6000);
  }

  createFireParticle() {
    let pSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);
    pSystem.emitter = BABYLON.Mesh.CreateBox("emitter", 0.0001, this.scene);
    pSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    pSystem.light = new BABYLON.PointLight("Omni1", new BABYLON.Vector3(0, 0, 0), this.scene);
    pSystem.light.diffuse = new BABYLON.Color3(.8, 0, 0);
    pSystem.light.range = 15;

    pSystem.particleTexture = new BABYLON.Texture("assets/particle/circle_05.png", scene);
    pSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    pSystem.maxEmitBox = new BABYLON.Vector3(0, .2, 0);
    pSystem.color1 = new BABYLON.Color4(1.0, 0.05, 0.05, .9);
    pSystem.color2 = new BABYLON.Color4(0.85, 0.05, 0, .9);
    pSystem.colorDead = new BABYLON.Color4(.5, .02, 0, .5);
    pSystem.minSize = 1.75;
    pSystem.maxSize = 2.0;
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
    let alpha = 0;
    this.scene.registerBeforeRender(() => {
      pSystem.emitter.position = new BABYLON.Vector3(0, 5, alpha);
      for(let i2 = 0, max2 = pSystem.particles.length; i2 < max2; i2+=1){
        if(pSystem.particles[i2].age >= (pSystem.particles[i2].lifeTime*0.05)){
          pSystem.particles[i2].size -= 0.15;
        }
      }
      alpha -= 0.1;
    });
    pSystem.start();
  }
}