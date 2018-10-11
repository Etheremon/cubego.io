/**
 * CubeGo
 * https://www.cubego.io/
 * Copyright 2018 CubeGo Team. All rights reserved.
 */

const NETWORKS = {
  mainnet: 'mainnet',
  rinkeby: 'rinkeby',
  ropsten: 'ropsten',
  kovan: 'kovan',
};

const CONTRACTS_DATA = {
  ETHEREMON_DATA_ABI_ARRAY: [{"constant":true,"inputs":[{"name":"","type":"uint32"}],"name":"monsterClass","outputs":[{"name":"classId","type":"uint32"},{"name":"price","type":"uint256"},{"name":"returnPrice","type":"uint256"},{"name":"total","type":"uint32"},{"name":"catchable","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_objId","type":"uint64"}],"name":"getMonsterObj","outputs":[{"name":"objId","type":"uint64"},{"name":"classId","type":"uint32"},{"name":"trainer","type":"address"},{"name":"exp","type":"uint32"},{"name":"createIndex","type":"uint32"},{"name":"lastClaimIndex","type":"uint32"},{"name":"createTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_objId","type":"uint64"}],"name":"getMonsterName","outputs":[{"name":"name","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_type","type":"uint8"},{"name":"_id","type":"uint64"},{"name":"_value","type":"uint8"}],"name":"addElementToArrayType","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_objId","type":"uint64"},{"name":"amount","type":"uint32"}],"name":"decreaseMonsterExp","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_type","type":"uint8"},{"name":"_id","type":"uint64"},{"name":"_index","type":"uint256"},{"name":"_value","type":"uint8"}],"name":"updateIndexOfArrayType","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_objId","type":"uint64"},{"name":"_name","type":"string"},{"name":"_exp","type":"uint32"},{"name":"_createIndex","type":"uint32"},{"name":"_lastClaimIndex","type":"uint32"}],"name":"setMonsterObj","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"trainerDex","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_type","type":"uint8"},{"name":"_id","type":"uint64"}],"name":"getSizeArrayType","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_trainer","type":"address"}],"name":"getMonsterDexSize","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_trainer","type":"address"},{"name":"_amount","type":"uint256"}],"name":"deductExtraBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_sendTo","type":"address"},{"name":"_amount","type":"uint256"}],"name":"withdrawEther","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_objId","type":"uint64"},{"name":"amount","type":"uint32"}],"name":"increaseMonsterExp","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_trainer","type":"address"},{"name":"_monsterId","type":"uint64"}],"name":"removeMonsterIdMapping","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_type","type":"uint8"},{"name":"_id","type":"uint64"},{"name":"_index","type":"uint256"}],"name":"getElementInArrayType","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_trainer","type":"address"}],"name":"collectAllReturnBalance","outputs":[{"name":"amount","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newModerator","type":"address"}],"name":"AddModerator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_trainer","type":"address"},{"name":"index","type":"uint256"}],"name":"getMonsterObjId","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalMonster","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint64"}],"name":"monsterWorld","outputs":[{"name":"monsterId","type":"uint64"},{"name":"classId","type":"uint32"},{"name":"trainer","type":"address"},{"name":"name","type":"string"},{"name":"exp","type":"uint32"},{"name":"createIndex","type":"uint32"},{"name":"lastClaimIndex","type":"uint32"},{"name":"createTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_monsterId","type":"uint64"}],"name":"transferMonster","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalClass","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_trainer","type":"address"},{"name":"_amount","type":"uint256"}],"name":"addExtraBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_trainer","type":"address"},{"name":"_monsterId","type":"uint64"}],"name":"addMonsterIdMapping","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_classId","type":"uint32"}],"name":"getMonsterClass","outputs":[{"name":"classId","type":"uint32"},{"name":"price","type":"uint256"},{"name":"returnPrice","type":"uint256"},{"name":"total","type":"uint32"},{"name":"catchable","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_monsterId","type":"uint64"}],"name":"clearMonsterReturnBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_trainer","type":"address"},{"name":"_amount","type":"uint256"}],"name":"setExtraBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_oldModerator","type":"address"}],"name":"RemoveModerator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"moderators","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"Kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_trainer","type":"address"}],"name":"getExtraBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_classId","type":"uint32"},{"name":"_price","type":"uint256"},{"name":"_returnPrice","type":"uint256"},{"name":"_catchable","type":"bool"}],"name":"setMonsterClass","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_trainer","type":"address"}],"name":"getExpectedBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"trainerExtraBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"ChangeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_objId","type":"uint64"}],"name":"getMonsterReturn","outputs":[{"name":"current","type":"uint256"},{"name":"total","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_classId","type":"uint32"},{"name":"_trainer","type":"address"},{"name":"_name","type":"string"}],"name":"addMonsterObj","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"}]
};

const CONTRACTS = {
  [NETWORKS.mainnet]: {
    ETHEREMON_DATA_ADDRESS : "0xabc1c404424bdf24c19a5cc5ef8f47781d18eb3e",
  },
  [NETWORKS.rinkeby]: {
    ETHEREMON_DATA_ADDRESS : "",
  },
  [NETWORKS.ropsten]: {
    ETHEREMON_DATA_ADDRESS : "",
  }
};

// front end callback code
const RESULT_CODE = {
  SUCCESS: 0,
  ERROR_CLASS_NOT_FOUND: 1,
  ERROR_LOW_BALANCE: 2,
  ERROR_SEND_FAIL: 3,
  ERROR_NOT_TRAINER: 4,
  ERROR_NOT_ENOUGH_MONEY: 5,
  ERROR_INVALID_AMOUNT: 6,

  // extra error code
  ERROR_SERVER: 20,
  NO_ACCOUNT_DETECTED: 21,
  ERROR_PARAMS: 22
};