export const ReformatModel = (model) => {
  let newModel = {
    palette: model.palette,
    size: {
      x: model.size.x,
      y: model.size.y,
      z: model.size.z,
    },
  };

  newModel.voxels = {};
  model.voxels.forEach(cell => {
    let v = {
      ...cell,
      x: model.size.x-1-cell.x,
      y: cell.y,
      z: cell.z,
      color: model.palette[cell['colorIndex']],
    };
    newModel.voxels[`${v.x}-${v.y}-${v.z}`] = v;
  });

  return newModel;
};