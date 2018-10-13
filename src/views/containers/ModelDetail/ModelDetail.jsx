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
import Footer from '../../components/bars/Footer/Footer.jsx';

require("style-loader!./ModelDetail.scss");

google.charts.load('current', {'packages':['corechart']});

class ModelDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allowChangeName: false,
    }

    this.dataPieChart = this.dataPieChart.bind(this);
  }

  dataPieChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ]);

    var options = {
      legend: 'none',
      backgroundColor: 'transparent',
      slices: {  0: {offset: 0.02},
                1: {offset: 0.02},
                2: {offset: 0.02},
                3: {offset: 0.02},
                4: {offset: 0.02}
          },
      chartArea: {width:'85%', height:'85%'},
      pieHole: 0.1,
      pieSliceText: 'label',
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
  }

  componentDidMount() {
    google.charts.setOnLoadCallback(() => {
      this.dataPieChart();
    });
  }

  render() {

    const {_t} = this.props;
    const {allowChangeName} = this.state;

    const combatStats = [{icon: require('../../../shared/img/icons/icon-stats.png'), content: '45', label: 'win'},
                          {icon: require('../../../shared/img/icons/icon-stats.png'), content: '35', label: 'lose'},
                          {icon: require('../../../shared/img/icons/icon-stats.png'), content: '10/40', label: 'energy'}];

    const moves = ['icon-stats', 'icon-stats', 'icon-stats', 'icon-stats'];

    return (
      <PageWrapper type={PageWrapper.types.BLUE}>

        <Navbar size={Container.sizes.BIG} minifying label={_t('build_cubegon')} onBackClicked={() => {}}/>

        <div className="detail-page__container">
      
          <HeaderBar size={Container.sizes.BIG} label={_t('build_cubegon')} onBackClicked={() => {}}/>
          <Container className={'model-detail__main'} size={Container.sizes.BIG}>

            <div className="model-detail__container">
              <div className="model-review">
              </div>

              <div className={`model-info ${allowChangeName ? 'expand' : ''}`}>
                <div className="model-logo__container">
                  <div className="hexagon-img"></div>
                  <img src={require('../../../shared/img/cubegon/earth.png')} />
                </div>
                <span>
                  <input type="text" defaultValue={'VEXIGON'} value={this.cubegonName} size={10} disabled={!allowChangeName} onChange={() => {}}/>
                  <img src={require('../../../shared/img/icons/icon_pencil.png')} onClick={() => {
                    this.setState({ allowChangeName: !allowChangeName })
                  }}/> 
                </span>
              </div>

              <div className="model-action">
                <ButtonNew label={_t('destroy')}
                        className={'destroy__button'} size={ButtonNew.sizes.NORMAL}/>
                <ButtonNew label={_t('rebuild')} color={ButtonNew.colors.TURQUOISE}
                        className={'rebuild__button'} size={ButtonNew.sizes.NORMAL}/>
              </div>

            </div>

            <div className="model-stats">
              <div className="owner-info">
                <div className="owner-name">
                  {_t('owner:')}
                  <span>Maerongia</span>
                </div>

                <div className="timestamp">
                  {`${_t('create_time')}:`}
                  <span>20/10/2018</span>

                  {`${_t('patent_id')}:`}
                  <span>23456789</span>
                </div>

              </div>

              <Text className={'detail-profile header'} type={Text.types.H2} children={_t('profile')} />
              <div className="profile__container">
                <div className={'cube-statistic'}>
                </div>
                <div className="pie-chart__container">
                  <div id={'piechart'} className="pie-chart"></div>
                  <img src={require('../../../shared/img/background/background_circle.png')} />
                  <img className={'octagon-img'} src={require('../../../shared/img/icons/icon-total.png')} />
                  <div className="total">
                    {250}
                  </div>
                </div>
              </div>

              <Text className={'detail-moves header'} type={Text.types.H2} children={_t('moves')} />
              <div className="moves__container">
                {moves.map((item, idx) => 
                  <img key={idx} src={require('../../../shared/img/icons/icon-stats.png')} />
                  )}
              </div>

              <Text className={'detail-combat header'} type={Text.types.H2} children={_t('combat')} />
              <div className="combat__container">
                {combatStats.map((item, idx) => (
                      <div className={'item'} key={idx}>
                        <img src={item.icon} />
                        <div className={'content'}>{_t(item.content)}</div>
                        <div className={'label'}>{_t(item.label)}</div>
                      </div>
                    ))}
              </div>

              <div className="profile-action__container">
                <ButtonNew label={_t('go_to_battle')}
                        className={'go-to-battle__button'} size={ButtonNew.sizes.NORMAL}/>

                <div className="trade__container">
                  <ButtonNew label={_t('transfer')}
                          className={'transfer__button'} size={ButtonNew.sizes.NORMAL}/>
                  <ButtonNew label={_t('sell')} color={ButtonNew.colors.TURQUOISE}
                  className={'sell__button'} size={ButtonNew.sizes.NORMAL}/>
                </div>
                
                <ButtonNew label={_t('top_up_energy')}
                        className={'top-up-energy__button'} size={ButtonNew.sizes.NORMAL}/>
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
)(ModelDetail));