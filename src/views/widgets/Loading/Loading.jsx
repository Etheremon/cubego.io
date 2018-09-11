import React from "react"
import PropTypes from "prop-types";

require("style-loader!./Loading.scss");


const Loading = ({dark, className}) => {
  return (
    <div className={`loading-dots ${dark ? 'dark' : ''} ${className}`}>
      <div className="loading-dots--dot"/>
      <div className="loading-dots--dot"/>
      <div className="loading-dots--dot"/>
    </div>
  );
};

Loading.defaultProps = {
  dark: false,
};

Loading.propTypes = {
  dark: PropTypes.bool,
};

export default Loading;
