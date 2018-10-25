import React from 'react'
import {connect} from "react-redux"
import {getTranslate} from 'react-localize-redux'
import { CustomRectangle } from '../../../widgets/SVGManager/SVGManager.jsx';
import StoreCubegoCard from '../StoreCubegoCard/StoreCubegoCard.jsx';
import { TextImage } from '../../../widgets/Text/Text.jsx';
import Popup from '../../../widgets/Popup/Popup.jsx';
import { ButtonNew } from '../../../widgets/Button/Button.jsx';
import { Parallelogram } from '../../../widgets/Parallelogram/Parallelogram.jsx';
import { URLS } from '../../../../constants/general';

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
      selectedPackObj: {},
    }

    this.renderPurchaseView = this.renderPurchaseView.bind(this);
    this.renderPresaleView = this.renderPresaleView.bind(this);
  }

  renderPresaleView () {
    const {_t} = this.props;
    return (
      <div className="presale-info__container">
        <span>
          {
            _t('presale_info_on_store_page')
          }
        </span>
        <ButtonNew className={'register__button'} label={_t('register')} onClick={() => {
            this.props.history.push(`/${URLS.SIGN_IN}?type=sign-in`)
        }}/>
      </div>
    )
  }

  renderPurchaseView () {
    const {_t} = this.props;
    const item = presaleCubegoes[this.state.selectedItem];
    const { selectedPackObj } = this.state;
    const selectedPack = Object.keys(selectedPackObj)[0], selectedCurrency = selectedPackObj[selectedPack];
    return (
      <div className={`purchase__container ${item && item.tier || 'pack'}`}>
        <div className="header__container">
          <CustomRectangle tier={item && item.tier || 'pack'}/>
          <span>{`${item ? item.type : 'ultimate'} pack`}</span>
        </div>
        <div className="main__container">
          <div className="pack__listview">
            {
              [1,3,6,10].map((ele, idx) => {
                return <div className="pack__item" key={idx} onClick={() => {
                  if (selectedPack !== idx) {
                    this.setState({
                      selectedPackObj: {[`${idx}`]: 'ether'}
                    })
                  }
                }}>
                  <div className={`item__container ${selectedPack === `${idx}` ? 'active' : ''}`}>
                    <div className="border-gradient__layer">
                      <img src={require(`../../../../shared/img/store_cubegoes/${item && item.type || 'chest'}.png`)}/>
                      <div className="detail__label">
                        <div className="header__label">
                          {`${ele} Packs`}
                        </div>
                        <div className="cubegoes-quantity__label">
                          Cubegoes: 200
                        </div>
                      </div>
                      <div className="purchase-action__container">
                        <div className={`discount ${idx >= 2 ? 'visibility' : 'hidden'}`}>
                          <TextImage text={0.5} imgSource={require(`../../../../shared/img/icons/icon-ether.png`)}/>
                          <TextImage text={500} imgSource={require(`../../../../shared/img/icons/icon-emont.png`)}/>
                        </div>
                        <div className="purchase__group-button">
                          <Parallelogram className={'popup-parallelogram'} children={
                            <div className="price__container">
                                <TextImage 
                                  className={`${selectedPack === `${idx}` && selectedCurrency === 'ether' ? 'active' : ''}`}
                                  text={0.5} 
                                  imgSource={require(`../../../../shared/img/icons/icon-ether.png`)}
                                  onClick={() => {
                                    this.setState({
                                      selectedPackObj: {[`${idx}`]: 'ether'}
                                    })
                                  }}
                                />
                                <TextImage 
                                  className={`${selectedPack === `${idx}` && selectedCurrency === 'emont' ? 'active' : ''}`}
                                  text={500} 
                                  imgSource={require(`../../../../shared/img/icons/icon-emont.png`)}
                                  onClick={() => {
                                    this.setState({
                                      selectedPackObj: {[`${idx}`]: 'emont'}
                                    }) 
                                  }}
                                />
                            </div>
                          }/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                }
              )
            }
          </div>
          <div className="confirm-action__container">
            <img className={'cubego__image'} src={require(`../../../../shared/img/store_cubegoes/${item && item.type || 'chest'}.png`)}/>
            <ButtonNew className={'confirm-purchase__button'} label={_t('purchase')} onClick={() => {
              this.setState({
                selectedItem: -2
              })
            }}/>
          </div>
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
              <img src={require(`../../../../shared/img/store_cubegoes/${'chest'}.png`)} className={'chest__image'} />
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

          <Parallelogram className={'pack-parallelogram'} children={
            <div className="price__container">
              <TextImage text={0.5} imgSource={require(`../../../../shared/img/icons/icon-ether.png`)}/>
              <TextImage text={500} imgSource={require(`../../../../shared/img/icons/icon-emont.png`)}/>
            </div>
          }/>

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
        
        <Popup className={'popup-purchase'} onUnmount={() => {this.setState({selectedItem: -1, selectedPack: {}})}}
              open={this.state.selectedItem > -1} >
          {this.renderPurchaseView()}
        </Popup>

        <Popup  className={'popup-purchase'} onUnmount={() => {this.setState({selectedItem: -1, selectedPack: {}})}}
              open={this.state.selectedItem === -2} >
          {this.renderPresaleView()}
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
