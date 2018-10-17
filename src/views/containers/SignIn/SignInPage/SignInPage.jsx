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
    this.submit = this.submit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
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

  submit() {
    let userId = this.props.userId;
    let email = this.input_email.getValue();
    let username = this.input_username.getValue();
    let inviteCode = this.input_invite_code ? this.input_invite_code.getValue() || '' : '';
    let signature = this.input_signature ? this.input_signature.getValue() : undefined;
    let checked = this.input_checkbox.getValue();

    if (!Utils.VerifyEmail(email)) {
      this.setState({submitError: this.props._t('err.invalid_email')})
    } else if (username.length < 6 || username.length > 18) {
      this.setState({submitError: this.props._t('err.invalid_length', {field: this.props._t('txt.display_name'), from: 6, to: 18})})
    } else if (signature === '') {
      this.setState({submitError: this.props._t('err.invalid_signature')});
    } else if (!checked) {
      this.setState({submitError: this.props._t('err.agree_tos_pp')});
    } else {
      this.setState({registering: true, submitError: '', submitMsg: ''});

      let callback = function(code, data) {
        if (data.error) {
          this.setState({registering: false, submitError: this.props._t('err.invalid_singature')})
        } else {
          // re-login
          this.props.dispatch(Actions.auth.login(this.props.userId));
          this.setState({registering: false, submitError: '', submitMsg: this.props._t('txt.account_is_updated')})

          // Case new user -> redirect
          if (!(this.props.userInfo && this.props.userInfo.username))
            this.props.history.push(`${URLS.MY_MONS}`);
        }
      }.bind(this);

      if (signature === undefined)
        window.updateTrainerInfo(email, username, inviteCode, callback);
      else
        window.updateTrainerInfoByMEW(userId, signature, email, username, inviteCode, callback);
    }
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

  handleOnChange() {
    let email = this.input_email.getValue();
    let username = this.input_username.getValue();
    let checked = this.input_checkbox.getValue();
    let signature = this.input_signature ? this.input_signature.getValue() : undefined;
    if (email !== '' && username !== '' && checked && (signature === undefined || signature !== '')) {
      if (!this.state.verified) this.setState({verified: true});
    } else {
      if (this.state.verified) this.setState({verified: false});
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
               onChange={() => {if (this.state.manualLoginErr !== '') this.setState({manualLoginErr: ''})}}
               ref={(inp) => {this.manualLoginInput = inp}}/>
        {this.state.manualLoginErr}<br/>
        <ButtonNew label={_t('sign in')} onClick={this.handleManualLogin}/>
      </div>
    );
  }

  renderNotInstalledWallet() {
    let {_t} = this.props;

    return (
      <div className={'sign-in-page__app'}>
        {_t('wallet_not_installed')}
        {this.renderManualSignIn()}
      </div>
    )
  }

  renderLockedWallet() {
    let {_t} = this.props;

    return (
      <div className={'sign-in-page__app'}>
        {_t('wallet_is_locked')}
        {this.renderManualSignIn()}
      </div>
    )
  }

  renderRegistration() {
    let hasWalletUnlocked = Utils.hasWalletUnlocked();
    return (
      <SignInForm onBack={!hasWalletUnlocked ? () => {
        this.props.history.push(`/${URLS.SIGN_IN}?type=sign-in`)
      } : null}/>
    )
  }

  renderSetting() {
    let hasWalletUnlocked = Utils.hasWalletUnlocked();
    return (
      <SignInForm onBack={!hasWalletUnlocked ? () => {
        this.props.history.push(`/${URLS.SIGN_IN}?type=sign-in`)
      } : null}/>
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