import {URLS} from "../constants/general";


function defaultCallbackFunction(code, data) {
  switch (code) {
    case window.RESULT_CODE.SUCCESS:
      this.callback({...data, 'txn_hash': (data || {})['txn_hash']});
      break;
    case window.RESULT_CODE.NO_ACCOUNT_DETECTED:
      this.callback({...data, 'txn_data': data});
      break;
    default:
      this.callback({'err': data['error']});
  }
}

export const PurchasePackage = (dispatch, action, _t, {name, address, numPacks, packId, amount, purchaseType, currency, history}, finishCallback) => {
  dispatch(action({
    title: _t('purchase_cube'),
    note: '',
    title_done: _t('purchasing_cube'),
    txn_done: _t('purchase_cube_done'),
    follow_up_txt: _t('check inventory'),
    follow_up_action: () => {history.push(`/${URLS.INVENTORY}`)},
    fields_order: ['name', 'quantity', 'amount'],
    button: _t('purchase'),
    forceToSubmittingState: true,

    fields: {
      name: {
        text: _t(`item`),
        value: _t(name),
        readonly: true,
        type: 'text',
      },
      quantity: {
        text: _t(`quantity`),
        value: numPacks,
        readonly: true,
        type: 'text',
      },
      amount: {
        text: _t(`price (${currency})`),
        value: amount,
        readonly: true,
        type: 'text',
      },
      extra: {
        address, numPacks, packId, amount, purchaseType,
      }
    },

    submitFunc: function(obj, callback) {
      // Validating Data

      // Bind callback
      this.callback = callback;

      // Sending Txn
      if (obj.extra.purchaseType === PurchasePackage.types.PURCHASE_ULTIMATE_PACK_USING_ETH) {
        window.purchaseUltimatePack(obj.extra.numPacks, obj.extra.amount, defaultCallbackFunction.bind(this));
      } else if (obj.extra.purchaseType === PurchasePackage.types.PURCHASE_SINGLE_PACK_USING_EMONT) {
        window.purchaseSinglePackUsingEmont(obj.extra.packId, obj.extra.numPacks, obj.extra.address, obj.extra.amount, defaultCallbackFunction.bind(this));
      } else if (obj.extra.purchaseType === PurchasePackage.types.PURCHASE_SINGLE_PACK_USING_ETH) {
        window.purchaseSinglePack(obj.extra.packId, obj.extra.numPacks, obj.extra.amount, defaultCallbackFunction.bind(this));
      } else {
        window.purchaseUltimatePackUsingEmont(obj.extra.numPacks, obj.extra.address, obj.extra.amount, defaultCallbackFunction.bind(this));
      }
    },
    onFinishCallback: function(data) {
      finishCallback && finishCallback(data);
    },

  }));
};

PurchasePackage.types = {
  PURCHASE_SINGLE_PACK_USING_ETH: 'purchase_single_pack',
  PURCHASE_SINGLE_PACK_USING_EMONT: 'purchase_single_pack_using_emont',
  PURCHASE_ULTIMATE_PACK_USING_ETH: 'purchase_ultimate_pack',
  PURCHASE_ULTIMATE_PACK_USING_EMONT: 'purchase_ultimate_pack_using_emont',
}