/**
 * CubeGo
 * https://www.cubego.io/
 * Copyright 2018 CubeGo Team. All rights reserved.
 */

// Global variables
var currentNetwork = '';
var isUsingTestNetwork = false;
var contractInstances = {};
var contractAddress = {};
var rpcConnected = null;
var hasWeb3Injected = null;
var account = undefined;


function initContractInstance(network) {
  if (!network) network = NETWORKS.mainnet;
  contractAddress = CONTRACTS[network];
  var instances = {};
  instances.emontInstance = getContractInstance(contractAddress.EMONT_ABI_ARRAY, contractAddress.EMONT_ADDRESS);
  instances.cubegoPresaleInstance = getContractInstance(contractAddress.CUBEGO_PRESALE_ABI_ARRAY, contractAddress.CUBEGO_PRESALE_ADDRESS);
  instances.cubegoEmontPaymentInstance = getContractInstance(contractAddress.CUBEGO_EMONT_PAYMENT_ABI_ARRAY, contractAddress.CUBEGO_EMONT_PAYMENT_ADDRESS);
  instances.cubegoCoreInstance = getContractInstance(contractAddress.CUBEGO_CORE_ABI_ARRAY, contractAddress.CUBEGO_CORE_ADDRESS);
  instances.cubegonNftInstance = getContractInstance(contractAddress.CUBEGO_NFT_ABI_ARRAY, contractAddress.CUBEGO_NFT_ADDRESS);
  instances.cubegonBuilderInstance = getContractInstance(contractAddress.CUBEGON_BUILDER_ABI_ARRAY, contractAddress.CUBEGON_BUILDER_ADDRESS);

  instances.cubegoDiamondInstance = getContractInstance(contractAddress.CUBEGO_ERC20_DIAMOND_ARRAY, contractAddress.CUBEGO_ERC20_DIAMOND_ADDRESS);
  instances.cubegoGoldInstance = getContractInstance(contractAddress.CUBEGO_ERC20_GOLD_ARRAY, contractAddress.CUBEGO_ERC20_GOLD_ADDRESS);
  instances.cubegoIceInstance = getContractInstance(contractAddress.CUBEGO_ERC20_ICE_ARRAY, contractAddress.CUBEGO_ERC20_ICE_ADDRESS);
  instances.cubegoSilverInstance = getContractInstance(contractAddress.CUBEGO_ERC20_SILVER_ARRAY, contractAddress.CUBEGO_ERC20_SILVER_ADDRESS);
  instances.cubegoIronInstance = getContractInstance(contractAddress.CUBEGO_ERC20_IRON_ARRAY, contractAddress.CUBEGO_ERC20_IRON_ADDRESS);
  instances.cubegoStoneInstance = getContractInstance(contractAddress.CUBEGO_ERC20_STONE_ARRAY, contractAddress.CUBEGO_ERC20_STONE_ADDRESS);
  instances.cubegoWoodInstance = getContractInstance(contractAddress.CUBEGO_ERC20_WOOD_ARRAY, contractAddress.CUBEGO_ERC20_WOOD_ADDRESS);
  instances.cubegoBrickInstance = getContractInstance(contractAddress.CUBEGO_ERC20_BRICK_ARRAY, contractAddress.CUBEGO_ERC20_BRICK_ADDRESS);
  instances.cubegoLeafInstance = getContractInstance(contractAddress.CUBEGO_ERC20_LEAF_ARRAY, contractAddress.CUBEGO_ERC20_LEAF_ADDRESS);
  instances.cubegoFurInstance = getContractInstance(contractAddress.CUBEGO_ERC20_FUR_ARRAY, contractAddress.CUBEGO_ERC20_FUR_ADDRESS);
  instances.cubegoPaperInstance = getContractInstance(contractAddress.CUBEGO_ERC20_PAPER_ARRAY, contractAddress.CUBEGO_ERC20_PAPER_ADDRESS);

  return instances;
}

function getContractInstance(contractData, contractAddress) {
  return contractData && contractAddress ? web3.eth.contract(contractData).at(contractAddress) : null;
}

// init the connection and create contract
window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);

    setInterval(function() {
      if ((window.web3.eth['accounts'][0] || null) !== account) {
        account = window.web3.eth['accounts'][0] || null;
        if (account) web3.eth.defaultAccount = account;
        console.log("INFO_LOG|update_account_info|account=" + account);
      }
    }, 500);

    web3.version.getNetwork(function(err, netId) {
      switch (netId) {
        case "1":
          currentNetwork = NETWORKS.mainnet;
          isUsingTestNetwork = false;
          contractInstances = initContractInstance(currentNetwork);
          console.log('INFO_LOG|running_on_main_net.');
          break;
        case "2":
          currentNetwork = NETWORKS.unknown;
          console.log('INFO_LOG|running_on_deprecated_test_network.');
          break;
        case "3":
          currentNetwork = NETWORKS.ropsten;
          contractInstances = initContractInstance(currentNetwork);
          console.log('INFO_LOG|running_on_ropsten_net.');
          break;
        case "4":
          currentNetwork = NETWORKS.rinkeby;
          isUsingTestNetwork = true;
          contractInstances = initContractInstance(currentNetwork);
          console.log('INFO_LOG|running_on_rinkeby_net.');
          break;
        case "42":
          currentNetwork = NETWORKS.kovan;
          contractInstances = initContractInstance(currentNetwork);
          console.log('INFO_LOG|running_on_kovan_net.');
          break;
        default:
          currentNetwork = NETWORKS.unknown;
          console.log('INFO_LOG|running_on_unknown_network.' + netId);
      }
    });

    rpcConnected = true;
    hasWeb3Injected = true;
  } else {
    window.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/vZmCD1X42dFUlLRd2BtV"));
    console.log("INFO_LOG|using_web_api");
    hasWeb3Injected = false;
    account = null;
    currentNetwork = NETWORKS.mainnet;
    // currentNetwork = NETWORKS.rinkeby;
    isUsingTestNetwork = true;
    contractInstances = initContractInstance(currentNetwork);
    rpcConnected = true;
  }
});

