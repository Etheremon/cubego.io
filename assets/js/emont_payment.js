/**
 * CubeGo
 * https://www.cubego.io/
 * Copyright 2018 CubeGo Team. All rights reserved.
 */

var EMONT_PAY_SERVICE_TYPE = {
  NONE: 0,
  FAST_HATCHING: 1,
  RANDOM_EGG: 2,
  ENERGY_TOPUP: 3,
  ADVENTURE: 4,
  CUBEGO: 5,
};

var CUBEGO_PAY_SERVICE_TYPE = {
  NONE: 0,
  PRESALE_SINGLE_PACK: 1,     // (p2, p3) = (pack_id, num_packs)
  PRESALE_ULTIMATE_PACK: 2,   // (p2) = (num_packs)
  CUBEGON_UPDATE_ENERGY: 3,   //
};


function payService(tokens, type, text, p1, p2, p3, p4, p5, p6, callbackFunc, customValue, customGas) {
  console.log("DEBUG_LOG|use_emont_pay_service|tokens,params=", tokens, p1, p2, p3, p4, p5, p6);
  callBlockchainFunction(
    contractInstances.emontInstance.payService,
    contractAddress.CUBEGO_EMONT_PAYMENT_ADDRESS,
    [calculateWeiFromEmont(tokens), type, text, p1, p2, p3, p4, p5, p6], callbackFunc,
    customValue || 0, customGas || 600000
  );
}