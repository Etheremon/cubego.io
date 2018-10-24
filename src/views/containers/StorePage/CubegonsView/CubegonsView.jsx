import React from 'react'
import {connect} from "react-redux"
import {getTranslate} from 'react-localize-redux'

require("style-loader!./CubegonsView.scss");

class CubegonsView extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let {_t} = this.props;

    return(

    )
  }
}

const mapStateToProps = (store) => {
  return {
    _t: getTranslate(store.localeReducer),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CubegonsView);
