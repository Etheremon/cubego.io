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
import {ModelActions} from "../../../actions/model";
import Popup from "../../widgets/Popup/Popup.jsx";
import * as GonUtils from "../../../utils/logicUtils";

require("style-loader!./ReviewPage.scss");

const energyRange = [0,10,20,30,40];

class ReviewPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderValue: energyRange[Math.round(energyRange.length / 2)],
      hiddenSliderIndicators: [0, energyRange[energyRange.length - 1]],
      allowChangeName: false,
      cubegonName: '',
    };

    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.checkOut = this.checkOut.bind(this);
    this.renderSubmitResult = this.renderSubmitResult.bind(this);
  }

  componentDidMount() {
    if (!this.props.validatedModel) {
      this.props.history.push(`/${URLS.BUILD_GON}`)
    }
    Utils.ScrollTop();
  }

  handleSliderChange(event) {
    const shouldHiddenIndicator = Utils.nearestPosition(event.target.value, energyRange, 2);

    let newHidden = [0, energyRange[energyRange.length - 1]];
    if (shouldHiddenIndicator && newHidden.indexOf(shouldHiddenIndicator) === -1) {
      newHidden.push(shouldHiddenIndicator);
    }

    this.setState({sliderValue: event.target.value, hiddenSliderIndicators: newHidden});
  }

  checkOut() {
    this.setState({showError: true});

    // this.setState({submitting: true});
    // this.props.dispatch(ModelActions.SUBMIT_MODEL.init.func({
    //   model: this.props.validatedModel.model,
    //   structure: this.props.validatedModel.model.structure,
    //   energy: parseInt(this.state.sliderValue),
    //   name: this.nameInput ? this.nameInput.value : '',
    //   image: this.modelCanvas.getBase64Image(),
    //   callbackFunc: (code, data) => {
    //     this.setState({
    //       submitting: false,
    //       showPopup: true,
    //       submitResponse: data,
    //       isSuccess: code === window.RESULT_CODE.SUCCESS,
    //     });
    //   }
    // }));
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
    if (!validatedModel) return null;

    let {stats, info} = validatedModel;

    const { allowChangeName } = this.state;
    const sliderValue = parseInt(this.state.sliderValue);
    const sliderFilled = sliderValue / energyRange[energyRange.length - 1] * 100;
    const cost = Utils.RoundToDecimalFloat(sliderValue * 0.001 + Math.max(0, stats.total_cost), 6);

    const statsOverview = [{icon: require('../../../shared/img/cubegoes/001.png'), content: stats.total, label: 'cubego'},
                          {icon: CUBE_TYPES[validatedModel.stats.type].img, content: CUBE_TYPES[validatedModel.stats.type].name, label: 'type'},
                          {icon: require('../../../shared/img/icons/icon-stats.png'),
                            content: `${stats.gonTier.stats[0]}-${stats.gonTier.stats[1]}`,
                            label: 'stats range'}];

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
                  <Model3D ref={(canvas) => {this.modelCanvas = canvas}} model={validatedModel.model} viewOnly/> : null
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
                        <img src={item.icon} />
                        <div className={'content'}>{item.content}</div>
                        <div className={'label'}>{_t(item.label)}</div>
                      </div>
                    ))}
                </div>

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
                    {info['topup_materials'].map((item, idx) => {
                      let material = CUBE_MATERIALS[item['material_class']];
                      return (
                        <tr key={idx}>
                          <td>
                            <div className="cube">
                              <img src={material.icon}/>
                              {_t(material.name)}
                            </div>
                          </td>
                          <td><span>{item.count}/{stats.storage[material.class_id]}</span></td>
                          <td><span>{Math.max(0, item.count-stats.storage[material.class_id])}</span></td>
                          <td>
                            <div className="currency">
                              <img src={require('../../../shared/img/icons/icon-ether.png')}/>
                              {material.price || 'N.A'}
                            </div>
                          </td>
                          <td>
                            <div className="currency">
                              <img src={require('../../../shared/img/icons/icon-ether.png')}/>
                              {Utils.RoundToDecimalFloat(Math.max(0, item.count-stats.storage[material.class_id])*(material.price||0), 4)}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>

                <div className="energy__label">
                  {_t('energy')}:
                  <div className={'value'}>{this.state.sliderValue}</div>
                  <div className={'note'} tooltip={_t('energy_note')} tooltip-position={'bottom'}><i className="fas fa-question-circle"/></div>
                </div>
                <div className="total__container">
                  <div className="energy__container">
                      <div className="slider-bar__container">
                        {
                          energyRange.map((item, idx) => 
                            <div key={idx} style={{left: `calc(${idx / (energyRange.length - 1) * 100}% - ${idx}px)`}}
                                 className="indicator">
                              <div className={`line ${this.state.hiddenSliderIndicators.indexOf(item) === -1 ? '' : 'hidden'}`}>
                                <div>{item}</div>
                              </div>
                            </div>
                          )
                        }
                        <div className={"slider"}>
                          <input style={{background: `linear-gradient(to right, #f37321 0%, #f37321 ${sliderFilled}%, #dcdbdb ${sliderFilled}%, #dcdbdb 100%)`}} 
                          type="range" min={energyRange[0]} 
                          max={energyRange[energyRange.length - 1]} 
                          value={this.state.sliderValue} 
                          onChange={this.handleSliderChange} />
                        </div>
                      </div>
                  </div>

                  <div className="total">
                    {`${_t('total')}: `}
                    <div className="currency">
                      <img src={require('../../../shared/img/icons/icon-ether.png')}/>
                      <span>{cost}</span>
                    </div>
                  </div>
                </div>
                <div className={'energy__note'}/>

                <div className="checkout__container">
                  <ButtonNew label={_t('Back')} color={ButtonNew.colors.TURQUOISE} className={'back__button'}
                             onClick={() => {this.props.history.goBack()}}/>
                  <ButtonNew label={_t('Check Out')} className={'check-out__button'} loading={this.state.submitting}
                             onClick={this.checkOut}/>
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