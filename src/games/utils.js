const rgbToHex = function (rgb) {
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = `0${hex}`;
  }
  return hex;
};

export const fullColorHex = function (color) {
  const red = rgbToHex(color.r);
  const green = rgbToHex(color.g);
  const blue = rgbToHex(color.b);
  return red + green + blue;
};
