import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getActiveLanguage, getTranslate, setActiveLanguage } from 'react-localize-redux';

import PropTypes from 'prop-types';
import withRouter from 'react-router-dom/es/withRouter';
import Link from 'react-router-dom/es/Link';
import * as Config from '../../../../config_language';
import Dropdown from '../../../widgets/Dropdown/Dropdown.jsx';

import { Icon } from '../../Icon/Icon.jsx';
import * as LS from '../../../../services/localStorageService.js';
import { URLS } from '../../../../constants/general';
import { Image } from '../../Image/Image.jsx';
import { Container } from '../../../widgets/Container/Container.jsx';

require('style-loader!./Navbar.scss');

const NavbarList = [
  // eslint-disable-next-line no-undef
  { link: `${DOMAIN_ROOT}/${URLS.BUILD_GON}`, text: 'build', img: 'icon_build' },
  // eslint-disable-next-line no-undef
  { link: `${DOMAIN_ROOT}/${URLS.BATTLE}`, text: 'battle', img: 'icon_battle' },
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
    this.setState({ selectedNavItem: link });
  }

  componentDidMount() {
    const { transforming, minifying, scrollingElement } = this.props;

    if (transforming || minifying) {
      if (transforming) {
        document.getElementsByClassName('navbar__wrapper')[0].classList.add('navbar__wrapper-transform');
      }
      if (scrollingElement) document.getElementById(scrollingElement).addEventListener('scroll', this.handleScroll);
      document.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    const { transforming, minifying, scrollingElement } = this.props;

    if (transforming || minifying) {
      if (scrollingElement) document.getElementById(scrollingElement).removeEventListener('scroll', this.handleScroll);
      document.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll(e) {
    let scrollTop;
    if (e.target) scrollTop = e.target.scrollTop;
    if (e.target && e.target.scrollingElement) scrollTop = e.target.scrollingElement.scrollTop;
    if (scrollTop !== undefined) {
      if (scrollTop >= 50) {
        if (this.props.transforming) {
          document.getElementsByClassName('navbar__wrapper')[0].classList.remove('navbar__wrapper-transform');
        }
        if (this.props.minifying) document.getElementsByClassName('navbar__wrapper')[0].classList.add('minifying');
      } else {
        if (this.props.transforming) {
          document.getElementsByClassName('navbar__wrapper')[0].classList.add('navbar__wrapper-transform');
        }
        if (this.props.minifying) document.getElementsByClassName('navbar__wrapper')[0].classList.remove('minifying');
      }
    }
  }

  handleLanguageChange(val) {
    this.props.dispatch(setActiveLanguage(val));
    LS.SetItem(LS.Fields.language, val);
  }

  render() {
    const {
      currentLanguage, _t, fixed, size, feed,
    } = this.props;

    return (
      <div className={`navbar__wrapper ${fixed ? 'fixed' : ''} ${feed ? 'have-feed' : ''}`}>
        <Container size={size} className="navbar__content">

          <div className="logo m--computer-only">
            <Link to="/#home">
              <Image img="logo_cubego" />
            </Link>
          </div>

          <div className="img-links">
            {NavbarList.map((item, idx) => (
              <div
                className={`navbar__item m--computer-only ${this.state.selectedNavItem === item.link ? 'active' : ''}`}
                key={idx}
                onClick={() => {
                  this.handleNavItemSelect(item.link);
                  this.props.history.push(item.link);
                }}
                tooltip={_t(item.text)}
                tooltip-position="bottom"
              >
                <Image img={`${item.img}`} />
              </div>
            ))}

            <Dropdown
              className="mobile-menu m--mobile-only"
              position="left"
              list={[
                {
                  content: (
                    <div className="navbar__item-dropdown">
                      <Image img="logo_cubego" />
                      {_t('Home')}
                    </div>
                  ),
                  onClick: () => {
                    this.props.history.push('/#home');
                  },
                },
                ...NavbarList.map((item, idx) => ({
                  content: (
                    <div className="navbar__item-dropdown" key={idx}>
                      <Image img={`${item.img}`} />
                      {_t(item.text)}
                    </div>
                  ),
                  onClick: () => {
                    this.handleNavItemSelect(item.link);
                    this.props.history.push(item.link);
                  },
                })),
              ]}
            >
              <span>
                <i className="fas fa-bars" />
              </span>
            </Dropdown>
          </div>

          <div className="user-info">
            <Dropdown
              position="right"
              list={(Config.Languages.map((lan) => ({
                content: (
                  <span className="navbar__text">
                    <Icon name={`${lan.country} flag`} />
                    {lan.code}
                  </span>
                ),
                onClick: () => { this.handleLanguageChange(lan.code); },
              })))}
            >
              <span>
                <Icon name={`${currentLanguage.country} flag`} />
                {currentLanguage.code}
              </span>
            </Dropdown>
          </div>

        </Container>

      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  _t: getTranslate(store.localeReducer),
  currentLanguage: getActiveLanguage(store.localeReducer),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: {
    setActiveLanguage: bindActionCreators(setActiveLanguage, dispatch),
  },
});

Navbar.defaultProps = {
  transforming: false,
  fixed: true,
  minifying: false,
};

Navbar.propTypes = {
  transforming: PropTypes.bool,
  minifying: PropTypes.bool,
  size: PropTypes.string,
  fixed: PropTypes.bool,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navbar));
