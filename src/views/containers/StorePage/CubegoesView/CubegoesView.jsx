import React from 'react'
import {connect} from "react-redux"
import {getTranslate} from 'react-localize-redux'
import { CustomRectangle } from '../../../widgets/SVGManager/SVGManager.jsx';
import StoreCubegoCard from '../StoreCubegoCard/StoreCubegoCard.jsx';
import { TextImage } from '../../../widgets/Text/Text.jsx';
import Popup from '../../../widgets/Popup/Popup.jsx';
import { ButtonNew } from '../../../widgets/Button/Button.jsx';

require("style-loader!./CubegoesView.scss");

const presaleCubegoes = [{type: 'gold', quantity: 50, price: 0.04, power: 150, tier: 'epic'},
                            {type: 'silver', quantity: 50, price: 0.04, power: 150, tier: 'epic'},
                            {type: 'ice', quantity: 50, price: 0.04, power: 150, tier: 'epic'},
                            {type: 'iron', quantity: 50, price: 0.04, power: 150, tier: 'rare'},
                            {type: 'stone', quantity: 50, price: 0.04, power: 150, tier: 'rare'},
                            {type: 'brick', quantity: 50, price: 0.04, power: 150, tier: 'rare'}];

class CubegoesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: -1, 
    };

    this.renderPurchaseView = this.renderPurchaseView.bind(this);
  }

  renderPurchaseView () {
    const {_t} = this.props;
    const item = presaleCubegoes[this.state.selectedItem];
    return (
      <div className="purchase__container">
        <div className="header__container">
          <CustomRectangle tier={item && item.tier || 'pack'}/>
          <span>{_t(`${item ? item.tier : 'ultimate'} pack`)}</span>
        </div>
        <div className="main__container">
          <div className="pack__listview">
            {
              [1,3,6,9].map((ele, idx) => 
                <div className="pack__item" key={idx}>
                  <img src={require(`../../../../shared/img/store_cubegoes/${'gold'}.png`)}/>
                  <div className="detail__label">
                    <div className="header__label">
                      {`${ele} Packs`}
                    </div>
                    <div className="cubegoes-quantity__label">
                      Cubegoes: 200
                    </div>
                  </div>
                  <div className="purchase__group-button">
                    <ButtonNew  onClick={() => {}}>
                      <TextImage text={0.5} imgSource={require(`../../../../shared/img/icons/icon-ether.png`)}/>
                    </ButtonNew>
                    <ButtonNew  onClick={() => {}}>
                      <TextImage text={500} imgSource={require(`../../../../shared/img/icons/icon-emont.png`)}/>
                    </ButtonNew>
                  </div>
                </div>
              )
            }
          </div>

          <img className={'cubego__image'} src={require(`../../../../shared/img/store_cubegoes/${'gold'}.png`)}/>
        </div>
      </div>
    )
  }

  render() {
    let {_t} = this.props;

    return(
      <div className="cubegoes-view__container">
        <div className="pack-view__container" onClick={() => {this.setState({selectedItem: 7})}}>
            <div className="header__label">
              <CustomRectangle  />
              <span>Ultimate Pack</span>
            </div>
            <div className="total-quantity">
            180 Cubegoes
            </div>
            <div className="combo-detail__container">
              <img src={require(`../../../../shared/img/assets/${'chest'}.png`)} className={'chest__image'} />
              <div className="cubego__listview">
                {
                  presaleCubegoes.map((cubego, idx) => 
                    <div className="cubego__item" key={idx}>
                      <div className="image__container">
                        <div className="cubego-name">
                          {
                            cubego.type
                          }
                        </div>
                        <img src={require(`../../../../shared/img/store_cubegoes/${cubego.type}.png`)}/>
                        <div className="quantity">
                          {cubego.quantity}
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
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

        <div className="pack-detail__container">
          <div className="cubego__listview">
            {
              presaleCubegoes.map((cubego, idx) => {
                return ( 
                  <div className={'item'} key={idx}>
                    <StoreCubegoCard {...cubego} onClick={() => {this.setState({selectedItem: idx})}} />
                  </div>
                )
              })
            }
          </div>
        </div>
        
        <Popup size={Popup.sizes.BIG} className={'popup-purchase'} onUnmount={() => {this.setState({selectedItem: -1})}}
              open={this.state.selectedItem !== -1} >
          {this.renderPurchaseView()}
        </Popup>
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
)(CubegoesView);
