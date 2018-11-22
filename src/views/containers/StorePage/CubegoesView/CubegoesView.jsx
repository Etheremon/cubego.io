import React from 'react'
import {connect} from "react-redux"
import {getTranslate} from 'react-localize-redux'
import { CustomRectangle, DiscountFrame } from '../../../widgets/SVGManager/SVGManager.jsx';
import StoreCubegoCard from '../StoreCubegoCard/StoreCubegoCard.jsx';
import { TextImage } from '../../../widgets/Text/Text.jsx';
import Popup from '../../../widgets/Popup/Popup.jsx';
import { ButtonNew } from '../../../widgets/Button/Button.jsx';
import { Parallelogram } from '../../../widgets/Parallelogram/Parallelogram.jsx';
import { URLS, CURRENCY } from '../../../../constants/general';
import {CUBE_TIER, CUBE_TIER_MAP} from "../../../../constants/cubego";
import * as Utils from "../../../../utils/utils";
import { PRESALE_PACK_DISCOUNT, START_PRESALE } from '../../../../config.js';
import { CalculateDiscountPrice } from '../../../../utils/logicUtils';
import { PurchasePackage } from '../../../../services/transaction';
import { addTxn } from '../../../../actions/txnAction.js';
import { GetLoggedInUserId, GetDiscountFactor } from '../../../../reducers/selectors';
import { PresaleActions } from '../../../../actions/presale';

require("style-loader!./CubegoesView.scss");

const ethToEmont = 1500;
const ultimatePack = {
  name: 'ultimate pack',
  quantity: 200,
  price_eth: 1.25,
  price_emont: 1*ethToEmont,
  cubes: [
    {type: 'gold', quantity: 16, tier: CUBE_TIER[CUBE_TIER_MAP.epic].name},
    {type: 'ice', quantity: 18, tier: CUBE_TIER[CUBE_TIER_MAP.epic].name},
    {type: 'silver', quantity: 18, tier: CUBE_TIER[CUBE_TIER_MAP.epic].name},
    {type: 'iron', quantity: 48, tier: CUBE_TIER[CUBE_TIER_MAP.rare].name},
    {type: 'stone', quantity: 50, tier: CUBE_TIER[CUBE_TIER_MAP.rare].name},
    {type: 'wood', quantity: 50, tier: CUBE_TIER[CUBE_TIER_MAP.rare].name},
  ],
};

