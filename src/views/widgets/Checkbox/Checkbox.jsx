import React from "react"
import PropTypes from 'prop-types';

require("style-loader!./Checkbox.scss");


export class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.defaultValue,
    };
    this.checked = props.defaultValue;
  }

  getValue() {
    return this.checked;
  }

  render() {
    let {label, children, inverted, onChange} = this.props;

    return (
      <div className={`widget__checkbox ${inverted ? 'inverted' : ''}`}>
        <div className={`widget__checkbox__input ${this.state.checked ? 'checked' : ''}`}>
          <input type={'checkbox'}
                 checked={this.state.checked}
                 onChange={e => {this.checked = e.target.checked; this.setState({checked: e.target.checked}); onChange && onChange(e.target.checked);}}/>
        </div>
        {label || children}
      </div>
    )
  }

}

Checkbox.defaultProps = {
  label: '',
  children: null,
  defaultValue: false,
  inverted: false,
};

Checkbox.propTypes = {
  label: PropTypes.any,
  children: PropTypes.any,
  defaultValue: PropTypes.bool,
  onChange: PropTypes.func,
  inverted: PropTypes.bool,
};
