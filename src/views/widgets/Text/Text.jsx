import React from "react"
import PropTypes from "prop-types";
import {GetValues} from "../../../utils/objUtils";

require("style-loader!./Text.scss");

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