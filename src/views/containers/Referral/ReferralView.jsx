import React from 'react';
import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';
import {GetUserInfo, GetLoggedInUserId} from "../../../reducers/selectors";
import { CustomRectangle } from '../../widgets/SVGManager/SVGManager.jsx';
import { SERVER_URL } from '../../../config';
import { CopyToClipboard } from '../../../utils/utils';
import { ShareToFacebook, ShareToTwitter } from '../../../services/social';
import * as Config from "../../../config";

require("style-loader!./ReferralView.scss");

class ReferralView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltip: ''
    }
  }

  render() {
    let {_t, className, userInfo} = this.props;

    if (!userInfo || !userInfo.refer_code) {
      return null;
    }

    return(
      <div className={`referral-view__container ${className ? className : ''}`}>
        <div className="referral-box__container">
          <img className={'unicorm__image'} src={require('../../../shared/img/icons/icon-cubegon-referral.png')} />
          <div className="header__container">
            <CustomRectangle tier={'referral'} fill={'#12314F'} />
            <span>{_t('invite_friends')}</span>
          </div>
          <div className="referral-title">
            {_t('referral__title')}
          </div>
          <div className="referral-main__container">
            <div className="input__container"
                 onMouseOver={() => {
                   this.setState({tooltip: 'click_to_copy'})
                 }}
                 onMouseOut={() => {
                   this.setState({tooltip: ''})
                 }}
                 onClick={() => {
                   this.setState({tooltip: 'copied'});
                   CopyToClipboard(`${window.location.hostname}?code=${userInfo.refer_code}`)
                }}
            >
              <div className="explain__label">
                {
                  _t(this.state.tooltip)
                }
              </div>
              <img src={require('../../../shared/img/icons/icon-link.png')} />
              {
                userInfo ?
                  <div className={'input-referral'}>
                    <input type="text" defaultValue={`${window.location.hostname}?code=${userInfo.refer_code}`} disabled ref={e => this.referralInput}/>
                  </div> : null
              }
              <img className={'clickable m--mobile-only'}
                   src={require('../../../shared/img/icons/icon-copy-to-clipboard.png')} onClick={() => {
                     this.setState({
                       tooltip: 'copied'
                     });
                     CopyToClipboard(`${window.location.hostname}?code=${userInfo.refer_code}`)
                   }}
              />
              <div className="clickable"
                   onMouseOver={(e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     this.setState({tooltip: 'share_on_facebook'})
                   }}
                   onMouseOut={(e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     this.setState({tooltip: ''})
                   }}
                   onClick={(e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     ShareToFacebook(`${Config.SERVER_URL}?code=${userInfo.refer_code}`)
                   }}
              >
                <i className="fab fa-facebook-square"/>
              </div>

              <div className="clickable"
                   onMouseOver={(e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     this.setState({tooltip: 'share_on_twitter'})}}
                   onMouseOut={(e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     this.setState({tooltip: ''})}}
                   onClick={(e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     ShareToTwitter(`${Config.SERVER_URL}?code=${userInfo.refer_code}`)
                   }}
              >
                <i className="fab fa-twitter-square" />
              </div>
            </div>
            {/* <div className="action__container">
              <span>{_t('ranking')}</span>
              <span>{_t('leaderboard')}</span>
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  let userId = GetLoggedInUserId(store);
  return {
    _t: getTranslate(store.localeReducer),
    userInfo: GetUserInfo(store, userId)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferralView);
