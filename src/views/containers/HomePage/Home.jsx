import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';

import * as Tracker from '../../../services/tracker'

import {HashLink as Link} from 'react-router-hash-link';
import {Actions} from "../../../actions";
import * as Utils from "../../../utils/utils";
import withRouter from "react-router-dom/es/withRouter";

import Navbar from '../../components/bars/Navbar/Navbar.jsx'
import Footer from '../../components/bars/Footer/Footer.jsx'
import Slider from '../../widgets/Slider/Slider.jsx';
import { ButtonNew } from '../../widgets/Button/Button.jsx';
import { Container } from '../../widgets/Container/Container.jsx';

require("style-loader!./Home.scss");


class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Tracker.ViewContent(Tracker.TrackPages.home);
  }

  renderBanner() {
    const { _t } = this.props;

    return ([
      <div className={'home__banner-item'} key={'banner-1'}>
          <img src={'https://cdn-images-1.medium.com/max/1024/1*AOHiEzvhV7zFG65Z1DWZcg.jpeg'}/>
          <ButtonNew className={'home__banner-btn'} label={_t('txt.play_now')} onClick={() => {
            
          }}/>
      </div>,
    ])
  }

  render() {

    const { _t } = this.props;
    
    return (
      <div className="page-container">
        <Navbar transforming navbarType={'home'} scrollingElement={'home__container'}/>
        <div className={'home__container'} id={'home__container'}>

          <div className={'home__section home__banner'} id={'home'}>
            <Slider list={this.renderBanner()}/>
          </div>

          <div className="home__section home__intro" id={'intro'}>
            <div className="home__intro-board">
              <p>{_t('txt.voxel_desc')}</p>
            </div>
            <div className="home__intro-voxel">
              <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f4090555468161.598573e282a48.png" />
              <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f4090555468161.598573e282a48.png" />
              <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f4090555468161.598573e282a48.png" />
            </div>
          </div>

          <div className="home__section home__mode" id={'mode'}>

          </div>

          <div className="home__section home__game-play" id={'game-play'}>
            <Container className={'home__game-play__container'}>
              <div className={'home__game-play__img'}>
                <img src={'http://i61.tinypic.com/wjb3gg.png'}/>
              </div>
              <div className={'home__game-play__info'}>
                <div className={'home__game-play__header-text'}>
                  <p>{_t('txt.game_play_text')}</p>
                </div>
                <p>{_t('txt.game_play_desc')}</p>
              </div>
            </Container>
          </div>

        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  _t: getTranslate(store.localeReducer),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage));
