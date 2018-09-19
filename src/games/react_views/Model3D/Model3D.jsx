import React, {Component} from 'react';
import './Model3D.scss';
import BabylonX from "../../babylonX";
import VoxViewer from "../../3d/VoxViewer.jsx";
import PropTypes from "prop-types";
import {IsEqual} from "../../../utils/objUtils";

require("style-loader!./Model3D.scss");


export class Model3D extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.voxel = BabylonX.render(<VoxViewer data={this.props.model}/>, document.getElementById('canvas3D'));
  }

  componentWillReceiveProps(nextProps) {
    if (!IsEqual(this.props.model, nextProps.model)) {
      this.voxel.setNewVoxelData(nextProps.model);
    }
  }

  render() {
    return (
      <div className={'model3D'}>
        <canvas id='canvas3D' width="640" height="480"/>
      </div>
    );
  }
}

Model3D.propTypes = {
  model: PropTypes.object,
};

Model3D.defaultProps = {
  model: null,
};