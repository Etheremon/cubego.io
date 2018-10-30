import * as React from "react";
import PropTypes from "prop-types";
import {GetValues} from "../../../../utils/objUtils";

require("style-loader!./SubBgr.scss");

export const SubBgr = ({position, color}) => {
  return (
    <div className={`home-sub-bgr ${position} ${color}`}/>
  );
};
SubBgr.positions = {
  LEFT: 'left',
  RIGHT: 'right',
};
SubBgr.colors = {
  YELLOW: 'yellow',
  BLUE: 'blue',
};
SubBgr.defaultProps = {
  position: SubBgr.positions.LEFT,
  color: SubBgr.colors.BLUE,
};

SubBgr.propTypes = {
  position: PropTypes.oneOf([...GetValues(SubBgr.positions)]),
  color: PropTypes.oneOf([...GetValues(SubBgr.colors)]),
};