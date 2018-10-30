import {combineReducers} from "redux";
import * as ObjUtils from "../utils/objUtils";
import {NotificationActions} from "../actions/notification";

const notification = (state = {}, action) => {
  switch (action.type) {
    case NotificationActions.LOAD_NOTIFICATION.request.key:
      return {...state};

    case NotificationActions.LOAD_NOTIFICATION.success.key:
      const json = JSON.parse(action.response
        .replace('gdata.io.handleScriptLoaded(', '')
        .replace('});', '}')
        .replace(/gsx\$/g, ''));

      let obj = {
        feeds: [],
        banners_home: [],
        banners_store: [],
      };

      if (json['feed'] && json['feed'].entry.length) {
        obj['banners'] = [];

        json['feed'].entry.map(entryObj => {
          if (entryObj['key']['$t'] === 'banner_home') {
            obj.banners_home.push(ObjUtils.CloneWithModify({
              ...entryObj
            }, (key, val) => val['$t']));
          } else if (entryObj['key']['$t'] === 'banner_store') {
            obj.banners_store.push(ObjUtils.CloneWithModify({
              ...entryObj
            }, (key, val) => val['$t']));
          } else if (entryObj['key']['$t'] === 'feed') {
            obj.feeds.push(ObjUtils.CloneWithModify({
              ...entryObj,
              starttime: Date.parse(entryObj.starttime['$t']),
              endtime: Date.parse(entryObj.endtime['$t']),
            }, (key, val) => val['$t'] || val));
          }
        });
      }

      let currentUnixTime = new Date().getTime();
      obj.feeds = obj.feeds.filter(feed => !isNaN(feed.starttime) && !isNaN(feed.endtime) && feed.starttime <= currentUnixTime && currentUnixTime <= feed.endtime);

      return {...state, ...obj};
    default:
      return state;
  }
};

export const notifications = combineReducers({
  notification,
});