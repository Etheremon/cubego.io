import React from "react"
import PropTypes from 'prop-types';

require("style-loader!./Input.scss");

export class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  getValue() {
    return this.input.value;
  }

  render() {
    let {value, type, placeholder, label, disabled, size, onChange, inverted, icon} = this.props;

    return (
      <div className={`widget__input ${inverted ? 'inverted' : ''} ${size}`}>
        <label>{label}</label>
        <div className={'widget__input-box'}>
          {icon}
          <input className={`${icon ? 'with-icon' : ''}`}
                 type={type} disabled={disabled} defaultValue={value} placeholder={placeholder}
                 onChange={(e) => {onChange && onChange(e.target.value)}}
                 ref={(input) => this.input = input}/>
        </div>
      </div>
    )
  }

}

Input.defaultProps = {
  disabled: false,
  label: '',
  value: '',
  defaultValue: '',
  placeholder: '',
  type: 'text',
  inverted: false,
  size: '',
  icon: null,
};

Input.propTypes = {
  label: PropTypes.any,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  color: PropTypes.string,
  img: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  onChange: PropTypes.func,
  inverted: PropTypes.bool,
  icon: PropTypes.any,
};
