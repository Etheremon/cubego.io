import React from "react"
import { connect } from "react-redux"
import {getTranslate} from "react-localize-redux"
import * as Stores from "../../../../reducers/index"
import Popup from "../../../widgets/Popup/Popup.jsx";
import * as Utils from "../../../../utils/utils";
import {Text} from "../../../widgets/Text/Text.jsx";
import {ButtonNew} from "../../../widgets/Button/Button.jsx";
import * as LS from "../../../../services/localStorageService";
import Dropdown from "../../../widgets/Dropdown/Dropdown.jsx";
import { IsEqual } from '../../../../utils/objUtils';
import { popTxn } from '../../../../actions/txnAction';
import {GetLoggedInUserId, GetTxn, GetUserInfo} from '../../../../reducers/selectors';
import { CustomRectangle } from "../../../widgets/SVGManager/SVGManager.jsx";
import Loading from '../../Loading/Loading.jsx';
import { SubBgr } from '../../../containers/HomePage/SubBgr/SubBgr.jsx';
import RegisterPopup from "../../../containers/SignIn/RegisterPopup/RegisterPopup.jsx";

require("style-loader!./TxnBar.scss");

const TxnBarState = {
  TO_SUBMIT: 'to_submit',
  SUBMITTING: 'submitting',
  DONE: 'done',
};


class TxnBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleGoToMEW = this.handleGoToMEW.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleGoToEtherScan = this.handleGoToEtherScan.bind(this);
    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.updateState = this.updateState.bind(this);

    this.state = {
      currentTxn: {...this.props.currentTxn, state: TxnBarState.TO_SUBMIT},
      toggleVar: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentTxn && nextProps.currentTxn.forceToSubmittingState && this.state.currentTxn.state !== TxnBarState.SUBMITTING && this.state.currentTxn.state !== TxnBarState.DONE) {
      this.handleValidate(nextProps.currentTxn)
      return
    }
    if (!IsEqual(this.props.currentTxn, nextProps.currentTxn)) {
      this.updateState({
        currentTxn: {...nextProps.currentTxn, status: nextProps.currentTxn ? TxnBarState.TO_SUBMIT : null},
      });
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  updateState(newState) {
    newState = {...this.state, ...newState};
    this.setState(newState);
  }

  handleValidate(currentTxnObj) {
    this.updateState({currentTxn: {...currentTxnObj,  validateErr: '', status: TxnBarState.SUBMITTING}});
    currentTxnObj.submitFunc(currentTxnObj.fields, function(data) {
      if (data && data.err) {
        this.updateState({currentTxn: {...currentTxnObj, validateErr: data.err, status: TxnBarState.TO_SUBMIT}});
      } else if (data && data.txn_data) {
        this.updateState({currentTxn: {...currentTxnObj, validateErr: '', status: TxnBarState.DONE, 'txn_hash': null, 'txn_data': data.txn_data}});
      } else if (data && data.txn_hash) {
        this.updateState({currentTxn: {...currentTxnObj, validateErr: '', status: TxnBarState.DONE, 'txn_hash': data.txn_hash, 'txn_data': null}});
      }
    }.bind(this));
  }

  handleGoToMEW(txn) {
    window.open(`https://www.myetherwallet.com/?to=${txn.address}&value=${txn.amount}&gaslimit=${txn.gas}&data=${txn.txn_data}#send-transaction`, "_blank")
  }

  handleGoToEtherScan(txnHash) {
    window.open(`https://${window.currentNetwork !== 'mainnet' ? `${window.currentNetwork}.` : ''}etherscan.io/tx/${txnHash}`, "_blank");
  }

  handleClose() {
    this.state.currentTxn.onFinishCallback();
    this.props.dispatch(popTxn());
  }

  handleToggle() {
    this.setState((state) => {
      return {toggleVar: !state.toggleVar};
    });
  }

  handleOnInputChange(e, field) {
    this.state.currentTxn.fields[field].value = e.target.value;
    this.setState({
      currentTxn: this.state.currentTxn
    });
  }

  renderContent() {
    let {_t} = this.props;
    let {currentTxn} = this.state;

    if (this.state.currentTxn.status === TxnBarState.TO_SUBMIT || this.state.currentTxn.status === TxnBarState.SUBMITTING) {
      return (
        <div className="main-form__container">
          <form className="form">
            <div className="txn-header">
              <CustomRectangle tier={'referral'}/>
              <span>{this.state.currentTxn.title && this.props._t(this.state.currentTxn.title)}</span>
            </div>
            {currentTxn && currentTxn.note ?
              <p className={'txn-note'}>{typeof(currentTxn.note) === 'string' ? _t(currentTxn.note) : currentTxn.note}</p> : null
            }
            {/*<div className="txn-title">*/}
              {/*{this.state.currentTxn.content && this.props._t(this.state.currentTxn.content)}*/}
            {/*</div>*/}

            {this.state.currentTxn.fields_order.map((fieldName, idx) => {
              console.log(typeof(this.state.currentTxn.fields[fieldName].text), this.state.currentTxn.fields[fieldName].text)
              return(
                <div className="txn-field" key={idx}>
                  <label>{typeof(this.state.currentTxn.fields[fieldName].text) === 'string' ? _t(this.state.currentTxn.fields[fieldName].text) : this.state.currentTxn.fields[fieldName].text}</label>
                  { (this.state.currentTxn.fields[fieldName].type === 'dropdown' || this.state.currentTxn.fields[fieldName].type === 'buttons')
                    ? (this.state.currentTxn.fields[fieldName].type === 'dropdown'
                        ? <Dropdown key={idx} placeholder={this.state.currentTxn.fields[fieldName].placeholder || this.props._t('please_select')}
                                    list={this.state.currentTxn.fields[fieldName].options}
                                    onClick={(e, data) => {this.handleOnInputChange({target: data}, fieldName)}}
                          />
                        : this.state.currentTxn.fields[fieldName].options.map((option, idx) => (
                            this.state.currentTxn.fields[fieldName].value === option.value
                              ? <span key={idx}><ButtonNew>{option.text}</ButtonNew></span>
                              : <span key={idx}><ButtonNew onClick={() => {
                                  this.handleOnInputChange({target: {value: option.value}}, fieldName)
                                }}>{option.text}</ButtonNew></span>
                          ))
                      )
                    : <input type={this.state.currentTxn.fields[fieldName].type}
                             value={this.state.currentTxn.fields[fieldName].value}
                             readOnly={this.state.currentTxn.fields[fieldName].readonly}
                             min={this.state.currentTxn.fields[fieldName].min}
                             max={this.state.currentTxn.fields[fieldName].max}
                             placeholder={this.state.currentTxn.fields[fieldName].placeholder || this.props._t('please_input')}
                             onChange={(e) => {
                               this.handleOnInputChange(e, fieldName);
                             }}
                      />
                  }
                </div>
              );
            })}

            {this.state.currentTxn.status === TxnBarState.SUBMITTING
              ? <p className={'txn-msg txn-notice'}>{_t('txn_submitting_note')}</p>
              : <p className={'txn-msg txn-error'}>{this.state.currentTxn.validateErr ? this.props._t(this.state.currentTxn.validateErr) : null}</p>
            }

            <ButtonNew color={ButtonNew.colors.BLUE}
                       label={this.props._t(this.state.currentTxn.button)}
                       onClick={() => this.handleValidate(this.state.currentTxn)}
                       loading={this.state.currentTxn.status === TxnBarState.SUBMITTING}
            />
          </form>
        </div>
      )
    }
    else if (this.state.currentTxn.status === TxnBarState.DONE && this.state.currentTxn.txn_data) {
      return [
        <div className="main-form__container" key={2}>
          <form className="form">
            <div className="txn-header">
              <CustomRectangle tier={'referral'}/>
              <span>{this.props._t(this.state.currentTxn.title_done)}</span>
            </div>

            <p className={'txn-note'}>{this.props._t('no_metamask')}</p>

            <div className="txn-field">
              <label>{this.props._t('contract_address')}</label>
              <input type="text" value={this.state.currentTxn.txn_data.address} readOnly />
            </div>
            <div className="txn-field">
              <label>{this.props._t('amount_to_send')}</label>
              <input type="text" value={this.state.currentTxn.txn_data.amount} readOnly />
            </div>
            <div className="txn-field">
              <label>{this.props._t('recommended_gas')}</label>
              <input type="text" value={this.state.currentTxn.txn_data.gas} readOnly />
            </div>
            <div className="txn-field">
              <label>{this.props._t('txn_data')}</label>
              <textarea rows="4" readOnly value={this.state.currentTxn.txn_data.txn_data}/>
            </div>
            <ButtonNew color={ButtonNew.colors.BLUE} label={this.props._t('go_to_mew')} onClick={() => this.handleGoToMEW(this.state.currentTxn.txn_data)}/>

          </form>
        </div>
      ]
    }
    else if (this.state.currentTxn.status === TxnBarState.DONE && this.state.currentTxn.txn_hash) {
      return (
        <div className="main-form__container">
          <form className="form">
            <div className="txn-header">
              <CustomRectangle tier={'referral'}/>
              <span>{this.props._t(this.state.currentTxn.title_done)}</span>
            </div>

            {currentTxn && currentTxn.txn_done ?
              <p>{typeof(currentTxn.txn_done) === 'string' ? _t(currentTxn.txn_done) : currentTxn.txn_done}</p> : null
            }

            <div className="txn-field">
              <label>{this.props._t('txn_hash')}</label>
              <input type="text" value={this.state.currentTxn.txn_hash} readOnly={true} />
            </div>
            <ButtonNew color={ButtonNew.colors.BLUE} label={this.props._t('check etherscan')}
                       onClick={() => {this.handleGoToEtherScan(this.state.currentTxn.txn_hash)}}/>

            {currentTxn && currentTxn.follow_up_action ?
              <ButtonNew label={_t(currentTxn.follow_up_txt)}
                         onClick={() => {
                           this.handleClose();
                           currentTxn.follow_up_action();
                         }}/> : null
            }

          </form>
        </div>
      )
    }
  }

  render() {
    let {userId, userInfo, currentTxn} = this.props;

    if (!currentTxn) return null;

    if (userId === undefined || !userInfo) {
      return (
        <div className="txn-bar__wrapper">
          <SubBgr position={SubBgr.positions.RIGHT} color={SubBgr.colors.BLUE}/>
          <div className={'main-form__container registration'}>
            <Loading type={Loading.types.DOG}/>
          </div>
        </div>
      )
    }

    if (!userInfo.username) {
      return (
        <div className="txn-bar__wrapper">
          <SubBgr position={SubBgr.positions.RIGHT} color={SubBgr.colors.BLUE}/>
          <i className="fas fa-times close-btn registration" onClick={this.handleClose}/>
          <div className={'main-form__container registration'}>
            <RegisterPopup simplified/>
          </div>
        </div>
      );
    }

    return (
      <div className="txn-bar__wrapper">
        <SubBgr position={SubBgr.positions.RIGHT} color={SubBgr.colors.BLUE}/>
        <i className="fas fa-times close-btn" onClick={this.handleClose}/>
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  let txnStore = Stores.getTxnStore(store);
  let userId = GetLoggedInUserId(store);
  return {
    _t: getTranslate(store.localeReducer),
    currentTxn: GetTxn(txnStore),
    userId: userId,
    userInfo: GetUserInfo(store, userId),
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TxnBar);
