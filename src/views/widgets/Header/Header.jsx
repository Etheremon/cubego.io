import React from "react"
import PropTypes from "prop-types";
import {GetValues} from "../../../utils/objUtils";

require("style-loader!./Header.scss");

export const HeaderHighlight = ({className, children, inverted}) => {
  return (
    <div className={`widget__header-highlight ${className} ${inverted ? 'inverted': ''}`}>
      {children}
    </div>
  );
};

export const HeaderNormal = ({className, children, inverted, size}) => {
  return (
    <div className={`widget__header-normal ${className} ${inverted ? 'inverted': ''} ${size}`}>
      {children}
    </div>
  );
};

export const Header = ({className, children, type, size}) => {
  return (
    <div className={`widget__header ${className} ${type} ${size}`}>
      {children}
    </div>
  );
};

Header.types = {
  TITLE: 'title',
  SUBTITLE: 'subtitle',
  SECTION: 'section',
  PARAGRAPH: 'paragraph',
};

Header.sizes = {
  SMALL: 'small',
  NORMAL: 'normal',
  BIG: 'big'
};

Header.defaultProps = {
  type: Header.types.PARAGRAPH,
  size: Header.sizes.NORMAL,
};

Header.propTypes = {
  type: PropTypes.oneOf([...GetValues(Header.types)]),
  size: PropTypes.oneOf([...GetValues(Header.sizes)]),
};
