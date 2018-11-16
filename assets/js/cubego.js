/**
 * CubeGo
 * https://www.cubego.io/
 * Copyright 2018 CubeGo Team. All rights reserved.
 */

function getPlayerCubegoData(address, callbackFunc) {
  var res = {
    materials: [],
    cubegons: [],
  };

  var numRequests = 1;
  var numResponses = 0;

  var collectResponse = function() {
    numResponses += 1;
    if (numResponses === numRequests) {
      callbackFunc(RESULT_CODE.SUCCESS, res)
    }
  };

  _getPlayerMaterials(address, function(code, data) {
    if (code !== RESULT_CODE.SUCCESS) callbackFunc(code, data);
    else {
      res.materials = data;
      collectResponse();
    }
  });
}

function _getPlayerMaterials(address, callbackFunc) {
  getBlockchainData(
    contractInstances.cubegoCoreInstance.getMyMaterials,
    [address], function(code, data) {
      if (code !== RESULT_CODE.SUCCESS) callbackFunc(code, data);
      else {
        var res = [{material_id: 0, amount: 0, pending_amount: 0}];
        for (var i = 2; i <= 12; i++) {
          res.push({material_id: i, amount: data[i].toNumber(), pending_amount: 0});
        }
        callbackFunc(code, res);
      }
    }
  );
}