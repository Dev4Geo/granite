export const colorMap: { [key: string]: string } = {
  R: "red",
  G: "green",
  B: "blue",
  Custom: "Custom",
};

export type themeType =
  | "earth"
  | "forest"
  | "desert"
  | "mountain"
  | "ocean"
  | "volcanic";

export type symbolType = "red" | "green" | "blue" | "black";

export const colorTheme = {
  olivine: [
    "#FFF",
    "#A6A6A6",
    "#D9D9D9",
    "#63C21B",
    "#CBF08D",
    "#C1FF72",
    "#7ED957",
    "#236A0A",
    "#A6A6A6",
    "#D9D9D9",
    "#42CA67",
  ],
  earth: [
    "#7B3F00", // Earth Brown
    "#C19A6B", // Desert Sand
    "#A0522D", // Sienna
    "#8B4513", // Saddle Brown
    "#6B4226", // Dark Brown
    "#556B2F", // Olive Green
    "#8F9779", // Moss Green
    "#4B5320", // Army Green
    "#3B3C36", // Earth Grey
    "#2F4F4F", // Dark Slate Grey
    "#BC8F8F", // Rosy Brown
  ],
  forest: [
    "#2E8B57", // Sea Green
    "#006400", // Dark Green
    "#556B2F", // Olive Green
    "#8F9779", // Moss Green
    "#6B8E23", // Olive Drab
    "#228B22", // Forest Green
    "#4B5320", // Army Green
    "#808000", // Olive
    "#2F4F4F", // Dark Slate Grey
    "#556B2F", // Olive Green
    "#A9A9A9", // Dark Grey
  ],

  desert: [
    "#EDC9AF", // Desert Sand
    "#D2B48C", // Tan
    "#C19A6B", // Fawn
    "#8B4513", // Saddle Brown
    "#F4A460", // Sandy Brown
    "#DEB887", // Burly Wood
    "#CD853F", // Peru
    "#8B0000", // Dark Red
    "#A0522D", // Sienna
    "#A0522D", // Earth Brown
    "#BC8F8F", // Rosy Brown
  ],

  mountain: [
    "#696969", // Dim Grey
    "#708090", // Slate Grey
    "#778899", // Light Slate Grey
    "#A9A9A9", // Dark Grey
    "#808080", // Grey
    "#D3D3D3", // Light Grey
    "#2F4F4F", // Dark Slate Grey
    "#4B4B4B", // Charcoal
    "#BC8F8F", // Rosy Brown
    "#D2B48C", // Tan
    "#BEBEBE", // Silver
  ],

  ocean: [
    "#4682B4", // Steel Blue
    "#5F9EA0", // Cadet Blue
    "#B0C4DE", // Light Steel Blue
    "#ADD8E6", // Light Blue
    "#87CEEB", // Sky Blue
    "#4682B4", // Steel Blue
    "#6495ED", // Cornflower Blue
    "#1E90FF", // Dodger Blue
    "#00BFFF", // Deep Sky Blue
    "#5F9EA0", // Cadet Blue
    "#2F4F4F", // Dark Slate Grey
  ],

  volcanic: [
    "#8B0000", // Dark Red
    "#B22222", // Firebrick
    "#A52A2A", // Brown
    "#800000", // Maroon
    "#FF4500", // Orange Red
    "#FF6347", // Tomato
    "#CD5C5C", // Indian Red
    "#DC143C", // Crimson
    "#B03060", // Dark Violet Red
    "#6B4226", // Dark Brown
    "#3B3C36", // Earth Grey
  ],
};

export type canvasConfigType = {
  width: number;
  height: number;
  fontSize: number;
  fontSizeAxis: number;
  colors: {
    "Quartz Rich": string;
    "Alkali Feldspar Rhyolite": string;
    Rhyolite: string;
    Dacite: string;
    Q2: string;
    "Quartz Trachyte": string;
    "Quartz Latite": string;
    Andesite: string;
    Q1: string;
    Trachyte: string;
    Latite: string;
  };
  xAlkali: number;
  yAlkali: number;
  rAlkali: number;
  ratio: number; // unused
  maficMineral: number;
  // theme: 'earth'|'forest'|'desert'|'mountain'|'ocean'|'volcanic';
  isShowColors: boolean;
  isShowAxis: boolean;
  isShowGrid: boolean;
  isShowRockNames: boolean;
  rockNameColor: string;
  gridColor: string;
  isShowLegend: boolean;
  isShowCircle: boolean;
};

const theme = colorTheme.olivine;

export const defaultConfig = {
  width: 520,
  height: 520,
  fontSize: 12,
  fontSizeAxis: 15,
  colors: {
    "Quartz Rich": theme[0],
    "Alkali Feldspar Rhyolite": theme[1],
    Rhyolite: theme[2],
    Dacite: theme[3],
    Q2: theme[4],
    "Quartz Trachyte": theme[5],
    "Quartz Latite": theme[6],
    Andesite: theme[7],
    Q1: theme[8],
    Trachyte: theme[9],
    Latite: theme[10],
  },
  xAlkali: 0,
  yAlkali: 0,
  rAlkali: 0,
  ratio: 0,
  maficMineral: 20,
  isShowColors: true,
  isShowAxis: true,
  isShowGrid: true,
  isShowRockNames: true,
  rockNameColor: "#000",
  gridColor: "#878787",
  isShowLegend: true,
  isShowCircle: true,
};

export type QAP = {
  Q: number;
  A: number;
  P: number;
  symbol: string;
};
