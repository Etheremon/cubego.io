import React from "react";

require("style-loader!./Image.scss");

export const ImgSource = {
  'metamask': require('../../../shared/img/assets/metamask.png'),
};

export const Image = ({className, img, onClick}) => {
  return (
    <img className={`widget__img ${className} ${img}`} src={ImgSource[img]} onClick={() => {onClick && onClick()}}/>
  );
};
