import React from "react"
import {HashLink as Link} from 'react-router-hash-link';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import {getActiveLanguage, getTranslate, setActiveLanguage} from 'react-localize-redux';

import Dropdown from '../../../widgets/Dropdown/Dropdown.jsx'

import * as Config from '../../../../config_language'
import * as LS from '../../../../services/localStorageService.js'
import PropTypes from "prop-types";
import {GetLoggedInUserId, GetUserBasicInfo} from "../../../../reducers/selectors";
import {URLS} from "../../../../utils/constants";
import {Image} from "../../Image/Image.jsx";
import {Container} from "../../../widgets/Container/Container.jsx";
import { Icon } from "../../Icon/Icon.jsx";

require("style-loader!./Navbar.scss");

const NavbarList = {
  default: [
    {link: `/${URLS.ABOUT_US}`, text: 'about_us', img: 'icon_about_us'},
    {link: `/${URLS.MARKET}`, text: 'market', img: 'icon_market'},
    {link: `/${URLS.BUILD_GON}`, text: 'build_hero', img: 'icon_build_hero'},
    {link: `/${URLS.CUBEGONS}`, text: 'my_heroes', img: 'icon_my_heroes'},
    {link: `/${URLS.STORE}`, text: 'store', img: 'icon_store'},
    {link: `/${URLS.BATTLE}`, text: 'battle', img: 'icon_battle'},
  ],

  home: [
    {link: `/${URLS.ABOUT_US}`, text: 'about_us', img: 'icon_about_us'},
    {link: `/${URLS.MARKET}`, text: 'market', img: 'icon_market'},
    {link: `/${URLS.BUILD_GON}`, text: 'build_hero', img: 'icon_build_hero'},
    {link: `/${URLS.CUBEGONS}`, text: 'my_heroes', img: 'icon_my_heroes'},
    {link: `/${URLS.STORE}`, text: 'store', img: 'icon_store'},
    {link: `/${URLS.BATTLE}`, text: 'battle', img: 'icon_battle'},
  ],

  mobile: [
    {text: 'intro', img: 'icon_market', group: [
      {link: `/${URLS.ABOUT_US}`, text: 'about_us', img: 'icon_about_us'},
      {link: `/${URLS.MARKET}`, text: 'market', img: 'icon_market'},
    ]},
    {text: 'gameplay', img: 'icon_build_hero', group: [
      {link: `/${URLS.BUILD_GON}`, text: 'build_hero', img: 'icon_build_hero'},
      {link: `/${URLS.CUBEGONS}`, text: 'my_heroes', img: 'icon_my_heroes'},
      {link: `/${URLS.STORE}`, text: 'store', img: 'icon_store'},
      {link: `/${URLS.BATTLE}`, text: 'battle', img: 'icon_battle'},
    ]}
  ]
};


class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
      document.getElementById(this.props['scrollingElement']).addEventListener('scroll', this.handleScroll);
      document.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (this.props.transforming && this.props.scrollingElement) {
      document.getElementById(this.props['scrollingElement']).removeEventListener('scroll', this.handleScroll);
      document.removeEventListener('scroll', this.handleScroll);
    }
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
    let {currentLanguage, navbarType, _t, fixed} = this.props;

    let size = Container.sizes.NORMAL;
    if (this.props.textContainer) size = Container.sizes.SMALL;
    if (this.props.big) size = Container.sizes.BIG;

    return (
      <div className={`navbar__wrapper ${fixed ? 'fixed' : ''}`}>
        <Container size={size} className={'navbar__content'}>

          <div className={'logo'}>
            <Link smooth to="/#home">
              <Image img={'logo_cubego'}/>
            </Link>
          </div>

          <div className={'links'}>
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
                    <div className={`navbar__item`}>
                      <span><Image img={`${item.img}`}/> <Icon name={'angle down icon'}/></span>
                    </div>
                  </Dropdown>
                )
            })}

            {NavbarList[navbarType].map((item, idx) => {
              if (item.link)
                return (
                  <div className={`navbar__item m--computer-only ${this.state.selectedNavItem === item.link ? 'active' : ''}`} key={idx} onClick={() => this.handleNavItemSelect(item.link)} tooltip={_t(item.text)} tooltip-position={'bottom'}>
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
          </div>

          <div className={'user-info'}>
            <Dropdown position={'right'} list={(Config.Languages.map(lan => ({
              content: <span className={'navbar__text'}> <Icon name={lan.country + ' flag'}/> {lan.code}</span>,
              onClick: () => {this.handleLanguageChange(lan.code)},
            })))}>
              <span><Icon name={currentLanguage.country + ' flag'}/>  {currentLanguage.code}</span>
            </Dropdown>
          </div>

        </Container>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    _t: getTranslate(store.localeReducer),
    currentLanguage: getActiveLanguage(store.localeReducer),
  };
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
