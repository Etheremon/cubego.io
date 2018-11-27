import {URLS} from "../constants/general";
import * as Utils from "../utils/utils";
import {CubegonApi} from "./api/cubegonApi";
import { ENERGY_LIMIT_PRICE } from "../constants/cubegon";


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

export const SubmitModel = (dispatch, action, _t, {cubegon_name, cubegon_structure, cubegon_image, num_cubes, energy_limit, total_cost, address, successCallback, failedCallback, finishCallback}) => {
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
    title: _t('submit_cubegon'),
    note: _t('submit_cubegon_note'),
    title_done: _t('submitting_cube'),
    txn_done: _t('submit_cubegon_done'),
    follow_up_txt: _t('register_cubegon'),
    follow_up_action: () => {},
    fields_order,
    button: _t('submit cubegon'),
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

export const UpdateCubegonName = (dispatch, action, _t, {cubegon_name, address, id, tokenId, successCallback, failedCallback, finishCallback}) => {
  let forceToSubmittingState, fields_order;
  let messageToSign = `${id}-${''}`;

  if (window.isEtherAccountActive()) {
    // can sign automatically
    forceToSubmittingState = false;
    fields_order = ['id', 'old_name', 'name'];
  } else {
    // sign manually
    forceToSubmittingState = false;
    fields_order = ['id', 'old_name', 'name', 'message', 'signature'];
  }

  dispatch(action({
    title: _t('update_cubegon'),
    note: _t('update_cubegon_note'),
    title_done: _t('updating_name'),
    txn_done: _t('update_cubegon_done'),
    follow_up_txt: _t('create_cubegon'),
    follow_up_action: () => {},
    fields_order,
    button: _t('update cubegon'),
    forceToSubmittingState,

    fields: {
      id: {
        text: _t(`cubegon id`), value: tokenId, readonly: true, type: 'text',
      },
      old_name: {
        text: _t(`cubegon old name`), value: cubegon_name, readonly: true, type: 'text',
      },
      name: {
        text: _t(`cubegon new name`), value: "", placeholder: _t('give me a name'), readonly: false, type: 'text',
      },
      message: {
        text: _t('txn.message_to_sign'), value: messageToSign, readonly: true, type: 'text',
        onUpdate: (fields) => (`${fields.id.value}-${fields.name.value}`),
      },
      signature: {
        text: _t('txn.signature_desc'), placeholder: _t('txn.signature_placeholder'), value: '', readonly: false, type: 'text',
      },
    },

    submitFunc: (obj, callback) => {
      // Validating Data

      // Sending Txn
      window.signMessage(obj.message.value, address, (code, data) => {
        let signature;
        if (code === RESULT_CODE.SUCCESS) {
          signature = data.signature;
        } else if (code === RESULT_CODE.NO_ACCOUNT_DETECTED) {
          signature = obj.signature.value;
        } else {
          defaultCallbackFunction(code, data, callback, successCallback, failedCallback);
          return;
        }

        CubegonApi.UpdateCubegonName({
          id: id,
          name: cubegon_name,
          signature: signature,
        }).then(({response, error}) => apiCallbackFunction(response, error, callback, successCallback, failedCallback));
      });
    },
    onFinishCallback: (data) => {
      finishCallback && finishCallback(data);
    },

  }));
};

export const RegisterModelToBlockchain = (dispatch, action, _t, {retrying, cubegon_name, num_cubes, txn_data, history, successCallback, failedCallback, finishCallback}) => {
  dispatch(action({
    title: retrying ? _t('re-register_cubegon') : _t('register_cubegon'),
    note: retrying ? _t('re-register_cubegon_note') : _t('register_cubegon_note'),
    title_done: _t('registering_cube'),
    txn_done: _t('register_cubegon_done'),
    follow_up_txt: _t('check inventory'),
    follow_up_action: () => {history.push(`/${URLS.INVENTORY}?tab=cubegons`)},
    fields_order: ['name', 'cubes', 'energy', 'total_cost'],
    button: retrying ? _t('re-register_cubegon') : _t('register_cubegon'),
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

export const DeleteModel = (dispatch, action, _t, {tokenId, successCallback, failedCallback, finishCallback}) => {
  dispatch(action({
    title: _t('delete_cubegon'),
    note: _t('delete_cubegon_note'),
    title_done: _t('deleting_cube'),
    txn_done: _t('detele_cubegon_done'),
    follow_up_txt: _t('check inventory'),
    follow_up_action: () => {history.push(`/${URLS.INVENTORY}`)},
    fields_order: ['tokenid'],
    button: _t('delete cubegon'),
    forceToSubmittingState: true,

    fields: {
      tokenid: {
        text: _t('token_id'), value: tokenId, readonly: true, type: 'text',
      },
    },

    submitFunc: (obj, callback) => {
      // Validating Data

      // Sending Txn
      let cbFunc = (code, data) => defaultCallbackFunction(code, data, callback);
      window.destroyCubegon(
        tokenId, cbFunc
      );
    },
    onFinishCallback: function(data) {
      finishCallback && finishCallback(data);
    },

  }));
};

export const UpdateCubegonEnergy = (dispatch, action, _t, {tokenId, energyLimit, successCallback, failedCallback, finishCallback}) => {
  dispatch(action({
    title: _t('top_up_energy'),
    note: _t('top_up_energy_note'),
    title_done: _t('topping_up_energy'),
    txn_done: _t('top_up_energy_done'),
    follow_up_action: () => {},
    fields_order: ['tokenid', 'energyList'],
    button: _t('top up energy'),
    forceToSubmittingState: false,
    fields: {
      tokenid: {
        text: _t('token_id'), value: tokenId, readonly: true, type: 'text',
      },
      energyList: {
        text: _t('energy'),
        options: Object.keys(ENERGY_LIMIT_PRICE).filter((k) => k > energyLimit).map(item => {content: item}),
        type: 'dropdown',
      },
    },

    submitFunc: (obj, callback) => {
      // Validating Data

      // Sending Txn
      let cbFunc = (code, data) => defaultCallbackFunction(code, data, callback);
      window.destroyCubegon(
        tokenId, cbFunc
      );
    },
    onFinishCallback: function(data) {
      finishCallback && finishCallback(data);
    },

  }));
};
