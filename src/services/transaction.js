


function defaultCallbackFunction(code, data) {
  console.log('create transaction')
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

export const PurchasePackage = (dispatch, action, _t, address, numPacks, packId, amount, purchaseType, currency, finishCallback) => {
  dispatch(action({
    title: _t('confirm_purchase'),
    content: _t(`${numPacks} pack(s)`),
    note: _t('note_purchase_pack'),
    title_done: _t('already_purchase'),
    fields_order: ['amount'],
    button: _t('purchase'),
    forceToSubmittingState: true,
    fields: {
      amount: {
        text: _t(`amount (${currency})`),
        value: amount,
        readonly: false,
        type: 'text',
      },
      extra: {
        address, numPacks, packId, amount, purchaseType, purchaseType
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
}

PurchasePackage.types = {
  PURCHASE_SINGLE_PACK_USING_ETH: 'purchase_single_pack',
  PURCHASE_SINGLE_PACK_USING_EMONT: 'purchase_single_pack_using_emont',
  PURCHASE_ULTIMATE_PACK_USING_ETH: 'purchase_ultimate_pack',
  PURCHASE_ULTIMATE_PACK_USING_EMONT: 'purchase_ultimate_pack_using_emont',
}