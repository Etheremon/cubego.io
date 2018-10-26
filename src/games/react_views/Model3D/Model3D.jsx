import React, {Component} from 'react';
import './Model3D.scss';
import PropTypes from "prop-types";
import {IsEqual} from "../../../utils/objUtils";
import ThreeX from "../../threeX";
import VoxViewerThree from "../../3d/VoxViewerThree.jsx";
import * as LS from "../../../services/localStorageService";

require("style-loader!./Model3D.scss");


export class Model3D extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLayer: LS.GetItem(LS.Fields.showLayer) === true || LS.GetItem(LS.Fields.showLayer) === null,
    };

    this.toggleShowLayer = this.toggleShowLayer.bind(this);
  }

  componentDidMount() {
    this.voxel = ThreeX.render(
      <VoxViewerThree data={this.props.model} onCellClicked={this.props.onCellClicked} tools={this.props.tools}
                      viewOnly={this.props.viewOnly} showLayer={!!this.state.showLayer}/>,
      document.getElementById('canvas3D'),
    );
  }

  componentWillUnmount() {
    ThreeX.stopRender();
    this.voxel.destroy();
    this.voxel = null;
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

  toggleShowLayer() {
    LS.SetItem(LS.Fields.showLayer, !this.state.showLayer);
    this.voxel.toggleLayer(!this.state.showLayer);
    this.setState({showLayer: !this.state.showLayer});
  }

  render() {
    return (
      <div className={'model3D'}>
        {!this.props.viewOnly ?
          <div className={'model3D__buttons'}>
            <div className={`layer ${this.state.showLayer ? 'active' : ''}`}
                 onClick={this.toggleShowLayer}
                 tooltip={this.props._t(this.state.showLayer ? '3d.hide_layer' : '3d.show_layer')}
                 tooltip-position={'bottom'}
            />
          </div> : null
        }
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
