import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';

import withRouter from "react-router-dom/es/withRouter";

import Navbar from '../../components/bars/Navbar/Navbar.jsx'
import Footer from '../../components/bars/Footer/Footer.jsx'
import Slider from '../../widgets/Slider/Slider.jsx';
import { ButtonNew } from '../../widgets/Button/Button.jsx';
import { Container } from '../../widgets/Container/Container.jsx';
import { Text } from '../../widgets/Text/Text.jsx';
import { PageWrapper } from '../../widgets/PageWrapper/PageWrapper.jsx';
import InviewMonitor from '../../widgets/InviewMonitor/InviewMonitor.jsx';
import * as Utils from "../../../utils/utils";
import {GetHomeBanners, GetLoggedInUserId, GetUserInfo} from "../../../reducers/selectors";
import {getActiveLanguage} from "react-localize-redux/lib/index";
import {URLS, REFERRAL_EXPIRED} from "../../../constants/general";
import * as Config from "../../../config";
import Countdown from "../../widgets/Countdown/Countdown.jsx";
import Roadmap from "./Roadmap/Roadmap.jsx";
import {SubBgr} from "./SubBgr/SubBgr.jsx";
import * as LS from "../../../services/localStorageService";
import TeamCard from './TeamCard/TeamCard.jsx';

require("style-loader!./Home.scss");

const introCubegon = [
  {img: require('../../../shared/img/assets/model_example_moose.png'), name: 'MOOSE', creator: 'Nhu'},
  {img: require('../../../shared/img/assets/model_example_2.png'), name: 'VEXIGON', creator: 'Nhu'},
  {img: require('../../../shared/img/assets/model_example_bull.png'), name: 'BULLO', creator: 'Nhu'}
];
const channels = [
  {img: require('../../../shared/img/socialMedia/icon-white-discord.png'), name: 'DISCORD', link: 'https://discordapp.com/invite/pYD5tss'},
  {img: require('../../../shared/img/socialMedia/icon-white-twitter.png'), name: 'TWITTER', link: 'https://twitter.com/cubego_io'},
  {img: require('../../../shared/img/socialMedia/icon-white-telegram.png'), name: 'TELEGRAM', link: 'https://t.me/cubego'},
];

const advisors = [
  {img: require('../../../shared/img/advisors/loi_luu.jpg'), name: 'Loi Luu', desc: 'advisors.loiluu', twitter: 'https://twitter.com/loi_luu', linkedin: 'https://www.linkedin.com/in/loiluu/'},
  {img: require('../../../shared/img/advisors/air.jpeg'), name: 'Ari Meilich', desc: 'advisors.arimeilich', twitter: 'https://twitter.com/arimeilich', linkedin: 'https://www.linkedin.com/in/arimeilich/'},
];

const team_1 = [
  {img: require('../../../shared/img/team_members/jarvisnguyen.jpg'), name: 'Jarvis Nguyen', desc: 'team.jarvisnguyen', twitter: 'https://twitter.com/jarvis_ngn', linkedin: 'https://www.linkedin.com/in/jarvisnguyen/'},
  {img: require('../../../shared/img/team_members/ngonam.jpg'), name: 'Nedrick Ngo', desc: 'team.namngo', linkedin: 'https://www.linkedin.com/in/ngo-nam-nedrick-89569024'},
  {img: require('../../../shared/img/team_members/jaketran.png'), name: 'Jake Tran', desc: 'team.jaketran', linkedin: 'https://www.linkedin.com/in/tri-jake-tran-67132ab6'},
];

