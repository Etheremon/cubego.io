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
import { FilterSearch, FilterSort, FilterType } from '../../widgets/Filters/Filters.jsx';
import Footer from "../../components/bars/Footer/Footer.jsx";
import { UserActions } from '../../../actions/user';
import { GetLoggedInUserId, GetUserCubegons, GetUserInfo } from '../../../reducers/selectors.js';
import { CustomRectangle } from '../../widgets/SVGManager/SVGManager.jsx';
import { CUBE_MATERIALS } from '../../../constants/cubego';

require("style-loader!./Inventory.scss");


const sampleCubegon = {1: { id: 1, type: '', name: 'afd', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      2: { id: 2, type: '', name: 'fasdfa', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      3: { id: 1, type: '', name: 'afd', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      4: { id: 2, type: '', name: 'fasdfa', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      5: { id: 1, type: '', name: 'afd', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      6: { id: 2, type: '', name: 'fasdfa', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      7: { id: 1, type: '', name: 'afd', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      8: { id: 2, type: '', name: 'fasdfa', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      9: { id: 1, type: '', name: 'afd', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      10: { id: 2, type: '', name: 'fasdfa', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      11: { id: 1, type: '', name: 'afd', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      12: { id: 2, type: '', name: 'fasdfa', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      13: { id: 1, type: '', name: 'afd', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      14: { id: 2, type: '', name: 'fasdfa', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      15: { id: 1, type: '', name: 'afd', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      16: { id: 2, type: '', name: 'fasdfa', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      17: { id: 1, type: '', name: 'afd', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      18: { id: 2, type: '', name: 'fasdfa', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      19: { id: 1, type: '', name: 'afd', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      20: { id: 2, type: '', name: 'fasdfa', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      21: { id: 1, type: '', name: 'afd', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                      22: { id: 2, type: '', name: 'fasdfa', owner: '', total: 120, cubegoes: {}, stats: {hp: 5, ak: 5, dp: 5, sp: 5}, energy: 50, moves: {} },
                     }

const myCubegoesTabs = [ {key: 'cubegons', content: 'cubegons'}, {key: 'cubegoes', content: 'cubegoes'}];

class Inventory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }

    this.handleGenerateCubegonView = this.handleGenerateCubegonView.bind(this);
    this.handleGenerateCubegoView = this.handleGenerateCubegoView.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(UserActions.LOAD_USER_CUBEGON.init.func({userId: this.props.userId}));
  }

  handleGenerateCubegonView(cubegons) {
    return (
      <div className="list-item__container">
        {cubegons.map((item, idx) => 
          <div className="card-item" key={idx}>
            <CubegonCard key={idx} {...item} />
          </div>
        )}
      </div>
    )
  }

  handleGenerateCubegoView(cubegoes) {
    const {_t} = this.props;
    return (
      <div className="cubego-view__container">
        <div className="list-item__container">
          {cubegoes.map((item, idx) => 
            <div className="card-item" key={idx}>
              <CubegoCard key={idx} {...item} />
            </div>
          )}
        </div>

      </div>
    )
  }

  render() {
    const {_t, query, userCubegons, userInfo} = this.props;
    let dataUserCubegoes;
    if (userCubegons !== undefined && userCubegons !== null) {
      dataUserCubegoes = userCubegons.materials.filter(item => item.amount > 0)
      dataUserCubegoes = dataUserCubegoes.map(item => {
        return {...item, ...CUBE_MATERIALS[item.material_id] } 
      }
      );
    }

    const cubegoData = [{quantity: 25, type: 'diamond', label: 'diamond'}, {quantity: 25, type: 'diamond', label: 'diamond'},
                        {quantity: 25, type: 'diamond', label: 'diamond'}, {quantity: 25, type: 'diamond', label: 'diamond'},
                        {quantity: 25, type: 'diamond', label: 'diamond'}, {quantity: 25, type: 'diamond', label: 'diamond'},
                        {quantity: 25, type: 'diamond', label: 'diamond'}, {quantity: 25, type: 'diamond', label: 'diamond'},
                        {quantity: 25, type: 'diamond', label: 'diamond'}, {quantity: 25, type: 'diamond', label: 'diamond'},
                        {quantity: 25, type: 'diamond', label: 'diamond'}, {quantity: 25, type: 'diamond', label: 'diamond'}];

    const combatStats = [{icon: require('../../../shared/img/icons/icon-stats.png'), content: '250', label: 'match'},
                        {icon: require('../../../shared/img/icons/icon-stats.png'), content: '95', label: 'win'},
                        {icon: require('../../../shared/img/icons/icon-stats.png'), content: '38%', label: 'win_rate'},
                        {icon: require('../../../shared/img/icons/icon-stats.png'), content: '90/1100', label: 'rank'}];

    return (
      <PageWrapper type={PageWrapper.types.BLUE_NEW}>

        <Navbar minifying/>

        <div className="inventory-page__container">
      
          <HeaderBar size={Container.sizes.NORMAL} label={_t(`my_${query.tab}`)} onBackClicked={() => {}}/>
          <Container className={'inventory-page__main'} size={Container.sizes.NORMAL}>
            <div className="inventory-header__container">
              <div className="user-info">
                <div className="avatar">
                  <div className="border-1">
                    <div className="border-2">
                      <img src=""/>
                    </div>
                  </div>
                </div>

                <div className="details">
                  <div className="name">
                    {userInfo ? userInfo.username : ''}
                  </div>
                  <div className="id">
                    {userInfo ? userInfo.address : ''}
                  </div>
                  <div className="user-properties">
                    <div className="user-cubegoes ">
                      <img src={require('../../../shared/img/store_cubegoes/gold.png')}/>
                      <span>{dataUserCubegoes ? dataUserCubegoes.length : 0}</span>
                    </div>

                    <div className="user-cubegons">
                      <img src={require('../../../shared/img/inventory/surprise.png')}/>
                      <span>25</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <TabsView tabs={myCubegoesTabs} centered 
              selectedTab={query.tab}
              handleOnTabSelect={(tab) => {
                Utils.handleJoinQueryURL(this.props.history.push, query, {tab: tab})
            }}/>

            {
              query.tab === myCubegoesTabs[0].key ? 
                <ListView
                  itemList={Object.values(sampleCubegon)}
                  listItemName={_t('cubegons')}
                  handleGenerateCardView={this.handleGenerateCubegonView}
                  filters={[
                    FilterSearch({_t, searchFields: ['name'], value: query.search}),
                    FilterType({_t, value: query.type, right: true}),
                    FilterSort({_t, sortTypes: [
                      ['-create_time', _t('sort.recent_cubegons')],
                      ['-total_level -create_time', _t('sort.highest_level')],
                      ['+total_level -create_time', _t('sort.lowest_level')],
                      ['-total_bp -create_time', _t('sort.highest_bp')],
                      ['+total_bp -create_time', _t('sort.lowest_bp')],
                      ['+name -create_time', _t('sort.name_az')],
                      ['-name -create_time', _t('sort.name_za')],
                    ], defaultSort: '-level -create_time', value: query.sort, right: true})
                  ]}
                  page={query.page}
                  handleFilter={(filterValues) => {Utils.handleJoinQueryURL(this.props.history.push, query, filterValues)}}
                /> : this.handleGenerateCubegoView(dataUserCubegoes ? dataUserCubegoes : [])
            }

            
            
          </Container>
        </div>
        <Footer size={Container.sizes.NORMAL} type={Footer.types.DARK}/>
      </PageWrapper>
    )
  }
}

const mapStateToProps = (store, props) => {
  let query = Utils.ParseQueryString(props.location.search);
  query = {
    ...query,
    tab: myCubegoesTabs.map(tab => tab.key).includes(query.tab) ? query.tab : myCubegoesTabs[0].key,
    page: query.page ? query.page : 1,
  }

  let userId = GetLoggedInUserId(store);
  return {
    query,
    _t: getTranslate(store.localeReducer),
    userId,
    userCubegons: GetUserCubegons(store, userId),
    userInfo: GetUserInfo(store, userId),
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Inventory));