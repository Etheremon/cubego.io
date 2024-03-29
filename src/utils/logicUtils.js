import * as ObjUtils from './objUtils';
import * as Utils from './utils';
import { GetCellKey } from './modelUtils';
import { CUBE_MATERIALS } from '../constants/cubego';
import { IMAGE_URL } from '../config';
import { GON_TIER } from '../constants/cubegon';

export const GetStructure = (model) => {
  const res = [];
  ObjUtils.GetValues(model.voxels).forEach((cell) => {
    res.push(cell.x - model.modelSize.x[0]);
    res.push(cell.y - model.modelSize.y[0]);
    res.push(cell.z - model.modelSize.z[0]);
    res.push(cell.color.sub_material_id);
  });
  return res;
};

export const GetModelFromStructure = (structure) => {
  const res = { voxels: {}, modelSize: {}, spaceSize: {} };
  const modelSize = { x: [1000, -1000], y: [1000, -1000], z: [1000, -1000] };
  for (let i = 0; i < structure.length; i += 4) {
    res.voxels[GetCellKey(structure[i], structure[i + 1], structure[i + 2])] = {
      x: structure[i],
      y: structure[i + 1],
      z: structure[i + 2],
      color: { ...CUBE_MATERIALS[Math.floor(structure[i + 3] / 100)].sub_materials[structure[i + 3]] },
    };

    const arr = ['x', 'y', 'z'];
    arr.forEach((k, idx) => {
      modelSize[k][0] = Math.min(modelSize[k][0], structure[i + idx]);
      modelSize[k][1] = Math.max(modelSize[k][1], structure[i + idx]);
    });
  }
  res.modelSize = modelSize;
  res.spaceSize = ObjUtils.CloneDeep(modelSize);
  res.size = {
    x: modelSize.x[1] - modelSize.x[0] + 1,
    y: modelSize.y[1] - modelSize.y[0] + 1,
    z: modelSize.z[1] - modelSize.z[0] + 1,
  };
  return res;
};

export const GetSimplifiedModel = (model) => {
  const res = { ver: 2, model: {}, image: model.image || null };
  ObjUtils.GetValues(model.voxels).forEach((cell) => {
    const xx = cell.x - model.modelSize.x[0];
    const yy = cell.y - model.modelSize.y[0];
    const zz = cell.z - model.modelSize.z[0];
    res.model[GetCellKey(xx, yy, zz)] = {
      x: xx,
      y: yy,
      z: zz,
      material_id: cell.color.material_id,
      sub_material_id: cell.color.sub_material_id,
    };
  });

  return res;
};

export const GetFullModel = (simplifiedModel) => {
  if (!simplifiedModel) return simplifiedModel;
  try {
    const res = { model: {}, image: simplifiedModel.image || null };

    // v1: {'1_1_1':{x,y,z,material_id,variant_id}}
    if (simplifiedModel.ver === undefined) {
      res.model.voxels = ObjUtils.CloneWithValueModify(simplifiedModel, (key, cell) => {
        const mid = cell.material_id === 12 ? 0 : 13 - cell.material_id;

        return {
          x: cell.x,
          y: cell.y,
          z: cell.z,
          // eslint-disable-next-line radix
          color: { ...CUBE_MATERIALS[mid].sub_materials[parseInt(mid * 100) + parseInt(cell.variant_id)] },
        };
      });
    } else if (simplifiedModel.ver === 2) {
      // v1: {ver: 2, image, model: {'1_1_1':{x,y,z,sub_mat_id}}
      res.model.voxels = ObjUtils.CloneWithValueModify(simplifiedModel.model, (key, cell) => ({
        x: cell.x,
        y: cell.y,
        z: cell.z,
        color: { ...CUBE_MATERIALS[cell.material_id].sub_materials[cell.sub_material_id] },
      }));
    }

    delete res.model.voxels.ver;
    return res;
  } catch (e) {
    console.warn(e);
    return null;
  }
};

export const GetImageFromGonID = (id) => `${IMAGE_URL}/${Utils.AddHeadingZero(id, 8)}.png`;

export const CalculateDiscountPrice = (price, discount, roundNumber) => Utils.RoundUpToDecimal(price * (1 - discount), roundNumber);

export const ConvertStatsToTier = (stats) => ObjUtils.FilterValue(GON_TIER, (k, v) => v.stats[0] <= stats && stats <= v.stats[1])[0] || undefined;

export const VerifyLength = (text, fr, t) => (text && fr <= text.length && text.length <= t);

// const cutoffShapeSimilarity = {correct: 0.08, fake: 85};
// const cutoffColorSimilarity = {correct: 0.05, fake: 90};
const cutoffShapeSimilarity = { correct: 0.15, fake: 85 };
const cutoffColorSimilarity = { correct: 0.10, fake: 90 };

export const ConvertShapeDiffToSimilarity = (diff) => (
  diff <= cutoffShapeSimilarity.correct
    ? Utils.RoundDownToDecimal(100 - diff * (100 - cutoffShapeSimilarity.fake) / (cutoffShapeSimilarity.correct), 2)
    : Utils.RoundDownToDecimal((1 - diff) / (1 - cutoffShapeSimilarity.correct) * cutoffShapeSimilarity.fake, 2)
);
export const ConvertColorDiffToSimilarity = (diff) => (
  diff <= cutoffColorSimilarity.correct
    ? Utils.RoundDownToDecimal(100 - diff * (100 - cutoffColorSimilarity.fake) / (cutoffColorSimilarity.correct), 2)
    : Utils.RoundDownToDecimal((1 - diff) / (1 - cutoffColorSimilarity.correct) * cutoffColorSimilarity.fake, 2)
);
