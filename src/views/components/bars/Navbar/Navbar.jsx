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
    let {transforming, minifying, scrollingElement} = this.props;

    if (transforming || minifying) {
      if (transforming) document.getElementsByClassName('navbar__wrapper')[0].classList.add('navbar__wrapper-transform');
      if (scrollingElement) document.getElementById(scrollingElement).addEventListener('scroll', this.handleScroll);
      document.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    let {transforming, minifying, scrollingElement} = this.props;

    if (transforming || minifying) {
      if (scrollingElement) document.getElementById(scrollingElement).removeEventListener('scroll', this.handleScroll);
      document.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll(e) {
    let scrollTop = undefined;
    if (e.target) scrollTop = e.target.scrollTop;
    if (e.target && e.target.scrollingElement) scrollTop = e.target.scrollingElement.scrollTop;
    if (scrollTop !== undefined) {
      if (scrollTop >= 50) {
        if (this.props.transforming)
          document.getElementsByClassName('navbar__wrapper')[0].classList.remove('navbar__wrapper-transform');
        console.log("zzcv", this.props.minifying);
        if (this.props.minifying)
          document.getElementsByClassName('navbar__wrapper')[0].classList.add('minifying');
      } else {
        if (this.props.transforming)
          document.getElementsByClassName('navbar__wrapper')[0].classList.add('navbar__wrapper-transform');
        if (this.props.minifying)
          document.getElementsByClassName('navbar__wrapper')[0].classList.remove('minifying');
      }
    }
  }

  handleLanguageChange(val) {
    this.props.dispatch(setActiveLanguage(val));
    LS.SetItem(LS.Fields.language, val);
  }

  render() {
    let {currentLanguage, _t, fixed, size} = this.props;

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
  fixed: true,
  noti: '',
  minifying: false,
};

Navbar.propTypes = {
  transforming: PropTypes.bool,
  minifying: PropTypes.bool,
  size: PropTypes.string,
  fixed: PropTypes.bool,
  noti: PropTypes.string,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar));
