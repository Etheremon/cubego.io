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

function findFunctionByHash(hashes, functionHash) {
  for (var i=0; i<hashes.length; i++) {
    if (hashes[i].hash.substring(0, 10) === functionHash.substring(0, 10))
      return hashes[i].name;
  }
}
