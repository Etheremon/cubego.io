import React from 'react';
import PropTypes from 'prop-types';
import { getTranslate } from 'react-localize-redux/lib/index';
import connect from 'react-redux/es/connect/connect';
import withRouter from 'react-router-dom/es/withRouter';
import * as Utils from '../../../../utils/utils';
import { Container } from '../../../widgets/Container/Container.jsx';

require('style-loader!./HeaderBar.scss');

export class _HeaderBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      balanceType: 1,
    };
  }

  componentDidMount() {
    // this.headerBarInterval = setInterval(() => {
    //   this.setState({
    //       balanceType: 1-this.state.balanceType,
    //   })
    // }, 10 * 1000);
  }

  componentWillUnmount() {
    // clearInterval(this.headerBarInterval);
  }

  render() {
    const {
      className, label, userInfo, onBackClicked, size, _t,
    } = this.props;

    return (
      <div className={`header-bar ${className}`}>
        <Container size={size} className="header-bar__container">
          {onBackClicked
            ? (
              <div className="header-bar__arrow" onClick={() => { onBackClicked(); }}>
                <div className="content">
                  <img src={require('../../../../shared/img/icons/icon-back.png')} />
                </div>
              </div>
            ) : null}

          <div className="header-bar__label">
            <div className="content">
              {label}
            </div>
          </div>

          <div className="header-bar__balance">

            {/* <div className={'header-text'}> */}
            {/* <div className={'item'}>{_t('wallet balance')}</div> */}
            {/* <div className={'item'}>{_t('in-game balance')}</div> */}
            {/* </div> */}

            <div className="content">

              {/* <div className={`group front ${this.state.balanceType === 0 ? 'active' : ''}`}> */}
              {/* <div className={'item'}> */}
              {/* <div className={'bgr'}/> */}
              {/* <img src={require('../../../../shared/img/icons/icon-emont.png')}/> */}
              {/* <div className={'text'}>{userInfo ? Utils.RoundToDecimalFloat(userInfo.emont_rebate, 4) || 0 : 0}</div> */}
              {/* </div> */}
              {/* </div> */}

              <div className={`group back ${this.state.balanceType === 1 ? 'active' : ''}`}>
                <div
                  className="item"
                  tooltip={_t('emont_rebate_desc')}
                  tooltip-position="bottom"
                >
                  <div className="bgr" />
                  <img src={require('../../../../shared/img/icons/icon-emont-rebate.png')} />
                  <div className="text">{userInfo ? Utils.RoundToDecimalFloat(userInfo.emont_rebate, 4) || 0 : 0}</div>
                </div>
                <div className="item">
                  <div className="bgr" />
                  <img src={require('../../../../shared/img/icons/icon-emont.png')} />
                  <div className="text">{userInfo ? Utils.RoundToDecimalFloat(userInfo.balance_emont, 4) || 0 : 0}</div>
                </div>
                <div className="item">
                  <div className="bgr" />
                  <img src={require('../../../../shared/img/icons/icon-ether.png')} />
                  <div className="text">{userInfo ? Utils.RoundToDecimalFloat(userInfo.balance_eth, 6) || 0 : 0}</div>
                </div>
              </div>

            </div>
          </div>
        </Container>
      </div>
    );
  }
}

_HeaderBar.defaultProps = {
  ethBalance: 0,
  emontBalance: 0,
  label: '',
  onBackClicked: null,
  className: '',
};

_HeaderBar.propTypes = {
  ethBalance: PropTypes.number,
  emontBalance: PropTypes.number,
  label: PropTypes.string,
  onBackClicked: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.string,
};

const mapStateToProps = (store, props) => ({
  _t: getTranslate(store.localeReducer),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export const HeaderBar = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(_HeaderBar));
