import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';

import { Text } from '../../widgets/Text/Text.jsx';
import { ButtonNew } from '../../widgets/Button/Button.jsx';
import withRouter from 'react-router/es/withRouter';
import { Container } from '../../widgets/Container/Container.jsx';
import { PageWrapper } from '../../widgets/PageWrapper/PageWrapper.jsx';
import Navbar from '../../components/bars/Navbar/Navbar.jsx';
import { HeaderBar } from '../../components/bars/HeaderBar/HeaderBar.jsx';
import * as Utils from "../../../utils/utils";
import InviewMonitor from '../../widgets/InviewMonitor/InviewMonitor.jsx';
import Footer from "../../components/bars/Footer/Footer.jsx";

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
    }

    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  handleSliderChange(event) {
    const shouldHiddenIndicator = Utils.nearestPosition(event.target.value, energyRange, 2);

    let newHidden = [0, energyRange[energyRange.length - 1]];
    if (shouldHiddenIndicator && newHidden.indexOf(shouldHiddenIndicator) === -1) {
      newHidden.push(shouldHiddenIndicator);
    }

    this.setState({sliderValue: event.target.value, hiddenSliderIndicators: newHidden});
    
  }

  render() {

    const {_t} = this.props;
    const { allowChangeName } = this.state;
    const sliderValue = parseInt(this.state.sliderValue);
    const sliderFilled = sliderValue / energyRange[energyRange.length - 1] * 100;

    const statsOverview = [{icon: require('../../../shared/img/cubegoes/001.png'), content: '250', label: 'cubego'},
                          {icon: require('../../../shared/img/cubegon/earth.png'), content: 'earth', label: 'type'},
                          {icon: require('../../../shared/img/icons/icon-stats.png'), content: '90-110', label: 'stats range'}];

    const cubeDetails = [{material: '001', quantity: 5, price: 0.001},
                        {material: '002', quantity: 5, price: 0.001},
                        {material: '003', quantity: 5, price: 0.001},
                        {material: '004', quantity: 5, price: 0.001},
                        {material: '005', quantity: 5, price: 0.001}];
    return (
      <PageWrapper type={PageWrapper.types.BLUE}>

        <Navbar size={Container.sizes.BIG} minifying label={_t('build_cubegon')} onBackClicked={() => {}}/>

        <div className="review-page__container">
      
          <HeaderBar size={Container.sizes.BIG} label={_t('build_cubegon')} onBackClicked={() => {}}/>
          <Container className={'review-page__main'} size={Container.sizes.BIG}>

            <div className="model-review__container">
              <div className="model-review">
              </div>

              <div className={`model-info ${allowChangeName ? 'expand' : ''}`}>
                {/* <InviewMonitor
                  classNameNotInView='vis-hidden'
                  classNameInView='animated swirl-in-fwd'
                > */}
                <div className="model-logo__container">
                  <div className="hexagon-img"></div>
                  <img src={require('../../../shared/img/cubegon/earth.png')} />
                </div>
                {/* </InviewMonitor> */}
      
                {/* <InviewMonitor
                  classNameNotInView='vis-hidden'
                  classNameInView='animated scale-in-hor-left'
                > */}
                <span>
                  <input type="text" defaultValue={'VEXIGON'} value={this.cubegonName} size={10} disabled={!allowChangeName} onChange={() => {}}/>
                  <img src={require('../../../shared/img/icons/icon_pencil.png')} onClick={() => {
                    this.setState({ allowChangeName: !allowChangeName })
                  }}/> 
                </span>
                
                {/* </InviewMonitor> */}
                  

              </div>
            </div>

            <div className="model-stats">
              <Text className={'overview__header'} type={Text.types.H3} children={_t('overview')} />
              <div className="overview-details">
                <div className="stats-overview">
                  {statsOverview.map((item, idx) => (
                      <div className={'item'} key={idx}>
                        <img src={item.icon} />
                        <div className={'content'}>{_t(item.content)}</div>
                        <div className={'label'}>{_t(item.label)}</div>
                      </div>
                    ))}
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>{_t('material')}</th>
                      <th>{_t('quantity')}</th>
                      <th>{_t('price')}</th>
                      <th>{_t('total')}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cubeDetails.map((item, idx) => 
                      <tr key={idx}>
                        <td>
                          <div className="cube">
                            <img src={require(`../../../shared/img/cubegoes/${item.material}.png`)}/>
                            {_t(item.material)}
                          </div>
                        </td>
                        <td><span>{item.quantity}</span></td>
                        <td>
                          <div className="currency">
                            <img src={require('../../../shared/img/icons/icon-ether.png')}/>
                            {item.price}
                          </div>
                        </td>
                        <td>
                          <div className="currency">
                            <img src={require('../../../shared/img/icons/icon-ether.png')}/>
                            {item.quantity * item.price}
                          </div>
                        </td>
                      </tr>
                      )}
                  </tbody>
                </table>

                <div className="energy__label">{_t('energy')}</div>
                <div className="total__container">
                  <div className="energy__container">
                      <div className="slider-bar__container">
                        {
                          energyRange.map((item, idx) => 
                            <div key={idx} style={{left: `calc(${idx / (energyRange.length - 1) * 100}% - ${idx * 1}px)`}} 
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
                      <span>0.025</span>
                    </div>
                  </div>
                </div>

                <div className="checkout__container">
                  <ButtonNew label={_t('back')} color={ButtonNew.colors.TURQUOISE}
                          className={'back__button'} size={ButtonNew.sizes.NORMAL}/>
                  <ButtonNew label={_t('check_out')}
                          className={'check-out__button'} size={ButtonNew.sizes.NORMAL}/>
                </div>

              </div>
            </div>

          </Container>
        </div>

        <Footer size={Container.sizes.BIG} />
      </PageWrapper>
    )
  }
}

const mapStateToProps = (store, props) => {
  return {
    _t: getTranslate(store.localeReducer),
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewPage));