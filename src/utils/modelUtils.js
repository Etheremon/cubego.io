export const ReformatModel = (model) => {
  let newModel = {
    palette: model.palette,
    size: {
      x: model.size.x,
      y: model.size.y,
      z: model.size.z,
    },
    modelSize: {
      x: [0, model.size.x-1],
      y: [0, model.size.y-1],
      z: [0, model.size.z-1],
    },
    spaceSize: {
    },
    layerCount: {
      x: {},
      y: {},
      z: {},
    }
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
    if (!newModel.voxels[GetCellKey(v.x, v.y, v.z)]) {
      newModel.voxels[GetCellKey(v.x, v.y, v.z)] = v;
      newModel.layerCount.x[v.x] = !newModel.layerCount.x[v.x] ? 1 : newModel.layerCount.x[v.x]+1;
      newModel.layerCount.y[v.y] = !newModel.layerCount.y[v.y] ? 1 : newModel.layerCount.y[v.y]+1;
      newModel.layerCount.z[v.z] = !newModel.layerCount.z[v.z] ? 1 : newModel.layerCount.z[v.z]+1;
    }
  });

  return newModel;
};

export const GetCellKey = (x, y, z) => (`${x}_${y}_${z}`);