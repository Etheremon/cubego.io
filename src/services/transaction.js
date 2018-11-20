import {URLS} from "../constants/general";
import * as Utils from "../utils/utils";
import {CubegonApi} from "./api/cubegonApi";


function defaultCallbackFunction(code, data, callback, successCallback, failedCallback) {
  switch (code) {
    case window.RESULT_CODE.SUCCESS:
      callback({...data, 'txn_hash': (data || {})['txn_hash']});
      successCallback && successCallback(data);
      break;
    case window.RESULT_CODE.NO_ACCOUNT_DETECTED:
      callback({...data, 'txn_data': data});
      failedCallback && failedCallback(data);
      break;
    default:
      callback({'err': (data || {'error': 'unknown error'})['error']});
      failedCallback && failedCallback(data);
  }
}

function apiCallbackFunction(response, error, callback, successCallback, failedCallback) {
  if (error) {
    callback(error);
    failedCallback && failedCallback(error);
  } else {
    callback(response);
    successCallback && successCallback(response);
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
        text: _t(`item`), value: _t(name), readonly: true, type: 'text',
      },
      quantity: {
        text: _t(`quantity`), value: numPacks, readonly: true, type: 'text',
      },
      amount: {
        text: _t(`price (${currency})`), value: amount, readonly: true, type: 'text',
      },
      extra: {
        address, numPacks, packId, amount, purchaseType,
      }
    },

    submitFunc: (obj, callback) => {
      // Validating Data

      // Sending Txn
      let cbFunc = (code, data) => defaultCallbackFunction(code, data, callback);

      if (obj.extra.purchaseType === PurchasePackage.types.PURCHASE_ULTIMATE_PACK_USING_ETH) {
        window.purchaseUltimatePack(obj.extra.numPacks, obj.extra.amount, cbFunc);
      } else if (obj.extra.purchaseType === PurchasePackage.types.PURCHASE_SINGLE_PACK_USING_EMONT) {
        window.purchaseSinglePackUsingEmont(obj.extra.packId, obj.extra.numPacks, obj.extra.address, obj.extra.amount, cbFunc);
      } else if (obj.extra.purchaseType === PurchasePackage.types.PURCHASE_SINGLE_PACK_USING_ETH) {
        window.purchaseSinglePack(obj.extra.packId, obj.extra.numPacks, obj.extra.amount, cbFunc);
      } else {
        window.purchaseUltimatePackUsingEmont(obj.extra.numPacks, obj.extra.address, obj.extra.amount, cbFunc);
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
};

export const RegisterModel = (dispatch, action, _t, {cubegon_name, cubegon_structure, cubegon_image, num_cubes, energy_limit, total_cost, address, successCallback, failedCallback, finishCallback}) => {
  let forceToSubmittingState, fields_order;
  let currentTimestamp = Utils.GetCurrentUnixTime();
  let messageToSign = `cubego-create-${currentTimestamp}`;

  if (window.isEtherAccountActive()) {
    // can sign automatically
    forceToSubmittingState = true;
    fields_order = ['name', 'cubes', 'energy', 'total_cost'];
  } else {
    // sign manually
    forceToSubmittingState = false;
    fields_order = ['name', 'cubes', 'energy', 'total_cost', 'message', 'signature'];
  }

  dispatch(action({
    title: _t('register_cubegon'),
    note: _t('register_cubegon_note'),
    title_done: _t('registering_cube'),
    txn_done: _t('register_cubegon_done'),
    follow_up_txt: _t('create_cubegon'),
    follow_up_action: () => {},
    fields_order,
    button: _t('register cubegon'),
    forceToSubmittingState,

    fields: {
      name: {
        text: _t(`cubegon name`), value: _t(cubegon_name), readonly: true, type: 'text',
      },
      cubes: {
        text: _t(`cubegoes`), value: num_cubes, readonly: true, type: 'text',
      },
      energy: {
        text: _t(`energy`), value: energy_limit, readonly: true, type: 'text',
      },
      total_cost: {
        text: _t(`total cost`), value: `${total_cost} ETH`, readonly: true, type: 'text',
      },
      message: {
        text: _t('txn.message_to_sign'), value: messageToSign, readonly: true, type: 'text',
      },
      signature: {
        text: _t('txn.signature_desc'), placeholder: _t('txn.signature_placeholder'), value: '', readonly: false, type: 'text',
      },
    },

    submitFunc: (obj, callback) => {
      // Validating Data

      // Sending Txn
      window.signMessage(messageToSign, address, (code, data) => {
        let signature;
        if (code === RESULT_CODE.SUCCESS) {
          signature = data.signature;
        } else if (code === RESULT_CODE.NO_ACCOUNT_DETECTED) {
          signature = obj.signature.value;
        } else {
          defaultCallbackFunction(code, data, callback, successCallback, failedCallback);
          return;
        }

        CubegonApi.RegisterCubegon({
          address: address,
          structure: cubegon_structure,
          name: cubegon_name,
          energy_limit: energy_limit,
          image: cubegon_image,
          timestamp: currentTimestamp,
          signature: signature,
        }).then(({response, error}) => apiCallbackFunction(response, error, callback, successCallback, failedCallback));
      });
    },
    onFinishCallback: (data) => {
      finishCallback && finishCallback(data);
    },

  }));
};

export const CreateModel = (dispatch, action, _t, {cubegon_name, num_cubes, txn_data, successCallback, failedCallback, finishCallback}) => {
  dispatch(action({
    title: _t('create_cubegon'),
    note: _t('create_cubegon_note'),
    title_done: _t('creating_cube'),
    txn_done: _t('creating_cubegon_done'),
    follow_up_txt: _t('check inventory'),
    follow_up_action: () => {history.push(`/${URLS.INVENTORY}`)},
    fields_order: ['name', 'cubes', 'energy', 'total_cost'],
    button: _t('create cubegon'),
    forceToSubmittingState: false,

    fields: {
      name: {
        text: _t(`cubegon name`), value: _t(cubegon_name), readonly: true, type: 'text',
      },
      cubes: {
        text: _t(`cubegoes`), value: num_cubes, readonly: true, type: 'text',
      },
      energy: {
        text: _t(`energy`), value: txn_data.energy_limit, readonly: true, type: 'text',
      },
      total_cost: {
        text: _t(`total cost`), value: `${txn_data.total_price} ETH`, readonly: true, type: 'text',
      },
    },

    submitFunc: (obj, callback) => {
      // Validating Data

      // Sending Txn
      let cbFunc = (code, data) => defaultCallbackFunction(code, data, callback);
      window.createCubegon(
        txn_data.ch, txn_data.cmt, txn_data.tmt, txn_data.energy_limit, txn_data.expiry_time,
        txn_data.v, txn_data.r, txn_data.s, txn_data.total_price, cbFunc);
    },
    onFinishCallback: function(data) {
      finishCallback && finishCallback(data);
    },

  }));
};
