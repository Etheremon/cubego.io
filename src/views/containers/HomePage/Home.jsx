import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';

import * as Tracker from '../../../services/tracker'

import withRouter from "react-router-dom/es/withRouter";

import Navbar from '../../components/bars/Navbar/Navbar.jsx'
import Footer from '../../components/bars/Footer/Footer.jsx'
import Slider from '../../widgets/Slider/Slider.jsx';
import { ButtonNew } from '../../widgets/Button/Button.jsx';
import { Container } from '../../widgets/Container/Container.jsx';
import { HeaderHighlight } from '../../widgets/Header/Header.jsx';
import { Text } from '../../widgets/Text/Text.jsx';
import {URLS} from "../../../utils/constants";
import FeatureCard from '../../components/cards/FeatureCard/FeatureCard.jsx';
import Carousel from '../../widgets/Carousel/Carousel.jsx';
import { Image } from '../../components/Image/Image.jsx';

require("style-loader!./Home.scss");

const features = [{title: 'txt.build_hero', desc: 'desc.build_hero'},
                      {title: 'txt.auotion', desc: 'desc.auotion'},
                      {title: 'txt.trading', desc: 'desc.trading'},
                      {title: 'txt.battle', desc: 'desc.battle'},
                      {title: 'txt.build_hero', desc: 'desc.build_hero'},
                      {title: 'txt.auotion', desc: 'desc.auotion'},
                      {title: 'txt.trading', desc: 'desc.trading'},
                      {title: 'txt.battle', desc: 'desc.battle'},]

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    }
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
          this.props.history.push(`/${URLS.MODEL_EDITOR}`)
        }}/>
      </div>,
      <div className={'home__banner-item'} key={'banner-1'}>
        <img src={'https://cdn-images-1.medium.com/max/1024/1*AOHiEzvhV7zFG65Z1DWZcg.jpeg'}/>
        <ButtonNew className={'home__banner-btn'} label={_t('txt.play_now')} onClick={() => {
          this.props.history.push(`/${URLS.MODEL_EDITOR}`)
        }}/>
      </div>,
      <div className={'home__banner-item'} key={'banner-1'}>
        <img src={'https://cdn-images-1.medium.com/max/1024/1*AOHiEzvhV7zFG65Z1DWZcg.jpeg'}/>
        <ButtonNew className={'home__banner-btn'} label={_t('txt.play_now')} onClick={() => {
          this.props.history.push(`/${URLS.MODEL_EDITOR}`)
        }}/>
      </div>,
    ])
  }

  render() {

    const { _t, pathName } = this.props;
    const guildGame = [
      {image: <img className={'guild-game'} key={'guild-game-1'} src={require('../../../shared/img/assets/model_example_1.png')}/>, text: _t('txt.buy')} ,
      {image: <img className={'guild-game'} key={'guild-game-2'} src={require('../../../shared/img/assets/model_example_2.png')}/>, text: _t('txt.build')} ,
      {image: <img className={'guild-game'} key={'guild-game-3'} src={require('../../../shared/img/assets/model_example_3.png')}/>, text: _t('txt.battle')} ,
    ]

    return (
      <div className="page-container">
        <Navbar pathName={pathName} transforming navbarType={'home'} scrollingElement={'home__container'}/>
        <div className={'home__container'} id={'home__container'}>

          <div className={'home__section home__banner'} id={'home'}>
            <Slider list={this.renderBanner()}/>
          </div>

          {/* end home__banner */}

          <div className="home__section home__build">
            <ButtonNew className={'home__build-btn'} label={_t('txt.build_hero')} onClick={() => {
              
            }}/>
          </div>

          {/* end home__build */}

          <div className="home__section home__intro" id={'intro'}>
            <div className="home__intro-board">
              <p>{'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.'}</p>
            </div>
            <div className="home__intro-cubego">
              <img src={require('../../../shared/img/assets/model_example_1.png')} />
              <img src={require('../../../shared/img/assets/model_example_2.png')} />
              <img src={require('../../../shared/img/assets/model_example_3.png')} />
            </div>
          </div>

          {/* end home__intro */}

          <div className="home__section home__modes" id={'modes'}>
            <Text className={'home_modes-title'} type={Text.types.H2} children={_t('txt.how_to_play')} />

            <div className="home__mode-container">
              <Carousel list={guildGame} />
            </div>
          </div>

          {/* end home__modes */}

          <div className="home__section home__game-detail" id={'game-detail'}>

            <div className={'home__game-detail__copyright'}>
              <div className={'home__game-detail__copyright-img'}>
                <img src={require('../../../shared/img/assets/model_example_1.png')}/>
              </div>
              <div className={'home__game-detail__copyright-info'}>
                <Image img={'padding_yellow'} className={'copyright__padding'} />
                <div className={'home__game-detail__copyright-text'}>
                  <p>{_t('txt.game_detail_copyright')}</p>
                </div>
                <p>{_t('txt.game_detail_copyright_desc')}</p>
                <ButtonNew className={'home__game-detail__copyright-btn'} label={_t('txt.read_more')} onClick={() => {
                  
                }}/>
              </div>
            </div>

            <div className={'home__game-detail__index'}>
              <div className={'home__game-detail__index-info'}>
                <Image img={'padding_blue'} className={'index__padding'} />
                <div className={'home__game-detail__index-text'}>
                  <p>{_t('txt.game_detail_index')}</p>
                </div>
                <p>{_t('txt.game_detail_index_desc')}</p>
                <ButtonNew className={'home__game-detail__index-btn'} label={_t('txt.read_more')} onClick={() => {
                  
                }}/>
              </div>
              <div className={'home__game-detail__index-img'}>
                <img src={require('../../../shared/img/assets/model_example_2.png')}/>
              </div>
            </div>

            <div className={'home__game-detail__battle'}>
              <div className={'home__game-detail__battle-img'}>
                <img src={require('../../../shared/img/assets/model_example_3.png')}/>
              </div>
              <div className={'home__game-detail__battle-info'}>
                <Image img={'padding_red'} className={'battle__padding'} />
                <div className={'home__game-detail__battle-text'}>
                  <p>{_t('txt.game_detail_battle')}</p>
                </div>
                <p>{_t('txt.game_detail_battle_desc')}</p>
                <ButtonNew className={'home__game-detail__battle-btn'} label={_t('txt.read_more')} onClick={() => {
                  
                }}/>
              </div>
            </div>
          </div>

          {/* end home__game-play */}

          <div className={'home__section home__partnership'} id={'partners'}>
            <HeaderHighlight>
              <b>{_t('txt.in_partnership_with')}</b>
            </HeaderHighlight>
            <div className={'home__partnership__imgs'}>
              <a href={'https://etheremon.com/'} target={'_blank'}><img src={'https://www.etheremon.com/assets/images/banner_facebook.png'}/><p>ETHEREMON</p></a>
              <a href={'https://etheremon.com/'} target={'_blank'}><img src={'https://www.etheremon.com/assets/images/banner_facebook.png'}/><p>ETHEREMON</p></a>
              <a href={'https://etheremon.com/'} target={'_blank'}><img src={'https://www.etheremon.com/assets/images/banner_facebook.png'}/><p>ETHEREMON</p></a>
            </div>
          </div>
          {/* end home__partnership */}

          <div className="home__section home__features" id={'features'}>
            <Text className={'home__features-title'} type={Text.types.H2} children={_t('txt.features')} />
            <div className="home__features-cards">
              {features.map((ft,index) => {
                return <FeatureCard key={index} className={'home__features-card'} {...ft} />;
              } )}
            </div>
          </div>

          {/* end home__features */}

          <div className="home__section home__subscription">
            <HeaderHighlight>
              <b>{_t('txt.get_the_latest_news')}</b>
            </HeaderHighlight>

            <Container className={'home__subscription-container'}>
              <div className={'home__subscription-img'}>
                <img src={require('../../../shared/img/assets/model_example_2.png')}/>
              </div>
              <div className={'home__subscription-main'}>
                <p>{_t('txt.get_the_latest_news_desc')}</p>
                <input type="text" className={'home__subscription-input'} placeholder={_t('txt.your_email_address')} value={this.state.email} />
                <ButtonNew className={'home__subscription-btn'} color={ButtonNew.colors.GREEN} label={_t('txt.subscribe')} onClick={() => {
                  
                }}/>
              </div>
            </Container>
          </div>

          {/* end home__subscription */}

        </div>

        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (store, props) => {
  let pathName = props.location.pathname;

  return {
    pathName,
    _t: getTranslate(store.localeReducer),
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage));
