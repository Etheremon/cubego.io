import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import {getTranslate} from "react-localize-redux"

import { Actions } from "../../../../actions/index"
import * as Stores from "../../../../reducers/index"
import * as TxnStore from "../../../../reducers/txnStore"
import { Link } from 'react-router-dom'
import Popup from "../../../widgets/Popup/Popup.jsx";
import * as Utils from "../../../../utils/utils";
import {Text} from "../../../widgets/Text/Text.jsx";
import {ButtonNew} from "../../../widgets/Button/Button.jsx";
import * as LS from "../../../../services/localStorageService";
import isEqual from "lodash/isEqual";
import Dropdown from "../../../widgets/Dropdown/Dropdown.jsx";
import { Checkbox } from '../../../widgets/Checkbox/Checkbox.jsx';

require("style-loader!./TxnBar.scss");


class TxnBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleGoToMEW = this.handleGoToMEW.bind(this);
    this.handleToggleTopUp = this.handleToggleTopUp.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleGoToEtherScan = this.handleGoToEtherScan.bind(this);
    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.handleOnDropdownChange = this.handleOnDropdownChange.bind(this);

    this.updateState = this.updateState.bind(this);
    this.getMetamaskPopup = this.getMetamaskPopup.bind(this);

    this.state = {
      currentTxn: this.props.store.currentTxn,
      toggleVar: null,
      tosChecked: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.store.currentTxn, nextProps.store.currentTxn)) {
      this.updateState({
        currentTxn: {...nextProps.store.currentTxn, status: nextProps.store.currentTxn ? 'to_submit' : null},
        tosChecked: false,
      });
    }
  }

  componentWillUnmount() {
  }

  updateState(newState) {
    newState = {...this.state, ...newState};
    newState.toggleVar = newState.currentTxn ? 1 : null;
    this.setState(newState);
  }

  handleValidate() {
    this.updateState({currentTxn: {...this.state.currentTxn,  validateErr: '', status: 'submitting'}});
    this.state.currentTxn.submitFunc(this.state.currentTxn.fields, function(data) {
      if (data.err) {
        this.updateState({currentTxn: {...this.state.currentTxn, validateErr: data.err, status: 'to_submit'}});
      } else if (data.txn_data) {
        this.updateState({currentTxn: {...this.state.currentTxn, validateErr: '', status: 'done', 'txn_hash': null, 'txn_data': data.txn_data}});
      } else if (data.txn_hash) {
        this.updateState({currentTxn: {...this.state.currentTxn, validateErr: '', status: 'done', 'txn_hash': data.txn_hash, 'txn_data': null}});
      }
    }.bind(this));
  }

  handleGoToMEW(txn) {
    window.open(`https://www.myetherwallet.com/?to=${txn.address}&value=${txn.amount}&gaslimit=${txn.gas}&data=${txn.txn_data}#send-transaction`, "_blank")
  }

  handleGoToEtherScan(txnHash) {
    window.open(`https://etherscan.io/tx/${txnHash}`, "_blank");
  }

  handleToggleTopUp() {
    if (this.state.arrow === 'down') {
      this.setState({arrow: 'up'});
    } else if (this.state.arrow === 'up'){
      this.setState({arrow: 'down'});
    }
  }

  handleClose() {
    this.state.currentTxn.onFinishCallback();
    this.props.actions.txnAction.popTxn();
  }

  handleCancel() {
    this.state.currentTxn.onFinishCallback();
    this.props.actions.txnAction.popTxn();
  }

  handleToggle() {
    this.setState({toggleVar: 1 - this.state.toggleVar});
  }

  handleOnInputChange(e, field) {
    this.state.currentTxn.fields[field].value = e.target.value;
    this.setState({
      currentTxn: this.state.currentTxn
    });
  }

  handleOnDropdownChange(e, data, field) {
    // console.log(e, data, field);
  }

  getMetamaskPopup() {
    let {_t} = this.props;
    let hasMetamaskInstalled = Utils.HasMetamaskInstalled();
    let hasMetamaskLoggedIn = Utils.HasMetamaskLoggedIn();
    let metamaskPopup = LS.GetItem(LS.Fields.metamaskPopup);

    if (metamaskPopup === 'false') return null;
    let disableMetamaskPopup = () => {
      LS.SetItem(LS.Fields.metamaskPopup, 'false');
      this.txnPopup && this.txnPopup.wrappedInstance.close();
    };

    let header = '';
    let btns = [];

    if (hasMetamaskInstalled && !hasMetamaskLoggedIn) {
      header = Utils.IsMobile ? _t('txt.mobile_app_is_locked') : _t('txt.metamask_is_locked');
    } else if (!hasMetamaskInstalled) {
      header = Utils.IsMobile ? _t('txt.mobile_app_not_installed') : _t('txt.metamask_not_installed');
      btns = Utils.IsMobile
        ? [
            <ButtonNew label={_t('txt.install_toshi')} key={0}
                       onClick={Utils.OpenToshiInstallation} />,
            <ButtonNew label={_t('txt.install_cipher')} key={1}
                       onClick={Utils.OpenCipherInstallation} />
          ]
        : [
            <ButtonNew label={_t('txt.install_metamask')} key={0}
                       onClick={Utils.OpenMetamaskInstallation} />,
          ];
    }

    let content = Utils.IsMobile ? _t('txt.need_wallet_integration_mobile') : _t('txt.need_wallet_integration');

    return (
      <Popup key={0} className={'txn-bar__popup'} defaultOpen={true}
             scroll={true}
             ref={(txnPopup) => {this.txnPopup = txnPopup}}>
        <div className={'txn-bar__popup-content'}>
          <img src={Utils.IsMobile
            ? require('../../../../shared/img/assets/lock.png')
            : require('../../../../shared/img/assets/metamask.png')}/>
          <Text type={Text.types.H2} className={'txt-bar__popup-header'}>
            {header}
          </Text>
          <Text type={Text.types.T1} className={'txt-bar__popup-content'}>
            {content}
          </Text>
          <div className={'txn-bar__popup-btns'}>
            {btns}
          </div>

          <Text type={Text.types.T2} className={'txn-bar__note1'}>
            {_t('txt.intend_to_use_mew')}
          </Text>
          <ButtonNew label={_t('btn.close')}
                     color={ButtonNew.colors.GREY}
                     size={ButtonNew.sizes.SMALL}
                     onClick={() => {this.txnPopup && this.txnPopup.wrappedInstance.close()}} />
          <Text type={Text.types.SUBLINK} className={'txn-bar__note2'} onClick={disableMetamaskPopup}>
            {_t('txt.dont_show_box_again')}
          </Text>
        </div>
      </Popup>
    );
  }

  render() {
    return (
      <div className="ui container txn-bar__wrapper">

        {/* Case Tab Closed */}
        {this.state.toggleVar === 0 && this.state.currentTxn.status &&
        <div className="txn-bar__container-btn">
          <div className="ui compact menu">
            <a className="item" onClick={this.handleToggle}>
              <i className="icon diamond"/> {this.props._t('txn.transaction')}
              <div className="floating ui red label">1</div>
            </a>
          </div>
        </div>}

        {this.state.toggleVar === 1 && this.state.currentTxn.status &&
        <div className="txn-bar__container">
          <div className="ui top attached tabular menu">
            <div className="right menu">
              <a className="item active" onClick={this.handleToggle}>
                <i className="minus icon"/>
              </a>
            </div>
          </div>

          {/* Submitting */}
          {(this.state.currentTxn.status === 'to_submit' || this.state.currentTxn.status === 'submitting') ?
            <div className="ui bottom attached segment">
              <form className="ui form">
                <h3>{this.state.currentTxn.title && this.props._t(this.state.currentTxn.title)}</h3>
                <p>{this.state.currentTxn.note && this.props._t(this.state.currentTxn.note)}</p>

                {this.state.currentTxn.fields_order.map((fieldName, idx) => {
                  return(
                    <div className="field" key={idx}>
                      <label>{this.props._t(this.state.currentTxn.fields[fieldName].text)}</label>
                      { (this.state.currentTxn.fields[fieldName].type === 'dropdown' || this.state.currentTxn.fields[fieldName].type === 'buttons')
                        ? (this.state.currentTxn.fields[fieldName].type === 'dropdown'
                            ? <Dropdown key={idx} placeholder={this.state.currentTxn.fields[fieldName].placeholder || this.props._t('txt.please_select')}
                                        pointing={'bottom'} selection
                                        options={this.state.currentTxn.fields[fieldName].options}
                                        onChange={(e, data) => {this.handleOnInputChange({target: data}, fieldName)}}
                                        value={this.state.currentTxn.fields[fieldName].value}
                              />
                            : this.state.currentTxn.fields[fieldName].options.map((option, idx) => (
                                this.state.currentTxn.fields[fieldName].value === option.value
                                  ? <span key={idx}><Button as={"div"} color={'blue'} size={'mini'}>{option.text}</Button></span>
                                  : <span key={idx}><Button as={"div"} basic size={'mini'} onClick={() => {
                                      this.handleOnInputChange({target: {value: option.value}}, fieldName)
                                    }}>{option.text}</Button></span>
                              ))
                          )
                        : <input type={this.state.currentTxn.fields[fieldName].type}
                                 value={this.state.currentTxn.fields[fieldName].value}
                                 readOnly={this.state.currentTxn.fields[fieldName].readonly}
                                 min={this.state.currentTxn.fields[fieldName].min}
                                 max={this.state.currentTxn.fields[fieldName].max}
                                 placeholder={this.state.currentTxn.fields[fieldName].placeholder || this.props._t('txt.please_input')}
                                 onChange={(e) => {
                                   this.handleOnInputChange(e, fieldName);
                                 }}
                          />
                      }
                    </div>
                  );
                })}

                <Checkbox label={<label><Link to={'/tos'} target={'_blank'}>{this.props._t('txt.txn_agree')}</Link></label>}
                          onChange={(e, data) => {
                            this.setState({'tosChecked': data.checked});
                          }}
                />

                <p>{this.state.currentTxn.validateErr && this.props._t(this.state.currentTxn.validateErr)}</p>

                {this.state.currentTxn.status === 'to_submit'
                  ? <span>
                      <div className="ui small button" onClick={this.handleCancel}>{this.props._t('btn.cancel')}</div>
                      <div className={`ui teal small${this.state.tosChecked ? '' : ' disabled'} button`} onClick={this.handleValidate}>{this.props._t(this.state.currentTxn.button)}</div>
                    </span>
                  : <div className="ui teal small loading button">{this.state.currentTxn.button}</div>
                }

              </form>
            </div> : null
          }

          {/* Case Success with Txn Hash */}
          {this.state.currentTxn.status === 'done' && this.state.currentTxn.txn_hash ?
            <div className="ui bottom attached segment">
              <form className="ui form">
                <h3>{this.props._t(this.state.currentTxn.title_done)}</h3>

                <p>{this.props._t('txn.txn_done')}</p>

                <div className="field">
                  <label>{this.props._t('txn.txn_hash')}</label>
                  <input type="text" value={this.state.currentTxn.txn_hash} readOnly={true} />
                </div>

                <div className="ui small button" onClick={this.handleClose}>{this.props._t('btn.close')}</div>
                <div className="ui teal small button" onClick={() => {this.handleGoToEtherScan(this.state.currentTxn.txn_hash)}}>{this.props._t('txn.etherscan')}</div>

              </form>
            </div> : null
          }

          {/* Case Success with Txn Data */}
          {this.state.currentTxn.status === 'done' && this.state.currentTxn.txn_data ?
            [
              this.getMetamaskPopup(),
              <div className="ui bottom attached segment" key={2}>
                <form className="ui form">
                  <h3>{this.props._t(this.state.currentTxn.title_done)}</h3>

                  <p>{this.props._t('txn.no_metamask')}</p>

                  <div className="field">
                    <label>{this.props._t('txn.contract_address')}</label>
                    <input type="text" name="first-name" value={this.state.currentTxn.txn_data.address} readOnly />
                  </div>
                  <div className="field">
                    <label>{this.props._t('txn.amount_to_send')}</label>
                    <input type="text" name="last-name"  value={this.state.currentTxn.txn_data.amount} readOnly />
                  </div>
                  <div className="field">
                    <label>{this.props._t('txn.recommended_gas')}</label>
                    <input type="text" name="last-name"  value={this.state.currentTxn.txn_data.gas} readOnly />
                  </div>
                  <div className="field">
                    <label>{this.props._t('txn.txn_data')}</label>
                    <textarea rows="4" readOnly value={this.state.currentTxn.txn_data.txn_data}/>
                  </div>

                  <div className="ui small button" onClick={this.handleClose}>{this.props._t('btn.close')}</div>
                  <div className="ui tiny teal button" onClick={() => this.handleGoToMEW(this.state.currentTxn.txn_data)}>{this.props._t('btn.go_to_mew')}</div>

                </form>
              </div>
            ]: null
          }

        </div>}


      </div>
    );
  }
}

const mapStateToProps = (store) => {
  let txnStore = Stores.getTxnStore(store);
  return {
    _t: getTranslate(store.localeReducer),
    store: {
      currentTxn: TxnStore.getCurrentTxn(txnStore),
    }
  }
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    txnAction: bindActionCreators(Actions.txnAction, dispatch)
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TxnBar);
