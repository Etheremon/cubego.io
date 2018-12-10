import {URLS} from "../constants/general";
import * as Utils from "../utils/utils";
import {CubegonApi} from "./api/cubegonApi";
import { ENERGY_LIMIT_PRICE } from "../constants/cubegon";
import {VerifyLength} from "../utils/logicUtils";


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
    callback({'err': error['error_message'] || 'unknown error'});
    failedCallback && failedCallback(error);
  } else {
    callback({...response, api_success: true});
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
      if (!VerifyLength(obj.name.value, 4, 32)) {
        callback({'err': _t('err.invalid_cubegon_name', {from: 4, to: 32})});
        return;
      }

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
    title_done: _t('updating_name'),
    txn_done: _t('update_cubegon_done'),
    follow_up_txt: _t('create_cubegon'),
    follow_up_action: () => {},
    fields_order,
    button: _t('update cubegon'),
    forceToSubmittingState,

    fields: {
      id: {
        text: _t(`cubegon id`), value: id, readonly: true, type: 'text',
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
      if (!VerifyLength(obj.name.value, 4, 32)) {
        callback({'err': _t('err.invalid_cubegon_name', {from: 4, to: 32})});
        return;
      }

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
          id: parseInt(id),
          name: obj.name.value,
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

export const DeleteModel = (dispatch, action, _t, {tokenId, name, successCallback, failedCallback, finishCallback}) => {
  dispatch(action({
    title: _t('delete_cubegon'),
    note: _t('delete_cubegon_note'),
    title_done: _t('deleting_cube'),
    txn_done: _t('delete_cubegon_done'),
    follow_up_txt: _t('check inventory'),
    follow_up_action: () => {history.push(`/${URLS.INVENTORY}`)},
    fields_order: ['name', 'tokenid'],
    button: _t('delete_cubegon'),
    forceToSubmittingState: true,

    fields: {
      name: {
        text: _t('cubegon name'), value: name, readonly: true, type: 'text',
      },
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

export const UpdateCubegonEnergy = (dispatch, action, _t, {name, tokenId, energyLimit, successCallback, failedCallback, finishCallback}) => {
  dispatch(action({
    title: _t('boost_energy'),
    note: _t('boost_energy_note'),
    title_done: _t('boosting_up_energy'),
    txn_done: _t('boost_energy_done'),
    fields_order: ['name', 'current', 'energyList'],
    button: _t('top up energy'),
    forceToSubmittingState: false,
    fields: {
      name: {
        text: _t('cubegon'), value: name, readonly: true, type: 'text',
      },
      current: {
        text: _t('current energy limit'), value: energyLimit, readonly: true, type: 'text',
      },
      energyList: {
        text: _t('new energy limit'),
        options: Object.keys(ENERGY_LIMIT_PRICE).filter((k) => k > energyLimit).map(item => { return {content: `${item} (${ENERGY_LIMIT_PRICE[item]} ETH)`, value: item} }),
        type: 'dropdown',
        emptyOption: _t('energy_already_max'),
      },
    },

    submitFunc: (obj, callback) => {
      // Validating Data
      if (obj.energyList.value === undefined || obj.energyList.value === '') {
        callback({'err': 'err.energy_cannot_be_blank'});
        return;
      }
      

      // Sending Txn
      let cbFunc = (code, data) => defaultCallbackFunction(code, data, callback);
      window.updateCubegonEnergy(
        tokenId, obj.energyList.value, ENERGY_LIMIT_PRICE[obj.energyList.value], cbFunc
      );
    },
    onFinishCallback: function(data) {
      finishCallback && finishCallback(data);
    },

  }));
};

export const TransferCubegon = (dispatch, action, _t, {name, fromAdd, token_id, successCallback, failedCallback, finishCallback}) => {
  dispatch(action({
    title: _t('transfer_cubegon'),
    note: _t('transfer_cubegon_note'),
    title_done: _t('transferring_cubegon'),
    txn_done: _t('transfer_cubegon_done'),
    fields_order: ['name', 'cubegon_id', 'to_add'],
    button: _t('transfer'),
    forceToSubmittingState: false,
    fields: {
      name: {
        text: _t('cubegon'), value: name, readonly: true, type: 'text',
      },
      cubegon_id: {
        text: _t('cubegon id'), value: token_id, readonly: true, type: 'text',
      },
      to_add: {
        text: _t('receiver address'), value: '', readonly: false, type: 'text',
      },
    },

    submitFunc: (obj, callback) => {
      // Validating Data
      if (obj.to_add.value === undefined || obj.to_add.value === '' || !window.isValidEtherAddress(obj.to_add.value)) {
        callback({'err': 'err.invalid_receiver'});
        return;
      }

      // Sending Txn
      let cbFunc = (code, data) => defaultCallbackFunction(code, data, callback);
      window.transferCubegon(fromAdd, obj.to_add.value, token_id, cbFunc);
    },
    onFinishCallback: function(data) {
      finishCallback && finishCallback(data);
    },

  }));
};

export const ClaimAirDrop = (dispatch, action, _t, {userId, name, successCallback, failedCallback, finishCallback}) => {
  dispatch(action({
    title: _t('claim_air_drop'),
    note: _t('claim_air_drop_note'),
    title_done: _t('claiming_air_drop'),
    txn_done: _t('claim_air_drop_done'),
    fields_order: ['name'],
    button: _t('claim'),
    forceToSubmittingState: false,
    fields: {
      name: {
        text: _t('name'), value: name, readonly: true, type: 'text',
      },
    },

    submitFunc: (obj, callback) => {
      // Validating Data

      // Sending Txn
      let cbFunc = (code, data) => defaultCallbackFunction(code, data, callback);
      window.claimAirDropReward(cbFunc);
    },
    onFinishCallback: function(data) {
      finishCallback && finishCallback(data);
    },

  }));
};

export const TransferMaterialCube = (dispatch, action, _t, {cubeName, fromAdd, numCubes, successCallback, failedCallback, finishCallback}) => {
  dispatch(action({
    title: _t('transfer_cubego'),
    note: _t('transfer_cubego_note'),
    title_done: _t('transferring_cubego'),
    txn_done: _t('transfer_cubego_done'),
    fields_order: ['name', 'available_amount', 'to_add', 'transfer_amount'],
    button: _t('transfer'),
    forceToSubmittingState: false,
    fields: {
      name: {
        text: _t('cubego'), value: _t(cubeName), readonly: true, type: 'text',
      },
      available_amount: {
        text: _t('total amount'), value: numCubes, readonly: true, type: 'text',
      },
      to_add: {
        text: _t('receiver address'), value: '', readonly: false, type: 'text',
      },
      transfer_amount: {
        text: _t('transfer amount'), value: 0, readonly: false, type: 'number', min: 1, max: numCubes,
      },
    },

    submitFunc: (obj, callback) => {
      // Validating Data
      if (obj.to_add.value === undefined || obj.to_add.value === '' || !window.isValidEtherAddress(obj.to_add.value)) {
        callback({'err': 'err.invalid_receiver'});
        return;
      }
      if (!obj.transfer_amount.value || obj.transfer_amount.value <= 0 || obj.transfer_amount.value > numCubes) {
        callback({'err': 'err.invalid_transfer_amount'});
        return;
      }
      if (obj.to_add.value === fromAdd) {
        callback({'err': 'err.transfer_to_owner'});
        return;
      }

      // Sending Txn
      let cbFunc = (code, data) => defaultCallbackFunction(code, data, callback);
      window.transferCubego(cubeName, fromAdd, obj.to_add.value, obj.transfer_amount.value, cbFunc);
    },
    onFinishCallback: function(data) {
      finishCallback && finishCallback(data);
    },

  }));
};