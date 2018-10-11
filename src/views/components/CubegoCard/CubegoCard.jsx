import React from 'react'
import {connect} from "react-redux"
import {getTranslate} from 'react-localize-redux'

require("style-loader!./CubegoCard.scss");

class CubegoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    let {_t, quantity, type, name, className} = this.props;

    return(
      <div className={`cubego-card__container ${className && className}`}>
          <img src={require(`../../../shared/img/cubes/${type}.png`)}/>
          <div className="quantity">
            {`${_t('quantity')}: ${quantity}`}
          </div>
          <div className="type__container">
            <div className="type-content">
              <div className="content">
              {type}
              </div>
              <div className="border-layer"></div>
            </div>
            <div className="shadow-layer"></div>
          </div>
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
)(CubegoCard);
