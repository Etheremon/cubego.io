import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';

import { ButtonNew } from '../../../widgets/Button/Button.jsx';
import withRouter from 'react-router/es/withRouter';
import {GetLoggedInUserId, GetUserInfo} from "../../../../reducers/selectors";
import { Input } from '../../../widgets/Input/Input.jsx';
import { UserActions } from '../../../../actions/user';
import {URLS} from "../../../../constants/general";
import {AutoTrack, CustomTrackList} from "../../../../services/tracker";
import * as LS from "../../../../services/localStorageService";

require("style-loader!./SignInForm.scss");

class SignInForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      submitError: {}
    };

    this.handleValidateInput = this.handleValidateInput.bind(this);
  }

  handleValidateInput (value) {

  }

  render() {
    const {_t, onBack, userId, type, metamask, userInfo} = this.props;
    const { submitError, submitSuccess } = this.state;
    const referralObj = LS.GetItem(LS.Fields.referralCode);
    const referralCode = referralObj && referralObj.expire > Date.now() ? referralObj.code : '';

    return (  
      <div className={'signup__container'}>
        <div className="welcome-to">
          {_t('welcome_to_cubego')}
          <img className={'cube_red'} src={require('../../../../shared/img/assets/cube_red.png')}/>
          <img className={'cube_yellow'} src={require('../../../../shared/img/assets/cube_yellow.png')}/>
          <img className={'cube_blue'} src={require('../../../../shared/img/assets/cube_blue.png')}/>
          <img className={'plus_image'} src={require('../../../../shared/img/assets/plus_image.png')}/>
          <img className={'cubegon_image'} src={require('../../../../shared/img/assets/cubegon_image.png')}/>
        </div>
        <div className="signup-form__container">
          <div className="signup__label">
            {_t(`sign_up_label.${type}`)}
          </div>
          <form>
            <Input label={_t('wallet')} value={userId} disabled={true} />
            <Input label={_t('email')} placeholder={type === SignInForm.types.SIGN_UP ? 'contact@cubego.io' : userInfo.email}
                   onChange={e => this.input_email = e} />
            <Input label={_t('username')} placeholder={_t('desc.username')}
                   value={userInfo.username}
                   onChange={e => this.input_username = e} />

            {/*{type === SignInForm.types.SIGN_UP ?*/}
              {/*<React.Fragment>*/}
                {/*<Input label={_t('invite code')} placeholder={_t('optional')} value={userInfo.refer_code}*/}
                       {/*onChange={e => this.input_invite_code = e}/>*/}
                {/*<div className={'field-note'}>{_t('desc.invite_code')}</div>*/}
              {/*</React.Fragment> : null*/}
            {/*}*/}

            {!metamask ?
              <React.Fragment>
                <Input label={_t('signature')} placeholder={_t('signature_placeholder')} onChange={e => this.input_signature = e}/>
                <div className={'field-note'}>{_t('desc.sign_in_signature')}</div>
              </React.Fragment> : null
            }

            <input type="checkbox" onChange={e => this.input_checkbox = e.target.checked}/>
            <span className={'term-policy__label'}>{_t('term_service_policy')}</span><br />


            {submitError && submitError.error ?
              <div className={`error__label`}>
                {_t(submitError.error, submitError.error_values || {})}
              </div> : null
            }
            {submitSuccess?
              <div className={`success__label`}>
                {_t(submitSuccess)}
              </div> : null
            }

            {onBack ?
              <ButtonNew className={'back__button'} color={ButtonNew.colors.GREY} label={_t('back')} onClick={onBack}/> : null
            }

            <ButtonNew className={'register__button'}
                       color={ButtonNew.colors.BLUE}
                       loading={this.state.submitting}
                       label={_t(`${type === SignInForm.types.SETTING_INFO ? 'update': 'register'}`)}
                       onClick={() => {
                        this.setState({submitting: true});
                        this.props.dispatch(UserActions.UPDATE_USER_INFO.init.func({
                          userId: userId,
                          email: this.input_email,
                          username: this.input_username === undefined ? userInfo.username : this.input_username,
                          inviteCode: referralCode,
                          signature: metamask ? undefined : this.input_signature,
                          termsAgreed: this.input_checkbox,
                          callbackFunc: (code, data) => {
                            if (code !== window.RESULT_CODE.SUCCESS) {
                              this.setState({submitting: false, submitError: data, submitSuccess: null});
                            } else {
                              if (!userInfo.username) {
                                AutoTrack(CustomTrackList.firstRegister);
                              }
                              this.setState({submitting: false, submitError: data, submitSuccess: _t('Your information is updated!'), showNext: true})
                            }
                        }}))
                       }}/>

            {this.state.showNext ? (
              this.props.onRegistered
                ? <ButtonNew className={'back__button'} label={_t('Continue')} showDeco={ButtonNew.deco.RIGHT}
                           onClick={() => {this.props.onRegistered && this.props.onRegistered();}}/>
                : <ButtonNew className={'back__button'} label={_t('build_cubegon')} showDeco={ButtonNew.deco.RIGHT}
                             onClick={() => {this.props.history.push(`/${URLS.BUILD_GON}`)}}/>
              ) : null
            }
          </form>
        </div>
      </div>
    )
  }
}

SignInForm.types = {
  REGISTER_POPUP: 'register-popup',
  SIGN_UP: 'sign-up',
  SETTING_INFO: 'setting-info'
};

SignInForm.defaultProps = {
  type: SignInForm.types.SIGN_UP,
  onRegistered: null,
};

const mapStateToProps = (store, props) => {
  let userId = GetLoggedInUserId(store);

  return {
    _t: getTranslate(store.localeReducer),
    userId: userId,
    userInfo: GetUserInfo(store, userId),
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true },
)(SignInForm));