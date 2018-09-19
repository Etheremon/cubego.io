import React, {Component} from 'react';
import './Battle.scss';
import BabylonX from "../../babylonX";
import VoxBattle from "../../3d/VoxBattle.jsx";

export class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      battle: {}
    }
  }

  componentDidMount() {
    this.loadModel();
    this.voxel = BabylonX.render(<VoxBattle battle={this.state.battle}/>, document.getElementById('battle'));
  }

  loadModel() {
    let parser = new window.vox.Parser();

    let model2Parser = parser.parse(require('../../data/2.vox'));
    let model1Parser = parser.parse(require('../../data/3.vox'));
    Promise.all([model1Parser, model2Parser]).then((data) => {
      this.voxel.setPlayer(data);
    });
  }

  render() {
    return (
      <div>
        <canvas id='battle' width="640" height="480"/>
      </div>
    );
  }
}

