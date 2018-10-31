import React from 'react';
import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';
import withRouter from 'react-router/es/withRouter';
import { Container } from '../../widgets/Container/Container.jsx';
import { PageWrapper } from '../../widgets/PageWrapper/PageWrapper.jsx';
import Navbar from '../../components/bars/Navbar/Navbar.jsx';
import Footer from "../../components/bars/Footer/Footer.jsx";
import {URLS} from "../../../constants/general";
import { ButtonNew } from '../../widgets/Button/Button.jsx';
import {CUBE_MATERIALS, CUBE_TIER, CUBE_TYPES} from "../../../constants/cubego";
import * as ObjUtils from "../../../utils/objUtils";
import { ArrowDown } from '../../widgets/SVGManager/SVGManager.jsx';
import { ScrollSelector } from '../../widgets/ScrollSelector/ScrollSelector.jsx';
import {SubBgr} from "../HomePage/SubBgr/SubBgr.jsx";

require("style-loader!./GameIntro.scss");

const cubegonTiers = [
  {tier: 'challenger', value: 0},
  {tier: 'elite', value: 6000},
  {tier: 'champion', value: 26000},
  {tier: 'god', value: 68000},
];

const scrollSelectors = [
  {key: 'intro_single', id: 'what-is-cubego'},
  {key: 'cubego', id: 'cubego-intro'},
  {key: 'cubegon', id: 'cubegon-intro'},
  {key: 'combat', id: 'combat-intro'},
  {key: 'coming', id: 'what-next'}
];

class GameIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCubegoStats: false,
    }
  }

  componentDidMount() {
  }

  render() {
    const {_t} = this.props;
    let containerSize = Container.sizes.NORMAL;
    let typeList = ObjUtils.GetValues(CUBE_TYPES);

    return (
      <PageWrapper>
        <Navbar minifying size={containerSize}/>

        <div className="game-intro-page__container">

          <ScrollSelector history={this.props.history} offsetTop={20} listData={scrollSelectors} _t={_t} />

          <SubBgr position={SubBgr.positions.RIGHT} color={SubBgr.colors.YELLOW}/>

          <Container size={containerSize} className={'guide__game-intro'} id={'what-is-cubego'}>
            <img className={'decorated-cube'} src={require('../../../shared/img/game_intro/red_cube.png')}/>
            <div className="content right">
              <div className="content-desc">
                <div className="header--orange">
                  {_t('what_is_cubego')}
                </div>
                <div className={'header--detail'}>
                  {_t('desc.what_is_cubego')}
                </div>
              </div>
              <div className="content-image">
                <img src={require('../../../shared/img/game_intro/whatiscubegon.png')}/>
              </div>
            </div>
            <div className="principles">
              <div className="header--blue">
                {_t('principles_of_creation')}
              </div>

              <div className="principles__list-item">
                {
                  ['diversity', 'uniqueness', 'value_of_synergies'].map((ele, idx) =>
                    <div className="item" key={idx}>
                      <div className="header--sub">
                        {_t(`${ele}`)}
                      </div>
                      <div className="text--normal">
                        {_t(`desc.${ele}`)}
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </Container>

          <SubBgr position={SubBgr.positions.LEFT} color={SubBgr.colors.BLUE}/>
          <Container size={containerSize} className={'guide__cubego-intro'} id={'cubego-intro'}>
            <div className="main__header cubego-intro__header left">
              <img className={'decorated-cube'} src={require('../../../shared/img/game_intro/diamond.png')}/>
              <div className="header">
                {_t('cubego')}
              </div>
            </div>
            <div className="content left">
              <div className="content-desc header--detail">
                <p>{_t('desc.cubego-desc-1')}</p>
                <p>{_t('desc.cubego-desc-2')}</p>
              </div>
              <div className="content-image">
                <img src={require('../../../shared/img/game_intro/cubego_illustration.png')}/>
              </div>
            </div>

            <div className="tier-type-cubego">
              <div className="intro-tier-type__container">
                <div className={'header--orange-small'}>
                  {_t('tiers_types_cubegoes')}
                </div>
                <div className={'header--detail'}>
                  {_t('desc.tiers_types_cubegoes')}
                </div>
              </div>

              <SubBgr position={SubBgr.positions.RIGHT} color={SubBgr.colors.BLUE}/>

              <div className="tier-detail__container">
                <div className={'header--blue-small'}>
                  {_t('tiers')}
                </div>
                <div className={'text--highlight'}>
                  {_t('desc.tiers')}
                </div>

                <div className="tiers__list-view">
                  {
                    ['legendary', 'epic', 'rare', 'common', 'basic'].map((ele, idx) =>
                      <div className="item" key={idx}>
                        <img src={require(`../../../shared/img/game_intro/${ele}.png`)}/>
                        <div className="tier__content">
                          <div className={'tier__label'}>{_t(`${ele}`)}</div>
                          <div className={'tier__desc'}>{_t(`desc.${ele}`)}</div>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>

            </div>

          </Container>

          <div className={'cubego-stats__container'}>

            <Container size={containerSize} className="header__container">
              <div className="attributes__header header--blue-small">
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
            </Container>
            <div className="cubego-stats-details__container">
              <table className={`attribute-table ${this.state.showCubegoStats ? 'enable' : 'hidden'}`}>
                <thead>
                  <tr className={'header'}>
                    <th>{_t('tier')}</th>
                    <th>{_t('material')}</th>
                    <th>{_t('strength')}</th>
                    <th colSpan={5}>{_t('type')}</th>
                  </tr>
                  <tr className={'sub-header'}>
                    <th colSpan={3}/>
                    {typeList.map((t, tIdx) => (
                      <th key={tIdx}>{_t(t.name)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ObjUtils.GetValues(CUBE_MATERIALS).map((material, mIdx) => {
                    return (
                      <tr key={mIdx} className={`tier-${material.class_id}`}>
                        <td className={'material-name'}>{_t(CUBE_TIER[material.tier].name)}</td>
                        <td className={'material-icon'} tooltip={_t(material.name)} tooltip-position={'right'}>
                          <img src={material.icon}/>
                        </td>
                        <td>{material.point}</td>
                        {typeList.map((type, tIdx) => {
                          return (
                            <td key={tIdx} className={'material-variants'}>
                              {material.types[type.id].map(vKey => (<img key={vKey} src={material.variants[vKey].img}/>))}
                            </td>
                          )})}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="cubego-stats-detail__action"
                   style={{transform: `rotate(${this.state.showCubegoStats ? '180' : '0'}deg)`}}
                   onClick={() => {
                     this.setState((state) => {
                       return {showCubegoStats: !this.state.showCubegoStats};
                     });
                   }}
              >
                <ArrowDown />
              </div>
            </div>

          </div>

          <SubBgr position={SubBgr.positions.RIGHT} color={SubBgr.colors.BLUE}/>

          <Container size={containerSize} className={'guide__cubegon-intro'} id={'cubegon-intro'}>
            <div className="main__header cubegon-intro__header right">
              <img className={'decorated-cube'} src={require('../../../shared/img/game_intro/pallete.png')}/>
              <div className="header">
                {_t('cubegon')}
              </div>
            </div>

            <div className="content right">
              <div className="content-desc">
                <div className={'header--detail'}>{_t('cubegon.desc')}</div>
              </div>
              <div className="content-image">
                <img src={require('../../../shared/img/game_intro/cubegon_illustration.png')}/>
              </div>
            </div>

            <div className="cubegon-logic__container">
              <div className="header">
                <div className={'cubegon-logic__label header--orange-small'}>
                  {_t('creation_copyright_logic')}
                </div>
                <div className={'header--detail'}>
                  {_t('desc.creation_copyright_logic')}
                  </div>
              </div>

              <div className="cubegon-logic__sub-section">
                <div className={'background yellow left'}/>
                <div className="content right">
                  <div className="content-desc">
                    <div className="cubegon__header">
                      {_t('creation_header')}
                    </div>
                    <p>{_t('desc.creation_header')}</p>
                    <p>{_t('desc.creation_header_2')}</p>
                    <p>{_t('desc.creation_header_3')}</p>
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
              <div className={'cubegon-properties__label header--orange-small'}>
                {_t('cubegon_properties')}
              </div>
              <div className={'header--detail'}>
                {_t('desc.cubegon_properties')}
              </div>

              <SubBgr position={SubBgr.positions.LEFT} color={SubBgr.colors.YELLOW}/>
              <div className="cubegon-types">
                <div className={'header--blue-small'}>
                  {_t('cubegon_types')}
                </div>
                <div className={'text--highlight'}>{_t('desc.cubegon_types_1')}</div>
                <div className={'text--highlight'}>{_t('desc.cubegon_types_2')}</div>
                <img src={require('../../../shared/img/game_intro/type.png')} />
              </div>

              <SubBgr position={SubBgr.positions.RIGHT} color={SubBgr.colors.YELLOW}/>
              <div className="cubegon-stats">
                <div className={'header--blue-small'}>
                  {_t('cubegon_stats')}
                </div>
                <div className={'text--highlight'}>{_t('desc.cubegon_stats')}</div>
                <div className="content">
                  <img src={require('../../../shared/img/game_intro/stats.png')} />
                </div>
              </div>

              <SubBgr position={SubBgr.positions.LEFT} color={SubBgr.colors.BLUE}/>
              <div className="cubegon-tiers">
                <div className={'header--blue-small'}>
                  {_t('cubegon_tiers')}
                </div>
                <div className={'text--highlight'}>
                  {_t('desc.cubegon_tiers_1')}
                </div>
                <div className={'text--highlight'}>
                  {_t('desc.cubegon_tiers_2')}
                </div>
                <div className="cubegon-tiers__listview">
                  {
                    cubegonTiers.map((ele, idx) =>
                      <div className="item" key={idx}>
                        <div className={'img'}><img src={require(`../../../shared/img/game_intro/${ele.tier}.png`)}/></div>
                        <div className="cubegon-tier__label">{_t(`${ele.tier}`)}</div>
                        <div className={'desc'}>{_t(`desc.${ele.tier}`)}</div>
                        <div className="value">{ele.value}</div>
                        <div className={'sub'}>{_t('strength required')}</div>
                      </div>
                    )
                  }
                </div>
              </div>

              <SubBgr position={SubBgr.positions.RIGHT} color={SubBgr.colors.BLUE}/>
              <div className="cubegon-skills">
                <div className={'header--blue-small'}>
                  {_t('cubegon_skills')}
                </div>
                <div className={'text--highlight'}>
                  {_t('desc.cubegon_skills')}
                </div>
                <img src={require('../../../shared/img/banner/battle_banner.png')}/>
              </div>

              <div className="cubegon-energy">
                <div className={'header--blue-small'}>
                  {_t('cubegon_energy')}
                </div>
                <div className={'text--highlight'}>
                  {_t(`desc.cubegon_energy_1`)}
                </div>
                <div className={'text--highlight'}>
                  {_t(`desc.cubegon_energy_2`)}
                </div>
              </div>
            </div>
          </Container>

          <div className="cubegon-dismantle-reassemble__container">
            <Container size={containerSize}>
              <div className={'header--orange-small'}>
                {_t('dismantle_reassemble')}
              </div>
              <div className={'header--detail'}>
                {_t('desc.dismantle_reassemble_1')}
              </div>
              <div className={'header--detail'}>
                {_t('desc.dismantle_reassemble_2')}
              </div>
              <img className={'dismantle-reassemble__image'} src={require('../../../shared/img/game_intro/rebuild.png')}/>
            </Container>
          </div>

          <SubBgr position={SubBgr.positions.LEFT} color={SubBgr.colors.BLUE}/>
          <Container size={containerSize} className={'guide__combat-intro'} id={'combat-intro'}>
            <div className="main__header combat-intro__header left">
              <img className={'decorated-cube'} src={require('../../../shared/img/game_intro/battle.png')}/>
              <div className="header">
                {_t('combat')}
              </div>
            </div>
            <div className="content left">
              <div className="content-desc">
                <div className={'header--detail'}>{_t('desc.combat_intro_1')}</div>
                <div className={'header--detail'}>{_t('desc.combat_intro_2')}</div>
                <div className={'header--detail'}>{_t('desc.combat_intro_3')}</div>
              </div>
              <div className="content-image">
                <img src={require('../../../shared/img/game_intro/combat.png')}/>
              </div>
            </div>
          </Container>

          <SubBgr position={SubBgr.positions.RIGHT} color={SubBgr.colors.BLUE}/>
          <Container size={containerSize} className={'guide__what-next'} id={'what-next'}>
            <div className="main__header what-next__header right">
              <img className={'decorated-cube'} src={require('../../../shared/img/game_intro/paper.png')}/>
              <div className="header">
                {_t('what_next')}
              </div>
            </div>
            <div className="content right">
              <div className="content-desc">
                <div className={'header--detail'}>{_t('desc.what_next_1')}</div>
                <div className={'header--detail'}>{_t('desc.what_next_2')}</div>
                <div className={'header--detail'}>{_t('desc.what_next_3')}</div>
                <div className={'header--detail'}>{_t('desc.what_next_4')}</div>
                <div className={'header--detail'}>{_t('desc.what_next_5')}</div>
              </div>
              <div className="content-image">
                <img src={require('../../../shared/img/game_intro/next.png')}/>
              </div>
            </div>
          </Container>

          <Container size={containerSize} className={'guide__last'}>
            <div className={'text'}>
              <div className={'header--detail'}>{_t('last.1')}</div>
              <div className={'header--detail'}>{_t('last.2')}</div>
              <div className={'header--detail'}>{_t('last.3')}</div>
              <div className={'header--detail'}>{_t('last.4')}</div>
            </div>
            <div className={'build-your-cubegon__header'}>
              {_t('build_your_cubegon')}
            </div>

            <ButtonNew className={'create__button'} label={_t('build_cubegon')}
                       onClick={() => {this.props.history.push(`/${URLS.BUILD_GON}`)
            }}/>

            <ButtonNew className={'create__button'} label={_t('register for presale')}
                       color={ButtonNew.colors.BLUE}
                       onClick={() => {this.props.history.push(`/${URLS.SIGN_IN}`)
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