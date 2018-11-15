/**
 * CubeGo
 * https://www.cubego.io/
 * Copyright 2018 CubeGo Team. All rights reserved.
 */

function isEtherAccountActive() {
  return (account !== null && account !== undefined)
}

function sleep (time) {
  return new Promise(function(resolve) {return setTimeout(resolve, time)});
}

function isValidEtherAddress(address) {
  return web3.isAddress(address);
}


function convertObjToEther(value) {
  return (typeof(value) === "object" || value > 0)
    ? Number(web3.fromWei(value, 'ether')) : value;
}

function callFuncWithRpcCheck(func) {
  var intervalId = null;
  var checkRPCLoaded = function() {
    if (rpcConnected != null) {
      func();
      clearInterval(intervalId);
    }
  };
  intervalId = setInterval(checkRPCLoaded, 1000);
}

function getFunctionHashes(abi) {
  var hashes = [];
  for (var i=0; i<abi.length; i++) {
    var item = abi[i];
    if (item.type !== "function") continue;
    var signature = item.name + "(" + item.inputs.map(function(input) {return input.type;}).join(",") + ")";
    var hash = web3.sha3(signature);
    hashes.push({name: item.name, hash: hash});
  }
  return hashes;
}

function calculateWeiFromEth(val) {
  return web3 && web3.toWei ? web3.toWei(val, "ether") : val * Math.pow(10, 8);
}

function calculateWeiFromEmont(val) {
  return val * Math.pow(10, 18);
}

function findFunctionByHash(hashes, functionHash) {
  for (var i=0; i<hashes.length; i++) {
    if (hashes[i].hash.substring(0, 10) === functionHash.substring(0, 10))
      return hashes[i].name;
  }
}

// value in wei
function callBlockchainFunction(contractInstance, contractAddress, args, callbackFunc, value, gas) {
  if (isEtherAccountActive()) {
    contractInstance.apply(null, args.concat({value: calculateWeiFromEth(value), gas: gas}).concat(function(err, txn_hash) {
      if (err) {
        console.log("ERROR_LOG|make_txn_failed|error=", err);
        callbackFunc(RESULT_CODE.ERROR_SERVER, {"error": "Blockchain transaction fail!!"});
      } else {
        callbackFunc(RESULT_CODE.SUCCESS, {"txn_hash": txn_hash})
      }
    }));
  } else {
    callbackFunc(RESULT_CODE.NO_ACCOUNT_DETECTED, {
      "txn_data": contractInstance.getData.apply(null, args),
      "address": contractAddress,
      "amount": value, "gas": gas});
  }
}
