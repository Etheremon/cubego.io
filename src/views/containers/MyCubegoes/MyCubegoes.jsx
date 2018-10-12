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
import TabsView from '../../widgets/TabsView/TabsView.jsx';
import CubegoCard from '../../components/CubegoCard/CubegoCard.jsx';
import ListView from '../../widgets/ListView/ListView.jsx';
import CubegonCard from '../../components/CubegonCard/CubegonCard.jsx';
import { FilterSearch, FilterSort } from '../../widgets/Filters/Filters.jsx';

require("style-loader!./MyCubegoes.scss");


const sampleCubegon = {1: { id: 1, type: '', name: 'afd', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      2: { id: 2, type: '', name: 'fasdfa', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} }, }

const myCubegoesTabs = [ {key: 'cubegons', content: 'cubegons'}, {key: 'cubegoes', content: 'cubegoes'}];

class MyCubegoes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }

    this.handleGenerateCubegonCard = this.handleGenerateCubegonCard.bind(this);
  }

  handleGenerateCubegonCard(cubegons) {
    return (
      <div className="list-item__container">
        {cubegons.map((item, idx) => 
          <CubegonCard key={idx} className={'card-item'} {...item} />
        )}
      </div>
    )
  }

  render() {
    const {_t, query} = this.props;

    const cubegoData = [{quantity: 25, type: 'diamond', label: 'diamond'}, {quantity: 25, type: 'diamond', label: 'diamond'},
                        {quantity: 25, type: 'diamond', label: 'diamond'}, {quantity: 25, type: 'diamond', label: 'diamond'},
                        {quantity: 25, type: 'diamond', label: 'diamond'}, {quantity: 25, type: 'diamond', label: 'diamond'},
                        {quantity: 25, type: 'diamond', label: 'diamond'}, {quantity: 25, type: 'diamond', label: 'diamond'},
                        {quantity: 25, type: 'diamond', label: 'diamond'}, {quantity: 25, type: 'diamond', label: 'diamond'},
                        {quantity: 25, type: 'diamond', label: 'diamond'}, {quantity: 25, type: 'diamond', label: 'diamond'}];

    const combatStats = [{icon: require('../../../shared/img/icons/icon-stats.png'), content: '250', label: 'cubego'},
                        {icon: require('../../../shared/img/icons/icon-stats.png'), content: 'earth', label: 'type'},
                        {icon: require('../../../shared/img/icons/icon-stats.png'), content: '90-110', label: 'stats range'},
                        {icon: require('../../../shared/img/icons/icon-stats.png'), content: '90-110', label: 'stats range'}];

    return (
      <PageWrapper type={PageWrapper.types.BLUE}>

        <Navbar size={Container.sizes.BIG} minifying label={_t('build_cubegon')} onBackClicked={() => {}}/>

        <div className="mycubegoes-page__container">
      
          <HeaderBar size={Container.sizes.BIG} label={_t('build_cubegon')} onBackClicked={() => {}}/>
          <Container className={'mycubegoes-page__main'} size={Container.sizes.NORMAL}>
            <Text className={'combat-title'} type={Text.types.H2} children={_t('combat')}/>
            <div className="combat-stats__container">
              {combatStats.map((item, idx) => (
                <div className={'item'} key={idx}>
                  <img src={item.icon} />
                  <div className={'content'}>{_t(item.content)}</div>
                  <div className={'label'}>{_t(item.label)}</div>
                </div>
              ))}

            </div>

            <TabsView tabs={myCubegoesTabs} centered 
              selectedTab={query.tab}
              handleOnTabSelect={(tab) => {
                Utils.handleJoinQueryURL(this.props.history.push, query, {tab: tab})
            }}/>

            <ListView
              itemList={Object.values(sampleCubegon)}
              listItemName={_t('cubegons')}
              handleGenerateCardView={this.handleGenerateCubegonCard}
              filters={[
                FilterSearch({_t, searchFields: ['name']}),
                FilterSort({_t, sortTypes: [
                  ['-create_time', this.props._t('sort.recent_mons')],
                  ['-total_level -create_time', this.props._t('sort.highest_level')],
                  ['+total_level -create_time', this.props._t('sort.lowest_level')],
                  ['-total_bp -create_time', this.props._t('sort.highest_bp')],
                  ['+total_bp -create_time', this.props._t('sort.lowest_bp')],
                  ['+name -create_time', this.props._t('sort.name_az')],
                  ['-name -create_time', this.props._t('sort.name_za')],
                ], defaultSort: '-level -create_time', right: true})
              ]}
            />
            
          </Container>
        </div>
      </PageWrapper>
    )
  }
}

const mapStateToProps = (store, props) => {
  let query = Utils.ParseQueryString(props.location.search);
  query = {
    ...query,
    tab: myCubegoesTabs.map(tab => tab.key).includes(query.tab) ? query.tab : myCubegoesTabs[0].key,
  }
  return {
    query,
    _t: getTranslate(store.localeReducer),
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MyCubegoes));