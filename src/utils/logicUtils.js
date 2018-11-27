import * as ObjUtils from './objUtils';
import * as Utils from "./utils";
import {GetCellKey} from "./modelUtils";
import {CUBE_MATERIALS} from "../constants/cubego";
import {IMAGE_URL} from "../config";
import { GON_TIER } from '../constants/cubegon';

export const GetStructure = (model) => {
  let res = [];
  ObjUtils.GetValues(model.voxels).forEach(cell => {
    res.push(cell.x-model.modelSize.x[0]);
    res.push(cell.y-model.modelSize.y[0]);
    res.push(cell.z-model.modelSize.z[0]);
    res.push(cell.color.sub_material_id);
  });
  return res;
};

export const GetModelFromStructure = (structure) => {
  let res = {voxels: {}, modelSize: {}, spaceSize: {}};
  let modelSize = {x: [1000, -1000], y: [1000, -1000], z: [1000, -1000]};
  for (let i = 0; i < structure.length; i += 4) {
    res.voxels[GetCellKey(structure[i], structure[i+1], structure[i+2])] = {
      x: structure[i], y: structure[i+1], z: structure[i+2],
      color: {...CUBE_MATERIALS[Math.floor(structure[i+3]/100)].sub_materials[structure[i+3]]},
    }

    let arr = ['x', 'y', 'z'];
    arr.forEach((k, idx) => {
      modelSize[k][0] = Math.min(modelSize[k][0], structure[i + idx]);
      modelSize[k][1] = Math.max(modelSize[k][1], structure[i + idx]);
    })
  }
  res.modelSize = modelSize;
  res.spaceSize = ObjUtils.CloneDeep(modelSize);
  res.size = {
    x: modelSize.x[1]-modelSize.x[0]+1,
    y: modelSize.y[1]-modelSize.y[0]+1,
    z: modelSize.z[1]-modelSize.z[0]+1,
  };
  return res;
};

export const GetSimplifiedModel = (model) => {
  let res = {ver: 2, model: {}, image: model.image || null};
  ObjUtils.GetValues(model.voxels).forEach(cell => {
    let xx = cell.x-model.modelSize.x[0];
    let yy = cell.y-model.modelSize.y[0];
    let zz = cell.z-model.modelSize.z[0];
    res.model[GetCellKey(xx, yy, zz)] = {
      x: xx, y: yy, z: zz,
      material_id: cell.color.material_id,
      sub_material_id: cell.color.sub_material_id,
    }
  });

  return res;
};

export const GetFullModel = (simplifiedModel) => {
  if (!simplifiedModel) return simplifiedModel;
  try {
    let res = {model: {}, image: simplifiedModel.image || null};

    // v1: {'1_1_1':{x,y,z,material_id,variant_id}}
    if (simplifiedModel['ver'] === undefined) {
      res.model.voxels = ObjUtils.CloneWithValueModify(simplifiedModel, (key, cell) => {
        let mid = cell['material_id'] === 12 ? 0 : 13 - cell['material_id'];

        return {
          x: cell.x, y: cell.y, z: cell.z,
          color: {...CUBE_MATERIALS[mid].sub_materials[parseInt(mid * 100) + parseInt(cell['variant_id'])]},
        }
      })
      
    }
    // v1: {ver: 2, image, model: {'1_1_1':{x,y,z,sub_mat_id}}
    else if (simplifiedModel['ver'] === 2) {
      res.model.voxels = ObjUtils.CloneWithValueModify(simplifiedModel.model, (key, cell) => {
        return {
          x: cell.x, y: cell.y, z: cell.z,
          color: {...CUBE_MATERIALS[cell.material_id].sub_materials[cell.sub_material_id]},
        }
      })
    }

    delete res.model.voxels['ver'];
    return res;
  } catch(e) {
    console.warn(e);
    return null;
  }
};

export const GetImageFromGonID = (id) => {
  return `${IMAGE_URL}/${Utils.AddHeadingZero(id, 8)}.png`
};

export const CalculateDiscountPrice = (price, discount, roundNumber) => {
  return Utils.RoundUpToDecimal(price * (1 - discount) , roundNumber);
}

export const ConvertStatsToTier = (stats) => {
  return ObjUtils.FilterValue(GON_TIER, (k, v) => {
    return v.stats[0] <= stats && stats <= v.stats[1];
  })[0] || undefined
}

export const VerifyLength = (text, fr, t) => (text && fr <= text.length && text.length <= t);

export const ConvertDiffToSimilarity = (diff) => (Utils.RoundDownToDecimal(100-diff*100, 2));