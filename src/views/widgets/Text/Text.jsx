import React from "react"
import PropTypes from "prop-types";
import {GetValues} from "../../../utils/objUtils";

require("style-loader!./Text.scss");

export const Text = ({className, children, type, uppercase, capitalize, onClick}) => {
  return (
    <div className={`widget__text ${className} ${type} ${uppercase ? 'uppercase' : ''} ${capitalize ? 'capitalize' : ''}`}
         onClick={() => {onClick && onClick()}}>
         <div className="content">
          {children}
         </div>
    </div>
  );
};

Text.types = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  T1: 't1',
  T2: 't2',
  LINK: 'link',
  SUBLINK: 'sublink',
};

Text.defaultProps = {
  type: Text.types.T1,
};

Text.propTypes = {
  type: PropTypes.oneOf([...GetValues(Text.types)]),
};

export const TextImage = ({className, text, imgSource, uppercase, capitalize, onClick, order}) => {
  return (
    <div className={`widget__text-image ${className !== undefined ? className : ''} ${uppercase !== undefined ? 'uppercase' : ''} ${capitalize !== undefined ? 'capitalize' : ''}`}
    onClick={(e) => { e.stopPropagation();
    onClick && onClick(e)
    }}>
      <span style={{order: `${order === TextImage.order.REVERSE ? '1' : '0'}`}}>{text}</span>
      <img src={imgSource}/>
    </div>
  )
}

TextImage.order = {
  NORMAL: 'normal',
  REVERSE: 'reverse',
}

TextImage.defaultProps = {
  order: TextImage.order.NORMAL,
};