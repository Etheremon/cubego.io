import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import Navbar from '../../../components/bars/Navbar/Navbar.jsx'
import Footer from '../../../components/bars/Footer/Footer.jsx'
import {Container} from "../../../widgets/Container/Container.jsx";
import {
  GetLoggedInUserId, GetUserInfo,
} from "../../../../reducers/selectors";
import * as Utils from "../../../../utils/utils";
import {getTranslate} from "react-localize-redux/lib/index";
import {Input} from "../../../widgets/Input/Input.jsx";
import * as Tracker from "../../../../services/tracker";
import {PageWrapper} from "../../../widgets/PageWrapper/PageWrapper.jsx";
import {ButtonNew} from "../../../widgets/Button/Button.jsx";
import Loading from "../../../components/Loading/Loading.jsx";
import SignInForm from "../SigInForm/SignInForm.jsx";
import {AuthActions} from "../../../../actions/auth";
import {URLS} from "../../../../constants/general";

require("style-loader!./SignInPage.scss");


class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitError: '',
      submitMsg: '',
      verified: false,
      registering: false,
      manualLoginErr: '',
    };
    this.handleManualLogin = this.handleManualLogin.bind(this);

    this.renderManualSignIn = this.renderManualSignIn.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.renderNotInstalledWallet = this.renderNotInstalledWallet.bind(this);
    this.renderLockedWallet = this.renderLockedWallet.bind(this);
    this.renderRegistration = this.renderRegistration.bind(this);
    this.renderSetting = this.renderSetting.bind(this);
  };

  componentWillMount() {
  }

  componentDidMount() {
    Tracker.ViewContent(Tracker.TrackPages.signin);
  }

  componentWillReceiveProps(nextProps) {
  }

  handleManualLogin() {
    let address = this.manualLoginInput.getValue();
    if (!window.isValidEtherAddress(address)) {
      this.setState({manualLoginErr: this.props._t('err.invalid_ether_address')})
    } else {
      this.props.dispatch(AuthActions.LOGIN.init.func({userId: address}));
      this.props.history.push(`/${URLS.SIGN_IN}?type=setting`)
    }
  }

  renderLoading() {
    return (
      <Loading type={Loading.types.DOG}/>
    )
  }

  renderManualSignIn() {
    let {userId, _t} = this.props;

    return (
      <div className={'sign-in-manual'}>
        <span>{_t('navbar.metamask_advice')}</span>
        <Input label={_t('txt.ether_address')}
               placeholder={'0x9876...'}
               value={userId}
               onChange={(e) => {if (this.state.manualLoginErr !== '') this.setState({manualLoginErr: ''})}}
               ref={(inp) => {this.manualLoginInput = inp}}/>
        {this.state.manualLoginErr}<br/>
        <ButtonNew label={_t('sign in')} onClick={this.handleManualLogin}/>
      </div>
    );
  }

  renderNotInstalledWallet() {
    let {_t} = this.props;

    return (
        Utils.IsMobile
                  ? <div className={'sign-in-page__app'}>
                      <img src={require('../../../../shared/img/assets/lock.png')}/>
                      <p>{_t('mobile_app_not_installed')}</p>
                      <span>{_t('please_install_mobile_app')}</span>
                      <br/><br/>
                      <ButtonNew label={_t('install_toshi')}
                              color={ButtonNew.colors.BLUE}
                              onClick={() => {Utils.OpenToshiInstallation()}} />
                      <ButtonNew label={_t('install_cipher')}
                              color={ButtonNew.colors.BLUE}
                              onClick={() => {Utils.OpenCipherInstallation()}} />
                              {this.renderManualSignIn()}
                    </div>
                  : <div className={'sign-in-page__app'}>
                      <img src={require('../../../../shared/img/assets/metamask.png')}/>
                      <p>{_t('metamask_not_installed')}</p>
                      <span>{_t('please_install_metamask')}</span>
                      <br/><br/>
                      <ButtonNew label={_t('install_metamask')}
                              color={ButtonNew.colors.BLUE}
                              onClick={() => {Utils.OpenMetamaskInstallation()}} />
                      {this.renderManualSignIn()}
                    </div>
    )
  }

  renderLockedWallet() {
    let {_t} = this.props;

    return ( Utils.IsMobile
      ? <div className={'sign-in-page__app'}>
          <img src={require('../../../../shared/img/assets/lock.png')}/>
          <p>{_t('mobile_app_is_locked')}</p>
          <span>{_t('please_unlock_mobile_app')}</span>
          {this.renderManualSignIn()}
        </div>
      : <div className={'sign-in-page__app'}>
          <img src={require('../../../../shared/img/assets/metamask.png')}/>
          <p>{_t('metamask_is_locked')}</p>
          <span>{_t('please_unlock_metamask')}</span>
          {this.renderManualSignIn()}
        </div>
    )
  }

  renderRegistration() {
    let hasWalletUnlocked = Utils.hasWalletUnlocked();
    return (
      <SignInForm metamask={hasWalletUnlocked} onBack={!hasWalletUnlocked ? () => {
        this.props.history.push(`/${URLS.SIGN_IN}?type=sign-in`)
      } : null} />
    )
  }

  renderSetting() {
    let hasWalletUnlocked = Utils.hasWalletUnlocked();
    return (
      <SignInForm metamask={hasWalletUnlocked} type={SignInForm.types.SETTINGINFO}/>
    )
  }

  render() {
    let {userId, userInfo, type} = this.props;

    let hasWalletSupported = Utils.HasWalletSupported();
    let hasWalletUnlocked = Utils.hasWalletUnlocked();

    let content = null;

    if (userId === undefined || userInfo === undefined) {
      content = this.renderLoading();
    } else if (!hasWalletUnlocked && (!userId || type === 'sign-in')) {
      if (!hasWalletSupported) {
        content = this.renderNotInstalledWallet();
      } else if (!hasWalletUnlocked) {
        content = this.renderLockedWallet();
      }
    } else {
      if (userId && (!userInfo.username || userInfo.username === '')) {
        content = this.renderRegistration();
      } else if (userId && userInfo.username) {
        content = this.renderSetting();
      }
    }

    return (
      <PageWrapper type={PageWrapper.types.BLUE}>
        <Navbar/>

        <Container className={'sign-in-page__container'}>
          {content}
        </Container>

        <Footer/>
      </PageWrapper>
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
)(SignInPage));