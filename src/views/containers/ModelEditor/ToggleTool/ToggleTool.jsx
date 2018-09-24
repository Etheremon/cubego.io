import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';

import withRouter from "react-router-dom/es/withRouter";
import {EDITOR_COLORS} from "../../../../utils/constants";

require("style-loader!./ToggleTool.scss");

export const ToggleTool = ({label, img, active, onClick}) => {
  let activeClass = "";
  if (active === true) activeClass = "active";
  if (active === false) activeClass = "inactive";

  return (
    <div className={`toggle-tool ${activeClass}`}
         onClick={() => {onClick && onClick()}}>
      <div className={'toggle-tool__img'}>
        <img src={img}/>
      </div>
       <div className={'toggle-tool__label'}>
         {label}
      </div>
    </div>
  )
};
