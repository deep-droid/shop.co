import colorNamer from "color-namer";

export default function getColorName(hex: string) {
  try {
    const names = colorNamer(hex);
    return names.ntc[0].name;
  } catch (error) {
    return "Invalid Hex Code";
  }
}