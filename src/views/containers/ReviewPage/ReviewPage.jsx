import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';

import { ButtonNew } from '../../widgets/Button/Button.jsx';
import withRouter from 'react-router/es/withRouter';
import { Container } from '../../widgets/Container/Container.jsx';
import { PageWrapper } from '../../widgets/PageWrapper/PageWrapper.jsx';
import Navbar from '../../components/bars/Navbar/Navbar.jsx';
import { HeaderBar } from '../../components/bars/HeaderBar/HeaderBar.jsx';
import * as Utils from "../../../utils/utils";
import Footer from "../../components/bars/Footer/Footer.jsx";
import {CUBE_MATERIALS, CUBE_TYPES} from "../../../constants/cubego";
import {GetLoggedInUserId, GetUserInfo, GetValidatedModel} from "../../../reducers/selectors";
import {Model3D} from "../../../games/react_views/Model3D/Model3D.jsx";
import {URLS} from "../../../constants/general";
import Popup from "../../widgets/Popup/Popup.jsx";
import * as GonUtils from "../../../utils/logicUtils";
import * as Config from "../../../config";
import * as ObjUtils from "../../../utils/objUtils";
import {RegisterModelToBlockchain, SubmitModel} from "../../../services/transaction";
import {addTxn} from "../../../actions/txnAction";
import {ENERGY_LIMIT_PRICE, GON_TIER} from "../../../constants/cubegon";
import { TextImage } from '../../widgets/Text/Text.jsx';


require("style-loader!./ReviewPage.scss");

class ReviewPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allowChangeName: false,
      cubegonName: '',

      energy: Object.keys(ENERGY_LIMIT_PRICE)[0],
      energyBarOffset: 0,
    };

    this.submitCubegon = this.submitCubegon.bind(this);
    this.registerCubegon = this.registerCubegon.bind(this);
    this.renderSubmitResult = this.renderSubmitResult.bind(this);
  }

  componentDidMount() {
    if (!this.props.validatedModel) {
      this.props.history.push(`/${URLS.BUILD_GON}`)
    }
    Utils.ScrollTop();
  }

  submitCubegon() {
    let {validatedModel, userId, _t} = this.props;
    let {stats} = validatedModel;

    if (!Config.ENABLE_MODEL_SUBMIT) {
      this.setState({showError: true});
    } else {
      this.setState({submitting: true});
      this.modelCanvas.getBase64Image().then((data) => {
        SubmitModel(this.props.dispatch, addTxn, _t, {
          cubegon_name: this.nameInput ? this.nameInput.value : '',
          cubegon_structure: validatedModel.structure,
          cubegon_image: Utils.ExtractImageBase64String(data),
          num_cubes: stats.total,
          energy_limit: parseInt(this.state.energy),
          total_cost: this.cost,
          address: userId,
          successCallback: (data) => {
            this.createCubegonTxnData = data;
            this.registerCubegon();
          },
          failedCallback: null,
          finishCallback: () => {
            this.setState({submitting: false});
          },
        });
      });
    }
  }

  registerCubegon() {
    let {validatedModel, _t} = this.props;
    let {stats} = validatedModel;

    if (!Config.ENABLE_MODEL_SUBMIT) {
      this.setState({showError: true});
    }
    else {
      this.setState({submitting: true});
      RegisterModelToBlockchain(this.props.dispatch, addTxn, _t, {
        cubegon_name: this.nameInput ? this.nameInput.value : '',
        num_cubes: stats.total,
        txn_data: this.createCubegonTxnData,
        history: this.props.history,
        successCallback: null,
        failedCallback: null,
        finishCallback: () => {
          this.setState({submitting: false});
        },
      });
    }

  }

  renderSubmitResult() {
    let {_t} = this.props;
    let {submitResponse, isSuccess} = this.state;

    return (
      <div className={'review-page__result'}>
        <div className={'header'}>
          {_t('review.success')}
        </div>
        <div className={'note'}>
          {_t('review.note')}
        </div>
        <div className={'image'}>
          <img src={GonUtils.GetImageFromGonID(submitResponse.id)}/>
        </div>
        <div className={'buttons'}>
          <ButtonNew label={_t('View Cubegon')} color={ButtonNew.colors.TURQUOISE}
                     onClick={() => {this.props.history.push(`/${URLS.CUBEGONS}/${submitResponse.id}`)}}/>
          <ButtonNew label={_t('Build Another Cubegon')} className={'check-out__button'}
                     onClick={() => {this.props.history.push(`/${URLS.BUILD_GON}`)}}/>
        </div>
      </div>
    )
  }

  render() {
    const {_t, validatedModel, userInfo} = this.props;
    const { allowChangeName } = this.state;

    if (!validatedModel) return null;
    let {stats} = validatedModel;

    this.cost = Config.ENABLE_MODEL_SUBMIT
      ? Utils.RoundToDecimalFloat(ENERGY_LIMIT_PRICE[this.state.energy] + Math.max(0, stats.total_cost), 6)
      : 0;

    const statsOverview = [
      {icon: require('../../../shared/img/inventory/cubego.png'), content: stats.total, label: 'cubego'},
      {icon: CUBE_TYPES[validatedModel.stats.type].img, content: CUBE_TYPES[validatedModel.stats.type].name, label: 'type'},
      {icon: validatedModel.stats.gonTier.img, content: validatedModel.stats.gonTier.name, label: 'tier'},
      {icon: require('../../../shared/img/inventory/stat.png'), content: `${stats.gonTier.stats[0]}-${stats.gonTier.stats[1]}`, label: 'stats range'}
    ];

    return (
      <PageWrapper type={PageWrapper.types.BLUE_NEW}>

        <Navbar minifying />

        {this.state.showError ?
          <Popup onUnmount={() => {this.setState({showError: false})}}
                 open={this.state.showError}>
            <div className={'review-page__ready-error'}>
              {_t('err.cubego_release_soon')}
            </div>
          </Popup> : null
        }

        {this.state.showPopup ?
          <Popup onUnmount={() => {this.setState({showPopup: false})}}
                 open={this.state.showPopup}>
            <div>
              {this.renderSubmitResult()}
            </div>
          </Popup> : null
        }

        <div className="review-page__container">
          <HeaderBar label={_t('review_cubegon')} userInfo={userInfo} onBackClicked={() => {this.props.history.goBack()}}/>
          <Container className={'review-page__main'}>

            <div className="model-review__container">
              <div className="model-review">
                <div className={'note'}>
                  <img src={require('../../../shared/img/icons/icon-info.png')}/>
                  <p>{_t('review.image_note')}</p>
                </div>
                {validatedModel ?
                  <Model3D ref={(canvas) => {this.modelCanvas = canvas}} 
                        model={validatedModel.model} viewOnly/> : null
                }
              </div>

              <div className={`model-info ${allowChangeName ? 'expand' : ''}`}>
                <div className="model-logo__container">
                  <img src={CUBE_TYPES[validatedModel.stats.type].img}/>
                </div>

                <span>
                  <input type="text" defaultValue={'CubeGon'} size={10} onChange={() => {}}
                         onFocus={() => {this.setState({allowChangeName: true})}}
                         onBlur={() => {this.setState({allowChangeName: false})}}
                         ref={(input) => {this.nameInput = input}}
                  />
                  <img src={require('../../../shared/img/icons/icon_pencil.png')} />
                </span>

              </div>
            </div>

            <div className="model-stats">
              <div className={'overview__header'}>
                {_t('overview')}
              </div>
              <div className="overview-details">
                <div className="stats-overview">
                  {statsOverview.map((item, idx) => (
                      <div className={'item'} key={idx}>
                        <div className="image__wrapper">
                          <img className={`img-${idx}`} src={item.icon} />
                        </div>
                        <div className={'content'}>{item.content}</div>
                        <div className={'label'}>{_t(item.label)}</div>
                      </div>
                    ))}
                </div>

                <div className={'material-list'}>
                  <table>
                  <thead>
                    <tr>
                      <th>{_t('material')}</th>
                      <th>{_t('quantity')}</th>
                      <th>{_t('to purchase')}</th>
                      <th>{_t('price/unit')}</th>
                      <th>{_t('total')}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {ObjUtils.Map(stats['materials'], (mId, mVal) => {
                      let material = CUBE_MATERIALS[mId];
                      let ownedMaterials = stats.storage[mId] || 0;
                      let toPurchaseMaterials = Math.max(0, mVal-ownedMaterials);
                      let mPrice = toPurchaseMaterials * (material.price || 0);
                      return (
                        <tr key={mId}>
                          <td>
                            <div className="cube">
                              <img src={material.icon}/>
                              {_t(material.name)}
                            </div>
                          </td>
                          <td><span>{mVal}/{ownedMaterials}</span></td>
                          <td><span>{toPurchaseMaterials}</span></td>
                          <td>
                            <div className="currency">
                              <img src={require('../../../shared/img/icons/icon-ether.png')}/>
                              {Config.ENABLE_MODEL_SUBMIT ? material.price || _t('N.A') : _t('N.A')}
                            </div>
                          </td>
                          <td>
                            <div className="currency">
                              <img src={require('../../../shared/img/icons/icon-ether.png')}/>
                              {Config.ENABLE_MODEL_SUBMIT ? mPrice : 0}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                </div>

                <div className="total__container">
                  <div className="energy__container">

                    <div className={'energy__info'}>
                      <div className="energy__label">
                        {_t('energy')}:
                        <div className={'value'}>{this.state.energy}</div>
                        <div className={'note'} tooltip={_t('energy_note')} tooltip-position={'bottom'}><i className="fas fa-question-circle"/></div>
                      </div>

                      <TextImage className={'energy-price'} order={TextImage.order.REVERSE} text={ENERGY_LIMIT_PRICE[this.state.energy]} imgSource={require(`../../../shared/img/icons/icon-ether.png`)}/>
                    </div>

                    <div className={'energy__bar-wrapper'}>
                      {Object.keys(ENERGY_LIMIT_PRICE).map((energyLimit, idx) => {
                        let numPoints = ObjUtils.GetLength(ENERGY_LIMIT_PRICE);
                        return (
                          <div className={`energy__point ${this.state.energy === energyLimit ? 'active' : ''}`} key={idx}
                               onClick={() => {
                                 this.setState({energy: energyLimit, energyBarOffset: idx/(numPoints-1)});
                               }}>
                            <p>{energyLimit}</p>
                          </div>
                        );
                      })}
                      <div className={'energy__placeholder'}/>
                      <div className={'energy__bar'} style={{width: `${this.state.energyBarOffset*100}%`}}/>
                    </div>

                  </div>

                  <div className="total">
                    {`${_t('total')}: `}
                    <div className="currency">
                      <img src={require('../../../shared/img/icons/icon-ether.png')}/>
                      <span>{this.cost}</span>
                    </div>
                  </div>
                </div>

                <div className={'energy__note'}/>

                <div className="checkout__container">
                  <ButtonNew label={_t('Back')} color={ButtonNew.colors.TURQUOISE} className={'back__button'}
                             onClick={() => {this.props.history.goBack()}}/>
                  <ButtonNew label={this.createCubegonTxnData ? _t('register cubegon') : _t('submit cubegon')}
                             className={'check-out__button'} loading={this.state.submitting}
                             onClick={this.createCubegonTxnData ? this.registerCubegon : this.submitCubegon}/>
                </div>

              </div>
            </div>

          </Container>
        </div>

        <Footer type={Footer.types.DARK} />
      </PageWrapper>
    )
  }
}

const mapStateToProps = (store, props) => {
  let userId = GetLoggedInUserId(store);
  return {
    _t: getTranslate(store.localeReducer),
    validatedModel: GetValidatedModel(store),
    userId,
    userInfo: GetUserInfo(store, userId),
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewPage));