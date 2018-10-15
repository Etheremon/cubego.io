import React from 'react'
import {connect} from "react-redux"
import {getTranslate} from 'react-localize-redux'

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
    const {_t, className} = this.props;

    return(
      <div className={`cubegon-card__container ${className && className}`}>
        <img className={'cubegon__image'} src={require(`../../../shared/img/cubegoes/${'001'}.png`)}/>
        <img className={'type__image'} src={require(`../../../shared/img/types/${'water'}.png`)}/>
        <img className={'shopping__image'} src={require(`../../../shared/img/cubegoes/${'001'}.png`)}/>

          <div className="stats__container">
            <div className="cubegoes">
              <div className="number">
                90
              </div>
              <div className="label">
                {_t('total_cubego')}
              </div>
            </div>
            <div className="stats">
              <div className="number">
                110
              </div>
              <div className="label">
                {_t('total_stats')}
              </div>
            </div>
          </div>

          <div className="cubegon-info">
            <div className="id">
            {`ID ${12345}`}
            </div>
            <div className="energy">
            10/40+
            </div>
          </div>

          <div className="type__container">
          
            <div className="type-content">
              <div className="content">
                Vexigon
              </div>
              <div className="border-layer"></div>
            </div>

            <div className="shadow-layer"></div>
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
