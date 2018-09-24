import React from "react"
import PropTypes from "prop-types";
import * as Utils from "../../../utils/utils";

require("style-loader!./Container.scss");

export const Container = ({className, children, size, text}) => {
  if (text) size = Container.sizes.SMALL;

  return (
    <div className={`widget__container ${className} ${size}`}>
      {children}
    </div>
  );
};

Container.sizes = {
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
  size: PropTypes.oneOf([...Utils.ObjGetValues(Container.sizes)]),
  text: PropTypes.bool,
};
