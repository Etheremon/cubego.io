import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';

import withRouter from 'react-router/es/withRouter';
import { Container } from '../../widgets/Container/Container.jsx';
import { PageWrapper } from '../../widgets/PageWrapper/PageWrapper.jsx';
import Navbar from '../../components/bars/Navbar/Navbar.jsx';
import { HeaderBar } from '../../components/bars/HeaderBar/HeaderBar.jsx';
import * as Utils from "../../../utils/utils";
import TabsView from '../../widgets/TabsView/TabsView.jsx';
import {CubegoCard} from '../../components/CubegoCard/CubegoCard.jsx';
import ListView from '../../widgets/ListView/ListView.jsx';
import CubegonCard from '../../components/CubegonCard/CubegonCard.jsx';
import { FilterSearch, FilterSort, FilterType } from '../../widgets/Filters/Filters.jsx';
import Footer from "../../components/bars/Footer/Footer.jsx";
import { UserActions } from '../../../actions/user';
import { GetLoggedInUserId, GetUserCubegons, GetUserInfo, GetUserPendingCubegons } from '../../../reducers/selectors.js';
import { CUBE_MATERIALS } from '../../../constants/cubego';
import Loading from "../../components/Loading/Loading.jsx";
import {EmptyCubegoList, EmptyCubegonList} from "../EmptyView/EmptyView.jsx";
import {GetUserMaterials} from "../../../reducers/selectors";
import {URLS} from "../../../constants/general";
import { Link } from 'react-router-dom';
import PendingCubegonCard from "../../components/PendingCubegonCard/PendingCubegonCard.jsx";
import {TransferCubegon, TransferMaterialCube} from "../../../services/transaction";
import {addTxn} from "../../../actions/txnAction";

require("style-loader!./Inventory.scss");

const inventoryTabs = Utils.IsLiveServer
  ? [ {key: 'cubegoes', content: 'cubegoes'}, {key: 'cubegons', content: 'cubegons'}]
  : [ {key: 'cubegoes', content: 'cubegoes'}, {key: 'cubegons', content: 'cubegons'}, {key: 'pending-cubegons', content: 'pending cubegons'}];

