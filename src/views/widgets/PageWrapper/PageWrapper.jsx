import React from "react"
import PropTypes from "prop-types";
import * as Utils from "../../../utils/utils";

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
};

PageWrapper.defaultProps = {
  type: PageWrapper.types.NORMAL,
};

PageWrapper.propTypes = {
  type: PropTypes.oneOf([...Utils.ObjGetValues(PageWrapper.types)]),
};
