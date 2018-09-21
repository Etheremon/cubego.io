export const ReformatModel = (model) => {
  let newModel = {
    palette: model.palette,
    size: {
      x: model.size.y,
      y: model.size.z,
      z: model.size.x,
    },
  };

  newModel.voxels = model.voxels.map(cell => ({
    ...cell,
    x: cell.y,
    y: cell.z,
    z: cell.x,
  }));

  return newModel;
};