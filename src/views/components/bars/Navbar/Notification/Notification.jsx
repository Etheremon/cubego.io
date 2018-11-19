import React from "react"
import { connect } from "react-redux"

import {getTranslate, getActiveLanguage} from "react-localize-redux"
import * as LS from '../../../../../services/localStorageService';
import { Container } from '../../../../widgets/Container/Container.jsx';
import { NotificationActions } from "../../../../../actions/notification";
import { GetFeed } from "../../../../../reducers/selectors";
import * as Utils from "../../../../../utils/utils";
import {Icon} from "../../../Icon/Icon.jsx";

require("style-loader!./Notification.scss");

class Notification extends React.Component {

  constructor(props) {
    super(props);

    let lastClosedTime = parseInt(LS.GetItem(LS.Fields.notiSleepTime));
    let now = Utils.GetCurrentUnixTime();

    this.state = {
      // Only show noti 10 mins after last closing
      showNoti: !isNaN(lastClosedTime) ? lastClosedTime + 600 <= now : true,
    };

    this.closeNoti = this.closeNoti.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(NotificationActions.LOAD_NOTIFICATION.init.func({forceUpdate: false}));
  }

  componentWillUnmount() {
  }

  closeNoti(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({showNoti: false});
    LS.SetItem(LS.Fields.notiSleepTime, Utils.GetCurrentUnixTime());
  }

  render() {
    const {language, feed} = this.props;

    if (!feed || !this.state.showNoti) return null;

    let style = {};
    if (feed['backgroundcolor']) style.backgroundColor = feed['backgroundcolor'];
    if (feed['textcolor']) style.color = feed['textcolor'];

    let link = feed[`${language.code}link`] || feed[`enlink`];

    return (
      <div className={`notification__wrapper ${link ? 'clickable' : ''}`} style={style} onClick={() => {
        Utils.OpenInNewTab(link);
      }}>
        <Container size={Container.sizes.NORMAL} >
          <span dangerouslySetInnerHTML={{__html: feed[`${language.code}text`] || feed[`entext`]}} />
          {feed['closable'] === 'TRUE' ?
            <div className={'notification__close'} onClick={(e) => {this.closeNoti(e)}}>
              <Icon name={'close'}/>
            </div> : null
          }
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    _t: getTranslate(store.localeReducer),
    language: getActiveLanguage(store.localeReducer),
    feed: GetFeed(store),
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
