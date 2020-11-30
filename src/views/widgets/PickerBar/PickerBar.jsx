import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

require('style-loader!./PickerBar.scss');

class _PickerBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value !== null && this.props.value !== undefined ? this.props.value : props.defaultValue,
    };

    this.renderBar = this.renderBar.bind(this);
    this.onChange = this.onChange.bind(this);
    this.nextLayer = this.nextLayer.bind(this);
    this.prevLayer = this.prevLayer.bind(this);

    this.itemRefs = {};
  }

  onChange(val) {
    this.props.onChange && this.props.onChange(val);
    this.setState({ value: val });
  }

  nextLayer() {
    const { value, valStep } = this.props;
    const currentVal = value !== undefined && value !== null ? value : this.state.value;

    this.onChange(currentVal + valStep);
    const e = this.itemRefs[`picker-bar-item${currentVal + valStep}`];
    if (e) {
      e.parentNode.parentNode.scrollLeft = e.offsetLeft - e.parentNode.parentNode.offsetLeft
        - e.parentNode.parentNode.offsetWidth + e.offsetWidth;
    }
  }

  prevLayer() {
    const { value, valStep } = this.props;
    const currentVal = value !== undefined && value !== null ? value : this.state.value;

    this.onChange(currentVal - valStep);
    const e = this.itemRefs[`picker-bar-item${currentVal - valStep}`];
    if (e) e.parentNode.parentNode.scrollLeft = e.offsetLeft - e.parentNode.parentNode.offsetLeft;
  }

  renderBar() {
    const {
      valStep, valMin, valMax, value,
    } = this.props;
    if (valMin === null || valMax === null || valStep === null) return null;

    const currentVal = value !== undefined && value !== null ? value : this.state.value;

    const items = [];
    for (let i = valMin; i !== valMax + valStep; i += valStep) {
      items.push(
        <div
          className={`item ${i === currentVal ? 'active' : ''}`}
          key={i}
          onClick={() => { this.onChange(i); }}
          ref={(item) => { this.itemRefs[`picker-bar-item${i}`] = item; }}
        >
          <div className="text">
            {Math.abs(i - valMin) + 1}
          </div>
        </div>,
      );
    }

    return (
      <div className="widget__picker-bar-holder">
        {items}
      </div>
    );
  }

  render() {
    const { className } = this.props;

    return (
      <div className={`widget__picker-bar ${className}`}>
        <div className="main-bar">

          <div className="arrow-left">
            <img
              src={require('../../../shared/img/icons/icon_left_arrow.png')}
              onClick={this.prevLayer}
            />
          </div>

          <div className="widget__picker-bar-window">
            {this.renderBar()}
          </div>

          <div className="arrow-right">
            <img
              src={require('../../../shared/img/icons/icon_right_arrow.png')}
              onClick={this.nextLayer}
            />
          </div>

        </div>

      </div>
    );
  }
}

_PickerBar.defaultProps = {
  className: '',
  valMin: null,
  valMax: null,
  valStep: null,
  defaultValue: 1,
};

_PickerBar.propTypes = {
  valMin: PropTypes.number,
  valMax: PropTypes.number,
  valStep: PropTypes.number,
  className: PropTypes.string,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
};

const mapStateToProps = (store) => ({
  _t: getTranslate(store.localeReducer),
});

const mapDispatchToProps = () => ({});

export const PickerBar = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true },
)(_PickerBar);
