import * as BABYLON from 'babylonjs';
import {BabylonComponent} from "./babylonComponent";
import {fullColorHex} from "../../utils";
import React from "react";
import {BabylonMeshBox} from "./babylonMeshBox";
import {hexToColor3} from "../utils";

export class BabylonVoxel extends BabylonComponent {
  static create({scene}, props) {
    let voxelPlayer = new BabylonVoxel();
    let elements = [];
    let spsVoxel = new BABYLON.SolidParticleSystem(props.name || 'voxel', scene);
    let size = props.size;
    let data = props.data;
    data.voxels.forEach((voxel) => {
      let meshBox = BabylonMeshBox.create({scene}, {size: size * 0.98, position: {x: 0, y: 0, z: 0}});
      spsVoxel.addShape(meshBox, 1);
      elements.push(meshBox);
    });
    //SPS is temp solution, need to change to optimized mesh solution
    spsVoxel.initParticles = function () {
      elements.forEach((element, idx) => {
        let voxel = data.voxels[idx];
        let position = {
          x: -size * data.size.y / 2 + size * voxel.y,
          y: -size * data.size.z / 2 + size * voxel.z,
          z: (props.rotate || 1) * (size * data.size.x / 2 - size * voxel.x)
        };
        let color = hexToColor3(fullColorHex(data.palette[voxel.colorIndex]));
        this.particles[idx].position = position;
        this.particles[idx].color = color;
      });
    };
    let mesh = spsVoxel.buildMesh();
    elements.forEach((element) => {
      element.dispose();
    });
    spsVoxel.initParticles();
    spsVoxel.setParticles();
    let pivotAt = new BABYLON.Vector3(0, 5, 0);
    let translation = mesh.position.subtract(pivotAt);
    mesh.setPivotMatrix(BABYLON.Matrix.Translation(translation.x, translation.y, translation.z));
    let greenMat = new BABYLON.StandardMaterial("greenMat", scene);
    greenMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
    greenMat.alpha = 0.3;
    let fakeShadow = BABYLON.MeshBuilder.CreateGround("fakeShadow", {width: 2, height: 2}, scene);
    fakeShadow.position.y = -1.55;
    fakeShadow.material = greenMat;
    fakeShadow.parent = mesh;

    let healthMat = new BABYLON.StandardMaterial("redMat", scene);
    healthMat.diffuseColor = new BABYLON.Color3(1, 0, 0);

    this.healthBarBg = BABYLON.MeshBuilder.CreatePlane('healthBar', {width: 5, height: 0.3}, scene);
    this.healthBarBg.position.y = 3;
    // this.healthBarBg.setPivotMatrix(BABYLON.Matrix.Translation(2.5, 0, 0));
    this.healthBarBg.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
    this.healthBarBg.material = greenMat;
    this.healthBarBg.parent = mesh;

    this.healthPercent = 0.5;
    this.healthBar = BABYLON.MeshBuilder.CreatePlane('healthBar', {width: 5, height: 0.3}, scene);
    this.healthBar.position.z = -0.01;
    this.healthBar.scaling.x = this.healthPercent;//HP percent
    this.healthBar.position.x = (1 - this.healthPercent) * -2.5;
    // this.healthBar.setPivotMatrix(BABYLON.Matrix.Translation(2.5, 0, 0));

    this.healthBar.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
    this.healthBar.material = healthMat;
    this.healthBar.parent = this.healthBarBg;
    voxelPlayer.scene = scene;
    voxelPlayer.renderer = mesh;
    return voxelPlayer;
  }

  set parent(parent) {
    this._parent = parent;
    this.renderer.parent = parent;
  }

  set hurt(hp) {
    this.healthPercent.scaling.z = 0.6;
  }

  playAnimation(animations, loop, scaleSpeed) {
    let listAnimation = [];
    this.renderer.animations.forEach((animation) => {
      if (animations.indexOf(animation.name) > -1) {
        listAnimation.push(animation);
      }
      this.scene.beginDirectAnimation(this.renderer, listAnimation, 0, 100, loop, scaleSpeed);
    });
  }
}
