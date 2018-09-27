import React from "react"
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getTranslate} from "react-localize-redux";
import { ButtonNew } from '../Button/Button.jsx';
import InputRange from '../InputRange/InputRange.jsx';

require("style-loader!./SliderInput.scss");


class _SliderInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value ? this.props.value : props.defaultValue,
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }


  onClick(idx, onClickFunc) {
  }

  onInput(value) {
    this.setState({value: parseFloat(value)});
    this.props.onInput && this.props.onInput(parseFloat(value));
  }

  onChange(value) {
    this.setState({value: parseFloat(value)});
    this.props.onChange && this.props.onChange(parseFloat(value));
  }

  

  render() {
    let {className, label, valMin, valMax, valSteps, value, _t} = this.props;
    let currentVal = value !== undefined && value !== null ? value : this.state.value;


    return (
      <div className={`widget__slider-input ${className}`}>
        <label>{label}</label>
        <InputRange
          min={valMin}
          max={valMax}
          value={this.state.value}
          orientation={InputRange.orientation.HORIZONTAL}
          tooltip={false}
          fillColor={'transparent'}
          backgroundColor={'#FDEEA1'}
          isContinous={true}
          handleSliderLabel={(min, max, value) => {
            return <ButtonNew className={'slider__label'} color={ButtonNew.colors.ORANGE} label={`${Math.round(value)}/${max}`} />
           }}
          onChange={(value) => {
            this.onInput(Math.round(value));
            this.onChange(value);
          }}
        />
      </div>
    )
  }

}

_SliderInput.defaultProps = {
  className: '',
  label: null,
  valMin: 0,
  valMax: 100,
  valSteps: 1,
  defaultValue: 0,
};

_SliderInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  valMin: PropTypes.number,
  valMax: PropTypes.number,
  valSteps: PropTypes.number,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
};

const mapStateToProps = (store) => ({
  _t: getTranslate(store.localeReducer),
});

const mapDispatchToProps = (dispatch) => ({});

export const SliderInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SliderInput);