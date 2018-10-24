import React from 'react'
import {connect} from "react-redux"
import {getTranslate} from 'react-localize-redux'
import { Pentagon, CustomRectangle } from '../../../widgets/SVGManager/SVGManager.jsx';
import { TextImage } from '../../../widgets/Text/Text.jsx';

require("style-loader!./StoreCubegoCard.scss");

class StoreCubegoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    let {_t, quantity, type, name, className, power, onClick, tier} = this.props;

    return(
      <div className={`store-cubego-card__container ${className && className} ${tier}`}  onClick={() => { onClick && onClick() }}>
          {/* <img className={'background__image'} src={require(`../../../../shared/img/background/cubegon_background/${'background_air'}.png`)} /> */}
          <img src={require(`../../../../shared/img/store_cubegoes/${type}.png`)}/>
          <div className="header__label">
            <CustomRectangle tier={tier}/>
            <span>{`${type} Pack`}</span>
          </div>
          <div className="quantity">
            {
              `${quantity} ${type}`
            }
          </div>
          <div className="power-score">
            {
              `${_t('power_score')}: ${power}/Cubego`
            }
          </div>
          <div className="parallelogram__container">
            <div className="main-content">
              <div className="content">
                <div className="price__container">
                    <TextImage text={0.5} imgSource={require(`../../../../shared/img/icons/icon-ether.png`)}/>
                    <TextImage text={500} imgSource={require(`../../../../shared/img/icons/icon-emont.png`)}/>
                </div>
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
)(StoreCubegoCard);
