import React from "react"
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getTranslate} from "react-localize-redux";

require("style-loader!./RangeInput.scss");


class _RangeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }


  onClick(idx, onClickFunc) {
  }

  onChange(e) {
    this.setState({value: parseFloat(e.target.value)});
    this.props.onChange && this.props.onChange(parseFloat(e.target.value));
  }

  render() {
    let {className, label, valMin, valMax, valSteps, value, _t} = this.props;
    let currentVal = value !== undefined && value !== null ? value : this.state.value;

    return (
      <div className={`widget__range-input ${className}`}>
        <label>{label}</label>
        <p>Min: {valMin}, Max: {valMax}, Current: {currentVal}</p>
        <input type="range" id="cowbell" min={valMin} max={valMax} value={currentVal} step={valSteps}
               onInput={this.onChange} onChange={this.onChange}
        />
      </div>
    )
  }

}

_RangeInput.defaultProps = {
  className: '',
  label: null,
  valMin: 0,
  valMax: 100,
  valSteps: 1,
  defaultValue: 50,
};

_RangeInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  valMin: PropTypes.number,
  valMax: PropTypes.number,
  valSteps: PropTypes.number,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
};

const mapStateToProps = (store) => ({
  _t: getTranslate(store.localeReducer),
});

const mapDispatchToProps = (dispatch) => ({});

export const RangeInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(_RangeInput);