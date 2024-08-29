import { colorTheme } from "./colors";

export const colorMap: { [key: string]: string } = {
  R: "red",
  G: "green",
  B: "blue",
  Custom: "Custom",
};
export type QAP = {
  Q: number;
  A: number;
  P: number;
  symbol: symbolType;
};

export type symbolType = "red" | "green" | "blue" | "black";

export type canvasConfigType = {
  ratio: number;
  fontSize: number;
  fontSizeLegend: number;
  fontSizeAxis: number;
  fontSizeAxisLabel: number;
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
  maficMineral: number;
  // theme: 'earth'|'forest'|'desert'|'mountain'|'ocean'|'volcanic';
  isShowColors: boolean;
  isShowAxis: boolean;
  isShowGrid: boolean;
  isShowGridLabel: boolean;
  isShowRockNames: boolean;
  rockNameColor: string;
  gridColor: string;
  gridWidth: number;
  axisColor: string;
  isShowLegend: boolean;
  isShowCircle: boolean;
  xLegend: number;
  yLegend: number;
  colorLegend: string;
  graphType: graphType;
  plotSize: number;
};

const theme = colorTheme.olivine;
export type graphType = "vQAPF" | "vQAP";

export const defaultConfig: canvasConfigType = {
  ratio: 1,
  fontSize: 100, // rhyolite
  fontSizeLegend: 70, // legend
  fontSizeAxis: 110, // QAP
  fontSizeAxisLabel: 80, // 10,20,35
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
  maficMineral: 20,
  isShowColors: true,
  isShowAxis: true,
  isShowGrid: true,
  isShowGridLabel: true,
  isShowRockNames: true,
  rockNameColor: "#303030",
  gridColor: "#878787",
  gridWidth: 5,
  axisColor: "#141414",
  isShowLegend: false,
  isShowCircle: true,
  xLegend: 0,
  yLegend: 0,
  colorLegend: "#303030",
  graphType: "vQAP",
  plotSize: 15,
};

export const defaultConfigVQAPF = {
  fontSize: 70,
  fontSizeAxisLabel: 65, // 10,20,35
  fontSizeAxis: 85, // QAPF
  xLegend: 115,
  graphType: "vQAPF",
};
