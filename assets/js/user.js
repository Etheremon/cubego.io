
function signMessage(message, address, callbackFunc) {
  if (isEtherAccountActive() && isValidEtherAddress(address)) {
    web3.personal.sign(web3.toHex(message), address, function(err, sig) {
      if (err) {
        callbackFunc(RESULT_CODE.ERROR_TXN_FAILED, {
          error: "Blockchain call failed" ,
          error_detail: err,
        });
      } else {
        callbackFunc(RESULT_CODE.SUCCESS, {
          address: address,
          message: message,
          signature: sig,
        })
      }
    });
  } else {
    callbackFunc(RESULT_CODE.NO_ACCOUNT_DETECTED, {});
  }
}