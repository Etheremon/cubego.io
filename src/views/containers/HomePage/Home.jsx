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
import InviewMonitor from '../../widgets/InviewMonitor/InviewMonitor.jsx';

require("style-loader!./Home.scss");

const _features = [
  {img: require('../../../shared/img/assets/model_example_1.png'), title: 'trading', desc: 'desc.trading'},
  {img: require('../../../shared/img/assets/model_example_1.png'), title: 'auction', desc: 'desc.auction'},
  {img: require('../../../shared/img/assets/model_example_1.png'), title: 'market', desc: 'desc.market'},
  {img: require('../../../shared/img/assets/model_example_1.png'), title: 'battle', desc: 'desc.battle'},
];

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    }

    this.validateEmail = this.validateEmail.bind(this);
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
          this.props.history.push(`/${URLS.BUILD_GON}`)
        }}/>
      </div>,
    ])
  }

  validateEmail() {

  }

  render() {
    let {activeCube} = this.state;
    const { _t, pathName } = this.props;
    const guildGame = [
      {component: <img className={'guild-game'} key={'guild-game-1'} src={require('../../../shared/img/assets/model_example_1.png')}/>, text: _t('buy')} ,
      {component: <img className={'guild-game'} key={'guild-game-2'} src={require('../../../shared/img/assets/model_example_2.png')}/>, text: _t('build')} ,
      {component: <img className={'guild-game'} key={'guild-game-3'} src={require('../../../shared/img/assets/model_example_3.png')}/>, text: _t('battle')} ,
    ];

    const customIndicators = [
      <div className={'feature-indicator'} key={'btn-1'} >{_t('trading')}</div>,
      <div className={'feature-indicator'} key={'btn-2'} >{_t('auction')}</div>,
      <div className={'feature-indicator'} key={'btn-3'} >{_t('market')}</div>,
      <div className={'feature-indicator'} key={'btn-4'} >{_t('battle')}</div>,
    ]

    return (
      <PageWrapper>
        <Navbar pathName={pathName} transforming navbarType={'home'} scrollingElement={'home-page'}/>

        <div className={'home-page'} id={'home-page'}>

          <div className={'home__banner'} id={'home'}>
            <Slider list={this.renderBanner()}/>
          </div>
          {/* end home__banner */}

          <InviewMonitor
            classNameNotInView='vis-hidden'
            classNameInView='animated fadeInUp'
          >
            <Container size={Container.sizes.SMALL} className="home__intro" id={'intro'}>
              <div className="home__intro-board">
                <p>{'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.'}</p>
              </div>
              <div className="home__intro-cubego">
                {[
                  require('../../../shared/img/assets/model_example_1.png'), 
                  require('../../../shared/img/assets/model_example_3.png'),
                  require('../../../shared/img/assets/model_example_2.png')].map((cube, idx) => (
                    <img key={idx} src={cube}/>
                  ))
                }              
              </div>
            </Container>
          </InviewMonitor>
          {/* end home__intro */}

          <Container className="home__modes" id={'modes'}>
            <div className="home__modes-title__container">
              <Text className={'home__modes-title'} type={Text.types.H2} children={_t('how_to_play')} />
            </div>

            <div className="home__mode-container">
              <Carousel list={guildGame}/>
            </div>
          </Container>
          {/* end home__modes */}

          <div className="home__game-detail" id={'game-detail'}>

              <Container className={'home__game-detail__1 section'}>
                <div className={'background yellow left'}/>

                <div className={'content left'}>

                  <InviewMonitor
                    classNameNotInView='vis-hidden'
                    classNameInView='animated fadeInLeft'
                  >
                    <div className={'desc'} >
                      <Text className={'header'} type={Text.types.H1} children={_t('game_detail_index')} />
                      <p className={'text'}>{_t('game_detail_index_desc')}</p>
                      <ButtonNew color={ButtonNew.colors.BLACK_NO_SHADOW} label={_t('read_more')}
                                className={'btn-btn'} onClick={() => {}}/>
                    </div>
                  </InviewMonitor>

                  <InviewMonitor
                    classNameNotInView='vis-hidden'
                    classNameInView='animated zoomIn'
                  >
                    <div className={'image'} >
                      <img src={require('../../../shared/img/banner/copywrite_banner.png')}/>
                    </div>
                  </InviewMonitor>
                </div>
              </Container>


            
              <Container className={'home__game-detail__2 section'}>
                <div className={'background blue right'}/>

                <div className={'content right'}>
                <InviewMonitor
                  classNameNotInView='vis-hidden'
                  classNameInView='animated fadeInRight'
                >
                  <div className={'desc'}>
                    <Text className={'header'} type={Text.types.H1} children={_t('game_detail_index')} />
                    <p className={'text'}>{_t('game_detail_index_desc')}</p>
                    <ButtonNew color={ButtonNew.colors.BLACK_NO_SHADOW} label={_t('read_more')}
                              className={'btn-btn'} onClick={() => {}}/>
                  </div>
                </InviewMonitor>
                <InviewMonitor
                  classNameNotInView='vis-hidden'
                  classNameInView='animated zoomIn'
                >
                  <div className={'image'}>
                    <img src={require('../../../shared/img/banner/index_banner.png')}/>
                  </div>
                </InviewMonitor>
                </div>
              </Container>


            
              <Container className={'home__game-detail__3 section'}>
                <div className={'background red left'}/>

                <div className={'content left'}>
                  <InviewMonitor
                    classNameNotInView='vis-hidden'
                    classNameInView='animated fadeInUp'
                  >
                    <div className={'desc'}>
                      <Text className={'header'} type={Text.types.H1} children={_t('game_detail_index')} />
                      <p className={'text'}>{_t('game_detail_index_desc')}</p>
                      <ButtonNew color={ButtonNew.colors.BLACK_NO_SHADOW} label={_t('read_more')}
                                className={'btn-btn'} onClick={() => {}}/>
                    </div>
                  </InviewMonitor>
                  <InviewMonitor
                    classNameNotInView='vis-hidden'
                    classNameInView='animated zoomIn delay-2s'
                  >
                    <div className={'image'}>
                      <img src={require('../../../shared/img/banner/index_banner.png')}/>
                    </div>
                  </InviewMonitor>
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

          <InviewMonitor
            classNameNotInView='vis-hidden'
            classNameInView='animated zoomIn'
          >
            <Container className="home__features" id={'features'}>
              <div className="home__features__title-container">
                <Text className={'home__features-title'} type={Text.types.H2} children={_t('features')} />
              </div>

              <Carousel className="home__features-cards" orientation={Carousel.orientation.VERTICAL} list={_features.map((ft,index) =>
                                <FeatureCard key={index} className={'home__features-card'} {...ft} />
                              )} customIndicators={customIndicators}/>
            </Container>
          </InviewMonitor>
          {/* end home__features */}

          <InviewMonitor
            classNameNotInView='vis-hidden'
            classNameInView='animated slideInDown' // fadeInLeft, or fadeInRight
          >
            <div className="home__subscription">

              <Container className={'home__subscription-container'}>
                <div className={'home__subscription-img'}>
                  <img src={require('../../../shared/img/assets/model_example_2.png')}/>
                </div>
                <div className={'home__subscription-main'}>
                  <HeaderHighlight>
                    <b>{_t('get_the_latest_news')}</b>
                  </HeaderHighlight>
                  <p>{_t('get_the_latest_news_desc')}</p>
                  <input type="text" name="email" className={'home__subscription-input'} placeholder={_t('your_email_address')} onChange={this.validateEmail}/>
                  <ButtonNew className={'home__subscription-btn'} color={ButtonNew.colors.GREEN} label={_t('subscribe')} onClick={() => {
                    
                  }}/>
                </div>
              </Container>
            </div>
          </InviewMonitor>
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
