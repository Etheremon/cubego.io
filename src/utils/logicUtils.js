import * as ObjUtils from './objUtils';

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