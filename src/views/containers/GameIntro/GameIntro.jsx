import React from 'react';
import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';
import withRouter from 'react-router/es/withRouter';
import { Container } from '../../widgets/Container/Container.jsx';
import { PageWrapper } from '../../widgets/PageWrapper/PageWrapper.jsx';
import Navbar from '../../components/bars/Navbar/Navbar.jsx';
import * as Utils from "../../../utils/utils";
import Footer from "../../components/bars/Footer/Footer.jsx";
import {URLS} from "../../../constants/general";
import { Text } from '../../widgets/Text/Text.jsx';
import { ButtonNew } from '../../widgets/Button/Button.jsx';

require("style-loader!./GameIntro.scss");

const cubegonTiers = [
  {tier: 'challenger', value: 0},
  {tier: 'ellite', value: 6000},
  {tier: 'champion', value: 26000},
  {tier: 'god', value: 68000},
]

class GameIntro extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {_t} = this.props;

    return (
      <PageWrapper type={PageWrapper.types.NORMAL}>
        <Navbar minifying />

        <div className="game-intro-page__container">

          <Container className={'guild__game-intro sub-background yellow right'}>
            <div className="content right">
              <div className="content-desc">
                <div className="game-intro__header">
                  {_t('what_is_cubego')}
                </div>
                <p>{_t('desc.what_is_cubego')}</p>
              </div>
              <div className="content-image">
                <img src={require('../../../shared/img/game_intro/whatiscubegon.png')}/>
              </div>
            </div>
            <div className="principles">
              <div className="header__label">
                {_t('principles_of_creation')}
              </div>

              <div className="principles__list-item">
                {
                  ['diversity', 'uniqueness', 'value_of_synergies'].map((ele, idx) => 
                    <div className="item" key={idx}>
                      <div className="principles-types">
                        {_t(`${ele}`)}
                      </div>
                      <p>
                        {_t(`desc.${ele}`)}
                      </p>
                    </div>
                  )
                }
              </div>
            </div>
          </Container>

          <Container className={'guild__cubego-intro'}>
            <div className="main__header cubego-intro__header left">
              <div className="header">
                {_t('cubego')}
              </div>
            </div>
            <div className="content left sub-background blue left">
              <div className="content-desc">
                <p>{_t('desc.cubego-desc-1')}</p>
                <p>{_t('desc.cubego-desc-2')}</p>
              </div>
              <div className="content-image">
                <img src={require('../../../shared/img/game_intro/cubego_illustration.png')}/>
              </div>  
            </div>

            <div className="tier-type-cubego">
              <div className="intro-tier-type__container">
                <Text className={'intro-tier-type__label'} type={Text.types.H2} children={_t('tiers_types_cubegoes')} />
                <p>{_t('desc.tiers_types_cubegoes')}</p>
              </div>

              <div className="tier-detail__container">
                <Text className={'tiers__label'} type={Text.types.H3} children={_t('tiers')} />
                <p>{_t('desc.tiers')}</p>
                <div className="tiers__list-view sub-background blue right">
                  {
                    ['legendary', 'epic', 'rare', 'common', 'basic'].map((ele, idx) => 
                      <div className="item" key={idx}>
                        <img src={require(`../../../shared/img/game_intro/${ele}.png`)}/>
                        <div className="tier__content">
                          <Text className={'tier__label'} type={Text.types.H4} children={_t(`${ele}`)} />
                          <p>{_t(`desc.${ele}`)}</p>
                        </div>  
                      </div>
                    )
                  }
                </div>
              </div>

            </div>
          
          </Container>

          <Container className={'cubego-stats__container'}>
            <div className="header__container">
              <div className="attributes__header">
                {_t('attributes')}
              </div>
              <div className="sub-header__container">
                <div className="sub-header">
                  <div className="type__label">
                    {_t('types')}
                  </div>
                  <p>{_t('desc.types')}</p>
                </div>
                <div className="sub-header">
                  <div className="strength__label">
                    {_t('strength')}
                  </div>
                  <p>{_t('desc.strength')}</p>
                </div>
              </div>
            </div>

            <div className="cubego-stats-details__container">
                  
            </div>
          </Container>

          <Container className={'guild__cubegon-intro'}>
            <div className="main__header cubegon-intro__header right">
              <div className="header">
                {_t('cubegon')}
              </div>
            </div>
            <div className="content right sub-background blue right">
              <div className="content-desc">
                <p>{_t('desc.cubegon_desc_1')}</p>
                <p>{_t('desc.cubegon_desc_2')}</p>
              </div>
              <div className="content-image">
                <img src={require('../../../shared/img/game_intro/cubegon_illustration.png')}/>
              </div>  
            </div>

            <div className="cubegon-logic__container">
              <div className="header">
                <Text className={'cubegon-logic__label'} type={Text.types.H2} children={_t('creation_copyright_logic')} />
                <p>{_t('desc.creation_copyright_logic')}</p>
              </div>

              <div className="cubegon-logic__sub-section">
                <div className={'background yellow left'}/>
                <div className="content right">
                  <div className="content-desc">
                    <div className="cubegon__header">
                      {_t('creation_header')}
                    </div>
                    <p>{_t('desc.creation_header')}</p>
                  </div>
                  <div className="content-image">
                    <img src={require('../../../shared/img/game_intro/variant.png')}/>
                  </div>  
                </div>
              </div>

              <div className="cubegon-logic__sub-section">
                <div className={'background blue right'}/>
                <div className="content left">
                  <div className="content-desc">
                    <div className="cubegon__header">
                    {_t('copyright_logic_header')}
                    </div>
                    <p>{_t('desc.copyright_logic_header')}</p>
                  </div>
                  <div className="content-image">
                    <img src={require('../../../shared/img/game_intro/unique.png')}/>
                  </div>  
                </div>
              </div>
            </div>

            <div className="cubegon-properties__container">
              <Text className={'cubegon-properties__label'} type={Text.types.H2} children={_t('cubegon_properties')} />
              <p>{_t('desc.cubegon_properties')}</p>
              <div className="cubegon-types sub-background yellow left">
                <Text className={''} type={Text.types.H3} children={_t('cubegon_types')} />
                <p>{_t('desc.cubegon_types_1')}</p>
                <p>{_t('desc.cubegon_types_2')}</p>
                <img src={require('../../../shared/img/game_intro/type.png')} />
              </div>

              <div className="cubegon-stats sub-background yellow right">
                <Text className={''} type={Text.types.H3} children={_t('cubegon_stats')} />
                <p>{_t('desc.cubegon_stats')}</p>
                <div className="content">
                  <img src={require('../../../shared/img/game_intro/stats.png')} />
                </div>
              </div>

              <div className="cubegon-tiers sub-background blue left">
                <Text className={''} type={Text.types.H3} children={_t('cubegon_tiers')} />
                <p>{_t('desc.cubegon_tiers_1')}</p>
                <p>{_t('desc.cubegon_tiers_2')}</p>
                <div className="cubegon-tiers__listview">
                  {
                    cubegonTiers.map((ele, idx) => 
                      <div className="item" key={idx}>
                        <img src={require(`../../../shared/img/game_intro/${ele.tier}.png`)}/>
                        <div className="cubegon-tier__label">
                          {
                            _t(`${ele.tier}`)
                          }
                        </div>
                        <p>{_t(`desc.${ele.tier}`)}</p>
                        <div className="value">{ele.value}</div>
                      </div>
                    )
                  }
                </div>
              </div>

              <div className="cubegon-skills sub-background blue right">
                <Text className={''} type={Text.types.H3} children={_t('cubegon_skills')} />
                <p>{_t('desc.cubegon_skills')}</p>
                <img src={require('../../../shared/img/banner/banner-copyright.png')}/>
              </div>

              <div className="cubegon-energy">
                <Text className={''} type={Text.types.H3} children={_t('cubegon_energy')} />
                <p>{_t(`desc.cubegon_energy_1`)}</p>
                <p>{_t(`desc.cubegon_energy_2`)}</p>
              </div>

            </div>
            <div className="cubegon-dismantle-reassemble__container">
              <Text className={'cubegon-dismantle-reassemble__label'} type={Text.types.H2} children={_t('dismantle_reassemble')} />
              <p>{_t('desc.dismantle_reassemble_1')}</p>
              <p>{_t('desc.dismantle_reassemble_2')}</p>
            </div>
          </Container>

          <Container className={'guild__combat-intro'}>
            <div className="main__header combat-intro__header left">
              <div className="header">
                {_t('combat')}
              </div>
            </div>
            <div className="content left sub-background blue left">
              <div className="content-desc">
                <p>{_t('desc.combat_intro_1')}</p>
                <p>{_t('desc.combat_intro_2')}</p>
                <p>{_t('desc.combat_intro_3')}</p>
              </div>
              <div className="content-image">
                <img src={require('../../../shared/img/banner/banner-copyright.png')}/>
              </div> 
            </div>
            <img src={require('../../../shared/img/banner/banner-copyright.png')}/>
          </Container>

          <Container className={'guild__what-next'}>
            <div className="main__header what-next__header right">
              <div className="header">
                {_t('what_next')}
              </div>
            </div>
            <div className="content left sub-background blue right">
              <div className="content-desc">
                <p>{_t('desc.what_next_1')}</p>
                <p>{_t('desc.what_next_2')}</p>
                <p>{_t('desc.what_next_3')}</p>
                <p>{_t('desc.what_next_4')}</p>
              </div>
              <div className="content-image">
                <img src={require('../../../shared/img/banner/banner-copyright.png')}/>
              </div> 
            </div>
            <p>{_t('desc.what_next_1')}</p>
            <p>{_t('desc.what_next_2')}</p>
            <p>{_t('desc.what_next_3')}</p>
            <p>{_t('desc.what_next_4')}</p>
            
            <div>
              <Text className={'build-your-cubegon__header'} type={Text.types.H2} children={_t('build_your_cubegon')} />
            </div>
            
            <ButtonNew showDeco={ButtonNew.deco.BOTH} className={'create__button'} label={_t('create_now')} onClick={() => {
              this.props.history.push(`/${URLS.BUILD_GON}`)
            }}/>

          </Container>
          
        </div>

        <Footer type={Footer.types.NORMAL} />
      </PageWrapper>
    )
  }
}

const mapStateToProps = (store, props) => {
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
)(GameIntro));