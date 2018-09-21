import React from "react";

require("style-loader!./Image.scss");

export const ImgSource = {
  'logo_cubego': require('../../../shared/img/logo/cubego.png'),

  'metamask': require('../../../shared/img/assets/metamask.png'),

  'icon_about_us': require('../../../shared/img/icons/icon_about_us.png'),
  'icon_battle': require('../../../shared/img/icons/icon_battle.png'),
  'icon_build_hero': require('../../../shared/img/icons/icon_build_hero.png'),
  'icon_introduce_game': require('../../../shared/img/icons/icon_introduce_game.png'),
  'icon_store': require('../../../shared/img/icons/icon_store.png'),
  'icon_my_heroes': require('../../../shared/img/icons/icon_my_heroes.png'),

  'icon_left_arrow': require('../../../shared/img/icons/icon_left_arrow.png'),
  'icon_right_arrow': require('../../../shared/img/icons/icon_right_arrow.png'),

  'padding_yellow': require('../../../shared/img/background/padding_yellow.png'),
  'padding_red': require('../../../shared/img/background/padding_red.png'),
  'padding_blue': require('../../../shared/img/background/padding_blue.png'),
};

export const Image = ({className, img, onClick}) => {
  return (
    <img className={`widget__img ${className} ${img}`} src={ImgSource[img]} onClick={() => {onClick && onClick()}}/>
  );
};
