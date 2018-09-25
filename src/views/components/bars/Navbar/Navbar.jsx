import React from "react"
import {HashLink as Link} from 'react-router-hash-link';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import {getActiveLanguage, getTranslate, setActiveLanguage} from 'react-localize-redux';

import Dropdown from '../../../widgets/Dropdown/Dropdown.jsx'

import * as Config from '../../../../config_language'
import * as LS from '../../../../services/localStorageService.js'
import * as Utils from "../../../../utils/utils";
import PropTypes from "prop-types";
import {GetLoggedInUserId, GetUserBasicInfo} from "../../../../reducers/selectors";
import {URLS} from "../../../../utils/constants";
import Loading from "../../../widgets/Loading/Loading.jsx";
import {Image} from "../../Image/Image.jsx";
import {Container} from "../../../widgets/Container/Container.jsx";
import { Icon } from "../../Icon/Icon.jsx";

require("style-loader!./Navbar.scss");

const NavbarList = {
  default: [
    {link: `/${URLS.ABOUT_US}`, text: 'about_us', img: 'icon_about_us'},
    {link: `/${URLS.MARKET}`, text: 'market', img: 'icon_market'},
    {link: `/${URLS.BUILD_HERO}`, text: 'build_hero', img: 'icon_build_hero'},
    {link: `/${URLS.MY_HEROES}`, text: 'my_heroes', img: 'icon_my_heroes'},
    {link: `/${URLS.STORE}`, text: 'store', img: 'icon_store'},
    {link: `/${URLS.BATTLE}`, text: 'battle', img: 'icon_battle'},
  ],

  home: [
    // {link: '/#intro', text: 'intro'},
    {link: `/${URLS.ABOUT_US}`, text: 'about_us', img: 'icon_about_us'},
    {link: `/${URLS.MARKET}`, text: 'market', img: 'icon_market'},
    {link: `/${URLS.BUILD_HERO}`, text: 'build_hero', img: 'icon_build_hero'},
    {link: `/${URLS.MY_HEROES}`, text: 'my_heroes', img: 'icon_my_heroes'},
    {link: `/${URLS.STORE}`, text: 'store', img: 'icon_store'},
    {link: `/${URLS.BATTLE}`, text: 'battle', img: 'icon_battle'},
  ],

  mobile: [
    {text: 'intro', img: 'icon_market', group: [
      {link: `/${URLS.ABOUT_US}`, text: 'about_us', img: 'icon_about_us'},
      {link: `/${URLS.MARKET}`, text: 'market', img: 'icon_market'},
    ]},
    {text: 'gameplay', img: 'icon_build_hero', group: [
      {link: `/${URLS.BUILD_HERO}`, text: 'build_hero', img: 'icon_build_hero'},
      {link: `/${URLS.MY_HEROES}`, text: 'my_heroes', img: 'icon_my_heroes'},
      {link: `/${URLS.STORE}`, text: 'store', img: 'icon_store'},
      {link: `/${URLS.BATTLE}`, text: 'battle', img: 'icon_battle'},
    ]}
  ]
};


