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
import {CUBE_TIER, CUBE_TIER_MAP} from "../../../../constants/cubego";
import * as Utils from "../../../../utils/utils";

require("style-loader!./CubegoesView.scss");

const ultimatePack = {
  name: 'ultimate pack',
  quantity: 199,
  price: 1.02,
  price_emont: 100,
  cubes: [
    {type: 'gold', quantity: 15, tier: CUBE_TIER[CUBE_TIER_MAP.epic].name},
    {type: 'silver', quantity: 17, tier: CUBE_TIER[CUBE_TIER_MAP.epic].name},
    {type: 'ice', quantity: 17, tier: CUBE_TIER[CUBE_TIER_MAP.epic].name},
    {type: 'iron', quantity: 48, tier: CUBE_TIER[CUBE_TIER_MAP.rare].name},
    {type: 'stone', quantity: 51, tier: CUBE_TIER[CUBE_TIER_MAP.rare].name},
    {type: 'brick', quantity: 51, tier: CUBE_TIER[CUBE_TIER_MAP.rare].name},
  ],
};

const presaleCubegoes = [
  {name: 'gold pack', type: 'gold', quantity: 36, price: 0.5, price_emont: 100, power: 350, tier: CUBE_TIER[CUBE_TIER_MAP.epic].name},
  {name: 'silver pack', type: 'silver', quantity: 40, price: 0.5, price_emont: 100, power: 300, tier: CUBE_TIER[CUBE_TIER_MAP.epic].name},
  {name: 'ice pack', type: 'ice', quantity: 40, price: 0.5, price_emont: 100, power: 300, tier: CUBE_TIER[CUBE_TIER_MAP.epic].name},
  {name: 'iron pack', type: 'iron', quantity: 110, price: 0.3, price_emont: 100, power: 55, tier: CUBE_TIER[CUBE_TIER_MAP.rare].name},
  {name: 'stone pack', type: 'stone', quantity: 120, price: 0.3, price_emont: 100, power: 50, tier: CUBE_TIER[CUBE_TIER_MAP.rare].name},
  {name: 'brick pack', type: 'brick', quantity: 120, price: 0.3, price_emont: 100, power: 50, tier: CUBE_TIER[CUBE_TIER_MAP.rare].name},
];

class CubegoesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      selectedPack: null,
    };

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

        <ButtonNew className={'register__button-btn'} label={_t('register now for presale')} showDeco={ButtonNew.deco.BOTH} onClick={() => {
          this.props.history.push(`/${URLS.SIGN_IN}?type=sign-in`)
        }}/>
      </div>
    )
  }

  renderPurchaseView () {
    if (!this.state.selectedItem) return null;

    const {_t} = this.props;
    const item = this.state.selectedItem;
    const selectedPack = this.state.selectedPack || {idx: 3, currency: 'eth'};
    const packQuantities = [1, 3, 6, 10];

    return (
      <div className={`purchase__container ${item && item.tier || 'pack'}`}>
        <div className="header__container">
          <CustomRectangle tier={item && item.tier || 'pack'}/>
          <span>{_t(item.name)}</span>
        </div>
        <div className="main__container">
          <div className="pack__listview">
            {
              packQuantities.map((ele, idx) => {
                return (
                  <div className="pack__item" key={idx}
                       onClick={() => {this.setState({selectedPack: {idx: idx, currency: 'eth'}})}}>
                    <div className={`item__container ${selectedPack.idx === idx ? 'active' : ''}`}>
                      <div className="border-gradient__layer">
                        <img src={require(`../../../../shared/img/store_cubegoes/${item && item.type || 'chest'}.png`)}/>
                        <div className="detail__label">
                          <div className="header__label">
                            {ele <= 1 ? _t('num_pack', {num: ele}) : _t('num_packs', {num: ele})}
                          </div>
                          <div className="cubegoes-quantity__label">
                            {_t('cubegoes')}: {ele*item.quantity}
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
                                    className={`${selectedPack.idx === idx && selectedPack.currency === 'eth' ? 'active' : ''}`}
                                    text={item.price}
                                    imgSource={require(`../../../../shared/img/icons/icon-ether.png`)}
                                    onClick={() => {
                                      this.setState({selectedPack: {idx: idx, currency: 'eth'}})
                                    }}
                                  />
                                  <TextImage
                                    className={`${selectedPack.idx === idx && selectedPack.currency === 'emont' ? 'active' : ''}`}
                                    text={item.price_emont}
                                    imgSource={require(`../../../../shared/img/icons/icon-emont.png`)}
                                    onClick={() => {
                                      this.setState({selectedPack: {idx: idx, currency: 'emont'}})
                                    }}
                                  />
                              </div>
                            }/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              )
            }
          </div>

          <div className="confirm-action__container">
            <img className={'cubego__image'}
                 src={require(`../../../../shared/img/store_cubegoes/${item && item.type || 'chest'}.png`)}/>
            {selectedPack.currency ?
              <React.Fragment>
                <div className={'review-item'}>
                  <div className={'left'}>{_t('pack(s)')}:</div>
                  <div className={'right'}>{packQuantities[selectedPack.idx]}</div>
                </div>
                <div className={'review-item'}>
                  <div className={'left'}>{_t('cubes/pack')}:</div>
                  <div className={'right'}>{item.quantity}</div>
                </div>
                <div className={'review-item'}>
                  <div className={'left'}>{_t('total cubes')}:</div>
                  <div className={'right'}>{Utils.RoundToDecimalFloat(item.quantity*packQuantities[selectedPack.idx], 4)}</div>
                </div>
                {/* <div className={'review-item'}>
                  <div className={'left'}>{_t('total price')}:</div>
                  <div className={'right'}>{Utils.RoundToDecimalFloat(item.price*packQuantities[selectedPack.idx], 4)} {_t(selectedPack.currency)}</div>
                </div> */}
                <ButtonNew className={'confirm-purchase__button'} label={_t('purchase')} onClick={() => {
                  this.setState({viewPresaleInfo: true})
                }}/>
              </React.Fragment> : null
            }
          </div>
        </div>
      </div>
    )
  }

  render() {
    let {_t} = this.props;

    return(
      <div className="cubegoes-view__container">
        <div className="pack-view__container" onClick={() => {this.setState({selectedItem: ultimatePack})}}>
            <div className="header__label">
              <CustomRectangle  />
              <span>{_t(ultimatePack.name)}</span>
            </div>
            <div className="total-quantity">
            {ultimatePack.quantity} {_t('Cubegoes')}
            </div>
            <div className="combo-detail__container">
              <img src={require(`../../../../shared/img/store_cubegoes/${'chest'}.png`)} className={'chest__image'} />
              <div className="cubego__listview">
                {
                  ultimatePack.cubes.map((cubego, idx) =>
                    <div className="cubego__item" key={idx}>
                      <div className="image__container">
                        <div className="cubego-name">
                          {_t(cubego.type)}
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
              <TextImage text={ultimatePack.price} imgSource={require(`../../../../shared/img/icons/icon-ether.png`)}/>
              <TextImage text={ultimatePack.price_emont} imgSource={require(`../../../../shared/img/icons/icon-emont.png`)}/>
            </div>
          }/>

        </div>

        <div className="pack-detail__container">
          <div className="cubego__listview">
            {
              presaleCubegoes.map((cubego, idx) => {
                return ( 
                  <div className={'item'} key={idx}>
                    <StoreCubegoCard {...cubego} onClick={() => {this.setState({selectedItem: cubego})}} />
                  </div>
                )
              })
            }
          </div>
        </div>
        
        
        <Popup className={'popup-purchase'}
               onUnmount={() => {this.setState({selectedItem: null, selectedPack: null})}}
               open={!!this.state.selectedItem} >
          {this.renderPurchaseView()}
        </Popup>

        <Popup className={'popup-purchase'}
               onUnmount={() => {this.setState({viewPresaleInfo: false})}}
               open={this.state.viewPresaleInfo} >
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
