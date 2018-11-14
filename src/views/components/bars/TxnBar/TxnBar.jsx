import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {getTranslate} from "react-localize-redux"
import * as Stores from "../../../../reducers/index"
import * as TxnStore from "../../../../reducers/txnStore"
import Popup from "../../../widgets/Popup/Popup.jsx";
import * as Utils from "../../../../utils/utils";
import {Text} from "../../../widgets/Text/Text.jsx";
import {ButtonNew} from "../../../widgets/Button/Button.jsx";
import * as LS from "../../../../services/localStorageService";
import Dropdown from "../../../widgets/Dropdown/Dropdown.jsx";
import { IsEqual } from '../../../../utils/objUtils';
import { popTxn } from '../../../../actions/txnAction';
import { GetTxn } from '../../../../reducers/selectors';
import { CustomRectangle } from "../../../widgets/SVGManager/SVGManager.jsx";
import Loading from '../../Loading/Loading.jsx';
import { SubBgr } from '../../../containers/HomePage/SubBgr/SubBgr.jsx';

require("style-loader!./TxnBar.scss");

const TxnBarState = {
  TOSUBMIT: 'to_submit',
  SUBMITTING: 'submitting',
  DONE: 'done',
}

const ToggleTxnBar = {
  MINIMIZE: false,
  MAXIMIZE: true,
}

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
    this.getMetamaskPopup = this.getMetamaskPopup.bind(this);

    this.state = {
      currentTxn: {...this.props.store.currentTxn, state: TxnBarState.TOSUBMIT},
      toggleVar: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.store.currentTxn && nextProps.store.currentTxn.forceToSubmittingState && this.state.currentTxn.state !== TxnBarState.SUBMITTING && this.state.currentTxn.state !== TxnBarState.DONE) {
      this.handleValidate(nextProps.store.currentTxn)
      return
    }
    if (!IsEqual(this.props.store.currentTxn, nextProps.store.currentTxn)) {
      this.updateState({
        currentTxn: {...nextProps.store.currentTxn, status: nextProps.store.currentTxn ? TxnBarState.TOSUBMIT : null},
      });
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    console.log('ok unmount')
  }

  updateState(newState) {
    newState = {...this.state, ...newState};
    newState.toggleVar = newState.currentTxn ? ToggleTxnBar.MAXIMIZE : null;
    this.setState(newState);
  }

  handleValidate(currentTxnObj) {
    this.updateState({currentTxn: {...currentTxnObj,  validateErr: '', status: TxnBarState.SUBMITTING}});
    currentTxnObj.submitFunc(currentTxnObj.fields, function(data) {
      if (data.err) {
        this.updateState({currentTxn: {...currentTxnObj, validateErr: data.err, status: TxnBarState.TOSUBMIT}});
      } else if (data.txn_data) {
        this.updateState({currentTxn: {...currentTxnObj, validateErr: '', status: TxnBarState.DONE, 'txn_hash': null, 'txn_data': data.txn_data}});
      } else if (data.txn_hash) {
        this.updateState({currentTxn: {...currentTxnObj, validateErr: '', status: TxnBarState.DONE, 'txn_hash': data.txn_hash, 'txn_data': null}});
      }
    }.bind(this));
  }

  handleGoToMEW(txn) {
    window.open(`https://www.myetherwallet.com/?to=${txn.address}&value=${txn.amount}&gaslimit=${txn.gas}&data=${txn.txn_data}#send-transaction`, "_blank")
  }

  handleGoToEtherScan(txnHash) {
    window.open(`https://etherscan.io/tx/${txnHash}`, "_blank");
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

  getMetamaskPopup() {
    let {_t} = this.props;
    let hasMetamaskInstalled = Utils.HasWalletSupported();
    let hasMetamaskLoggedIn = Utils.hasWalletUnlocked();
    let metamaskPopup = LS.GetItem(LS.Fields.metamaskPopup);

    if (metamaskPopup === 'false') return null;
    let disableMetamaskPopup = () => {
      LS.SetItem(LS.Fields.metamaskPopup, 'false');
      this.txnPopup && this.txnPopup.wrappedInstance.close();
    };

    let header = '';
    let btns = [];

    if (hasMetamaskInstalled && !hasMetamaskLoggedIn) {
      header = Utils.IsMobile ? _t('mobile_app_is_locked') : _t('metamask_is_locked');
    } else if (!hasMetamaskInstalled) {
      header = Utils.IsMobile ? _t('mobile_app_not_installed') : _t('metamask_not_installed');
      btns = Utils.IsMobile
        ? [
            <ButtonNew label={_t('install_toshi')} key={0}
                       onClick={Utils.OpenToshiInstallation} />,
            <ButtonNew label={_t('install_cipher')} key={1}
                       onClick={Utils.OpenCipherInstallation} />
          ]
        : [
            <ButtonNew label={_t('install_metamask')} key={0}
                       onClick={Utils.OpenMetamaskInstallation} />,
          ];
    }

    let content = Utils.IsMobile ? _t('need_wallet_integration_mobile') : _t('need_wallet_integration');

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
            {_t('intend_to_use_mew')}
          </Text>
          <ButtonNew label={_t('btn.close')}
                     color={ButtonNew.colors.GREY}
                     size={ButtonNew.sizes.SMALL}
                     onClick={() => {this.txnPopup && this.txnPopup.wrappedInstance.close()}} />
          <Text type={Text.types.SUBLINK} className={'txn-bar__note2'} onClick={disableMetamaskPopup}>
            {_t('dont_show_box_again')}
          </Text>
        </div>
      </Popup>
    );
  }

  renderContent() {
    if (this.state.currentTxn.status === TxnBarState.TOSUBMIT || this.state.currentTxn.status === TxnBarState.SUBMITTING) {
      return (
        <div className="main-form__container">
              <form className="form">
                <div className="header">
                  <CustomRectangle tier={'referral'}/>
                  <span>{this.state.currentTxn.title && this.props._t(this.state.currentTxn.title)}</span>
                </div>
                <p>{this.state.currentTxn.note && this.props._t(this.state.currentTxn.note)}</p>
                <div className="title">
                  {this.state.currentTxn.content && this.props._t(this.state.currentTxn.content)}
                </div>

                {
                  this.state.currentTxn.status === TxnBarState.SUBMITTING && <Loading />
                }

                {this.state.currentTxn.status === TxnBarState.TOSUBMIT && this.state.currentTxn.fields_order.map((fieldName, idx) => {
                  return(
                    <div className="field" key={idx}>
                      <label>{this.props._t(this.state.currentTxn.fields[fieldName].text)}</label>
                      { (this.state.currentTxn.fields[fieldName].type === 'dropdown' || this.state.currentTxn.fields[fieldName].type === 'buttons')
                        ? (this.state.currentTxn.fields[fieldName].type === 'dropdown'
                            ? <Dropdown key={idx} placeholder={this.state.currentTxn.fields[fieldName].placeholder || this.props._t('please_select')}
                                        pointing={'bottom'} selection
                                        options={this.state.currentTxn.fields[fieldName].options}
                                        onChange={(e, data) => {this.handleOnInputChange({target: data}, fieldName)}}
                                        value={this.state.currentTxn.fields[fieldName].value}
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

                <p>{this.state.currentTxn.validateErr && this.props._t(this.state.currentTxn.validateErr)}</p>

                {this.state.currentTxn.status === TxnBarState.TOSUBMIT 
                  ? 
                    <ButtonNew color={ButtonNew.colors.BLUE} label={this.props._t(this.state.currentTxn.button)} onClick={() => this.handleValidate(this.state.currentTxn)}/>
                  : null
                }

              </form>
            </div>
      )
    } else if (this.state.currentTxn.status === TxnBarState.DONE && this.state.currentTxn.txn_data) {
      return [
        this.getMetamaskPopup(),
        <div className="main-form__container" key={2}>
          <form className="form">
            <div className="header">
              <CustomRectangle tier={'referral'}/>
              <span>{this.props._t(this.state.currentTxn.title_done)}</span>
            </div>

            <p>{this.props._t('no_metamask')}</p>

            <div className="field">
              <label>{this.props._t('contract_address')}</label>
              <input type="text" value={this.state.currentTxn.txn_data.address} readOnly />
            </div>
            <div className="field">
              <label>{this.props._t('amount_to_send')}</label>
              <input type="text" value={this.state.currentTxn.txn_data.amount} readOnly />
            </div>
            <div className="field">
              <label>{this.props._t('recommended_gas')}</label>
              <input type="text" value={this.state.currentTxn.txn_data.gas} readOnly />
            </div>
            <div className="field">
              <label>{this.props._t('txn_data')}</label>
              <textarea rows="4" readOnly value={this.state.currentTxn.txn_data.txn_data}/>
            </div>
            <ButtonNew color={ButtonNew.colors.BLUE} label={this.props._t('go_to_mew')} onClick={() => this.handleGoToMEW(this.state.currentTxn.txn_data)}/>

          </form>
        </div>
      ]
    } else if (this.state.currentTxn.status === TxnBarState.DONE && this.state.currentTxn.txn_hash) {
      return <div className="main-form__container">
        <form className="form">
          <div className="header">
            <CustomRectangle tier={'referral'}/>
            <span>{this.props._t(this.state.currentTxn.title_done)}</span>
          </div>

          <p>{this.props._t('txn_done')}</p>

          <div className="field">
            <label>{this.props._t('txn_hash')}</label>
            <input type="text" value={this.state.currentTxn.txn_hash} readOnly={true} />
          </div>
          <ButtonNew color={ButtonNew.colors.BLUE} label={this.props._t('etherscan')} onClick={() => {this.handleGoToEtherScan(this.state.currentTxn.txn_hash)}}/>

        </form>
      </div>
    }
  }

  render() {
    return (
      <div className="txn-bar__wrapper">
        {/* Case Tab Closed */}
        {this.state.toggleVar === ToggleTxnBar.MINIMIZE && this.state.currentTxn.status &&
        <div className="txn-bar-minimize__container">
          <a className="item" onClick={this.handleToggle}>
            <i className="icon diamond"/> {this.props._t('transaction')}
          </a>
        </div>}

        {this.state.toggleVar === ToggleTxnBar.MAXIMIZE && this.state.currentTxn.status &&
        <div className="txn-bar-maximize__container">
          <SubBgr position={SubBgr.positions.RIGHT} color={SubBgr.colors.BLUE}/>
          <i className="fas fa-times" onClick={this.handleClose}></i>
          {/* <div className="top-menu__container">
            <a className="item active" onClick={this.handleToggle}>
              <i className="minus icon"/>
            </a>
          </div> */}
          {
            this.renderContent()
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
      currentTxn: GetTxn(txnStore),
    }
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TxnBar);
