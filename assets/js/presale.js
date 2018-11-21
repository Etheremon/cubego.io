/**
 * CubeGo
 * https://www.cubego.io/
 * Copyright 2018 CubeGo Team. All rights reserved.
 */

function purchaseSinglePack(packId, numPacks, valueToSend, callbackFunc) {
  console.log("DEBUG_LOG|purchase_single_pack|pack_id,num_pack,value_to_send=", packId, numPacks, valueToSend);
  callBlockchainFunction(
    contractInstances.cubegoPresaleInstance.buySinglePack,
    contractAddress.CUBEGO_PRESALE_ADDRESS,
    [packId, numPacks], callbackFunc,
    valueToSend, 600000
  );
}

function purchaseSinglePackUsingEmont(packId, numPacks, receiverAddress, valueToSendInEmont, callbackFunc) {
  console.log("DEBUG_LOG|purchase_single_pack_using_EMONT|pack_id,num_pack,value_to_send=", packId, numPacks, valueToSendInEmont);
  payService(
    valueToSendInEmont, EMONT_PAY_SERVICE_TYPE.CUBEGO, "",
    CUBEGO_PAY_SERVICE_TYPE.PRESALE_SINGLE_PACK, packId, numPacks, 0, 0, 0, callbackFunc
  );
}

function purchaseUltimatePack(numPacks, valueToSend, callbackFunc) {
  console.log("DEBUG_LOG|purchase_ultimate_pack|pack_id,num_pack=", numPacks);
  callBlockchainFunction(
    contractInstances.cubegoPresaleInstance.buyUltimatePack,
    contractAddress.CUBEGO_PRESALE_ADDRESS,
    [numPacks], callbackFunc,
    valueToSend, 600000
  );
}

function purchaseUltimatePackUsingEmont(numPacks, receiverAddress, valueToSendInEmont, callbackFunc) {
  console.log("DEBUG_LOG|purchase_ultimate_pack_using_EMONT|num_pack,value_to_send=", numPacks, valueToSendInEmont);
  payService(
    valueToSendInEmont, EMONT_PAY_SERVICE_TYPE.CUBEGO, "",
    CUBEGO_PAY_SERVICE_TYPE.PRESALE_ULTIMATE_PACK, numPacks, 0, 0, 0, 0, callbackFunc
  );
}

function getDiscountFactor(callbackFunc) {
  getBlockchainProperty(
    'cubegoPresaleInstance', 'discountFactor', function(code, data) {
      if (code !== RESULT_CODE.SUCCESS) callbackFunc(code, data);
      else callbackFunc(code, data.toNumber());
    }
  );
}