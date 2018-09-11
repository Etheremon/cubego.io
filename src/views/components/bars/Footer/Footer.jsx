import React from "react"
import { Link } from "react-router-dom"
import {getTranslate} from "react-localize-redux"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {URLS} from "../../../../utils/constants";

require("style-loader!./Footer.scss");

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {_t} = this.props;

    return (
      <div className="footer__wrapper">
        {'this is footer'}
      </div>
    );
  }

}

const mapStateToProps = (store) => ({_t: getTranslate(store.localeReducer)});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
