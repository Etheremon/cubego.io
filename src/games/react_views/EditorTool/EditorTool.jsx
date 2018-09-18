import React, {Component} from 'react';
import './EditorTool.scss';
import BabylonX from "../../babylonX";
import PixiX from "../../pixix/index";
import PaintScene from "../../2d/PaintScene.jsx";
import VoxViewer from "../../3d/VoxViewer.jsx";

export class EditorTool extends Component {

  constructor(props) {
    super(props);
    this.changeFrame = this.changeFrame.bind(this);
    this.state = {
      voxelData: {}
    }
  }

  changeFrame(frame) {
    this.frame = frame;
    this.voxel.setNewVoxelData(frame);
  }

  componentDidMount() {
    this.voxel = BabylonX.render(<VoxViewer data={this.state.voxelData}/>, document.getElementById('canvas3D'));
    this.paint = PixiX.fiberRender(<PaintScene data={this.state.voxelData} changeFrame={this.changeFrame}/>, document.getElementById('canvas2D'));
  }

  loadModel() {
    let parser = new window.vox.Parser();
    parser.parse(require('../../data/3.vox')).then((voxelData) => {
      this.voxel.setNewVoxelData(voxelData);
      this.paint.setNewVoxelData(voxelData);
    });
  }

  render() {
    return (
      <div>
        <button onClick={()=>{this.loadModel()}}> Select model 1</button>
        <canvas id='canvas3D' width="640" height="480"/>
        <canvas id='canvas2D' width="640" height="480"/>
      </div>
    );
  }
}

