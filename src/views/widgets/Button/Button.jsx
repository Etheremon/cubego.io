import React from "react"
import PropTypes from 'prop-types';
import Loading from "../Loading/Loading.jsx";

require("style-loader!./Button.scss");


export const ButtonNew = ({className, label, children, color, size, type, disabled, fluid, tokenList,
                           onClick, onMouseDown, onMouseUp, onMouseOut,
                           style, showDeco, loading}) => {

  return (
    <div className={`widget__button-new ${fluid ? 'fluid' : ''} ${disabled ? 'disabled' : ''} ${showDeco} ${color} ${size} ${type ? `${type}` : ''} ${className}`}
         style={style}
         onClick={(e) => {
           if (onClick) {
             e.preventDefault();
             e.stopPropagation();
             onClick(e);
           }
         }}
         onMouseDown={(e) => {
           if (onMouseDown) {
             e.preventDefault();
             e.stopPropagation();
             onMouseDown(e);
           }
         }}
         onMouseUp={(e) => {
           if (onMouseUp) {
             e.preventDefault();
             e.stopPropagation();
             onMouseUp(e);
           }
         }}
         onMouseOut={(e) => {
           if (onMouseOut) {
             onMouseOut(e);
           }
         }}
    >

      <div className={'content'} >
        {loading ? <Loading/> : label || children}
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
  BLACK_NO_SHADOW: 'black_no_shadow',
  TURQUOISE: 'turquoise', 
};
ButtonNew.sizes = {
  SMALL: 'small',
  NORMAL: 'normal',
  BIG: 'big',
};
ButtonNew.types = {
  TOKEN: 'token',
};
ButtonNew.deco = {
  LEFT: 'left',
  RIGHT: 'right',
  BOTH: 'both',
};
ButtonNew.defaultProps = {
  color: ButtonNew.colors.ORANGE,
  size: ButtonNew.sizes.NORMAL,
  fluid: false,
  tokenList: ['eth', 'emont'],
  showDeco: '',
  style: {},
  loading: false,
};
ButtonNew.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  fluid: PropTypes.bool,
  disabled: PropTypes.bool,
  showDeco: PropTypes.string,
  style: PropTypes.object,
  loading: PropTypes.bool,
};
