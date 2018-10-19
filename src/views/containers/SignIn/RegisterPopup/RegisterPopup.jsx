import React from 'react';

import * as Utils from "../../../../utils/utils";
import {ButtonNew} from "../../../widgets/Button/Button.jsx";
import Loading from "../../../components/Loading/Loading.jsx";
import SignInForm from "../SigInForm/SignInForm.jsx";
import {URLS} from "../../../../constants/general";
import {GetLoggedInUserId, GetUserInfo} from "../../../../reducers/selectors";
import withRouter from "react-router-dom/es/withRouter";
import connect from "react-redux/es/connect/connect";
import {getTranslate} from 'react-localize-redux';

require("style-loader!./RegisterPopup.scss");


class RegisterPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitError: '',
      submitMsg: '',
      verified: false,
      registering: false,
    };

    this.renderLoading = this.renderLoading.bind(this);
    this.renderNotInstalledWallet = this.renderNotInstalledWallet.bind(this);
    this.renderLockedWallet = this.renderLockedWallet.bind(this);
    this.renderRegistration = this.renderRegistration.bind(this);
  };

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  renderLoading() {
    return (
      <Loading type={Loading.types.DOG}/>
    )
  }

  renderNotInstalledWallet() {
    let {_t} = this.props;

    return (
      Utils.IsMobile
        ? <div className={'register-popup__app'}>
            <img src={require('../../../../shared/img/assets/lock.png')}/>
            <div className={'header'}>{_t('mobile_app_not_installed')}</div>
            <div className={'desc'}>{_t('please_install_mobile_app')}</div>
            <div className={'btns'}>
              <ButtonNew label={_t('Sign In Manually')}
                         color={ButtonNew.colors.GREY}
                         onClick={() => {this.props.history.push(`/${URLS.SIGN_IN}`)}}/>
              <ButtonNew label={_t('Install Coinbase Wallet')}
                         onClick={() => {Utils.OpenToshiInstallation()}} />
              <ButtonNew label={_t('Install Cipher')}
                         onClick={() => {Utils.OpenCipherInstallation()}} />
            </div>

            {this.renderManualSignIn()}
          </div>
        : <div className={'register-popup__app'}>
            <img src={require('../../../../shared/img/assets/metamask.png')}/>
            <div className={'header'}>{_t('metamask_not_installed')}</div>
            <div className={'desc'}>{_t('please_install_metamask')}</div>
            <div className={'btns'}>
              <ButtonNew label={_t('Sign In Manually')}
                         color={ButtonNew.colors.GREY}
                         onClick={() => {this.props.history.push(`/${URLS.SIGN_IN}`)}}/>
              <ButtonNew label={_t('Install Metamask')}
                         showDeco={ButtonNew.deco.BOTH}
                         onClick={() => {Utils.OpenMetamaskInstallation()}} />
            </div>

            {this.renderManualSignIn()}
          </div>
    )
  }

  renderLockedWallet() {
    let {_t} = this.props;

    return ( Utils.IsMobile
      ? <div className={'register-popup__app'}>
          <img src={require('../../../../shared/img/assets/lock.png')}/>
          <div className={'header'}>{_t('mobile_app_is_locked')}</div>
          <div className={'desc'}>{_t('please_unlock_mobile_app')}</div>

          <div className={'btns'}>
            <ButtonNew label={_t('Sign In Manually')}
                       color={ButtonNew.colors.GREY}
                       onClick={() => {this.props.history.push(`/${URLS.SIGN_IN}`)}}/>
          </div>
        </div>
      : <div className={'register-popup__app'}>
          <img src={require('../../../../shared/img/assets/metamask.png')}/>
          <div className={'header'}>{_t('metamask_is_locked')}</div>
          <div className={'desc'}>{_t('please_unlock_metamask')}</div>

          <div className={'btns'}>
            <ButtonNew label={_t('Sign In Manually')}
                       color={ButtonNew.colors.GREY}
                       onClick={() => {this.props.history.push(`/${URLS.SIGN_IN}`)}}/>
          </div>
        </div>
    )
  }

  renderRegistration() {
    let hasWalletUnlocked = Utils.hasWalletUnlocked();
    return (
      <SignInForm metamask={hasWalletUnlocked}
                  type={SignInForm.types.REGISTER_POPUP}
                  onRegistered={this.props.onRegistered}
      />
    )
  }

  render() {
    let {userId, userInfo} = this.props;

    let hasWalletSupported = Utils.HasWalletSupported();
    let hasWalletUnlocked = Utils.hasWalletUnlocked();

    let content = null;

    if (userId === undefined || userInfo === undefined) {
      content = this.renderLoading();
    } else if (!hasWalletUnlocked) {
      if (!hasWalletSupported) {
        content = this.renderNotInstalledWallet();
      } else if (!hasWalletUnlocked) {
        content = this.renderLockedWallet();
      }
    } else {
      content = this.renderRegistration();
    }

    return (
      <div className={'register-popup'}>
        {content}
      </div>
    );
  }
}

const mapStateToProps = (store, props) => {
  let userId = GetLoggedInUserId(store);
  return {
    _t: getTranslate(store.localeReducer),
    userId: userId,
    userInfo: GetUserInfo(store, userId),
    inviteCode: Utils.ParseQueryString(props.location.search)['code'] || '',
    type: Utils.ParseQueryString(props.location.search)['type'] || '',
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPopup));