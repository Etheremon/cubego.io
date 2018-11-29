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

function createCubegon(ch, cmt, tmt, energyLimit, expiryTime, v, r, s, valueToSend, callbackFunc) {
  callBlockchainFunction(
    contractInstances.cubegonBuilderInstance.createCubegon,
    contractAddress.CUBEGON_BUILDER_ADDRESS,
    [ch, cmt, tmt, energyLimit, expiryTime, v, r, s], callbackFunc,
    valueToSend, 600000
  );
}

function destroyCubegon(tokenId, callbackFunc) {
  callBlockchainFunction(
    contractInstances.cubegonBuilderInstance.dismantleCubegon,
    contractAddress.CUBEGON_BUILDER_ADDRESS,
    [tokenId], callbackFunc,
    0, 600000
  );
}

function updateCubegonEnergy(tokenId, energyLimit, valueToSend, callbackFunc) {
  callBlockchainFunction(
    contractInstances.cubegonBuilderInstance.updateCubegonEnergyLimit,
    contractAddress.CUBEGON_BUILDER_ADDRESS,
    [tokenId, energyLimit], callbackFunc,
    valueToSend, 600000
  );
}

function transferCubegon(fromAdd, toAdd, tokenId, callbackFunc) {
  callBlockchainFunction(
    contractInstances.cubegonNftInstance.safeTransferFrom,
    contractAddress.CUBEGO_NFT_ADDRESS,
    [fromAdd, toAdd, tokenId], callbackFunc,
    0, 600000
  )
}

function transferCubego(material, fromAdd, toAdd, numCubes, callbackFunc) {
  var funcInstance, cAddress;
  switch (material) {
    case 'diamond':
      funcInstance = contractInstances.cubegoDiamondInstance.transfer;
      cAddress = contractAddress.CUBEGO_ERC20_DIAMOND_ADDRESS;
      break;
    case 'gold':
      funcInstance = contractInstances.cubegoGoldInstance.transfer;
      cAddress = contractAddress.CUBEGO_ERC20_GOLD_ADDRESS;
      break;
    case 'ice':
      funcInstance = contractInstances.cubegoIceInstance.transfer;
      cAddress = contractAddress.CUBEGO_ERC20_ICE_ADDRESS;
      break;
    case 'silver':
      funcInstance = contractInstances.cubegoSilverInstance.transfer;
      cAddress = contractAddress.CUBEGO_ERC20_SILVER_ADDRESS;
      break;
    case 'iron':
      funcInstance = contractInstances.cubegoIronInstance.transfer;
      cAddress = contractAddress.CUBEGO_ERC20_IRON_ADDRESS;
      break;
    case 'stone':
      funcInstance = contractInstances.cubegoStoneInstance.transfer;
      cAddress = contractAddress.CUBEGO_ERC20_STONE_ADDRESS;
      break;
    case 'wood':
      funcInstance = contractInstances.cubegoWoodInstance.transfer;
      cAddress = contractAddress.CUBEGO_ERC20_WOOD_ADDRESS;
      break;
    case 'brick':
      funcInstance = contractInstances.cubegoBrickInstance.transfer;
      cAddress = contractAddress.CUBEGO_ERC20_BRICK_ADDRESS;
      break;
    case 'leaf':
      funcInstance = contractInstances.cubegoLeafInstance.transfer;
      cAddress = contractAddress.CUBEGO_ERC20_LEAF_ADDRESS;
      break;
    case 'fur':
      funcInstance = contractInstances.cubegoFurInstance.transfer;
      cAddress = contractAddress.CUBEGO_ERC20_FUR_ADDRESS;
      break;
    case 'paper':
      funcInstance = contractInstances.cubegoPaperInstance.transfer;
      cAddress = contractAddress.CUBEGO_ERC20_PAPER_ADDRESS;
      break;
    default:
      callbackFunc(RESULT_CODE.ERROR_PARAMS, {})
  }

  callBlockchainFunction(
    funcInstance, cAddress,
    [toAdd, numCubes], callbackFunc,
    0, 600000
  )
}