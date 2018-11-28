import React from 'react'
import {connect} from "react-redux"
import {getTranslate} from 'react-localize-redux'
import { ButtonNew } from '../../widgets/Button/Button.jsx';
import { CustomRectangle, CubegoFooter } from '../../widgets/SVGManager/SVGManager.jsx';
import { CUBE_TYPES } from '../../../constants/cubego.js';
import {ConvertStatsToTier, GetImageFromGonID} from '../../../utils/logicUtils';
import {RegisterModelToBlockchain} from "../../../services/transaction";
import {addTxn} from "../../../actions/txnAction";
import {CubegonApi} from "../../../services/api/cubegonApi";
import withRouter from "react-router-dom/es/withRouter";
import {GON_FLAG, GON_TIER} from "../../../constants/cubegon";
import Countdown from "../../widgets/Countdown/Countdown.jsx";
import * as Config from "../../../config";

require("style-loader!./PendingCubegonCard.scss");

class CubegonCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.resubmitCubegon = this.resubmitCubegon.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  resubmitCubegon() {
    let {total_cubego, id, name, history, _t} = this.props;

    this.setState({submitting: true});

    CubegonApi.RetryRegisterCubegon({gonId: id}).then(({response, error}) => {
      if (!error) {
        RegisterModelToBlockchain(this.props.dispatch, addTxn, _t, {
          retrying: true,
          cubegon_name: name,
          num_cubes: total_cubego,
          txn_data: response,
          history: history,
          successCallback: null,
          failedCallback: null,
          finishCallback: () => {
            this.setState({submitting: false});
          },
        });
      }
    });
  }

  render() {
    const {_t, className, energy_limit, expiry_time, id, name, total_cubego, total_stats, type_id, flag} = this.props;
    let tierId = ConvertStatsToTier(total_stats);

    return(
      <div className={`pending-cubegon-card__container ${className && className}`}>
        <div className="border-1">
          <div className="border-2">
            <div className="border-3">

              <div className={'cubegon__image-wrapper'}>
                <img className={'cubegon__image'} src={GetImageFromGonID(id)}/>

                <div className={'type__image'}
                     tooltip={_t(CUBE_TYPES[type_id].name)}
                     tooltip-position={'bottom'}>
                  <img src={require(`../../../shared/img/types/${CUBE_TYPES[type_id].name}.png`)}/>
                </div>

                <div className={'cubegon__badges'}>
                  {flag === GON_FLAG.ORIGINAL ?
                    <div className={'badge__origin-wrapper'}
                         tooltip={_t('original')}
                         tooltip-position={'bottom'}>
                      <img src={require('../../../shared/img/badges/original.png')}/>
                    </div> : null
                  }
                  <div className={'badge__tier-wrapper'}
                       tooltip={_t(GON_TIER[tierId].name)}
                       tooltip-position={'bottom'}>
                    <img src={GON_TIER[tierId].img} />
                  </div>

                  {/* ... */}
                </div>

                <div className={'cubegon__countdown-content'}>
                  {this.state.expired ? (
                    <div className={'countdown-box'}>
                      {_t('expired')}
                    </div>
                  ) : (
                    <React.Fragment>
                      <Countdown className={'countdown-box'} targetTime={expiry_time*1000} showDays={false} showText={false}
                                 onFinishCountdown={() => {this.setState({expired: true});}}/>
                      <ButtonNew size={ButtonNew.sizes.SMALL} className={'energy'} loading={this.state.submitting}
                                 color={ButtonNew.colors.BLUE}
                                 label={_t(`re-register`)} onClick={this.resubmitCubegon}/>
                    </React.Fragment>
                  )}
                </div>
              </div>

              {/*<img className={'shopping__image'} src={require(`../../../shared/img/cubegoes/${'000'}.png`)}/>*/}

              <div className="stats__container">
                  <div className="item">
                    <div className="number">
                      {total_cubego}
                    </div>
                    <div className="label">
                      {_t('cubegoes')}
                    </div>
                  </div>
                  <div className="item">
                    <div className="number">
                      {total_stats}
                    </div>
                    <div className="label">
                      {_t('stats')}
                    </div>
                  </div>
                  <div className="item">
                    <div className="number">
                      {energy_limit}
                    </div>
                    <div className="label">
                      {_t('energy')}
                    </div>
                  </div>
              </div>

              <div className="footer">
                <div className="cubegon-name">
                  <CubegoFooter stroke={'#75C3F5'} fill={'#12314F'} />
                  <div className={'cubegon-name__content'}>{name}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    _t: getTranslate(store.localeReducer),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  }
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CubegonCard));
