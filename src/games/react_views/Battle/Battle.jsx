import React, {Component} from 'react';
import BabylonX from "../../babylonX";
import VoxBattle from "../../3d/VoxBattle.jsx";

require("style-loader!./Battle.scss");


export class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      battle: {},
      webglError: false
    }
  }

  componentDidMount() {
    this.voxel = BabylonX.render(<VoxBattle battle={this.state.battle}/>, document.getElementById('battle'));
    if(this.voxel) {
      this.loadModel();
    } else {
      this.setState({webglError: true});
    }
  }

  componentWillUnmount() {
    if(this.voxel) {
      BabylonX.stopRender();
      this.voxel.destroy();
      this.voxel = null;
    }
  }

  loadModel() {
    let parser = new window.vox.Parser();

    let model2Parser = parser.parse(require('../../../shared/sample_models/cat.vox'));
    let model1Parser = parser.parse(require('../../../shared/sample_models/momotaro.vox'));
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
        {this.state.webglError ? <div className={'webgl-error'}>
          WebGL not supported by your browser <a href="https://get.webgl.org">More information</a>
        </div> : null}

        <canvas id='battle' width="960" height="540"/>
      </div>
    );
  }
}

