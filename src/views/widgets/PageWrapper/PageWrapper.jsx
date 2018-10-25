import React from "react"
import PropTypes from "prop-types";
import {GetValues} from "../../../utils/objUtils";

require("style-loader!./PageWrapper.scss");

export const PageWrapper = ({className, children, type}) => {
  return (
    <div className={`widget__page-wrapper ${className} ${type}`}>
      {children}
    </div>
  );
};

PageWrapper.types = {
  NORMAL: 'normal',
  DARK: 'dark',
  BLUE: 'blue',
  BLUE_DARK: 'blue-dark',
  GRADIENT_BLUE: 'gradient-blue',
  BLUE_NEW: 'blue-new',
};

PageWrapper.defaultProps = {
  type: PageWrapper.types.NORMAL,
};

PageWrapper.propTypes = {
  type: PropTypes.oneOf([...GetValues(PageWrapper.types)]),
};