class Inventory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }

    this.handleGenerateCubegonView = this.handleGenerateCubegonView.bind(this);
    this.handleGenerateCubegoView = this.handleGenerateCubegoView.bind(this);
    this.handleGeneratePendingCubegonView = this.handleGeneratePendingCubegonView.bind(this);
    this.renderTabContent = this.renderTabContent.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(UserActions.LOAD_USER_CUBEGON.init.func({userId: this.props.userId, forceUpdate: true}));
  }

  componentWillUnmount() {
    this.props.dispatch(UserActions.LOAD_USER_CUBEGON.stop.func({userId: this.props.userId}));
  }

  handleGeneratePendingCubegonView(cubegons) {
    return (
      <div className="list-item__container">
        {cubegons.map((item, idx) => 
          <div className="card-item" key={idx}>
            <PendingCubegonCard key={idx} {...item} />
          </div>
        )}
      </div>
    )
  }

  handleGenerateCubegonView(cubegons) {
    return (
      <div className="list-item__container">
        {cubegons.map((item, idx) => 
          <div className="card-item" key={idx}>
            <Link to={`/${URLS.CUBEGONS}/${item.id}`}>
              <CubegonCard key={idx} {...item} />
            </Link>
          </div>
        )}
      </div>
    )
  }

  handleGenerateCubegoView(cubegoes) {
    const {_t, history, userId} = this.props;

    if (!cubegoes) {
      return (
        <div className="cubego-view__container">
          <div className="list-item__container">
            <Loading/>
          </div>
        </div>
      )
    }

    if (!cubegoes.length) {
      return (
        <EmptyCubegoList _t={_t} history={history}/>
      )
    }

    return (
      <div className="cubego-view__container">
        <div className="list-item__container">
          {cubegoes.sort((a, b) => (b.material_id - a.material_id)).map((item, idx) =>
            <div className="card-item tag-cubego" key={idx}>
              <CubegoCard key={idx} {...item} _t={_t} onTransferFunc={item.name === 'plastic' ? null : () => {
                TransferMaterialCube(this.props.dispatch, addTxn, _t, {
                  fromAdd: userId,
                  cubeName: item.name,
                  numCubes: item.amount,
                  successCallback: (data) => {
                  },
                  failedCallback: null,
                  finishCallback: () => {
                  },
                });

              }}/>
            </div>
          )}
        </div>

      </div>
    )
  }

  renderTabContent(dataUserMaterials) {
    const {_t, query, userCubegons, userPendingCubegons,history} = this.props;
    if (query.tab !== inventoryTabs[0].key) {
      if (!userCubegons && !userPendingCubegons) {
        return (
          <div className="list-item__container">
            <Loading/>
          </div>
        )
      }

      let isCubegonTab = query.tab === inventoryTabs[1].key;

      return (
        <React.Fragment>
          {!isCubegonTab ?
            <div className={'pending-note'}>
              {_t('pending_cubegon_desc')}
            </div> : null
          }
          <ListView
            emptyView={<EmptyCubegonList _t={_t} history={history}/>}
            itemList={query.tab === inventoryTabs[1].key ? (userCubegons || []) : (userPendingCubegons || [])}
            listItemName={_t('cubegons')}
            handleGenerateCardView={(cubegons) => (isCubegonTab ? this.handleGenerateCubegonView(cubegons) : this.handleGeneratePendingCubegonView(cubegons))}
            filters={[
              FilterSearch({_t, searchFields: ['id'], value: query.search}),
              FilterType({_t, value: query.type, right: true}),
              FilterSort({_t, sortTypes: [
                ['+total_cubego', _t('sort.lowest_cubegoes')],
                ['+total_stats', _t('sort.lowest_stats')],
              ], defaultSort: '+total_cubego', value: query.sort, right: true})
            ]}
            page={query.page}
            handleFilter={(filterValues) => {Utils.handleJoinQueryURL(this.props.history.push, query, filterValues)}}
          />
        </React.Fragment>
      )
    }
    else {
      return this.handleGenerateCubegoView(dataUserMaterials ? dataUserMaterials : null)
    }
  }

  render() {
    const {_t, query, userCubegons, userMaterials, userInfo, userId} = this.props;
    let dataUserMaterials;

    if (userMaterials) {
      dataUserMaterials = userMaterials.filter(item => item.amount > 0)
      dataUserMaterials = dataUserMaterials.map(item => {
        return {...item, ...CUBE_MATERIALS[item.material_id] } 
      });
    }

    return (
      <PageWrapper type={PageWrapper.types.BLUE_NEW}>

        <Navbar minifying/>

        <div className="inventory-page__container">
      
          <HeaderBar size={Container.sizes.NORMAL} label={_t(`inventory`)}
                     userInfo={userInfo} onBackClicked={() => {this.props.history.goBack()}}/>

          <div className={'inventory-page__header'}>

            <div className="inventory-header__container">

              <Container size={Container.sizes.NORMAL} className={'container-wrap'}>
                <div className="user-info">
                <div className="avatar">
                  <div className="border-1">
                    <div className="border-2">
                      {userId !== undefined ?
                        <img src={require(`../../../shared/img/emoticons/${userId ? userId[40].charCodeAt(0) % 11 : 0}.png`)}/> : null
                      }
                    </div>
                  </div>
                </div>

                <div className="details">
                  <div className="name">
                    {userId !== null && userInfo ?
                      <React.Fragment>
                        <p className={'name-wrap'}>{userInfo.username || Utils.CutoffString(userId, 6)}</p>
                        <img className={'edit-pencil'} onClick={() => {this.props.history.push(`/${URLS.SIGN_IN}`)}} src={require('../../../shared/img/icons/icon_pencil.png')} />
                      </React.Fragment> :
                      <p className={'name-wrap m--pointer'} onClick={() => {this.props.history.push(`/${URLS.SIGN_IN}`)}}>{_t('sign in')}</p>
                    }
                  </div>
                  {/*<div className="id">*/}
                  {/*{userInfo ? userInfo.address : ''}*/}
                  {/*</div>*/}
                  <div className="user-properties">
                    <div className="user-cubegoes item">
                      <img src={require('../../../shared/img/inventory/cubego.png')}/>
                      <span>{dataUserMaterials ? dataUserMaterials.reduce((acc, item) => acc + item.available_amount , 0) : 0}</span>
                      <div className={'user-properties__note'}>{_t('cubegoes')}</div>
                    </div>

                    <div className="user-cubegons item">
                      <img src={require('../../../shared/img/inventory/cubegon.png')}/>
                      <span>{userCubegons ? userCubegons.length : 0}</span>
                      <div className={'user-properties__note'}>{_t('cubegons')}</div>
                    </div>
                  </div>
                </div>
                </div>

                <div className={'user-stats'}>
                  <div className={'item'}>
                    <div className={'value'}>0</div>
                    <div className={'title'}>{_t('matches')}</div>
                  </div>
                  <div className={'item'}>
                    <div className={'value'}>0</div>
                    <div className={'title'}>{_t('wins')}</div>
                  </div>
                  <div className={'item'}>
                    <div className={'value'}>0%</div>
                    <div className={'title'}>{_t('win rate')}</div>
                  </div>
                  <div className={'item'}>
                    <div className={'value'}>0/0</div>
                    <div className={'title'}>{_t('rank')}</div>
                  </div>
                </div>
              </Container>

            </div>

            <TabsView tabs={inventoryTabs} centered
                      selectedTab={query.tab}
                      handleOnTabSelect={(tab) => {
                        Utils.handleJoinQueryURL(this.props.history.push, query, {tab: tab})
                      }}/>
          </div>

          <Container className={'inventory-page__main'} size={Container.sizes.NORMAL}>
            {
              this.renderTabContent(dataUserMaterials)
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
    tab: inventoryTabs.map(tab => tab.key).includes(query.tab) ? query.tab : inventoryTabs[0].key,
    page: query.page ? query.page : 1,
  }

  let userId = GetLoggedInUserId(store);
  return {
    query,
    _t: getTranslate(store.localeReducer),
    userId,
    userPendingCubegons: GetUserPendingCubegons(store, userId),
    userCubegons: GetUserCubegons(store, userId),
    userMaterials: GetUserMaterials(store, userId),
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