import React from 'react'
import {connect} from "react-redux"
import {getTranslate} from 'react-localize-redux'
import { Pentagon, CustomRectangle } from '../../../widgets/SVGManager/SVGManager.jsx';
import { TextImage } from '../../../widgets/Text/Text.jsx';
import { Parallelogram } from '../../../widgets/Parallelogram/Parallelogram.jsx';
import { START_PRESALE } from '../../../../config.js';

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
    let {_t, quantity, price_eth, price_emont, type, name, className, power, onClick, tier} = this.props;

    return(
      <div className={`store-cubego-card__container ${className && className} ${tier}`}  onClick={() => { onClick && onClick() }}>
          {/* <img className={'background__image'} src={require(`../../../../shared/img/background/cubegon_background/${'background_air'}.png`)} /> */}
          <img className={'cube-img'} src={require(`../../../../shared/img/store_cubegoes/${type}.png`)}/>
          <div className="header__label">
            <CustomRectangle tier={tier}/>
            <span>{_t(name)}</span>
          </div>
          <div className="quantity">
            {
              `${quantity} ${_t(type)}`
            }
          </div>
          <div className="power-score">
            {_t('type')}: <span>{_t(tier)}</span>
          </div>
          {
            START_PRESALE ? <Parallelogram className={'parallelogram'} children={
              <div className="price__container">
                <TextImage text={price_eth} imgSource={require(`../../../../shared/img/icons/icon-ether.png`)}/>
                <TextImage text={price_emont} imgSource={require(`../../../../shared/img/icons/icon-emont.png`)}/>
              </div>
            }/> : null
          }
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
