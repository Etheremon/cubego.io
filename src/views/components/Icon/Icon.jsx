import React from "react";

require("style-loader!./Icon.scss");

export const IconSource = {
  'vn': require('../../../shared/img/icons/vn.png'),
  'cn': require('../../../shared/img/icons/cn.png'),
  'gb': require('../../../shared/img/icons/gb.png'),
  'jp': require('../../../shared/img/icons/jp.png'),
  'kr': require('../../../shared/img/icons/kr.png'),
};

export const Icon = ({className, name, onClick}) => {
  return (
    <i className={`${name}`}></i>
  );
};
