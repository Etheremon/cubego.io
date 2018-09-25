import React from 'react'
import {connect} from "react-redux"
import {getTranslate} from 'react-localize-redux'
import { Text } from '../../widgets/Text/Text.jsx';

require("style-loader!./ComingSoon.scss");

class ComingSoon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    let {_t} = this.props;

    return(
      <div className={`coming-soon`}>
        <Text type={Text.types.H1}>{_t('coming_soon')}</Text>
      </div>
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
)(ComingSoon);
