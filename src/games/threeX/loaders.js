import { CUBE_MATERIALS, CUBE_MATERIALS_MAP } from '../../constants/cubego';

const requireParticleTextures = require.context('../../shared/materials/textures', true);
const materialStorage = {};
const textureStorage = {};
const cachedMaterial = {};
const threeTextureLoader = new window.THREE.TextureLoader();
const threeCubeTextureLoader = new window.THREE.CubeTextureLoader();

function loadMaterial(id, materialData) {
  const textures = {};
  let material;
  materialData.textures.forEach((texture) => {
    if (texture.type === 'cube') {
      const urls = [
        require('../../shared/skybox/1/skybox_px.jpg'),
        require('../../shared/skybox/1/skybox_nx.jpg'),
        require('../../shared/skybox/1/skybox_py.jpg'),
        require('../../shared/skybox/1/skybox_ny.jpg'),
        require('../../shared/skybox/1/skybox_pz.jpg'),
        require('../../shared/skybox/1/skybox_nz.jpg'),
      ];

      const reflectionCube = threeCubeTextureLoader.load(urls);
      reflectionCube.format = THREE.RGBFormat;
      textures[texture.uuid] = reflectionCube;
    } else {
      textures[texture.uuid] = threeTextureLoader.load(requireParticleTextures(`./${texture.image}`, true));
    }
  });
  const loader = new window.THREE.MaterialLoader();
  loader.setTextures(textures);
  material = loader.parse(materialData);
  materialStorage[id] = material;
}

function loadTexture(id, textureUrl) {
  if (textureStorage[id]) {
    return Promise.resolve(textureStorage[id]);
  }
  return new Promise((resolve, reject) => {
    threeTextureLoader.load(textureUrl, (data) => {
      textureStorage[id] = data;
      resolve(data);
    }, undefined, (error) => {
      reject(error);
    });
  });
}

function cacheMaterial(id, variantId, material) {
  if (!cachedMaterial[id]) {
    cachedMaterial[id] = {};
  }
  cachedMaterial[id][variantId] = material;
}

function getMaterial(id, variantId, isWebGL) {
  if (!id || !variantId) return;
  if (cachedMaterial[id] && cachedMaterial[id][variantId]) {
    return cachedMaterial[id][variantId];
  }
  if (!isWebGL) {
    const variantProperties = CUBE_MATERIALS[CUBE_MATERIALS_MAP[id]].sub_materials[variantId];
    if (!variantProperties) {
      return;
    }
    const canvasTexture = variantProperties.img;
    const texture = new window.THREE.TextureLoader().load(canvasTexture);
    const material = new window.THREE.MeshBasicMaterial({ map: texture });
    cacheMaterial(id, variantId, material);
    return material;
  }
  const material = materialStorage[id].clone();
  const color = CUBE_MATERIALS[CUBE_MATERIALS_MAP[id]].sub_materials[variantId].color.replace('#', '');
  const emissiveColor = CUBE_MATERIALS[CUBE_MATERIALS_MAP[id]].sub_materials[variantId].emissive.replace('#', '');
  material.color.setHex(parseInt(color, 16));
  material.emissive.setHex(parseInt(emissiveColor, 16));
  cacheMaterial(id, variantId, material);
  return material;
}

function getTexture(id) {
  return textureStorage[id];
}

export {
  loadMaterial,
  getMaterial,
  loadTexture,
  getTexture,
};
