import React from "react";

require("style-loader!./Image.scss");

export const ImgSource = {
  'logo_cubego': require('../../../shared/img/logo/cubego.png'),

  'metamask': require('../../../shared/img/assets/metamask.png'),

  'icon_intro': require('../../../shared/img/icons/icon-intro.png'),
  'icon_about_us': require('../../../shared/img/icons/icon-about.png'),
  'icon_battle': require('../../../shared/img/icons/icon-battle.png'),
  'icon_build': require('../../../shared/img/icons/icon-build.png'),
  'icon_market': require('../../../shared/img/icons/icon-market.png'),
  'icon_store': require('../../../shared/img/icons/icon-store.png'),
  'icon_my_heroes': require('../../../shared/img/icons/icon-cubegon.png'),
  icon_gallery: require('../../../shared/img/icons/icon-gallery.png'),
  icon_camera: require('../../../shared/img/icons/icon-camera.png'),
  icon_import: require('../../../shared/img/icons/icon-import.png'),
  icon_export: require('../../../shared/img/icons/icon-export.png'),

  btn_download: require('../../../shared/img/buttons/download.png'),
  btn_share_fb: require('../../../shared/img/buttons/facebook.png'),
  btn_share_tw: require('../../../shared/img/buttons/twitter.png'),

  icon_warning: require('../../../shared/img/icons/icon-warning.png'),

  'icon_left_arrow': require('../../../shared/img/icons/icon_left_arrow.png'),
  'icon_right_arrow': require('../../../shared/img/icons/icon_right_arrow.png'),

  'padding_yellow': require('../../../shared/img/background/padding_yellow.png'),
  'padding_red': require('../../../shared/img/background/padding_red.png'),
  'padding_blue': require('../../../shared/img/background/padding_blue.png'),

  'icon_discord': require('../../../shared/img/socialMedia/icon_discord.png'),
  'icon_facebook': require('../../../shared/img/socialMedia/icon_facebook.png'),
  'icon_instagram': require('../../../shared/img/socialMedia/icon_instagram.png'),
  'icon_medium': require('../../../shared/img/socialMedia/icon_medium.png'),
  'icon_reddit': require('../../../shared/img/socialMedia/icon_reddit.png'),
  'icon_twitter': require('../../../shared/img/socialMedia/icon_twitter.png'),
  'icon_youtube': require('../../../shared/img/socialMedia/icon_youtube.png'),
  'icon_telegram': require('../../../shared/img/socialMedia/icon_telegram.png'),

  'padding_indicator_left': require('../../../shared/img/assets/padding_dot_left.png'),
  'padding_indicator_right': require('../../../shared/img/assets/padding_dot_right.png'),
};

export const Image = ({className, img, onClick}) => {
  return (
    <img className={`widget__img ${className} ${img}`} src={ImgSource[img]} onClick={() => {onClick && onClick()}}/>
  );
};
