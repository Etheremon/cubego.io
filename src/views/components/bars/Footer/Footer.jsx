import React from "react"
import { Link } from "react-router-dom"
import {getTranslate} from "react-localize-redux"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {URLS} from "../../../../utils/constants";
import { Container } from '../../../widgets/Container/Container.jsx';

require("style-loader!./Footer.scss");

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {_t} = this.props;
    let size = Container.sizes.NORMAL;
    if (this.props.textContainer) size = Container.sizes.SMALL;
    if (this.props.big) size = Container.sizes.BIG;

    return (
      <div className="footer__wrapper">
        <Container size={size} className={'footer__content'}>
          <div className={'footer__divider'}>
          
          </div>

          <div className={'footer__main'}>
            <div className="footer__left">
              <img className={'footer__logo'} src={require('../../../../shared/img/logo/cubego.png')}/>
              <div className={'footer__copyright'}>
                © Voxel. All Rights Reserved.
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
                  <a href="mailto:contact@etheremon.com?Subject=Hello" target="_blank"><p>{_t('txt.email')}</p></a>
                </div>
                <div className="footer__service-customer">
                  <a href="https://github.com/etheremon/smartcontract" target="_blank"><p>{_t('txt.github')}</p></a>
                  <a href={`/${URLS.FAQ}`} target="_blank"><p>{_t('txt.faq')}</p></a>

                </div>
              </div>
              <div className="footer__right-social">
                <a href="https://discord.gg/xgJpuzc" target="_blank"><img src={require('../../../../shared/img/socialMedia/discord.png')}/></a>
                <a href="https://t.me/myetheremon" target="_blank"><img src={require('../../../../shared/img/socialMedia/telegram.png')}/></a>
                <a href="https://www.reddit.com/r/etheremon/" target="_blank"><img src={require('../../../../shared/img/socialMedia/reddit.png')}/></a>
                <a href="https://www.facebook.com/etheremon" target="_blank"><img src={require('../../../../shared/img/socialMedia/fb.png')}/></a>
                <a href="https://twitter.com/myetheremon" target="_blank"><img src={require('../../../../shared/img/socialMedia/twitter.png')}/></a>
                <a href="https://www.instagram.com/etheremon_official/" target="_blank"><img src={require('../../../../shared/img/socialMedia/insta.png')}/></a>
                <a href="https://medium.com/etheremon" target="_blank"><img src={require('../../../../shared/img/socialMedia/medium.png')}/></a>
                <a href="https://www.youtube.com/channel/UCofiBCZvWbHFJRzKZixGfVw" target="_blank"><img src={require('../../../../shared/img/socialMedia/youtube.png')}/></a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

}

const mapStateToProps = (store) => ({_t: getTranslate(store.localeReducer)});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
