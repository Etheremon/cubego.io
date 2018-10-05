import React from "react"
import {HashLink as Link} from 'react-router-hash-link';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import {getActiveLanguage, getTranslate, setActiveLanguage} from 'react-localize-redux';

import Dropdown from '../../../widgets/Dropdown/Dropdown.jsx'

import * as Config from '../../../../config_language'
import * as LS from '../../../../services/localStorageService.js'
import PropTypes from "prop-types";
import {URLS} from "../../../../utils/constants";
import {Image} from "../../Image/Image.jsx";
import {Container} from "../../../widgets/Container/Container.jsx";
import { Icon } from "../../Icon/Icon.jsx";
import withRouter from "react-router-dom/es/withRouter";

require("style-loader!./Navbar.scss");

const NavbarTextList = [
  {link: `/${URLS.ABOUT_US}`, text: 'about_us'},
  {link: `/${URLS.GUIDE}`, text: 'game_intro'},
];

const NavbarList = [
  {link: `/${URLS.BUILD_GON}`, text: 'build', img: 'icon_build'},
  {link: `/${URLS.CUBEGONS}`, text: 'my_cubegons', img: 'icon_my_heroes'},
  {link: `/${URLS.STORE}`, text: 'store', img: 'icon_store'},
  {link: `/${URLS.MARKET}`, text: 'market', img: 'icon_market'},
  {link: `/${URLS.BATTLE}`, text: 'battle', img: 'icon_battle'},
];


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
    let {currentLanguage, _t, fixed} = this.props;

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

          <div className={'text-links'}>
            {NavbarTextList.map((item, idx) => (
              <div className={`navbar__item`} key={idx}
                   onClick={() => {
                     this.props.history.push(item.link);
                   }}>
                {_t(item.text)}
              </div>
            ))}
          </div>

          <div className={'img-links'}>
            {NavbarList.map((item, idx) => (
              <div className={`navbar__item m--computer-only ${this.state.selectedNavItem === item.link ? 'active' : ''}`} key={idx}
                   onClick={() => {
                     this.handleNavItemSelect(item.link);
                     this.props.history.push(item.link);
                   }} tooltip={_t(item.text)} tooltip-position={'bottom'}>
                <Image img={`${item.img}`}/>
              </div>
            ))}
          </div>

          <div className={'user-info'}>
            <Dropdown position={'right'} list={(Config.Languages.map(lan => ({
              content: <span className={'navbar__text'}><Icon name={lan.country + ' flag'}/>{lan.code}</span>,
              onClick: () => {this.handleLanguageChange(lan.code)},
            })))}>
              <span>
                <Icon name={currentLanguage.country + ' flag'}/>
                {currentLanguage.code}
              </span>
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
  transforming: false,
  textContainer: false,
  fixed: true,
  noti: '',
};

Navbar.propTypes = {
  transforming: PropTypes.bool,
  textContainer: PropTypes.bool,
  fixed: PropTypes.bool,
  noti: PropTypes.string,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar));
