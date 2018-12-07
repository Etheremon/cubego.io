import React from "react"
import PropTypes from "prop-types";
import {Container} from "../../../widgets/Container/Container.jsx";
import * as Utils from "../../../../utils/utils";

require("style-loader!./HeaderBar.scss");

export class HeaderBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rotateDegree: 0,
    }
  }

  componentDidMount() {
    this.headerBarInterval = setInterval(() => {
      this.setState((state) => {
        return {
          rotateDegree: (state.rotateDegree + 180) % 360,
        }
      })
    }, 10 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.headerBarInterval);
  }

  render () {
    const {className, label, userInfo, onBackClicked, size} = this.props;

    return (
      <div className={`header-bar ${className}`}>
        <Container size={size} className={'header-bar__container'}>
          {onBackClicked ?
            <div className={'header-bar__arrow'} onClick={() => {onBackClicked()}}>
              <div className={'content'}>
                <img src={require('../../../../shared/img/icons/icon-back.png')}/>
              </div>
            </div> : null
          }

          <div className={'header-bar__label'}>
            <div className={'content'}>
              {label}
            </div>
          </div>

          <div className={'header-bar__balance'}>
            <div className={'content'} style={{transform: `rotateX(${this.state.rotateDegree}deg)`}}>
              <div className="group front">
                <div className={'item'}>
                  <div className={'bgr'}/>
                  <img src={require('../../../../shared/img/icons/icon-emont.png')}/>
                  <div className={'text'}>{userInfo ? Utils.RoundToDecimalFloat(userInfo.emont_rebate, 4) || 0 : 0}</div>
                </div>
              </div>

              <div className="group back">
                <div className={'item'}>
                  <div className={'bgr'}/>
                  <img src={require('../../../../shared/img/icons/icon-emont.png')}/>
                  <div className={'text'}>{userInfo ? Utils.RoundToDecimalFloat(userInfo.balance_emont, 4) || 0 : 0}</div>
                </div>
                <div className={'item'}>
                  <div className={'bgr'}/>
                  <img src={require('../../../../shared/img/icons/icon-ether.png')}/>
                  <div className={'text'}>{userInfo ? Utils.RoundToDecimalFloat(userInfo.balance_eth, 6) || 0 : 0}</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
};

HeaderBar.defaultProps = {
  ethBalance: 0,
  emontBalance: 0,
  label: '',
  onBackClicked: null,
  className: '',
};

HeaderBar.propTypes = {
  ethBalance: PropTypes.number,
  emontBalance: PropTypes.number,
  label: PropTypes.string,
  onBackClicked: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.string,
};

