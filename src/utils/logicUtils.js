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
    res.push(cell.color.material_id);
  });
  return res;
};

export const GetSimplifiedModel = (model) => {
  let res = {};
  ObjUtils.GetValues(model.voxels).forEach(cell => {
    let xx = cell.x-model.modelSize.x[0];
    let yy = cell.y-model.modelSize.y[0];
    let zz = cell.z-model.modelSize.z[0];
    res[GetCellKey(xx, yy, zz)] = {
      x: xx, y: yy, z: zz,
      material_id: cell.color.material_id,
      variant_id: cell.color.variant_id,
    }
  });
  return res;
};

export const GetFullModel = (simplifiedModel) => {
  if (!simplifiedModel) return simplifiedModel;
  try {
    return {
      voxels: ObjUtils.CloneWithValueModify(simplifiedModel, (key, cell) => {
        return {
          x: cell.x, y: cell.y, z: cell.z,
          color: {...CUBE_MATERIALS[cell.material_id].variants[cell.variant_id]},
        }
      }),
    };
  } catch(e) {
    return null;
  }
};

export const GetImageFromGonID = (id) => {
  return `https://www.cubego.io/cubego_image/${Utils.AddHeadingZero(id, 8)}.png`
};