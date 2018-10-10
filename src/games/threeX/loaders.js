import * as THREE from "three";

let materialStorage = {};


function loadMaterial(id, jsonObject) {
  let textures = {};
  let material;
  jsonObject.textures.forEach((texture) => {
    // textures[texture.uuid] = new THREE.TextureLoader().load('./assets/materials/textures/' + texture.image);
    if (texture.type === 'cube') {
      let path = './assets/skybox/CloudyCrown_01_Midday/CloudyCrown_Midday_';
      let format = '.jpg';
      let urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
      ];

      let reflectionCube = new THREE.CubeTextureLoader().load(urls);
      reflectionCube.format = THREE.RGBFormat;
      textures[texture.uuid] = reflectionCube;
    } else {
      textures[texture.uuid] = new THREE.TextureLoader().load(texture.image);
    }
  });
  let loader = new THREE.MaterialLoader();
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
