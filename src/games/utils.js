const rgbToHex = function (rgb) {
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
};

export const fullColorHex = function (color) {
  let red = rgbToHex(color.r);
  let green = rgbToHex(color.g);
  let blue = rgbToHex(color.b);
  return red + green + blue;
};
