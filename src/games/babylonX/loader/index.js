import * as BABYLON from "babylonjs";

let loaderStorage = {};
let assetsManager = null;

export function _createAssetsManager(scene, startFnc) {
  assetsManager = new BABYLON.AssetsManager(scene);
  assetsManager.onFinish = startFnc;
}

function addMesh(id, root, file) {
  return new Promise((resolve, reject) => {
    let task = assetsManager.addMeshTask(id, "", root, file);
    task.onSuccess = (taskData) => {
      loaderStorage[id] = taskData;
      resolve(taskData)
    };
    task.onError = (taskData, message, exception) => {
      console.error(message);
      reject(message)
    }
  });
}

function addTexture(id, url) {
  return new Promise((resolve, reject) => {
    let task = assetsManager.addTextureTask(id, url);
    task.onSuccess = (taskData) => {
      loaderStorage[id] = taskData.texture;
      resolve(taskData)
    };
    task.onError = (taskData, message, exception) => {
      console.error(message);
      reject(message)
    }
  });
}

function load() {
  assetsManager.load();
}

function get(id) {
  return loaderStorage[id];
}

const loaders = {
  addMesh,
  addTexture,
  load,
  get
};

export default loaders;
