import React from "react"
import PropTypes from "prop-types";
import {GetValues} from "../../../utils/objUtils";

require("style-loader!./Text.scss");

export const Text = ({className, children, type, uppercase, capitalize, onClick}) => {
  return (
    <div className={`widget__text ${className} ${type} ${uppercase ? 'uppercase' : ''} ${capitalize ? 'capitalize' : ''}`}
         onClick={() => {onClick && onClick()}}>
      {children}
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

export const TextImage = ({className, text, imgSource, uppercase, capitalize}) => {
  return (
    <div className={`widget__text-image ${className !== undefined ? className : ''} ${uppercase !== undefined ? 'uppercase' : ''} ${capitalize !== undefined ? 'capitalize' : ''}`}>
      <span>{text}</span>
      <img src={imgSource}/>
    </div>
  )
}