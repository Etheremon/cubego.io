const rgbToHex = (rgb) => {
  let hex = Number(rgb).toString(16);
  return hex.length < 2 ? `0${hex}` : hex;
};

export const RgbToHex = (color) => {
  return !color ? null : {
    hex: color.hex
      ? color.hex.replace('#', '').substr(0, 6)
      : `${rgbToHex(color.r)}${rgbToHex(color.g)}${rgbToHex(color.b)}`,
    opacity: color.a ? (color.a <= 1 ? color.a : (color.a/255)) : 1,
  };
};
