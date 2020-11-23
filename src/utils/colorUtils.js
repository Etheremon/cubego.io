const rgbToHex = (rgb) => {
  const hex = Number(rgb).toString(16);
  return hex.length < 2 ? `0${hex}` : hex;
};

export const RgbToHex = (color) => (!color ? null : {
  hex: color.hex
    ? color.hex.replace('#', '').substr(0, 6)
    : `${rgbToHex(color.r)}${rgbToHex(color.g)}${rgbToHex(color.b)}`,
  opacity: color.a ? (color.a <= 1 ? color.a : (color.a / 255)) : 1,
});

export const HexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};
