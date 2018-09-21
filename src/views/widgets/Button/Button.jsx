import React from "react"
import PropTypes from 'prop-types';
import Loading from "../Loading/Loading.jsx";

require("style-loader!./Button.scss");

export const ButtonGroup = ({buttons}) => {
  return (
    <div className={`widget__button-group`}>
      {buttons.map((btn, idx) => (
        <div key={idx} className={`${btn.active ? 'active' : ''}`} onClick={() => btn.onClick && btn.onClick()}>
          {btn.label}
        </div>
      ))}
    </div>
  )
};
ButtonGroup.defaultProps = {
};
ButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    onClick: PropTypes.func,
    label: PropTypes.string,
    active: PropTypes.bool,
  })),
};


export const ButtonNew = ({className, label, children, color, size, type, disabled, fluid, tokenList, onClick}) => {

  return (
    <div className={`widget__button-new ${fluid ? 'fluid' : ''} ${disabled ? 'disabled' : ''} ${color} ${size} ${type ? `${type}` : ''} ${className}`}
         onClick={(e) => {
           e.preventDefault();
           e.stopPropagation();
           onClick && onClick({});
         }}>

      <div className={'content'}>
        {label || children}
      </div>

      {type === ButtonNew.types.TOKEN ?
        <div className={'transform'}>
          {tokenList.map((token, idx) => (
            <div key={idx} className={'item'} onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClick && onClick({token});
            }}>
              {/* <Image img={`icon_${token}`}/> */}
            </div>
          ))}
        </div> : null
      }

    </div>
  );
};

ButtonNew.colors = {
  ORANGE: 'orange',
  BLUE: 'blue',
  GREY: 'grey',
  NEON: 'neon',
  GREEN: 'green',
  GREY_NO_SHADOW: 'grey_no_shadow',
};
ButtonNew.sizes = {
  SMALL: 'small',
  NORMAL: 'normal',
  BIG: 'big',
};
ButtonNew.types = {
  TOKEN: 'token',
};
ButtonNew.defaultProps = {
  color: ButtonNew.colors.ORANGE,
  size: ButtonNew.sizes.NORMAL,
  fluid: false,
  tokenList: ['eth', 'emont'],
};
ButtonNew.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  handleOnClick: PropTypes.func,
  fluid: PropTypes.bool,
  disabled: PropTypes.bool,
};
