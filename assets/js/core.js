/**
 * Etheremon
 * https://www.etheremon.com/
 * Copyright 2017 Etheremon Team. All rights reserved.
 */

// Global variables
let currentNetwork = '';
let contractInstances = {};
let rpcConnected = null;
let hasWeb3Injected = null;
let account = undefined;


function initContractInstance(network=NETWORKS.mainnet) {
  let contracts = CONTRACTS[network];
  let instances = {};
  instances.etheremonDataInstance = getContractInstance(CONTRACTS_DATA.ETHEREMON_DATA_ABI_ARRAY, contracts.ETHEREMON_DATA_ADDRESS);
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

    web3.version.getNetwork((err, netId) => {
      switch (netId) {
        case "1":
          currentNetwork = NETWORKS.mainnet;
          contractInstances = initContractInstance(currentNetwork);
          console.log('INFO_LOG|running_on_main_net.');
          break;
        case "2":
          console.log('INFO_LOG|running_on_deprecated_test_network.');
          break;
        case "3":
          currentNetwork = NETWORKS.ropsten;
          contractInstances = initContractInstance(currentNetwork);
          console.log('INFO_LOG|running_on_ropsten_net.');
          break;
        case "4":
          currentNetwork = NETWORKS.rinkeby;
          contractInstances = initContractInstance(currentNetwork);
          console.log('INFO_LOG|running_on_rinkeby_net.');
          break;
        case "42":
          currentNetwork = NETWORKS.kovan;
          contractInstances = initContractInstance(currentNetwork);
          console.log('INFO_LOG|running_on_kovan_net.');
          break;
        default:
          console.log('INFO_LOG|running_on_unknown_network.' + netId);
      }
    });

    rpcConnected = true;
    hasWeb3Injected = true;
  } else {
    window.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/vZmCD1X42dFUlLRd2BtV"));
    console.log("INFO_LOG|using_web_api");
    rpcConnected = true;
    hasWeb3Injected = false;
    account = null;
    currentNetwork = NETWORKS.mainnet;
    contractInstances = initContractInstance(currentNetwork);
  }
});

