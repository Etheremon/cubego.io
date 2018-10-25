import React from "react"
import PropTypes from "prop-types";
import {Container} from "../../../widgets/Container/Container.jsx";
import * as Utils from "../../../../utils/utils";

require("style-loader!./HeaderBar.scss");

export const HeaderBar = ({className, label, userInfo, onBackClicked, size}) => {
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
          <div className={'content'}>
            <div className={'item'}>
              <div className={'bgr'}/>
              <img src={require('../../../../shared/img/icons/icon-emont.png')}/>
              <div className={'text'}>{userInfo ? Utils.RoundToDecimalFloat(userInfo.balance_emont, 4) : 0}</div>
            </div>
            <div className={'item'}>
              <div className={'bgr'}/>
              <img src={require('../../../../shared/img/icons/icon-ether.png')}/>
              <div className={'text'}>{userInfo ? Utils.RoundToDecimalFloat(userInfo.balance_eth, 6) : 0}</div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
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

