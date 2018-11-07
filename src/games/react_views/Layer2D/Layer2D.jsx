import React, {Component} from 'react';
import './Layer2D.scss';
import PropTypes from "prop-types";
import {CloneDeep, IsEqual, GetValues} from "../../../utils/objUtils";
import * as Utils from "../../../utils/utils";
import {ObjIsEmpty} from "../../../utils/utils";

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
    window.addEventListener("mouseup", this.onMouseUp);

    this.processProps(this.props);
  }

  componentWillUnmount() {
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
    
    if (this.state.hoverColor !== undefined) {
      this.state.cells[rowIdx][colIdx].color = this.state.hoverColor;
      this.setState({cells: this.state.cells});

      let originPos = layer.calOriginPos ? layer.calOriginPos(colIdx, rowIdx) : {x: colIdx, y: rowIdx};
      this.clickedCells.push({
        [layer.x]: originPos.x,
        [layer.y]: originPos.y,
        [layer.z]: layer.idx,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!IsEqual(this.props.layer, nextProps.layer) || !IsEqual(this.props.tools, nextProps.tools)) {
      this.processProps(nextProps);
    }
  }

  processProps(props) {
    let {layer, tools} = props;
    if (layer && !ObjIsEmpty(layer)) {
      let newState = {
        hoverColor: undefined,
        cells: null,
      };

      newState.cells = [];
      for (let i = 0; i < layer.spaceSize[layer.y][1]-layer.spaceSize[layer.y][0]+1; i++) {
        newState.cells[i] = [];
        for (let j = 0; j < layer.spaceSize[layer.x][1]-layer.spaceSize[layer.x][0]+1; j++)
          newState.cells[i][j] = {};
      }

      GetValues(layer.voxels).forEach(cell => {
        let pos2D = layer.cal2dPos
          ? layer.cal2dPos(cell[layer.x], cell[layer.y])
          : {x: cell[layer.x], y: cell[layer.y]};
        newState.cells[pos2D.y][pos2D.x] = CloneDeep(cell);
      });

      if (tools && tools.color && (tools.draw.value || tools.paint.value))
        newState.hoverColor = tools.color.value;
      else if (tools && tools.erase.value)
        newState.hoverColor = null;
      else if (tools && tools.pickColor.value)
        newState.hoverColor = -1;

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
                let c = cell ? cell.color : null;

                let cellStyle = {}, hoverStyle = {};
                if (c && c.img)
                  cellStyle = {backgroundImage: `url(${c.img})`, opacity: c.opacity || 1};
                else if (c && c.color)
                  cellStyle = {backgroundColor: `${c.color}`, opacity: c.opacity || 1};

                if (hoverColor && hoverColor.img)
                  hoverStyle = {backgroundImage: `url(${hoverColor.img})`, opacity : hoverColor.opacity || 1};
                else if (hoverColor && hoverColor.color)
                  hoverStyle = {backgroundColor: `${hoverColor.color}`, opacity: hoverColor.opacity || 1};
                else if (hoverColor === null)
                  hoverStyle = {};
                else if (hoverColor === -1)
                  hoverStyle = {...cellStyle, opacity: 0.9};
                else 
                  hoverStyle = cellStyle;

                return (
                  <div className={'layer2D__cell'} key={colIdx}
                       onMouseEnter={() => {
                         if (this.isMouseDown) this.onCellClicked(layer, rowIdx, colIdx);
                       }}
                       onMouseDown={() => {
                         this.onMouseDown();
                         this.onCellClicked(layer, rowIdx, colIdx);
                       }}>

                    <div className={'layer2D__cell-real'} style={cellStyle}/>
                    <div className={'layer2D__cell-hover'} style={hoverStyle}/>
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
      <div className={'layer2D'} style={this.props.style}>
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
