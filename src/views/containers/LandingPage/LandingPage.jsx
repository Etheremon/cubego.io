import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';

import { ButtonNew } from '../../widgets/Button/Button.jsx';
import withRouter from 'react-router/es/withRouter';
import { Container } from '../../widgets/Container/Container.jsx';
import { PageWrapper } from '../../widgets/PageWrapper/PageWrapper.jsx';
import Popup from '../../widgets/Popup/Popup.jsx';
import * as Utils from '../../../utils/utils';
import { Link } from 'react-router-dom';

require("style-loader!./LandingPage.scss");

const youtubeURL = "https://www.youtube.com/embed/Gx1ITZji27Q?enablejsapi=1";

export const ButtonImage = ({className, img, label, onClick}) => {
  return <div className={`button-image__container ${className ? className : ''}`} onClick={() => {onClick && onClick()}}>
    <img src={img}/>
    <span>{label}</span>
  </div>
}

class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpenPopup: false,
    };

    this.onUnmountVideo = this.onUnmountVideo.bind(this)
    this.videoRef = React.createRef();
  }

  onUnmountVideo() {
    this.setState((prevState) => {
      return {isOpenPopup: !prevState.isOpenPopup};
    });
    this.videoRef.current.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*')
  }

  render() {
    const {_t} = this.props;
    const backgroundImage = require('../../../shared/img/landing_page/landingpagecubego.png');

    return (
      <PageWrapper type={PageWrapper.types.BLUE}>
        <div className={`landing__wrapper`}>
          <div className="landing-page__image-container">
            <img className="landing-page__background-img" src={backgroundImage} />

            <ButtonImage className="landing-page__catch-mon-button"
                       label={_t('landing.button_1')} img={require('../../../shared/img/landing_page/button.png')}
                       onClick={() => {}}/>

            <div className="group-button">

              <ButtonImage className="landing-page__catch-mon-button-second" 
                        label={_t('landing.button_2')} img={require('../../../shared/img/landing_page/button.png')}
                        onClick={() => {}}/>

              <ButtonImage className="landing-page__catch-mon-button-third" 
              label={_t('landing.button_3')} img={require('../../../shared/img/landing_page/button.png')}
              onClick={() => {}}/>

            </div>

            <ButtonNew size={Utils.IsMobile ? ButtonNew.sizes.SMALL : ButtonNew.sizes.NORMAL} className="landing-page__catch-mon-button-fourth"
                       label={_t('landing.button_4')}
                       onClick={() => {}}/>

            
            
            <img className="youtube-button" src={require('../../../shared/img/landing_page/button_play.png')} onClick={() => {
              this.setState((prevState) => {
                return {isOpenPopup: !prevState.isOpenPopup};
              });
            }}/>
          </div>

          <Popup open={this.state.isOpenPopup} onUnmount={this.onUnmountVideo} children={(
            <iframe ref={this.videoRef} className="iframe__popup" width="100%" height="100%"
              src={youtubeURL}>
            </iframe>)
          } />
        </div>
      
      </PageWrapper>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    _t: getTranslate(store.localeReducer),
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage));