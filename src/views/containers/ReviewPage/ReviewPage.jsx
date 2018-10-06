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

require("style-loader!./ReviewPage.scss");

const energyRange = [0,10,20,30,40];

class ReviewPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderValue: energyRange[Math.round(energyRange.length / 2)],
    }

    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  handleSliderChange(event) {
    this.setState({sliderValue: event.target.value});
  }

  render() {

    const {_t} = this.props;
    const sliderValue = parseInt(this.state.sliderValue);
    const sliderFilled = sliderValue / energyRange[energyRange.length - 1] * 100;

    const statsOverview = [{icon: '', content: '250', name: 'cubego'},
                          {icon: '', content: 'earth', name: 'type'},
                          {icon: '', content: '90-110', name: 'stats range'}];

    const cubeDetails = [{material: 'wood', quantity: 5, price: 0.001},
                        {material: 'gold', quantity: 5, price: 0.001},
                        {material: 'gold', quantity: 5, price: 0.001},
                        {material: 'platium', quantity: 5, price: 0.001},
                        {material: 'diamon', quantity: 5, price: 0.001}];

    return (
      <PageWrapper type={PageWrapper.types.BLUE}>

        <Navbar size={Container.sizes.BIG} minifying label={_t('build_cubegon')} onBackClicked={() => {}}/>

        <div className="review-page__container">
      
          <HeaderBar size={Container.sizes.BIG} label={_t('build_cubegon')} onBackClicked={() => {}}/>
          <Container className={'review-page__main'} size={Container.sizes.BIG}>

            <div className="model-review__container">
              <div className="model-review">
              </div>

              <div className="model-info">
              </div>
            </div>

            <div className="model-stats">
              <Text className={'overview__header'} type={Text.types.H2} children={_t('overview')} />
              <div className="overview-details">
                <div className="stats-overview">
                  {statsOverview.map((item, idx) => (
                      <div className={'item'} key={idx}>
                        <img resource={item.icon} />
                        <div className={'content'}>{_t(item.content)}</div>
                        <div className={'name'}>{_t(item.name)}</div>
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
                        <td>{_t(item.material)}</td>
                        <td><span>{item.quantity}</span></td>
                        <td>{item.price}</td>
                        <td>{item.quantity * item.price}</td>
                      </tr>
                      )}
                  </tbody>
                </table>

                <div className="label">{_t('energy')}</div>
                <div className="total__container">
                  <div className="energy__container">
                      <div className="slider-bar__container">
                        {
                          energyRange.map((item, idx) => 
                            <div key={idx} style={{left: `calc(${idx / (energyRange.length - 1) * 100}% - ${idx * 1}px)`}} className="indicator"><div className={'line'}><div>{item}</div></div></div>
                          )
                        }
                        <input style={{background: `linear-gradient(to right, #f37321 0%, #f37321 ${sliderFilled}%, #dcdbdb ${sliderFilled}%, #dcdbdb 100%)`}} type="range" min={energyRange[0]} max={energyRange[energyRange.length - 1]} value={this.state.sliderValue} className={"slider"} onChange={this.handleSliderChange} />
                      </div>
                  </div>

                  <div className="total">
                    {`${_t('total')}: `}
                    <span>0.025</span>
                  </div>
                </div>

                <div className="checkout__container">
                  <ButtonNew label={_t('back')}
                          className={'back__button'} size={ButtonNew.sizes.NORMAL}/>
                  <ButtonNew label={_t('check_out')}
                          className={'check-out__button'} size={ButtonNew.sizes.NORMAL}/>
                </div>

              </div>
            </div>

          </Container>
        </div>
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