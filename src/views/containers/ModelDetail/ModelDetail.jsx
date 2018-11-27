import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';

import { Text } from '../../widgets/Text/Text.jsx';
import { ButtonNew } from '../../widgets/Button/Button.jsx';
import withRouter from 'react-router/es/withRouter';
import { Container } from '../../widgets/Container/Container.jsx';
import { PageWrapper } from '../../widgets/PageWrapper/PageWrapper.jsx';
import Navbar from '../../components/bars/Navbar/Navbar.jsx';
import { HeaderBar } from '../../components/bars/HeaderBar/HeaderBar.jsx';
import Footer from '../../components/bars/Footer/Footer.jsx';
import PieChart from '../../components/PieChart/PieChart.jsx';
import {CubegonActions} from "../../../actions/cubegon";
import {GetCubegonInfo, GetLoggedInUserId, GetUserInfo} from "../../../reducers/selectors";
import Loading from '../../components/Loading/Loading.jsx';
import { GetModelFromStructure } from '../../../utils/logicUtils.js';
import { Model3D } from '../../../games/react_views/Model3D/Model3D.jsx';
import { UpdateCubegonName, DeleteModel, UpdateCubegonEnergy } from '../../../services/transaction.js';
import { addTxn } from '../../../actions/txnAction.js';


require("style-loader!./ModelDetail.scss");

class ModelDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.mainViewRender = this.mainViewRender.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(CubegonActions.LOAD_CUBEGON_INFO.init.func({gonId: this.props.gonId, forceUpdate: false}));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.gonId !== nextProps.gonId) {
      this.props.dispatch(CubegonActions.LOAD_CUBEGON_INFO.init.func({gonId: nextProps.gonId, forceUpdate: false}));
    }
  }

  mainViewRender() {
    const {_t, gonInfo, userInfo, gonId, userId} = this.props;

    if (!gonInfo) {
      return <Loading />
    }

    const combatStats = [{icon: require('../../../shared/img/icons/icon-stats.png'), content: gonInfo.total_win, label: 'win'},
                          {icon: require('../../../shared/img/icons/icon-stats.png'), content: gonInfo.total_lose, label: 'lose'},
                          {icon: require('../../../shared/img/icons/icon-stats.png'), content: `${gonInfo.used_energy}/${gonInfo.energy_limit}`, label: 'energy'}];

    const moves = ['icon-stats', 'icon-stats', 'icon-stats', 'icon-stats'];

    const samplePieData = [{label: 'Defense', value: gonInfo.defense, color: '#81d8d0'},
                          {label: 'Attack', value: gonInfo.attack, color: '#52b7bd'},
                          {label: 'Health', value: gonInfo.hp, color: '#332216'},
                          {label: 'Speed', value: gonInfo.speed, color: '#003366'}];
    const model = GetModelFromStructure(gonInfo.structure);

    return (
      <Container className={'model-detail__main'} size={Container.sizes.NORMAL}>

          <div className="model-detail__container">
            <div className="model-review">
                {model ?
                  <Model3D ref={(canvas) => {this.modelCanvas = canvas}} 
                  model={model} viewOnly/> : null
                }
            </div>

            <div className={`model-info`}>
              <div className="model-logo__container">
                {/* <div className="hexagon-img">
                  <Model3D ref={(canvas) => {this.modelCanvas = canvas}} model={validatedModel.model} viewOnly/> : null
                </div> */}
                <img src={require('../../../shared/img/types/earth.png')} />
              </div>
              <span>
                <input type="text" defaultValue={gonInfo.name} size={10} onChange={() => {}} readOnly={true} />
                <img src={require('../../../shared/img/icons/icon_pencil.png')} onClick={() => {
                  UpdateCubegonName(this.props.dispatch, addTxn, _t, {
                    cubegon_name: gonInfo.name,
                    id: gonId,
                    tokenId: gonInfo.token_id,
                    address: userId,
                    successCallback: null,
                    failedCallback: null,
                    finishCallback: (data) => {},
                  });
                }} /> 
              </span>
            </div>

            <div className="model-action">
              <ButtonNew label={_t('destroy')}
                      className={'destroy__button'} size={ButtonNew.sizes.NORMAL} onClick={() => {
                        console.log('ok')
                        DeleteModel(this.props.dispatch, addTxn, _t, {
                          tokenId: gonInfo.token_id,
                          successCallback: (data) => {
                            
                          },
                          failedCallback: null,
                          finishCallback: () => {
                            
                          },
                        });
                      }}/>
            </div>

          </div>

          <div className="model-stats">
            <div className="owner-info">
              <div className="owner-name">
                {_t('owner:')}
                <span>Maerongia</span>
              </div>

              <div className="timestamp">
                {`${_t('create_time')}:`}
                <span>20/10/2018</span>

                {`${_t('patent_id')}:`}
                <span>{gonInfo.shape_id}</span>
              </div>

            </div>

            <Text className={'detail-profile header'} type={Text.types.H2} children={_t('profile')} />
            <div className="profile__container">
              <div className={'cube-statistic'}>
                
              </div>
              <div className="pie-chart__container">
                <div className="pie-chart">
                {<PieChart
                  data={ samplePieData }
                  radius={ 100 }
                  hole={ 15 }
                  showLabels={ true }
                  strokeWidth={ 3 }
                  stroke={ 'transparent' }
                />}
                </div>
                <img src={require('../../../shared/img/background/background_circle.png')} />
                <img className={'octagon-img'} src={require('../../../shared/img/icons/icon-total.png')} />
                <div className="total">
                  {samplePieData.reduce((acc, curr) => acc + curr.value, 0)}
                </div>
              </div>
            </div>

            <Text className={'detail-moves header'} type={Text.types.H2} children={_t('moves')} />
            <div className="moves__container">
              {moves.map((item, idx) => 
                <img key={idx} src={require('../../../shared/img/icons/icon-stats.png')} />
                )}
            </div>

            <Text className={'detail-combat header'} type={Text.types.H2} children={_t('combat')} />
            <div className="combat__container">
              {combatStats.map((item, idx) => (
                    <div className={'item'} key={idx}>
                      <img src={item.icon} />
                      <div className={'content'}>{item.content}</div>
                      <div className={'label'}>{_t(item.label)}</div>
                    </div>
                  ))}
            </div>

            <div className="profile-action__container">
              <ButtonNew label={_t('go_to_battle')}
                      className={'go-to-battle__button'} size={ButtonNew.sizes.NORMAL}/>

              <div className="trade__container">
                <ButtonNew label={_t('transfer')}
                        className={'transfer__button'} size={ButtonNew.sizes.NORMAL}/>
                <ButtonNew label={_t('sell')} color={ButtonNew.colors.TURQUOISE}
                className={'sell__button'} size={ButtonNew.sizes.NORMAL}/>
              </div>
              
              <ButtonNew label={_t('top_up_energy')}
                      className={'top-up-energy__button'} size={ButtonNew.sizes.NORMAL} onClick={() => {
                        UpdateCubegonEnergy(this.props.dispatch, addTxn, _t, {
                          tokenId: gonInfo.token_id,
                          energyLimit: gonInfo.energyLimit,
                          successCallback: (data) => {
                            
                          },
                          failedCallback: null,
                          finishCallback: () => {
                            
                          },
                        });
                      }}/>
            </div>
          </div>

        </Container>
    )


  }

  render() {
    const {_t, userInfo} = this.props;
    return (
      <PageWrapper type={PageWrapper.types.BLUE}>

        <Navbar minifying/>

        <div className="detail-page__container">
          <HeaderBar size={Container.sizes.NORMAL} label={_t('cubegon_detail')}
                     userInfo={userInfo}
                     onBackClicked={() => this.props.history.goBack()}/>
          {
            this.mainViewRender()
          }
        </div>
        <Footer size={Container.sizes.NORMAL} type={Footer.types.DARK}/>
      </PageWrapper>
    )
  }
}

const mapStateToProps = (store, props) => {
  let userId = GetLoggedInUserId(store);
  return {
    _t: getTranslate(store.localeReducer),
    userInfo: GetUserInfo(store, userId),
    gonId: props.match.params.id,
    gonInfo: GetCubegonInfo(store, props.match.params.id),
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelDetail));