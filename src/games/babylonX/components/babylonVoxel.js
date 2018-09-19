import * as BABYLON from 'babylonjs';
import {BabylonComponent} from "./babylonComponent";
import {fullColorHex} from "../../utils";
import {MeshBox} from "../index";
import React from "react";
import {BabylonMeshBox} from "./babylonMeshBox";
import {hexToColor3} from "../utils";

export class BabylonVoxel extends BabylonComponent {
  static create({scene}, props) {
    let elements = [];
    let spsVoxel = new BABYLON.SolidParticleSystem(props.name || 'voxel', scene);
    let size = props.size;
    let data = props.data;
    data.voxels.forEach((voxel) => {
      let meshBox = BabylonMeshBox.create({scene}, {size: size || 1, position: {x: 0, y: 0, z: 0}});
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
    let pivotAt = new BABYLON.Vector3(1, -1.5, 1);
    let translation = mesh.position.subtract(pivotAt);
    mesh.setPivotMatrix(BABYLON.Matrix.Translation(translation.x, translation.y, translation.z));
    return mesh;
  }
}
