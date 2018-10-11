/**
 * CubeGo
 * https://www.cubego.io/
 * Copyright 2018 CubeGo Team. All rights reserved.
 */

function isEtherAccountActive() {
  return (account !== null && account !== undefined)
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function isValidEtherAddress(address) {
  return web3.isAddress(address);
}


function convertObjToEther(value) {
  return (typeof(value) === "object" || value > 0)
    ? Number(web3.fromWei(value, 'ether')) : value;
}

function callFuncWithRpcCheck(func) {
  let intervalId = null;
  let checkRPCLoaded = function() {
    if (rpcConnected != null) {
      func();
      clearInterval(intervalId);
    }
  };
  intervalId = setInterval(checkRPCLoaded, 1000);
}

function getFunctionHashes(abi) {
  let hashes = [];
  for (let i=0; i<abi.length; i++) {
    let item = abi[i];
    if (item.type !== "function") continue;
    let signature = item.name + "(" + item.inputs.map(function(input) {return input.type;}).join(",") + ")";
    let hash = web3.sha3(signature);
    hashes.push({name: item.name, hash: hash});
  }
  return hashes;
}

function findFunctionByHash(hashes, functionHash) {
  for (let i=0; i<hashes.length; i++) {
    if (hashes[i].hash.substring(0, 10) === functionHash.substring(0, 10))
      return hashes[i].name;
  }
}
