export const ReformatModel = (model) => {
  let newModel = {
    palette: model.palette,
    size: {
      x: model.size.y,
      y: model.size.z,
      z: model.size.x,
    },
  };

  newModel.voxels = {};
  model.voxels.forEach(cell => {
    let v = {
      ...cell,
      x: cell.y,
      y: cell.z,
      z: cell.x,
      color: model.palette[cell['colorIndex']],
    };
    newModel.voxels[`${v.x}-${v.y}-${v.z}`] = v;
  });

  return newModel;
};