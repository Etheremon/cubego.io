import React from "react"
import PropTypes from "prop-types";
import {GetValues} from "../../../utils/objUtils";

require("style-loader!./Container.scss");

export const Container = ({className, children, size, text, id}) => {
  if (text) size = Container.sizes.SMALL;

  return (
    <div className={`widget__container ${className} ${size}`} id={`${id ? id : null}`}>
      {children}
    </div>
  );
};

Container.sizes = {
  TEXT: 'text',
  TINY: 'tiny',
  SMALL: 'small',
  NORMAL: 'normal',
  BIG: 'big',
  LARGE: 'large',
  VERY_LARGE: 'very_large',
};

Container.defaultProps = {
  size: Container.sizes.NORMAL,
  text: false,
};

Container.propTypes = {
  size: PropTypes.oneOf([...GetValues(Container.sizes)]),
  text: PropTypes.bool,
};
