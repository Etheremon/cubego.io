import React from "react"
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getTranslate} from "react-localize-redux";
import { ButtonNew } from '../Button/Button.jsx';
import * as Utils from "../../../utils/utils";
import {IsEqual} from "../../../utils/objUtils";

require("style-loader!./SliderBar.scss");


class _SlideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value ? this.props.value : props.defaultValue,
      dragging: false,
      pos: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onBarClick = this.onBarClick.bind(this);
    this.processProps = this.processProps.bind(this);
  }

  componentDidMount() {
    this.processProps(this.props);
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps) {
    if (!IsEqual(this.props, nextProps)) {
      this.processProps(nextProps);
    }
  }

  processProps(props) {
    let value = props.value;
    if (value === null || value === undefined) return;

    let bar = this.refs['bar'], pointer = this.refs['pt'];
    let boundLeft = bar.offsetLeft + pointer.offsetWidth/2, boundRight = bar.offsetLeft + bar.offsetWidth - pointer.offsetWidth/2;
    let pos = boundLeft + (value - props.valMin) * (boundRight - boundLeft) / (props.valMax - props.valMin);

    this.setState({pos: (pos-bar.offsetLeft) / bar.offsetWidth, value: value});
  }

  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  }

  onChange(value) {
    this.setState({value: parseFloat(value)});
    this.props.onChange && this.props.onChange(parseFloat(value));
  }

  onMouseDown() {
    this.setState({dragging: true});
  }

  onMouseUp(e) {
    this.setState({dragging: false});
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseMove(e) {
    let bar = this.refs['bar'], pointer = this.refs['pt'];

    let boundLeft = bar.offsetLeft + pointer.offsetWidth/2, boundRight = bar.offsetLeft + bar.offsetWidth - pointer.offsetWidth/2;
    let pos = Utils.BoundVal(e.pageX, boundLeft, boundRight);

    let leftPos = (pos-bar.offsetLeft) / bar.offsetWidth;

    let val = this.props.valMin + (pos - boundLeft) * (this.props.valMax - this.props.valMin) / (boundRight - boundLeft);
    let correctVal = Math.round(val);

    if (correctVal !== this.state.value)
      this.props.onChange && this.props.onChange(correctVal);
    this.setState({pos: leftPos, value: correctVal});
  };

  onBarClick(e) {
    this.onMouseMove(e);
  }

  render() {
    let {className, label, value, valStep, valMax, valMin, text} = this.props;
    let currentVal = value !== undefined && value !== null ? value : this.state.value;

    let btnLabel = text ? text : `${Math.abs(currentVal-valMin)+1}/${Math.abs(valMax-valMin)+1}`;

    return (
      <div className={`widget__slider-bar ${className}`}>
        <div className={'main-bar'}>
          <div className={'arrow-left'}>
            <img src={require('../../../shared/img/icons/icon_left_arrow.png')}
                 onClick={() => {this.props.onChange(currentVal-valStep)}}/>
          </div>
          <div className={'bar'} ref={'bar'} onClick={this.onBarClick}>
            <ButtonNew label={btnLabel} className={'placeholder'} disabled size={ButtonNew.sizes.NORMAL}/>
            <div className={'label'}>{label}</div>
            <div className={'pointer'} style={{left: `${this.state.pos*100}%`}} ref={'pt'}>
              <ButtonNew onMouseDown={this.onMouseDown} size={ButtonNew.sizes.NORMAL} label={btnLabel}/>
            </div>
          </div>
          <div className={'arrow-right'}>
            <img src={require('../../../shared/img/icons/icon_right_arrow.png')}
                 onClick={() => {this.props.onChange(currentVal+valStep)}}/>
          </div>
        </div>

      </div>
    );
  }
}

_SlideBar.defaultProps = {
  className: '',
  label: null,
  valMin: 1,
  valMax: 100,
  valStep: 1,
  defaultValue: 0,
};

_SlideBar.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
  text: PropTypes.string,
};

const mapStateToProps = (store) => ({
  _t: getTranslate(store.localeReducer),
});

const mapDispatchToProps = (dispatch) => ({});

export const SlideBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_SlideBar);