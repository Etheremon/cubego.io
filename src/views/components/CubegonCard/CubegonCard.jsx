import React from 'react'
import {connect} from "react-redux"
import {getTranslate} from 'react-localize-redux'
import { ButtonNew } from '../../widgets/Button/Button.jsx';
import { CustomRectangle, CubegoFooter } from '../../widgets/SVGManager/SVGManager.jsx';
import { CUBE_TYPES } from '../../../constants/cubego.js';
import { GetImageFromGonID } from '../../../utils/logicUtils';

require("style-loader!./CubegonCard.scss");

class CubegonCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const {_t, className, energy_limit, energy_left, id, name, total_cubego, total_stats, type_id, shape_id} = this.props;

    return(
      <div className={`cubegon-card__container ${className && className}`}>
        <div className="border-1">
          <div className="border-2">
            <div className="border-3">
              <img className={'cubegon-background__image'} src={require(`../../../shared/img/background/cubegon_background/background_${CUBE_TYPES[type_id].name}.png`)} />
              <img className={'cubegon__image'} src={GetImageFromGonID(id)}/>
              <img className={'type__image'} src={require(`../../../shared/img/types/${CUBE_TYPES[type_id].name}.png`)}/>
              <img className={'shopping__image'} src={require(`../../../shared/img/cubegoes/${'000'}.png`)}/>
                <div className="stats__container">
                  <div className="cubegoes">
                    <div className="number">
                      {total_cubego}
                    </div>
                    <div className="label">
                      {_t('total_cubegoes')}
                    </div>
                  </div>
                  <div className="stats">
                    <div className="number">
                      {total_stats}
                    </div>
                    <div className="label">
                      {_t('total_stats')}
                    </div>
                  </div>
                </div>

                <div className="cubegon-info">
                  <div className="id">
                  {`ID ${id}`}
                  </div>
                  <ButtonNew size={ButtonNew.sizes.SMALL} className={'energy'} label={`${energy_left}/${energy_limit}+`} onClick={() => {}}/>
                </div>

                <div className="footer">
                  <div className="cubegon-name">
                    <CubegoFooter stroke={'#75C3F5'} fill={'#12314F'} />
                    <span>{name}</span>
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