const team_2 = [
  {img: require('../../../shared/img/team_members/duyentran.png'), name: 'Duyen Tran', desc: 'team.duyentran', linkedin: 'https://www.linkedin.com/in/duyensaigon/'},
  {img: require('../../../shared/img/team_members/thupham.jpg'), name: 'Thomas Pham', desc: 'team.thupham', twitter: 'https://twitter.com/_thupv'},
  {img: require('../../../shared/img/team_members/duc.png'), name: 'Duc Nguyen', desc: 'team.ducnguyen', github: 'https://github.com/Nhduc0611'},
  {img: require('../../../shared/img/team_members/nhupham.jpg'), name: 'Nhu Pham', desc: 'team.nhupham', linkedin: 'https://www.linkedin.com/in/nhu-pham-344331165', artstation: 'https://www.artstation.com/pbqnhu'},
  {img: require('../../../shared/img/team_members/nguyen.jpg'), name: 'Nguyen Nguyen', desc: 'team.nguyennguyen', artstation: 'https://www.artstation.com/nguyenguyen'},
  {img: require('../../../shared/img/team_members/lan.jpeg'), name: 'Lan Lai', desc: 'team.lanlai'},
  {img: require('../../../shared/img/team_members/taikitamura.jpeg'), name: 'Tai Kitamura', desc: 'team.taikitamura', twitter: 'https://twitter.com/questionstation'},
  {img: require('../../../shared/img/team_members/minh.jpg'), name: 'Minh Do', desc: 'team.minhdo'},
  {img: require('../../../shared/img/team_members/liemnguyen.jpg'), name: 'Liem Nguyen', desc: 'team.liemnguyen', twitter: 'https://twitter.com/alittlecreion', linkedin: 'https://linkedin.com/in/nkliem'},
];

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };

    this.validateEmail = this.validateEmail.bind(this);
  }

  componentDidMount() {

  }

  renderBanner() {
    const { language, banners } = this.props;

    const bannerList = (banners || []).map((banner, idx) => {
      let btn = null;
      let customBtn = banner[`${language.code}custombtn`] || banner[`encustombtn`];
      if (customBtn)
        btn = (
          <img className={'home__banner-btn img'} src={customBtn}
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
          <ButtonNew className={'home__banner-btn'} label={banner[`${language.code}text`] || banner[`entext`]}
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
        <div key={idx} className={'home__banner-item'} style={{height: banner['bannerheight'] ? `${banner['bannerheight']}px` : '400px'}}>
          <img className={'home__banner-img'} src={Utils.IsMobile ? bannerImgMobile || bannerImg : bannerImg || bannerImgMobile} />
          {btn}
        </div>
      )
    });

    return bannerList;
  }

  validateEmail() {

  }

  render() {
    // let {activeCube} = this.state;
    const { _t, pathName, userInfo } = this.props;
    // const guildGame = [
    //   {component: <img className={'guild-game'} key={'guild-game-1'} src={require('../../../shared/img/assets/model_example_1.png')}/>, text: _t('buy')} ,
    //   {component: <img className={'guild-game'} key={'guild-game-2'} src={require('../../../shared/img/assets/model_example_2.png')}/>, text: _t('build')} ,
    //   {component: <img className={'guild-game'} key={'guild-game-3'} src={require('../../../shared/img/assets/model_example_3.png')}/>, text: _t('battle')} ,
    // ];

    // const customIndicators = [
    //   <div className={'feature-indicator'} key={'btn-1'} >{_t('trading')}</div>,
    //   <div className={'feature-indicator'} key={'btn-2'} >{_t('auction')}</div>,
    //   <div className={'feature-indicator'} key={'btn-3'} >{_t('market')}</div>,
    //   <div className={'feature-indicator'} key={'btn-4'} >{_t('battle')}</div>,
    // ];

    return (
      <PageWrapper>
        <Navbar pathName={pathName} transforming navbarType={'home'} scrollingElement={'home-page'}/>

        <div className={'home-page'} id={'home-page'}>

          <div className={'home__banner'} id={'home'}>
            <Slider list={this.renderBanner()}/>
          </div>
          {/* end home__banner */}

          {
            !Config.START_PRESALE ? <div className={'home__intro-countdown'}>
              <p className={'presale-text'}>{_t('presale start in')}</p>
              <Countdown className={'countdown__container'} targetTime={Config.PRESALE_DATE} onFinishCountdown={() => {
                  window.location.reload()
              }}/>
  
              <div className={'btns'}>
                {
                  userInfo && userInfo.username ? <ButtonNew className={'create__button'} label={_t('purchase now')}
                  onClick={() => {this.props.history.push(`/${URLS.STORE}`)
                  }}/> : <ButtonNew className={'create__button'} label={_t('register for presale')}
                  onClick={() => {this.props.history.push(`/${URLS.SIGN_IN}`)
                  }}/>
                }
              </div>
            </div> : null
          }

          <SubBgr position={SubBgr.positions.RIGHT} color={SubBgr.colors.BLUE}/>
          <Container size={Container.sizes.NORMAL} className="home__intro" id={'intro'}>
            <div className={'home__intro-main'}>
              <div className="home__intro-board">
                <div className={'home__intro-header'}>
                  <span>{_t('what_is_cubego')}</span>
                </div>
                <p>{_t('home.opening')}</p>
                <ButtonNew className={'create__button'} label={_t('build_cubegon')}
                           color={ButtonNew.colors.BLUE}
                           onClick={
                             () => {this.props.history.push(`/${URLS.BUILD_GON}`)}
                           }
                />
                <ButtonNew className={'watchbattle__button'} label={_t('watch battle')}
                           onClick={
                             () => {this.props.history.push(`/${URLS.BATTLE}`)}
                           }
                />
              </div>
              <div className={'home__intro-build'}>
                <div className={'home__intro-gif'}>
                  <img src={require('../../../shared/img/gif/build.gif')}/>
                </div>
              </div>
            </div>

          </Container>
          {/* end home__intro */}

          <div className="home__why-presale" id={'why_presale'}>
            <div className="home__why-presale-title__container extended-title__container">
              <Text className={'home__why-presale-title extended-title'} type={Text.types.H2} children={_t('why_joining_cubego_presale_header')} />
            </div>
          </div>

          <div className="home__game-detail">

              <Container className={'home__why-presale section'}>

                <div className={'content left'}>
                  <InviewMonitor
                    classNameNotInView='vis-hidden'
                    classNameInView='animated fadeInUp'
                  >
                    <div className={'desc'}>
                      <p className={'text'}>{_t('home.why_presale')}</p>
                      <div className="why-presale__button" onClick={() => { this.props.history.push(`/${URLS.GUIDE}`) }}>
                           {_t('read more')}
                      </div>
                    </div>
                  </InviewMonitor>
    
                  <div className={'image'}>
                    <div className={'img'}>
                      <img className={'img-real why_presale'} src={require('../../../shared/img/banner/banner_chest.png')}/>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          {/* end home__why-presale */}


          <div className="home__modes" id={'modes'}>
            <div className="home__modes-title__container extended-title__container">
              <Text className={'home__modes-title extended-title'} type={Text.types.H2} children={_t('how_to_play')} />
            </div>
          </div>
          {/* end home__modes */}

          <div className="home__game-detail" id={'game-detail'}>

              <Container className={'home__game-detail__1 section'}>
                <div className={'background yellow left'}/>

                <div className={'content left'}>

                  <InviewMonitor
                    classNameNotInView='vis-hidden'
                    classNameInView='animated fadeInLeft'
                  >
                    <div className={'desc'} >
                      <Text className={'header'} type={Text.types.H3} children={_t('creation').toUpperCase()} />
                      <p className={'text'}>{_t('home.creation')}</p>
                    </div>
                  </InviewMonitor>

                  <div className={'image'} >
                    <div className={'img creation'}>
                      <img className={'img-real'} src={require('../../../shared/img/banner/banner-world.png')}/>
                    </div>
                    {/*<div className={'img'}>*/}
                      {/*<SpriteSheet {...SpriteSource.CREATION}/>*/}
                    {/*</div>*/}
                  </div>

                </div>
              </Container>

              <Container className={'home__game-detail__2 section'}>
                <div className={'background blue right'}/>

                <div className={'content right'}>
                  <InviewMonitor
                    classNameNotInView='vis-hidden'
                    classNameInView='animated fadeInRight'
                  >
                    <div className={'desc'}>
                      <Text className={'header'} type={Text.types.H2} children={_t('copyright').toUpperCase()} />
                      <p className={'text'}>{_t('home.copyright')}</p>
                    </div>
                  </InviewMonitor>

                  <div className={'image'} >
                    <div className={'img'}>
                      <img className={'img-real copyright'} src={require('../../../shared/img/game_intro/trade-eth.png')}/>
                    </div>
                    {/*<div className={'img'}>*/}
                      {/*<SpriteSheet {...SpriteSource.COPYRIGHT}/>*/}
                    {/*</div>*/}
                  </div>
                </div>
              </Container>

              <Container className={'home__game-detail__3 section'}>
                <div className={'background red left'}/>

                <div className={'content left'}>
                  <InviewMonitor
                    classNameNotInView='vis-hidden'
                    classNameInView='animated fadeInUp'
                  >
                    <div className={'desc'}>
                      <Text className={'header'} type={Text.types.H2} children={_t('home_combat_title').toUpperCase()} />
                      <p className={'text'}>{_t('home.combat')}</p>
                    </div>
                  </InviewMonitor>
    
                  <div className={'image'}>
                    <div className={'img'}>
                      <img className={'img-real combat'} src={require('../../../shared/img/banner/battle_banner.png')}/>
                    </div>
                    {/*<div className={'img combat'}>*/}
                      {/*<SpriteSheet {...SpriteSource.BATTLE}/>*/}
                    {/*</div>*/}
                  </div>
                </div>
              </Container>
          </div>
          {/* end home__game-detail */}

          <div className={'home__roadmap'}>
            <Container size={Container.sizes.NORMAL}>
              <div className={'home__roadmap-header'}>
                {_t('roadmap')}
              </div>
              <Roadmap/>
            </Container>
          </div>

          <InviewMonitor
            classNameNotInView='vis-collapse'
            classNameInView='animated custom'>
            <div className={'home__partnership'} id={'partners'}>
              <SubBgr position={SubBgr.positions.RIGHT} color={SubBgr.colors.YELLOW}/>
              <Text className={'partnership__header'} type={Text.types.H2} children={_t('in_partnership_with')} />
              <div className={'home__partnership__imgs'}>
                {/*<a href={'https://decentraland.org/?utm_source=etheremon&utm_medium=etheremon&utm_campaign=etheremon'} target={'_blank'}><img src={require('../../../shared/img/partners/decentraland.png')}/><p>DECENTRALAND</p></a>*/}
                <a href={'https://kyber.network/?utm_source=etheremon&utm_medium=etheremon&utm_campaign=etheremon'} target={'_blank'}><img src={require('../../../shared/img/partners/kybernetwork.png')} /><p>Kyber Network</p></a>
                <a href={'https://zilliqa.com/?utm_source=etheremon&utm_medium=etheremon&utm_campaign=etheremon'} target={'_blank'}><img src={require('../../../shared/img/partners/zilliqa-logo.png')} /><p>Zilliqa</p></a>
                <a href={'http://emontalliance.com?utm_source=etheremon&utm_medium=etheremon&utm_campaign=etheremon'} target={'_blank'}><img src={require('../../../shared/img/partners/emont-alliance.png')} /><p>EMONT Alliance</p></a>
                <a href={'https://opskins.com/?utm_source=etheremon&utm_medium=etheremon&utm_campaign=etheremon'} target={'_blank'}><img src={require('../../../shared/img/partners/opskins.png')}/><p>OPSkins</p></a>
                <a href={'https://www.toshi.org/?utm_source=etheremon&utm_medium=etheremon&utm_campaign=etheremon'} target={'_blank'}><img src={require('../../../shared/img/partners/toshi.jpg')} /><p>Coinbase Wallet</p></a>
                <a href={'https://opensea.io/?utm_source=etheremon&utm_medium=etheremon&utm_campaign=etheremon'} target={'_blank'}><img src={require('../../../shared/img/partners/opensea.png')} /><p>OpenSea</p></a>
                <a href={'https://ginco.io/en/?utm_source=etheremon&utm_medium=etheremon&utm_campaign=etheremon'} target={'_blank'}><img src={require('../../../shared/img/partners/ginco.png')} /><p>Ginco</p></a>
                <a href={'https://dapp.com/?utm_source=etheremon&utm_medium=etheremon&utm_campaign=etheremon'} target={'_blank'}><img src={require('../../../shared/img/partners/dapp.png')} /><p>Dapp.com</p></a>
              </div>
            </div>
          </InviewMonitor>
          {/* end home__partnership */}

          <div className={'home__advisors'} id={'advisors'}>
            <Container size={Container.sizes.NORMAL}>
              
            </Container>
          </div>
          {/* end home__advisors */}

          <div className={'home__team-members'} id={'team-members'}>
            <Text className={'advisors__header'} type={Text.types.H2} children={_t('proj_advisors')} />
            <Container>
              <div className="advisors__list team__listview">
                {
                  advisors.map((item,idx) =>
                    <div className={'item'} key={idx}>
                      <TeamCard {...item} />
                    </div>
                  )
                }
              </div>
            </Container>
            <Text className={'team-members__header'} type={Text.types.H2} children={_t('meet_the_team')} />
            <div className="team-members__subtitle">
                {_t('team_members_sub_title')}
            </div>

            <Container className={'team__list'}>
              <div className="team-1 team__listview">
                {
                  team_1.map((item,idx) =>
                    <div className={'item'} key={idx}>
                      <TeamCard {...item} />
                    </div>
                  )
                }
              </div>
              <div className="team-2 team__listview">
                {
                  team_2.map((item,idx) =>
                    <div className={'item'} key={idx}>
                      <TeamCard {...item} />
                    </div>
                  )
                }
              </div>
            </Container>
          </div>
          {/* end home__team-members */}

          <InviewMonitor
            classNameNotInView='vis-collapse'
            classNameInView='animated custom'>
            <div className="home__channels">
              <SubBgr position={SubBgr.positions.LEFT} color={SubBgr.colors.YELLOW}/>
              <Text className={'channels__header'} type={Text.types.H2} children={_t('channels')} />
              <div className="channel-listview">
                {
                  channels.map((item, idx) => 
                    <div className="channel-item" key={idx} onClick={() => { Utils.OpenInNewTab(item.link)} }>
                      <img src={item.img}/>
                      <div className={'name'}>{_t(item.name)}</div>
                    </div>
                  )
                }
              </div>
            </div>
          </InviewMonitor>

          {/* end home__channels */}

          {/*<InviewMonitor*/}
            {/*classNameNotInView='vis-hidden'*/}
            {/*classNameInView='animated zoomIn'*/}
          {/*>*/}
            {/*<Container className="home__features" id={'features'}>*/}
              {/*<div className="home__features__title-container">*/}
                {/*<Text className={'home__features-title'} type={Text.types.H2} children={_t('features')} />*/}
              {/*</div>*/}

              {/*<Carousel className="home__features-cards" orientation={Carousel.orientation.VERTICAL} list={_features.map((ft,index) =>*/}
                                {/*<FeatureCard key={index} className={'home__features-card'} {...ft} />*/}
                              {/*)} customIndicators={customIndicators}/>*/}
            {/*</Container>*/}
          {/*</InviewMonitor>*/}
          {/* end home__features */}

          {/*<InviewMonitor*/}
            {/*classNameNotInView='vis-hidden'*/}
            {/*classNameInView='animated slideInDown' // fadeInLeft, or fadeInRight*/}
          {/*>*/}
            {/*<div className="home__subscription">*/}

              {/*<Container className={'home__subscription-container'}>*/}
                {/*<div className={'home__subscription-img'}>*/}
                  {/*<img src={require('../../../shared/img/assets/model_example_2.png')}/>*/}
                {/*</div>*/}
                {/*<div className={'home__subscription-main'}>*/}
                  {/*<HeaderHighlight>*/}
                    {/*<b>{_t('get_the_latest_news')}</b>*/}
                  {/*</HeaderHighlight>*/}
                  {/*<p>{_t('get_the_latest_news_desc')}</p>*/}
                  {/*<input type="text" name="email" className={'home__subscription-input'} placeholder={_t('your_email_address')} onChange={this.validateEmail}/>*/}
                  {/*<ButtonNew className={'home__subscription-btn'} color={ButtonNew.colors.GREEN} label={_t('subscribe')} onClick={() => {*/}
                    {/**/}
                  {/*}}/>*/}
                {/*</div>*/}
              {/*</Container>*/}
            {/*</div>*/}
          {/*</InviewMonitor>*/}
          {/* end home__subscription */}
        </div>

        <Footer />
      </PageWrapper>
    )
  }
}

const mapStateToProps = (store, props) => {
  let pathName = props.location.pathname;
  let query = Utils.ParseQueryString(props.location.search);
  let userId = GetLoggedInUserId(store);
  if (query.code) {
    LS.SetItem(LS.Fields.referralCode, {expire: Date.now() + REFERRAL_EXPIRED, code: query.code});
    window.referralCode = query.code;
  }

  return {
    pathName,
    _t: getTranslate(store.localeReducer),
    banners: GetHomeBanners(store),
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
)(HomePage));
