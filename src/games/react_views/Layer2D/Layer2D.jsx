import React, {Component} from 'react';
import './Layer2D.scss';
import PixiX from "../../pixix/index";
import PaintScene from "../../2d/PaintScene.jsx";
import PropTypes from "prop-types";
import {IsEqual} from "../../../utils/objUtils";

require("style-loader!./Layer2D.scss");

export class Layer2D extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.paint = PixiX.fiberRender(
      <PaintScene layer={this.props.layer} onCellClicked={this.props.onCellClicked}/>,
      document.getElementById('canvas2D'),
      {
        transparent: true,
        width: 1120,
        height: 800,
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!IsEqual(this.props.layer, nextProps.layer)) {
      this.paint.updateLayer(nextProps.layer)
    }
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
