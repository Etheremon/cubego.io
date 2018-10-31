import React from "react"
import { Link } from "react-router-dom"
import {getTranslate} from "react-localize-redux"
import {connect} from "react-redux";
import { Container } from '../../../widgets/Container/Container.jsx';
import { Image } from "../../Image/Image.jsx";
import PropTypes from "prop-types";
import {GetValues} from "../../../../utils/objUtils";

require("style-loader!./Footer.scss");

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {_t, size, type} = this.props;

    return (
      <div className={`footer__wrapper ${type}`}>
        <Container size={size} className={`footer__content`}>

          <div className={'footer__main'}>
            <div className="footer__left">
              <img className={'footer__logo'} src={require('../../../../shared/img/logo/cubego.png')}/>
              <div className={'footer__copyright'}>
                {
                  `© Cubego. ${_t('all_rights_reserved')}.`
                }
              </div>
            </div>

            <div className="footer__right">
              <div className={'footer__right-content'}>
                <div className="footer__term-policy link">
                  <Link to={'/privacy'} target={'_blank'}>
                    <p>{_t('footer.privacy_policy')}</p>
                  </Link>
                  <Link to={'/tos'} target={'_blank'}>
                    <p>{_t('footer.terms_of_sale')}</p>
                  </Link>
                  <a href="mailto:contact@cubego.io?Subject=Hello"><p>{_t('email')}</p></a>
                </div>
                <div className="footer__service-customer">
                  {/*<a href="https://github.com/etheremon/smartcontract" target="_blank"><p>{_t('github')}</p></a>*/}
                  {/*<a href={`/${URLS.FAQ}`} target="_blank"><p>{_t('faq')}</p></a>*/}
                </div>
              </div>
              <div className="footer__right-social">
                <a href="https://discordapp.com/invite/pYD5tss" target="_blank"><Image img={'icon_discord'} /></a>
                <a href="https://t.me/cubego" target="_blank"><Image img={'icon_telegram'} /></a>
                <a href="https://www.reddit.com/r/cubego/" target="_blank"><Image img={'icon_reddit'} /></a>
                <a href="https://www.facebook.com/cubego.io/" target="_blank"><Image img={'icon_facebook'} /></a>
                <a href="https://twitter.com/cubego_io" target="_blank"><Image img={'icon_twitter'} /></a>
                {/*<a href="https://www.instagram.com/etheremon_official/" target="_blank"><Image img={'icon_instagram'} /></a>*/}
                <a href="https://medium.com/cubego" target="_blank"><Image img={'icon_medium'} /></a>
                {/*<a href="https://www.youtube.com/channel/UCofiBCZvWbHFJRzKZixGfVw" target="_blank"><Image img={'icon_youtube'} /></a>*/}
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

Footer.types = {
  NORMAL: 'normal',
  DARK: 'dark',
  BRIGHT: 'bright',
};

Footer.defaultProps = {
  size: Container.sizes.NORMAL,
  type: Footer.types.NORMAL,
};

Footer.propTypes = {
  size: PropTypes.string,
  type: PropTypes.oneOf([...GetValues(Footer.types)]),
};

const mapStateToProps = (store) => ({_t: getTranslate(store.localeReducer)});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
