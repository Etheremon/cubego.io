import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';

import withRouter from 'react-router/es/withRouter';
import { Container } from '../../widgets/Container/Container.jsx';
import { PageWrapper } from '../../widgets/PageWrapper/PageWrapper.jsx';
import Navbar from '../../components/bars/Navbar/Navbar.jsx';
import { HeaderBar } from '../../components/bars/HeaderBar/HeaderBar.jsx';
import * as Utils from "../../../utils/utils";
import Footer from "../../components/bars/Footer/Footer.jsx";
import { CubegonActions } from '../../../actions/cubegon';
import { GetLoggedInUserId, GetCubegonList, GetUserInfo } from '../../../reducers/selectors.js';
import { GetImageFromGonID } from '../../../utils/logicUtils.js';
import TabsView from '../../widgets/TabsView/TabsView.jsx';
import ShowRoom from './ShowRoom/ShowRoom.jsx';

const galleryTabs = [ {key: 'showroom', content: 'showroom'}];

require("style-loader!./Gallery.scss");

class Gallery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.renderSliderShow = this.renderSliderShow.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(CubegonActions.LOAD_CUBEGON_LIST.init.func({forceUpdate: true}));
  }

  componentWillUnmount() {
    this.props.dispatch(CubegonActions.LOAD_CUBEGON_LIST.stop.func({}));
  }

  renderSliderShow() {
    const {listCubegons} = this.props;
    if (!listCubegons) return null;

    return (
      <div className="slider-show__container">
        {
          listCubegons.sort((a, b) => (b.token_id - a.token_id)).map((ele, idx) => (
            <div className="slider-cell" key={idx}>
              <img src={GetImageFromGonID(ele.id)}/>
            </div>
          ))
        }
      </div>
    )
  }

  render() {
    const {_t, query, listCubegons, userId, userInfo} = this.props;

    return (
      <PageWrapper type={PageWrapper.types.BLUE_NEW}>

        <Navbar minifying/>

        <div className="gallery-page__container">
      
          <HeaderBar size={Container.sizes.NORMAL} label={_t(`gallery`)}
                     userInfo={userInfo} onBackClicked={() => {this.props.history.goBack()}}/>

          <div className="gallery-banner">
            {
              this.renderSliderShow()
            }
          </div>

          <TabsView tabs={galleryTabs} centered
                      selectedTab={query.tab}
                      handleOnTabSelect={(tab) => {
                        Utils.handleJoinQueryURL(this.props.history.push, query, {tab: tab})
                      }}/>

          <Container className={'gallery-page__main'} size={Container.sizes.NORMAL}>
            <ShowRoom _t={_t} listCubegons={listCubegons} history={history} query={query}/>
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
    tab: galleryTabs.map(tab => tab.key).includes(query.tab) ? query.tab : galleryTabs[0].key,
    page: query.page ? query.page : 1,
  }

  let userId = GetLoggedInUserId(store);
  return {
    query,
    _t: getTranslate(store.localeReducer),
    userId,
    listCubegons: GetCubegonList(store),
    userInfo: GetUserInfo(store, userId),
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery));