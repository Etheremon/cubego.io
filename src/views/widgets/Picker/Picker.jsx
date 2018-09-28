import React from "react"
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getTranslate} from "react-localize-redux";

require("style-loader!./Dropdown.scss");


class Picker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  render() {
    const { className, list, onClick } = this.props;
    return (
      <div className={`widget__picker ${className && className}`}>
        {
          list && list.map((item, idx) => 
            <div key={idx} className="widget__picker-item" onClick={() => onClick && onClick(idx)}>
              {item}
            </div>
          )
        }
      </div>
    )
  }

}

const mapStateToProps = (store) => ({
  _t: getTranslate(store.localeReducer),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Picker);