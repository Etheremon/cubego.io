import React, {Component} from 'react';
import './Layer2D.scss';
import BabylonX from "../../babylonX";
import PixiX from "../../pixix/index";
import PaintScene from "../../2d/PaintScene.jsx";
import VoxViewer from "../../3d/VoxViewer.jsx";
import PropTypes from "prop-types";
import {IsEqual} from "../../../utils/objUtils";

require("style-loader!./Layer2D.scss");

export class Layer2D extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.onFrameChange = this.onFrameChange.bind(this);
  }

  componentDidMount() {
    // this.paint = PixiX.fiberRender(<PaintScene data={this.props.layer} changeFrame={this.onFrameChange}/>,
    //   document.getElementById('canvas2D'));
  }

  componentWillReceiveProps(nextProps) {
    if (!IsEqual(this.props.layer, nextProps.layer)) {
      // this.paint.doSomeUpdates(nextProps.layer)
    }
  }

  onFrameChange(data) {
    this.props.onFrameChange && this.props.onFrameChange(data);
  }

  render() {
    return (
      <div className={'layer2D'}>
        <canvas id='canvas2D' width="640" height="480"/>
      </div>
    );
  }
}

Layer2D.propTypes = {
  layer: PropTypes.object,
  tools: PropTypes.object,
  onCellClicked: PropTypes.func,
};

Layer2D.defaultProps = {
  layer: null,
  tools: {},
  onCellClicked: () => {},
};
