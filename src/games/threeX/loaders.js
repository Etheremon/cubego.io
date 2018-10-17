

let materialStorage = {};


function loadMaterial(id, jsonObject) {
  let textures = {};
  let material;
  jsonObject.textures.forEach((texture) => {
    if (texture.type === 'cube') {
      let path = './assets/skybox/CloudyCrown_01_Midday/CloudyCrown_Midday_';
      let format = '.jpg';
      let urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
      ];

      let reflectionCube = new window.THREE.CubeTextureLoader().load(urls);
      reflectionCube.format = THREE.RGBFormat;
      textures[texture.uuid] = reflectionCube;
    } else {
      textures[texture.uuid] = new window.THREE.TextureLoader().load(texture.image);
    }
  });
  let loader = new window.THREE.MaterialLoader();
  loader.setTextures(textures);
  material = loader.parse(jsonObject);
  materialStorage[id] = material;
}

function getMaterial(id) {
  return materialStorage[id];
}

export {
  loadMaterial,
  getMaterial
}
