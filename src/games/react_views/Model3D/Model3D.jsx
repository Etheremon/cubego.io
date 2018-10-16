import React, {Component} from 'react';
import './Model3D.scss';
import PropTypes from "prop-types";
import {IsEqual} from "../../../utils/objUtils";
import ThreeX from "../../threeX";
import VoxViewerThree from "../../3d/VoxViewerThree.jsx";

require("style-loader!./Model3D.scss");


export class Model3D extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.voxel = ThreeX.render(
      <VoxViewerThree data={this.props.model} onCellClicked={this.props.onCellClicked} tools={this.props.tools}
                      viewOnly={this.props.viewOnly}/>,
      document.getElementById('canvas3D'),
    );
  }

  componentWillUnmount() {
    ThreeX.stopRender();
  }

  componentWillReceiveProps(nextProps) {
    if (!IsEqual(this.props.model, nextProps.model)) {
      this.voxel.setNewVoxelData(nextProps.model);
    }
    if (!IsEqual(this.props.tools, nextProps.tools)) {
      this.voxel.setNewTools(nextProps.tools);
    }
  }

  getBase64Image() {
    return this.refs['canvas'].toDataURL()
  }

  render() {
    return (
      <div className={'model3D'}>
        <canvas id='canvas3D' ref={'canvas'} width="600" height="600"/>
      </div>
    );
  }
}

Model3D.propTypes = {
  viewOnly: PropTypes.bool,
  model: PropTypes.object,
  tools: PropTypes.object,
  onCellClicked: PropTypes.func,
};

Model3D.defaultProps = {
  viewOnly: false,
  model: null,
  tools: {},
  onCellClicked: () => {
  },
};
