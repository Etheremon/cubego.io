import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';

import { ButtonNew } from '../../../widgets/Button/Button.jsx';
import withRouter from 'react-router/es/withRouter';
import { Container } from '../../../widgets/Container/Container.jsx';
import {GetLoggedInUserId, GetUserInfo} from "../../../../reducers/selectors";
import { Input } from '../../../widgets/Input/Input.jsx';
import { AuthActions } from '../../../../actions/auth.js';
import { UserActions } from '../../../../actions/user';
import { IsEqual } from '../../../../utils/objUtils.js';

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
    const { submitError } = this.state;
    console.log(userInfo)

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
            {_t('signup_label')}
          </div>
          <form>
            <Input label={_t('wallet')} value={userId} disabled={true} />
            <Input label={_t('user_email')} value={userInfo.email} placeholder={'xxxx@gmail.com'} onChange={e => this.input_email = e} />
            <Input label={_t('display_name')} value={userInfo.username} onChange={e => this.input_username = e} />
            <Input label={_t('invite_code')} value={userInfo.refer_code} onChange={e => this.input_invite_code = e} />

            {
              !metamask ? <Input label={_t('signature')} onChange={e => this.input_signature = e}/> : null
            }

            <div className={'invite-code__description'}>{_t('desc.invite_code')}</div>
            <input type="checkbox" onChange={e => this.input_checkbox = e}/>
            <span className={'term-policy__label'}>{_t('term_service_policy')}</span><br />
            <div className={`error__label ${!IsEqual(submitError, {}) ? 'visibility' : 'hidden'}`}>
              {!IsEqual(submitError, {}) && _t(submitError.error, submitError.error_values)}
            </div>
            {onBack ?
              <ButtonNew className={'back__button'} color={ButtonNew.colors.GREY} label={_t('back')} onClick={onBack}/> : null
            }
            <ButtonNew className={'register__button'} showDeco={ButtonNew.deco.RIGHT} label={_t(`${type === SignInForm.types.SIGNIN ? 'register': 'setting'}`)} onClick={() => { 
              this.props.dispatch(UserActions.UPDATE_USER_INFO.init.func({userId: userId, 
                email: this.input_email, 
                username: this.input_username, 
                inviteCode: this.input_invite_code, 
                signature: metamask ? undefined : this.input_signature, 
                termsAgreed: this.input_checkbox, 
                callbackFunc: (code, data) => {
                  if (code !== window.SUCCESS) {
                    this.setState({submitError: data})
                  } else {
                    this.setState({submitError: {}})
                  }
              }}))
             }}/>
          </form>
        </div>
      </div>
    )
  }
}

SignInForm.types = {
  SIGNIN: 'sign-in',
  SETTINGINFO: 'setting-info'
}

SignInForm.defaultProps = {
  type: SignInForm.types.SIGNIN,
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