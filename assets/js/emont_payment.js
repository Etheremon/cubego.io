/**
 * CubeGo
 * https://www.cubego.io/
 * Copyright 2018 CubeGo Team. All rights reserved.
 */

var PAY_SERVICE_TYPE = {
  NONE: 0,
  PRESALE_SINGLE_PACK: 1,     // (p2, p3) = (pack_id, num_packs)
  PRESALE_ULTIMATE_PACK: 2,   // (p2) = (num_packs)
  CUBEGON_UPDATE_ENERGY: 3,   //
};

// p1 is the PAY_SERVICE_TYPE, (p2, p3, p4) are defined above
function payService(address, tokens, p1, p2, p3, p4, callbackFunc, customValue, customGas) {
  console.log("DEBUG_LOG|use_emont_pay_service|address,tokens,params=", address, tokens, p1, p2, p3, p4);
  callBlockchainFunction(
    contractInstances.cubegoEmontPaymentInstance.payService,
    contractAddress.CUBEGO_EMONT_PAYMENT_ADDRESS,
    [address, tokens, p1, p2, p3, p4], callbackFunc,
    customValue || 0, customGas || 600000
  );
}