let requireParticleTextures = require.context('../../shared/materials/textures', true);
let materialStorage = {};

function loadMaterial(id, jsonObject) {
  let textures = {};
  let material;
  jsonObject.textures.forEach((texture) => {
    if (texture.type === 'cube') {
      let urls = [
        require('../../shared/skybox/1/skybox_px.jpg'),
        require('../../shared/skybox/1/skybox_nx.jpg'),
        require('../../shared/skybox/1/skybox_py.jpg'),
        require('../../shared/skybox/1/skybox_ny.jpg'),
        require('../../shared/skybox/1/skybox_pz.jpg'),
        require('../../shared/skybox/1/skybox_nz.jpg')
      ];

      let reflectionCube = new window.THREE.CubeTextureLoader().load(urls);
      reflectionCube.format = THREE.RGBFormat;
      textures[texture.uuid] = reflectionCube;
    } else {
      textures[texture.uuid] = new window.THREE.TextureLoader().load(requireParticleTextures('./' + texture.image, true));
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
