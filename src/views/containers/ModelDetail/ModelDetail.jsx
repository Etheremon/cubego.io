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

require("style-loader!./ModelDetail.scss");

google.charts.load('current', {'packages':['corechart']});

class ModelDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
      backgroundColor: 'transparent',
      legend: 'none',
      slices: {  0: {offset: 0.02},
                1: {offset: 0.02},
                2: {offset: 0.02},
                3: {offset: 0.02},
                4: {offset: 0.02}
          },
      chartArea: {width:'85%', height:'85%'},
      pieHole: 0.1,
      animation:{
        duration: 1000,
        easing: 'out',
      },
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
  }

  componentDidMount() {
    google.charts.setOnLoadCallback(this.dataPieChart());
  }

  render() {

    const {_t} = this.props;

    const combatStats = [{icon: require('../../../shared/img/icons/icon-stats.png'), content: '250', name: 'cubego'},
                          {icon: require('../../../shared/img/icons/icon-stats.png'), content: 'earth', name: 'type'},
                          {icon: require('../../../shared/img/icons/icon-stats.png'), content: '90-110', name: 'stats range'}];

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

              <div className="model-info">
                <div className="model-logo__container">
                  <div className="hexagon-img"></div>
                  <img src={require('../../../shared/img/icons/icon-stats.png')} />
                </div>
                <span>VEXIGON <img src={require('../../../shared/img/icons/icon_pencil.png')} /></span>
              </div>

              <div className="model-action">
                <ButtonNew label={_t('destroy')}
                        className={'destroy__button'} size={ButtonNew.sizes.NORMAL}/>
                <ButtonNew label={_t('rebuild')}
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
                  {_t('create_time')}
                  <span>20/10/2018</span>

                  {_t('patent_id')}
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
                  <div className="octagon-img">
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
                        <div className={'name'}>{_t(item.name)}</div>
                      </div>
                    ))}
              </div>

              <div className="profile-action__container">
                <ButtonNew label={_t('go_to_battle')}
                        className={'go-to-battle__button'} size={ButtonNew.sizes.NORMAL}/>

                <div className="trade__container">
                  <ButtonNew label={_t('transfer')}
                          className={'transfer__button'} size={ButtonNew.sizes.NORMAL}/>
                  <ButtonNew label={_t('sell')}
                  className={'sell__button'} size={ButtonNew.sizes.NORMAL}/>
                </div>
                
                <ButtonNew label={_t('top_up_energy')}
                        className={'top-up-energy__button'} size={ButtonNew.sizes.NORMAL}/>
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
)(ModelDetail));