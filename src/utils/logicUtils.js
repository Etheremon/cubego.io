import * as ObjUtils from './objUtils';
import * as Utils from "./utils";
import {GetCellKey} from "./modelUtils";
import {CUBE_MATERIALS} from "../constants/cubego";

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

export const GetSimplifiedModel = (model) => {
  let res = {ver: 2, model: {}, image: null};
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
    let res = {model: {}, image: null};

    // v1: {'1_1_1':{x,y,z,material_id,variant_id}}
    if (simplifiedModel['ver'] === undefined) {
      res.model.voxels = ObjUtils.CloneWithValueModify(simplifiedModel, (key, cell) => {
        if (key === 'ver') return null;
        let mid = cell['material_id'] === 12 ? 0 : 13 - cell['material_id'];

        return {
          x: cell.x, y: cell.y, z: cell.z,
          color: {...CUBE_MATERIALS[mid].sub_materials[parseInt(mid * 100) + parseInt(cell['variant_id'])]},
        }
      })
      
    }
    // v1: {ver: 2, image, model: {'1_1_1':{x,y,z,sub_mat_id}}
    else if (simplifiedModel['ver'] === 2) {
      res.model.voxels = ObjUtils.CloneWithValueModify(simplifiedModel, (key, cell) => {
        if (key === 'ver') return null;
        return {
          x: cell.x, y: cell.y, z: cell.z,
          color: {...CUBE_MATERIALS[cell.material_id].sub_materials[cell.sub_material_id]},
        }
      })
    }

    delete res.model.voxels['ver'];
    return res;
  } catch(e) {
    return null;
  }
};

export const GetImageFromGonID = (id) => {
  return `https://www.cubego.io/cubego_image/${Utils.AddHeadingZero(id, 8)}.png`
};

export const CalculateDiscountPrice = (price, discount, roundNumber) => {
  return Utils.RoundUpToDecimal(price * (1 - discount) , roundNumber);
}