class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNoti: true,
      selectedNavItem: this.props.pathName,
    };

    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleNavItemSelect(link) {
    this.setState({ selectedNavItem: link })
  }

  componentDidMount() {
    if (this.props.transforming && this.props.scrollingElement) {
      document.getElementsByClassName('navbar__wrapper')[0].classList.add('navbar__wrapper-transform');
      document.getElementById(this.props.scrollingElement).addEventListener('scroll', this.handleScroll);
      document.addEventListener('scroll', this.handleScroll);
    }

    let func = () => {
      if (window.CurrentNetwork && window.CurrentNetwork !== 'Main Net')
        this.setState({networkNoti: `You are using ${window.CurrentNetwork}. Some functions may not work properly!`});
      if (window.CurrentNetwork)
        window.clearInterval(this.getNetworkInterval);
    };
    this.getNetworkInterval = window.setInterval(func, 2000);
    func();
  }

  componentWillUnmount() {
    if (this.props.transforming && this.props.scrollingElement) {
      document.getElementById(this.props.scrollingElement).removeEventListener('scroll', this.handleScroll);
      document.removeEventListener('scroll', this.handleScroll);
    }

    window.clearInterval(this.getNetworkInterval);
  }

  handleScroll(e) {
    let scrollTop = undefined;
    if (e.target) scrollTop = e.target.scrollTop;
    if (e.target && e.target.scrollingElement) scrollTop = e.target.scrollingElement.scrollTop;
    if (scrollTop !== undefined) {
      if (scrollTop >= 50) {
        document.getElementsByClassName('navbar__wrapper')[0].classList.remove('navbar__wrapper-transform');
      } else {
        document.getElementsByClassName('navbar__wrapper')[0].classList.add('navbar__wrapper-transform');
      }
    }
  }

  handleLanguageChange(val) {
    this.props.dispatch(setActiveLanguage(val));
    LS.SetItem(LS.Fields.language, val);
  }

  render() {

    let {navbarType, _t, fixed} = this.props;
    let {userId, userInfo, currentLanguage} = this.props.store;

    let size = Container.sizes.NORMAL;
    if (this.props.textContainer) size = Container.sizes.SMALL;
    if (this.props.big) size = Container.sizes.BIG;

    let noti = this.state.showNoti ? (this.props.noti || this.state.networkNoti) : '';

    return (
      <div className={`navbar__wrapper ${fixed ? 'fixed' : ''}`}>
        <div className={'navbar__noti'}>
          <Container size={size}>
            {noti}
            <div className={'navbar__noti-close'} onClick={() => {this.setState({showNoti: false})}}>
              {/* <Icon name={'close'}/> */}
            </div>
          </Container>
        </div>

        <Container size={size} className="navbar__content">

          {/* <div className={'navbar__item-group logo'}>
            <div className={'navbar__item'}>
              <Link smooth to="/#home">
                <Image img={'logo_cubego'}/>
              </Link>
            </div>
          </div> */}

          <div className={'navbar__item-group links'}>
            {NavbarList['mobile'].map((item, idx) => {
              if (item.link)
                return (
                  <div className={`navbar__item m--mobile-only ${this.state.selectedNavItem === item.link ? 'active' : ''}`} key={idx} onClick={() => this.handleNavItemSelect(item.link)}>
                    {item.link[0] === '/'
                      ? <Link smooth to={item.link}>
                          <span><Image img={`${item.img}`}/></span> 
                        </Link>
                      : <a href={_t(item.link)} target={'_blank'}>
                          <span><Image img={`${item.img}`}/></span> 
                        </a>
                    }
                  </div>
                );
              else
                return (
                  <Dropdown className={'m--mobile-only'} key={idx} list={(item.group.map((ddItem, idx) => ({
                    content:
                      ddItem.link[0] === '/'
                        ? <Link smooth to={ddItem.link} className={'navbar__text'} key={idx}>
                            <span className={ddItem.highlight ? 'm--noti' : ''}><Image img={`${ddItem.img}`}/></span>
                          </Link>
                        : <a href={_t(ddItem.link)} className={'navbar__text'} key={idx} target={'_blank'}>
                            <span className={ddItem.highlight ? 'm--noti' : ''}><Image img={`${ddItem.img}`}/></span>
                          </a>
                  })))}>
                    <div className={`navbar__item--mobile`}>
                      <span><Image img={`${item.img}`}/> <Icon name={'angle down icon'}/></span>
                    </div>
                  </Dropdown>
                )
            })}

            {NavbarList[navbarType].map((item, idx) => {
              if (item.link)
                return (
                  <div className={`navbar__item m--computer-only ${this.state.selectedNavItem === item.link ? 'active' : ''}`} key={idx} onClick={() => this.handleNavItemSelect(item.link)} tooltip={_t(item.text)} tooltip-position={'buttom'}>
                    {item.link[0] === '/'
                      ? <Link smooth to={item.link}>
                          <span className={item.highlight ? 'm--noti' : ''}><Image img={`${item.img}`}/></span>
                        </Link>
                      : <a href={_t(item.link)} target={'_blank'}>
                          <span className={item.highlight ? 'm--noti' : ''}><Image img={`${item.img}`}/></span>
                        </a>
                    }
                  </div>
                );
              else
                return (
                  <Dropdown className={'m--computer-only'} key={idx} list={(item.group.map((ddItem, idx) => ({
                    content:
                      ddItem.link[0] === '/'
                        ? <Link smooth to={ddItem.link} className={'navbar__text'} key={idx}>
                            <span className={ddItem.highlight ? 'm--noti' : ''}><Image img={`${item.img}`}/></span>
                          </Link>
                        : <a href={_t(ddItem.link)} className={'navbar__text'} key={idx} target={'_blank'}>
                            <span className={ddItem.highlight ? 'm--noti' : ''}><Image img={`${item.img}`}/></span>
                          </a>
                  })))}>
                    <div className={`navbar__item`}>
                      <span className={item.highlight ? 'm--noti' : ''}><Image img={`${item.img}`}/> <Icon name={'angle down icon'}/></span>
                    </div>
                  </Dropdown>
                )
            })}

            <div className={'navbar__item logo'}>
              <Link smooth to="/#home">
                <Image img={'logo_cubego'}/>
              </Link>
            </div>
          </div>

          <div className={'navbar__item-group user-info'}>
            <div className="navbar__item m--pointer" onClick={() => {}}>
              {userId === undefined || userInfo === undefined ? <Loading dark/>
                : (
                  ! userId ? <Link to={`/${URLS.SIGN_IN}`}>{this.props._t('log_in')}</Link>
                    : (userInfo.username ?
                        <Link to={`/${URLS.SIGN_IN}`} className={'m--no-text-transform m--no-wrap'}>
                          {Utils.CutoffString(userInfo.username, 12)}
                          <i className="user icon navbar__trigger-input-popup m--line-height-100"/>
                        </Link>
                      : <Popup
                          trigger={
                            <Link to={`/${URLS.SIGN_IN}`} className={'m--no-text-transform'}>
                              {Utils.CutoffString(userId, 8)}
                              <i className={'user icon navbar__trigger-input-popup m--noti m--line-height-100'}/>
                            </Link>
                          }
                          content={_t('log_in_note')}
                          position='bottom right'
                        />
                    )
                )
              }
            </div>

            <div className={'navbar__item'}>

              <Dropdown position={'right'} list={(Config.Languages.map(lan => ({
                content: <span className={'navbar__text'}> <Icon name={lan.country + ' flag'}/> {lan.code}</span>,
                onClick: () => {this.handleLanguageChange(lan.code)},
              })))}>
                <span><Icon name={currentLanguage.country + ' flag'}/>  {currentLanguage.code}</span>
              </Dropdown>
            </div>

          </div>

        </Container>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  let userId = GetLoggedInUserId(store);
  return {
    _t: getTranslate(store.localeReducer),
    store: {
      userId: GetLoggedInUserId(store),
      userInfo: GetUserBasicInfo(store, userId),
      currentLanguage: getActiveLanguage(store.localeReducer),
    }
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
  actions: {
    setActiveLanguage: bindActionCreators(setActiveLanguage, dispatch),
  }
});

Navbar.defaultProps = {
  navbarType: 'default',
  transforming: false,
  textContainer: false,
  fixed: true,
  noti: '',
};

Navbar.propTypes = {
  navbarType: PropTypes.oneOf(['default', 'home']),
  transforming: PropTypes.bool,
  textContainer: PropTypes.bool,
  fixed: PropTypes.bool,
  noti: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
