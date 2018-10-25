import React, {Component} from 'react';
import BabylonX from "../../babylonX";
import VoxBattle from "../../3d/VoxBattle.jsx";

require("style-loader!./Battle.scss");


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

  componentWillUnmount() {
    BabylonX.stopRender();
    this.voxel.destroy();
    this.voxel = null;
  }

  loadModel() {
    let parser = new window.vox.Parser();

    let model2Parser = parser.parse(require('../../../shared/sample_models/dog.vox'));
    let model1Parser = parser.parse(require('../../../shared/sample_models/3.vox'));
    Promise.all([model1Parser, model2Parser]).then((data) => {
      this.voxel.setPlayer(data);
    });
  }

  render() {
    return (
      <div className={'battle-3d-view'}
           onWheel={(e) => {
             e.preventDefault();
           }}>
        <canvas id='battle' width="960" height="540"/>
      </div>
    );
  }
}

