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
import {PageWrapper} from "../../../widgets/PageWrapper/PageWrapper.jsx";
import {ButtonNew} from "../../../widgets/Button/Button.jsx";
import Loading from "../../../components/Loading/Loading.jsx";
import SignInForm from "../SigInForm/SignInForm.jsx";
import {AuthActions} from "../../../../actions/auth";
import {URLS} from "../../../../constants/general";
import { Image } from '../../../components/Image/Image.jsx';
import { SubscriberActions } from '../../../../actions/subscriber';
import ReferralView from "../../Referral/ReferralView.jsx";

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
      subscribedResponse: undefined,
    };

    this.input_email = React.createRef();
    this.handleManualLogin = this.handleManualLogin.bind(this);

    this.renderManualSignIn = this.renderManualSignIn.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.renderNotInstalledWallet = this.renderNotInstalledWallet.bind(this);
    this.renderLockedWallet = this.renderLockedWallet.bind(this);
    this.renderForm = this.renderForm.bind(this);
    // this.renderRegistration = this.renderRegistration.bind(this);
    // this.renderSetting = this.renderSetting.bind(this);
  };

  componentWillMount() {
  }

  componentDidMount() {
    Utils.ScrollTop();
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
        <div className={'header'}>{_t('manual_sign_in.intro')}</div>
        <Input label={_t('Ether Address')}
               placeholder={'0x9876...'}
               value={userId}
               onChange={(e) => {if (this.state.manualLoginErr !== '') this.setState({manualLoginErr: ''})}}
               ref={(inp) => {this.manualLoginInput = inp}}/>
        <div className={'err'}>
          {this.state.manualLoginErr}
          </div>
        <br/>
        <ButtonNew label={_t('sign in')}
                   color={ButtonNew.colors.BLUE}
                   onClick={this.handleManualLogin}
        />
      </div>
    );
  }

  renderNotInstalledWallet() {
    let {_t} = this.props;
    let {subscribedResponse}= this.state;

    let email = this.state.email || '';

    return (
      Utils.IsMobile
        ? <div className={'sign-in-page__app'}>
            <img src={require('../../../../shared/img/assets/lock.png')}/>
            <div className={'header'}>{_t('mobile_app_not_installed')}</div>
            <div className={'desc'}>{_t('please_install_mobile_app')}</div>
            <Container size={Container.sizes.SMALL}>
              <div className="subscription__container">

                <div className={'subscription__boxes'}>

                  <div className={'subscription__input-box'}>
                    <div className="channels__label">
                      {_t('subscribe_us')}
                    </div>
                    <input placeholder={_t('your_email_address')} type="text"
                            value={email} onChange={(e) => {this.setState({email: e.target.value, subscribedResponse: undefined})}}/>
                    <div className={`subscribe-btn ${email === '' ? 'hidden' : ''}`}
                          onClick={() => {
                            this.props.dispatch(SubscriberActions.SUBSCRIBE_EMAIL.init.func({
                              email: email,
                              callbackFunc: (code, data) => {
                                this.setState({
                                  subscribedResponse: code === window.RESULT_CODE.SUCCESS,
                                });
                              }
                            }));
                          }}
                    >
                      {_t('subscribe')}
                    </div>
                  </div>

                  <div className={'subscription__channels'}>
                    <div className="channels__label">
                      {_t('channels')}
                    </div>
                    <div className="channels">
                      <a href="https://discordapp.com/invite/pYD5tss" target="_blank"><Image img={'icon_discord'} /></a>
                      <a href="https://t.me/cubego" target="_blank"><Image img={'icon_telegram'} /></a>
                      <a href="https://twitter.com/cubego_io" target="_blank"><Image img={'icon_twitter'} /></a>
                    </div>
                  </div>
                </div>

                <div className={`response__label ${subscribedResponse === true ? 'm--color--green' : ''} ${subscribedResponse === false ? 'm--color--red' : ''}`}>
                  {
                    _t(`${subscribedResponse === true ? 'success_response' :
                      subscribedResponse !== undefined ? 'err.invalid_email' : ''}`)
                  }
                </div>

                <div className="subscription-action">
                  <ButtonNew label={_t('install Coinbase Wallet')}
                        onClick={() => {Utils.OpenToshiInstallation()}} />
                  <ButtonNew label={_t('install Cipher')}
                        onClick={() => {Utils.OpenCipherInstallation()}} />
                </div>

              </div>
            </Container>


            {this.renderManualSignIn()}
          </div>
        : <div className={'sign-in-page__app'}>
              <img src={require('../../../../shared/img/assets/metamask.png')}/>
              <div className={'header'}>{_t('metamask_not_installed')}</div>
              <div className={'desc'}>{_t('please_install_metamask')}</div>
              <Container size={Container.sizes.SMALL}>
                <div className="subscription__container">

                  <div className={'subscription__boxes'}>

                    <div className={'subscription__input-box'}>
                      <div className="channels__label">
                        {_t('subscribe_us')}
                      </div>
                      <input placeholder={_t('your_email_address')} type="text"
                             value={email} onChange={(e) => {this.setState({email: e.target.value, subscribedResponse: undefined})}}/>
                      <div className={`subscribe-btn ${email === '' ? 'hidden' : ''}`}
                           onClick={() => {
                             this.props.dispatch(SubscriberActions.SUBSCRIBE_EMAIL.init.func({
                               email: email,
                               callbackFunc: (code, data) => {
                                 this.setState({
                                   subscribedResponse: code === window.RESULT_CODE.SUCCESS,
                                 });
                               }
                             }));
                           }}
                      >
                        {_t('subscribe')}
                      </div>
                    </div>

                    <div className={'subscription__channels'}>
                      <div className="channels__label">
                        {_t('channels')}
                      </div>
                      <div className="channels">
                        <a href="https://discordapp.com/invite/pYD5tss" target="_blank"><Image img={'icon_discord'} /></a>
                        <a href="https://t.me/cubego" target="_blank"><Image img={'icon_telegram'} /></a>
                        <a href="https://twitter.com/cubego_io" target="_blank"><Image img={'icon_twitter'} /></a>
                      </div>
                    </div>
                  </div>

                  <div className={`response__label ${subscribedResponse === true ? 'm--color--green' : ''} ${subscribedResponse === false ? 'm--color--red' : ''}`}>
                    {
                      _t(`${subscribedResponse === true ? 'success_response' :
                        subscribedResponse !== undefined ? 'err.invalid_email' : ''}`)
                    }
                  </div>

                  <div className="subscription-action">
                    <ButtonNew label={_t('Install Metamask')}
                            onClick={() => {Utils.OpenMetamaskInstallation()}} />
                  </div>

                </div>
              </Container>
            {this.renderManualSignIn()}
          </div>
    )
  }

  renderLockedWallet() {
    let {_t} = this.props;

    return ( Utils.IsMobile
      ? <div className={'sign-in-page__app'}>
          <img src={require('../../../../shared/img/assets/lock.png')}/>
          <div className={'header'}>{_t('mobile_app_is_locked')}</div>
          <div className={'desc'}>{_t('please_unlock_mobile_app')}</div>

          {this.renderManualSignIn()}
        </div>
      : <div className={'sign-in-page__app'}>
          <img src={require('../../../../shared/img/assets/metamask.png')}/>
          <div className={'header'}>{_t('metamask_is_locked')}</div>
          <div className={'desc'}>{_t('please_unlock_metamask')}</div>

          {window.ethereum && window.ethereum.enable ?
            <React.Fragment>
              <br/><br/>
              <ButtonNew label={_t('unlock_metamask')} onClick={() => {window.ethereum.enable()}}/>
            </React.Fragment> : null
          }

          {this.renderManualSignIn()}
        </div>
    )
  }

  // renderRegistration() {
  //   let hasWalletUnlocked = Utils.hasWalletUnlocked();
  //   return (
  //     <SignInForm metamask={hasWalletUnlocked} type={SignInForm.types.SIGN_UP}
  //                 onBack={!hasWalletUnlocked ? () => {
  //                   this.props.history.push(`/${URLS.SIGN_IN}?type=sign-in`)
  //                 } : null} />
  //   )
  // }

  renderForm(typ) {
    let hasWalletUnlocked = Utils.hasWalletUnlocked();
    return (
      <React.Fragment>
        <ReferralView className={'referral-box'} />
        <SignInForm metamask={hasWalletUnlocked} type={typ}
                    onBack={!hasWalletUnlocked ? () => {
                      this.props.history.push(`/${URLS.SIGN_IN}?type=sign-in`)
                    } : null} />
      </React.Fragment>
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
        content = this.renderForm(SignInForm.types.SIGN_UP);
      } else if (userId && userInfo.username) {
        content = this.renderForm(SignInForm.types.SETTING_INFO);
      }
    }

    return (
      <PageWrapper type={PageWrapper.types.BLUE_DARK}>
        <Navbar size={Container.sizes.SMALL}/>

        <Container className={'sign-in-page__container'} size={Container.sizes.SMALL}>
          {content}
        </Container>

        <Footer size={Container.sizes.SMALL} type={Footer.types.DARK}/>
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