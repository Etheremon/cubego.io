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
import Slider from '../../widgets/Slider/Slider.jsx';
import TabsView from '../../widgets/TabsView/TabsView.jsx';
import CubegoesView from './CubegoesView/CubegoesView.jsx';
import Countdown from '../../widgets/Countdown/Countdown.jsx';
import {GetLoggedInUserId, GetStoreBanners, GetUserInfo} from "../../../reducers/selectors";
import {getActiveLanguage} from "react-localize-redux/lib/index";
import {ButtonNew} from "../../widgets/Button/Button.jsx";
import * as Config from "../../../config";
import {URLS} from "../../../constants/general";
import ReferralView from '../Referral/ReferralView.jsx';
import { DiscountFrame } from '../../widgets/SVGManager/SVGManager.jsx';

require("style-loader!./StorePage.scss");

const storeTabs = [ {key: 'cubegoes', content: 'cubegoes'}];//, {key: 'cubegoes', content: 'cubegoes'}];

class StorePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: -1,
    };

    this.renderBanner = this.renderBanner.bind(this);
  }

  componentDidMount() {

  }

  renderBanner() {
    const { language, banners, _t } = this.props;

    const bannerList = (banners || []).map((banner, idx) => {
      let btn = null;
      let customBtn = banner[`${language.code}custombtn`] || banner[`encustombtn`];
      if (customBtn)
        btn = (
          <img className={'store-page__banner-btn img'} src={customBtn}
               onClick={() => {
                 if (banner['newtab'] === 'TRUE')
                   Utils.OpenInNewTab(banner[`${language.code}link`] || banner[`enlink`]);
                 else
                   this.props.history.push(banner[`${language.code}link`] || banner[`enlink`]);
               }}
          />
        );
      else
        btn = banner[`${language.code}text`] || banner[`entext`] ?
          <ButtonNew className={'store-page__banner-btn'} label={banner[`${language.code}text`] || banner[`entext`]}
                     onClick={() => {
                       if (banner['newtab'] === 'TRUE')
                         Utils.OpenInNewTab(banner[`${language.code}link`] || banner[`enlink`]);
                       else
                         this.props.history.push(banner[`${language.code}link`] || banner[`enlink`]);
                     }}
          /> : null;

      let bannerImg = banner[`${language.code}img`] || banner[`enimg`];
      let bannerImgMobile = banner[`${language.code}imgmobile`] || banner[`enimgmobile`];
      return (
        <div key={idx} className={'store-page__banner-item'} style={{height: banner['bannerheight'] ? `${banner['bannerheight']}px` : '300px'}}>
          <img className={'store-page__banner-img'} src={Utils.IsMobile ? bannerImgMobile || bannerImg : bannerImg || bannerImgMobile} />
          {btn}
        </div>
      )
    });

    if (Config.START_PRESALE) {
      return bannerList;
    }

    return [
      <div className={'store-page__banner-item'} style={{height: '300px'}}>
        <img className={'store-page__banner-img'} src={require(`../../../shared/img/banner/banner_store.png`)} />
        <div className="main-content__container">
          <p className={'presale-text'}>{_t('presale start in')}</p>
          <Countdown className={'countdown__container'} presaleDate={Config.PRESALE_DATE} onFinishCountdown={() => {
                  window.location.reload()
              }}/>
          <p className={'presale-time'}>({Config.PRESALE_DATE})</p>
          <ButtonNew className={'presale-btn'} label={_t('register now for presale')} showDeco={ButtonNew.deco.BOTH} onClick={() => {
            this.props.history.push(`/${URLS.SIGN_IN}`)
          }}/>
        </div>
      </div>
    ]
  }

  
  render() {
    const {_t, query, userInfo} = this.props;

    return (
      <PageWrapper type={PageWrapper.types.BLUE_NEW}>
        <Navbar minifying />

        <div className="store-page__container">
          <HeaderBar label={_t('official_store')}
                     userInfo={userInfo} onBackClicked={() => {this.props.history.goBack()}}/>

          <div className={'store-page__banner'} id={'store'}>
            <Slider list={this.renderBanner()}/>
          </div>

          <TabsView tabs={storeTabs} centered 
              selectedTab={query.tab}
              handleOnTabSelect={(tab) => {
                Utils.handleJoinQueryURL(this.props.history.push, query, {tab: tab})
            }}/>

          <Container size={Container.sizes.SMALL}>
            <ReferralView className={'referral-box'} />
          </Container>

          <Container className={'store-page__main'}>
            {
              // query.tab === storeTabs[1].key ? <CubegoesView history={this.props.history} /> : null
              <CubegoesView history={this.props.history} />
            }

          </Container>
        </div>

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
  };
  let userId = GetLoggedInUserId(store);
  return {
    _t: getTranslate(store.localeReducer),
    query,
    banners: GetStoreBanners(store),
    language: getActiveLanguage(store.localeReducer),
    userInfo: GetUserInfo(store, userId),
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(StorePage));