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
import { PageWrapper } from '../../widgets/PageWrapper/PageWrapper.jsx';

require("style-loader!./Home.scss");

const features = [
  {title: 'build_hero', desc: 'desc.build_hero'},
  {title: 'auction', desc: 'desc.auction'},
  {title: 'trading', desc: 'desc.trading'},
  {title: 'battle', desc: 'desc.battle'},
  {title: 'build_hero', desc: 'desc.build_hero'},
  {title: 'auction', desc: 'desc.auction'},
  {title: 'trading', desc: 'desc.trading'},
  {title: 'battle', desc: 'desc.battle'},
];

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
        <img src={require('../../../shared/img/banner/banner_1.png')}/>
        <ButtonNew showDeco className={'home__banner-btn'} label={_t('build_model')} onClick={() => {
          this.props.history.push(`/${URLS.BUILD_HERO}`)
        }}/>
      </div>,
    ])
  }

  render() {

    const { _t, pathName } = this.props;
    const guildGame = [
      {image: <img className={'guild-game'} key={'guild-game-1'} src={require('../../../shared/img/assets/model_example_1.png')}/>, text: _t('buy')} ,
      {image: <img className={'guild-game'} key={'guild-game-2'} src={require('../../../shared/img/assets/model_example_2.png')}/>, text: _t('build')} ,
      {image: <img className={'guild-game'} key={'guild-game-3'} src={require('../../../shared/img/assets/model_example_3.png')}/>, text: _t('battle')} ,
    ];

    return (
      <PageWrapper>
        <Navbar pathName={pathName} transforming navbarType={'home'} scrollingElement={'home-page'}/>

        <div className={'home-page'} id={'home-page'}>

          <div className={'home__banner'} id={'home'}>
            <Slider list={this.renderBanner()}/>
          </div>
          {/* end home__banner */}


          <Container size={Container.sizes.SMALL} className="home__intro" id={'intro'}>
            <div className="home__intro-board">
              <p>{'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.'}</p>
            </div>
            <div className="home__intro-cubego">
              <img src={require('../../../shared/img/assets/model_example_1.png')} />
              <img src={require('../../../shared/img/assets/model_example_2.png')} />
              <img src={require('../../../shared/img/assets/model_example_3.png')} />
            </div>
          </Container>
          {/* end home__intro */}

          <Container className="home__modes" id={'modes'}>
            <div className="home__modes-title__container">
              <Text className={'home__modes-title'} type={Text.types.H2} children={_t('how_to_play')} />
            </div>

            <div className="home__mode-container">
              <Carousel list={guildGame} />
            </div>
          </Container>
          {/* end home__modes */}

          <div className="home__game-detail" id={'game-detail'}>

            <Container className={'home__game-detail__1 section'}>
              <div className={'background yellow left'}/>

              <div className={'content left'}>
                <div className={'desc'}>
                  <Text className={'header'} type={Text.types.H1} children={_t('game_detail_index')} />
                  <p className={'text'}>{_t('game_detail_index_desc')}</p>
                  <ButtonNew color={ButtonNew.colors.BLACK_NO_SHADOW} label={_t('read_more')}
                             className={'btn-btn'} onClick={() => {}}/>
                </div>
                <div className={'image'}>
                  <img src={require('../../../shared/img/banner/copywrite_banner.png')}/>
                </div>
              </div>
            </Container>

            <Container className={'home__game-detail__2 section'}>
              <div className={'background blue right'}/>

              <div className={'content right'}>
                <div className={'desc'}>
                  <Text className={'header'} type={Text.types.H1} children={_t('game_detail_index')} />
                  <p className={'text'}>{_t('game_detail_index_desc')}</p>
                  <ButtonNew color={ButtonNew.colors.BLACK_NO_SHADOW} label={_t('read_more')}
                             className={'btn-btn'} onClick={() => {}}/>
                </div>
                <div className={'image'}>
                  <img src={require('../../../shared/img/banner/index_banner.png')}/>
                </div>
              </div>
            </Container>

            <Container className={'home__game-detail__3 section'}>
              <div className={'background red left'}/>

              <div className={'content left'}>
                <div className={'desc'}>
                  <Text className={'header'} type={Text.types.H1} children={_t('game_detail_index')} />
                  <p className={'text'}>{_t('game_detail_index_desc')}</p>
                  <ButtonNew color={ButtonNew.colors.BLACK_NO_SHADOW} label={_t('read_more')}
                             className={'btn-btn'} onClick={() => {}}/>
                </div>
                <div className={'image'}>
                  <img src={require('../../../shared/img/banner/index_banner.png')}/>
                </div>
              </div>
            </Container>

          </div>
          {/* end home__game-detail */}

          <div className={'home__partnership'} id={'partners'}>
            <HeaderHighlight>
              <b>{_t('in_partnership_with')}</b>
            </HeaderHighlight>
            <div className={'home__partnership__imgs'}>
              <a href={'https://etheremon.com/'} target={'_blank'}><img src={'https://www.etheremon.com/assets/images/banner_facebook.png'}/><p>ETHEREMON</p></a>
              <a href={'https://etheremon.com/'} target={'_blank'}><img src={'https://www.etheremon.com/assets/images/banner_facebook.png'}/><p>ETHEREMON</p></a>
              <a href={'https://etheremon.com/'} target={'_blank'}><img src={'https://www.etheremon.com/assets/images/banner_facebook.png'}/><p>ETHEREMON</p></a>
            </div>
          </div>
          {/* end home__partnership */}

          <Container className="home__features" id={'features'}>
            <div className="home__features__title-container">
              <Text className={'home__features-title'} type={Text.types.H2} children={_t('features')} />
            </div>

            <div>
              <div className="home__features-cards">
                {features.map((ft,index) => {
                  return <FeatureCard key={index} className={'home__features-card'} {...ft} />;
                } )}
              </div>
            </div>
          </Container>
          {/* end home__features */}

          <div className="home__subscription">
            <HeaderHighlight>
              <b>{_t('get_the_latest_news')}</b>
            </HeaderHighlight>

            <Container className={'home__subscription-container'}>
              <div className={'home__subscription-img'}>
                <img src={require('../../../shared/img/assets/model_example_2.png')}/>
              </div>
              <div className={'home__subscription-main'}>
                <p>{_t('get_the_latest_news_desc')}</p>
                <input type="text" className={'home__subscription-input'} placeholder={_t('your_email_address')} value={this.state.email} readOnly/>
                <ButtonNew className={'home__subscription-btn'} color={ButtonNew.colors.GREEN} label={_t('subscribe')} onClick={() => {
                  
                }}/>
              </div>
            </Container>
          </div>
          {/* end home__subscription */}

        </div>

        <Footer />
      </PageWrapper>
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
