import React from 'react'
import {connect} from "react-redux"
import {getTranslate} from 'react-localize-redux'
import { ButtonNew } from '../../widgets/Button/Button.jsx';
import { CustomRectangle, CubegoFooter } from '../../widgets/SVGManager/SVGManager.jsx';
import { CUBE_TYPES } from '../../../constants/cubego.js';
import { GetImageFromGonID, ConvertStatsToTier } from '../../../utils/logicUtils';
import { GON_TIER } from '../../../constants/cubegon.js';
import { TextImage } from '../../widgets/Text/Text.jsx';


require("style-loader!./CubegonCard.scss");

class CubegonCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCubegonStats: false
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const {_t, className, energy_limit, energy_left, id, token_id, name, total_cubego, total_stats, type_id, shape_id, stats} = this.props;
    const tier = ConvertStatsToTier(total_stats)

    return(
      <div className={`cubegon-card__container ${className && className}`}>
        <div className="border-1">
          <div className="border-2">
            <div className="border-3">
              <div className="header">
                <div className="tier-image__container">
                  <img className={'tier__image'} src={tier ? GON_TIER[tier].img : ''}/>
                </div>
                <div className="id">
                    {this.state.showCubegonStats ? `#${token_id}` : ''}
                    <img className={'fas'} src={require(`../../../shared/img/inventory/info-icon.png`)} onMouseOver={() => {
                      this.setState({
                        showCubegonStats: true
                      })
                    }}
                    onMouseLeave={() => {
                      this.setState({
                        showCubegonStats: false
                      })
                    }} />
                </div>
              </div>
              <div className="cubegon-image__container">
                <div className={`detail-stats__container ${this.state.showCubegonStats ? '' : 'hidden'}`}>
                      <div className="content">
                        <div className="left">
                          <TextImage order={TextImage.order.REVERSE} text={_t('energy')} imgSource={require(`../../../shared/img/inventory/energy-icon.png`)}/>
                        </div>
                        <div className="right">
                          {`${energy_left}/${energy_limit}+`}
                        </div>
                      </div>
                      <div className="content">
                        <div className="left">
                          <TextImage order={TextImage.order.REVERSE} text={_t('health')} imgSource={require(`../../../shared/img/inventory/health-icon.png`)}/>
                        </div>
                        <div className="right">
                          {/* {stats.health} */}
                          0
                        </div>
                      </div>
                      <div className="content">
                        <div className="left">
                          <TextImage order={TextImage.order.REVERSE} text={_t('attack')} imgSource={require(`../../../shared/img/inventory/attack-icon.png`)}/>
                        </div>
                        <div className="right">
                          {/* {stats.attack} */}
                          0
                        </div>
                      </div>
                      <div className="content">
                        <div className="left">
                          <TextImage order={TextImage.order.REVERSE} text={_t('defense')} imgSource={require(`../../../shared/img/inventory/defense-icon.png`)}/>
                        </div>
                        <div className="right">
                          {/* {stats.defense} */}
                          0
                        </div>
                      </div>
                      <div className="content">
                        <div className="left">
                          <TextImage order={TextImage.order.REVERSE} text={_t('speed')} imgSource={require(`../../../shared/img/inventory/speed-icon.png`)}/>
                        </div>
                        <div className="right">
                          {/* {stats.speed} */}
                          0
                        </div>
                      </div>
                    </div>
                <img className={'cubegon__image'} src={GetImageFromGonID(id)}/>
                <ButtonNew size={ButtonNew.sizes.SMALL} className={'energy'} label={`${energy_left}/${energy_limit}+`} onClick={() => {}}/>
              </div>
              <img className={'shopping__image'} src={require(`../../../shared/img/cubegoes/${'000'}.png`)}/>
              <div className="stats__container">
                  <div className="cubegoes cell">
                    <div className="number">
                      {total_cubego}
                    </div>
                    <div className="label">
                      {_t('total_cubegoes')}
                    </div>
                  </div>
                  <div className="cell stats">
                    <div className="number">
                      {total_stats}
                    </div>
                    <div className="label">
                      {_t('total_stats')}
                    </div>
                  </div>
                  <div className="cell type">
                    <img className={'type__image'} src={require(`../../../shared/img/types/${CUBE_TYPES[type_id].name}.png`)}/>
                    <div className="label">
                      {_t('type')}
                    </div>
                  </div>
                </div>

                <div className="footer">
                  <div className="cubegon-name">
                    <CubegoFooter stroke={'#75C3F5'} fill={'#12314F'} />
                    <div className={'value'}>{name}</div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CubegonCard);