const presaleCubegoes = [
  {pack_id: 4, name: 'gold pack', type: 'gold', quantity: 40, price_eth: 0.7, price_emont: 0.7*ethToEmont, power: 350, tier: CUBE_TIER[CUBE_TIER_MAP.epic].name},
  {pack_id: 5, name: 'ice pack', type: 'ice', quantity: 45, price_eth: 0.7, price_emont: 0.7*ethToEmont, power: 300, tier: CUBE_TIER[CUBE_TIER_MAP.epic].name},
  {pack_id: 6, name: 'silver pack', type: 'silver', quantity: 45, price_eth: 0.7, price_emont: 0.7*ethToEmont, power: 300, tier: CUBE_TIER[CUBE_TIER_MAP.epic].name},
  {pack_id: 1, name: 'iron pack', type: 'iron', quantity: 120, price_eth: 0.4, price_emont: 0.4*ethToEmont, power: 55, tier: CUBE_TIER[CUBE_TIER_MAP.rare].name},
  {pack_id: 2, name: 'stone pack', type: 'stone', quantity: 125, price_eth: 0.4, price_emont: 0.4*ethToEmont, power: 50, tier: CUBE_TIER[CUBE_TIER_MAP.rare].name},
  {pack_id: 3, name: 'wood pack', type: 'wood', quantity: 125, price_eth: 0.4, price_emont: 0.4*ethToEmont, power: 50, tier: CUBE_TIER[CUBE_TIER_MAP.rare].name},
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

    const {_t, userId} = this.props;
    const item = this.state.selectedItem;
    const selectedPack = this.state.selectedPack || {idx: 3, currency: CURRENCY.ETH};
    const totalAmount = CalculateDiscountPrice(item[`price_${selectedPack.currency}`] * PRESALE_PACK_DISCOUNT[selectedPack.idx].id, PRESALE_PACK_DISCOUNT[selectedPack.idx].discount, 4);
    const allStoreDiscount = (100-(this.props.discountFactor || 100)) / 100;

    return (
      <div className={`purchase__container ${item && item.tier || 'pack'}`}>
        <div className="header__container">
          <CustomRectangle tier={item && item.tier || 'pack'}/>
          <span>{_t(item.name)}</span>
        </div>
        <div className="main__container">
          <div className="pack__listview">
            {
              PRESALE_PACK_DISCOUNT.map((ele, idx) => {
                return (
                  <div className="pack__item" key={idx}
                       onClick={() => {this.setState({selectedPack: {idx: idx, currency: CURRENCY.ETH}})}}>
                    <div className={`item__container ${selectedPack.idx === idx ? 'active' : ''}`}>
                      <div className="border-gradient__layer">
                        <img src={require(`../../../../shared/img/store_cubegoes/${item && item.type || 'chest'}.png`)}/>
                        {
                          ele.id === 6 || ele.id === 10 ? <img className={`sale-tag tag-${ele.id}`} src={require(`../../../../shared/img/store_cubegoes/presale/sale${ele.id}.png`)}/> : null
                        }
                        <div className="detail__label">
                          <div className="header__label">
                            {ele <= 1 ? _t('num_pack', {num: ele.id}) : _t('num_packs', {num: ele.id})}
                          </div>
                        </div>
                        <div className="purchase-action__container">
                          <div className={`discount ${idx >= 2 ? 'visibility' : 'hidden'}`}>
                            <TextImage text={0.5} imgSource={require(`../../../../shared/img/icons/icon-ether.png`)}/>
                            <TextImage text={500} imgSource={require(`../../../../shared/img/icons/icon-emont.png`)}/>
                          </div>
                          <div className="purchase__group-button">
                          {
                            START_PRESALE ? <Parallelogram className={'popup-parallelogram'} children={
                              <div className="price__container">
                                  <TextImage
                                    className={`${selectedPack.idx === idx && selectedPack.currency === CURRENCY.ETH ? 'active' : ''}`}
                                    text={CalculateDiscountPrice(item.price_eth * ele.id, ele.discount, 2)}
                                    imgSource={require(`../../../../shared/img/icons/icon-ether.png`)}
                                    onClick={() => {
                                      this.setState({selectedPack: {idx: idx, currency: 'eth'}})
                                    }}
                                  />
                                  <TextImage
                                    className={`${selectedPack.idx === idx && selectedPack.currency === CURRENCY.EMONT ? 'active' : ''}`}
                                    text={CalculateDiscountPrice(item.price_emont * ele.id, ele.discount, 2)}
                                    imgSource={require(`../../../../shared/img/icons/icon-emont.png`)}
                                    onClick={() => {
                                      this.setState({selectedPack: {idx: idx, currency: CURRENCY.EMONT}})
                                    }}
                                  />
                              </div>
                            }/> : null
                          }
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
                  <div className={'right'}>{PRESALE_PACK_DISCOUNT[selectedPack.idx].id}</div>
                </div>
                <div className={'review-item'}>
                  <div className={'left'}>{_t('cubes/pack')}:</div>
                  <div className={'right'}>{item.quantity}</div>
                </div>
                <div className={'review-item'}>
                  <div className={'left'}>{_t('total cubes')}:</div>
                  <div className={'right'}>{Utils.RoundToDecimalFloat(item.quantity*PRESALE_PACK_DISCOUNT[selectedPack.idx].id, 4)}</div>
                </div>

                {
                  START_PRESALE ? (
                    <React.Fragment>
                      <div className={'review-item'}>
                        <div className={'left'}>{_t('price')}:</div>
                        <div className={'right'}>{totalAmount} {_t(selectedPack.currency)}</div>
                      </div>

                      {allStoreDiscount !== 0 ?
                        <React.Fragment>
                          <div className={'divider-line'}/>
                          <div className={`review-item`}>
                            <div className={'left'}>{allStoreDiscount === 10 ? _t('early bird discount') : _t('early discount')}:
                            </div>
                            <div className={'right'}>{`-${allStoreDiscount}%`}</div>
                          </div>
                          <div className={'review-item'}>
                            <div className={'left'}>{_t('total price')}:</div>
                            <div className={'right'}>{CalculateDiscountPrice(totalAmount, allStoreDiscount, 4)} {_t(selectedPack.currency)}</div>
                          </div>
                        </React.Fragment> : null
                      }

                      <ButtonNew className={'confirm-purchase__button'} label={_t('purchase')} onClick={() => {
                        PurchasePackage(this.props.dispatch, addTxn, _t, {
                          address: userId,
                          numPacks: PRESALE_PACK_DISCOUNT[selectedPack.idx].id,
                          packId: item.pack_id,
                          amount: CalculateDiscountPrice(totalAmount, allStoreDiscount, 4),
                          purchaseType: (item && item.tier)
                            ? PurchasePackage.types[`PURCHASE_SINGLE_PACK_USING_${selectedPack.currency.toUpperCase()}`]
                            : PurchasePackage.types[`PURCHASE_ULTIMATE_PACK_USING_${selectedPack.currency.toUpperCase()}`],
                          currency: selectedPack.currency,
                          name: _t(item.name),
                          history: this.props.history,
                        })
                      }}/>
                    </React.Fragment>
                  ) : null
                }
              </React.Fragment> : null
            }
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.dispatch(PresaleActions.LOAD_DISCOUNT_FACTOR.init.func({forceUpdate: false}));
  }

  render() {
    let {_t} = this.props;

    return(
      <div className="cubegoes-view__container">
        <div className="pack-view__container" onClick={() => {this.setState({selectedItem: ultimatePack})}}>
            {!Utils.IsMobile ? <div className="border"><DiscountFrame text={_t('Save 5%')} /></div> : <img className={'mobile-sale-tag'} src={require('../../../../shared/img/store_cubegoes/presale/saletag.png') } /> }
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
          {
            START_PRESALE ? <Parallelogram className={'pack-parallelogram'} children={
              <div className="price__container">
                <TextImage text={ultimatePack.price_eth} imgSource={require(`../../../../shared/img/icons/icon-ether.png`)}/>
                <TextImage text={ultimatePack.price_emont} imgSource={require(`../../../../shared/img/icons/icon-emont.png`)}/>
              </div>
            }/> : null
          }

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
  let userId = GetLoggedInUserId(store);
  return {
    _t: getTranslate(store.localeReducer),
    discountFactor: GetDiscountFactor(store),
    userId,
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
