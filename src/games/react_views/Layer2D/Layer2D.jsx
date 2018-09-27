import React, {Component} from 'react';
import './Layer2D.scss';
import PropTypes from "prop-types";
import {CloneDeep, IsEqual} from "../../../utils/objUtils";
import * as Utils from "../../../utils/utils";
import * as ColorUtils from "../../../utils/colorUtils";

require("style-loader!./Layer2D.scss");

export class Layer2D extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.renderLayer = this.renderLayer.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onCellClicked = this.onCellClicked.bind(this);
    this.processProps = this.processProps.bind(this);

    this.clickedCells = [];
  }

  componentDidMount() {
    window.addEventListener("mousedown", this.onMouseDown);
    window.addEventListener("mouseup", this.onMouseUp);

    this.processProps(this.props);
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", this.onMouseDown);
    window.removeEventListener("mouseup", this.onMouseUp);
  }

  onMouseDown() {
    this.isMouseDown = true;
  }

  onMouseUp() {
    this.isMouseDown = false;
    if (this.clickedCells.length) {
      this.props.onCellClicked && this.props.onCellClicked(this.clickedCells);
    }
    this.clickedCells = [];
  }

  onCellClicked(layer, rowIdx, colIdx) {
    this.state.cells[rowIdx][colIdx].color = this.state.hoverColor;
    this.setState({cells: this.state.cells});

    let correctPos = layer.cal2dPos ? layer.cal2dPos(colIdx, rowIdx) : {x: colIdx, y: rowIdx};
    this.clickedCells.push({
      [layer.x]: correctPos.x,
      [layer.y]: correctPos.y,
      [layer.z]: layer.idx,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!IsEqual(this.props.layer, nextProps.layer) || !IsEqual(this.props.tools, nextProps.tools)) {
      this.processProps(nextProps);
    }
  }

  processProps(props) {
    let {layer, tools} = props;
    if (layer) {
      let newState = {
        hoverColor: null,
        cells: null,
      };

      newState.cells = [];
      for (let i = 0; i < layer.size[layer.y]; i++) {
        newState.cells[i] = [];
        for (let j = 0; j < layer.size[layer.x]; j++) newState.cells[i][j] = {};
      }
      Utils.ObjGetValues(layer.voxels).forEach(cell => {
        let correctPos = layer.cal2dPos
          ? layer.cal2dPos(cell[layer.x], cell[layer.y])
          : {x: cell[layer.x], y: cell[layer.y]};
        newState.cells[correctPos.y][correctPos.x] = CloneDeep(cell);
      });

      if (tools && tools.color && tools.draw.value)
        newState.hoverColor = ColorUtils.RgbToHex(tools.color.value);

      this.setState(newState);
    }
  }

  renderLayer() {
    let {layer} = this.props;
    let {cells, hoverColor} = this.state;
    let content;
    if (!layer || Utils.ObjIsEmpty(layer)) {
      content = null;
    } else {
      content = (
        <div className={'layer2D__board'}>
          {cells.map((row, rowIdx) => (
            <div className={'layer2D__row'} key={rowIdx}>
              {row.map((cell, colIdx) => {
                let c = ColorUtils.RgbToHex(cell.color);

                return (
                  <div className={'layer2D__cell'} key={colIdx}
                       onMouseEnter={() => {if (this.isMouseDown) this.onCellClicked(layer, rowIdx, colIdx)}}
                       onMouseDown={() => {this.onCellClicked(layer, rowIdx, colIdx)}}>

                    <div className={'layer2D__cell-real'}
                         style={c ? {backgroundColor: `#${c.hex}`, opacity: c.opacity} : {}}>
                    </div>
                    <div className={'layer2D__cell-hover'}
                         style={hoverColor ? {backgroundColor: `#${hoverColor.hex}`, opacity: hoverColor.opacity} : {}}>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      );
    }


    return (
      <div className={'layer2D__main'}>
        {content}
      </div>
    );
  }

  render() {
    return (
      <div className={'layer2D'}>
        {/*<canvas id='canvas2D' width="640" height="480"/>*/}
        {this.renderLayer()}
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
