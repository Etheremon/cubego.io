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
import {URLS} from "../../../constants/general";
import Slider from '../../widgets/Slider/Slider.jsx';
import { ButtonNew } from '../../widgets/Button/Button.jsx';
import TabsView from '../../widgets/TabsView/TabsView.jsx';
import CubegoesView from './CubegoesView/CubegoesView.jsx';
import Countdown from '../../widgets/Countdown/Countdown.jsx';

require("style-loader!./StorePage.scss");

const storeTabs = [ {key: 'cubegons', content: 'cubegons'}, {key: 'cubegoes', content: 'cubegoes'}];

class StorePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: -1,
    }

    this.renderBanner = this.renderBanner.bind(this);
  }

  renderBanner() {
    const { _t } = this.props;

    return ([
      <div className={'store__banner-item'} key={'banner-1'}>
        <img src={require('../../../shared/img/banner/banner_store.png')}/>
        {/*<ButtonNew showDeco={ButtonNew.deco.BOTH} className={'store__banner-btn'} label={_t('build_model')} onClick={() => {*/}
          {/*this.props.history.push(`/${URLS.BUILD_GON}`)*/}
        {/*}}/>*/}
      </div>,
    ])
  }

  render() {
    const {_t, query} = this.props;

    return (
      <PageWrapper type={PageWrapper.types.GRADIENT_BLUE}>
        <Navbar minifying />

        <div className="store-page__container">
          <HeaderBar label={_t('official_store')} onBackClicked={() => {this.props.history.goBack()}}/>

          <div className={'store__banner'} id={'store'}>
            <Slider list={this.renderBanner()}/>
          </div>

          <TabsView tabs={storeTabs} centered 
              selectedTab={query.tab}
              handleOnTabSelect={(tab) => {
                Utils.handleJoinQueryURL(this.props.history.push, query, {tab: tab})
            }}/>

          <Countdown className={'countdown__container'} presaleDate={'Nov 1 2018'}/>

          <Container className={'store-page__main'}>
            {
              query.tab === storeTabs[0].key ? <CubegoesView /> : null
            }

          </Container>
        </div>12

        <Footer type={Footer.types.DARK} />
      </PageWrapper>
    )
  }
}

const mapStateToProps = (store, props) => {
  let query = Utils.ParseQueryString(props.location.search);
  query = {
    ...query,
    tab: storeTabs.map(tab => tab.key).includes(query.tab) ? query.tab : storeTabs[0].key,
  }
  return {
    _t: getTranslate(store.localeReducer),
    query,
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(StorePage));