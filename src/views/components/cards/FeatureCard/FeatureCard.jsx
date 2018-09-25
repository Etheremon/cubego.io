import React from 'react'
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import {getTranslate} from 'react-localize-redux'
import { Text } from '../../../widgets/Text/Text.jsx';

require("style-loader!./FeatureCard.scss");

class FeatureCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { _t } = this.props;
    return (
      <div className={`feature-card__container ${this.props.className && this.props.className}`}>
        <div className="feature-card__main">
          <Text className={'feature-card__title'} type={Text.types.H3} children={_t(this.props.title)} />
          <p>{_t(this.props.desc)}</p>
          <div className="line"></div>
        </div>
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
)(FeatureCard);
