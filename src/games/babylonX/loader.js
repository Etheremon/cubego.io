function loadModel(root, file) {
  return new Promise((resolve, reject) => {
    BABYLON.SceneLoader.LoadAssetContainer(root, file, null, (container) => {
     resolve(container);
    })
  });
}

const loaders = {
  loadModel
};
export default loaders;
