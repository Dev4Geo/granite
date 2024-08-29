export const VQAPF = (obj: any, andesite: string) => {
  const y = 20;
  const andesiteColor = "#f0A1c0";
  return [
    [0, 10, 0, 10, "#f011f0", "F1", 0, y],
    [10, 35, 0, 10, "#f0A1f0", "Foid-Bearing\nTrachyte", 0, y],
    [35, 65, 0, 10, "#a0A1f0", "Foid-Bearing\nLatite", 0, y],
    [65, 100, 0, 10, andesiteColor, "", 0, 0],
    [65, 100, 0, 20, andesiteColor, andesite, 28, 116, obj.top_],
    [0, 10, 10, 60, "#a011f0", "Phonolite", -35, -25, obj.bottom_, 1.02],
    [10, 50, 10, 60, "#a0A1f0", "Tephritic\nPhonolite", 5, -50],
    [50, 90, 10, 60, "#c0A1c0", "Phonolitic\nBasanite", 5, -50],
    [90, 100, 10, 60, "#a0A1c0", "Basanite", 34, 0, obj.bottom_, -1.0],
    [
      0,
      50,
      60,
      90,
      "#a0A1c0",
      "Phonlitic\nFoidite",
      107,
      -36,
      obj.bottom_,
      0,
      "end",
    ],
    [
      50,
      100,
      60,
      90,
      "#f0A1c0",
      "Basanitic\nFoidite",
      -107,
      -36,
      obj.bottom_,
      0,
      "start",
    ],
    [0, 100, 90, 100, "#f0A1c0", "F2", 2, -3],
  ];
};

export const VQAP = (obj: any) => {
  const colors = obj.config.colors;
  return [
    [0, 100, 60, 100, colors["Quartz Rich"], "Quartz\nRich", 0, 212, obj.top_],
    [
      0,
      10,
      60,
      20,
      colors["Alkali Feldspar Rhyolite"],
      "Alkali Feldspar Rhyolite",
      47,
      16,
      obj.top_,
      -1.172 + obj.config.rAlkali,
    ],
    [10, 65, 60, 20, colors["Rhyolite"], "Rhyolite", 0, 50, obj.top_],
    [65, 100, 60, 20, colors["Dacite"], "Dacite", 0, 50, obj.top_],
    [0, 10, 5, 20, colors["Q2"], "Q2", 0, 28, obj.top_],
    [
      10,
      35,
      5,
      20,
      colors["Quartz Trachyte"],
      "Quartz\nTrachyte",
      0,
      28,
      obj.top_,
    ],
    [35, 65, 5, 20, colors["Quartz Latite"], "Quartz\nLatite", 0, 28, obj.top_],
    [0, 10, 0, 5, colors["Q1"], "Q1", 0, 28, obj.top_],
    [10, 35, 0, 5, colors["Trachyte"], "Trachyte", 0, 28, obj.top_],
    [35, 65, 0, 5, colors["Latite"], "Latite", 0, 28, obj.top_],
  ];
};
export const VQAP4 = (obj: any) => {
  const colors = obj.config.colors;
  return [
    [0, 100, 60, 100, colors["Quartz Rich"], "Quartz\nRich", 0, 112, obj.top_],
    [
      0,
      10,
      60,
      20,
      colors["Alkali Feldspar Rhyolite"],
      "Alkali Feldspar Rhyolite",
      35,
      16,
      obj.top_,
      -1.099 + obj.config.rAlkali,
    ],
    [10, 65, 60, 20, colors["Rhyolite"], "Rhyolite", 0, 50, obj.top_],
    [65, 100, 60, 20, colors["Dacite"], "Dacite", 0, 50, obj.top_],
    [0, 10, 5, 20, colors["Q2"], "Q2", 0, 28, obj.top_],
    [
      10,
      35,
      5,
      20,
      colors["Quartz Trachyte"],
      "Quartz\nTrachyte",
      0,
      28,
      obj.top_,
    ],
    [35, 65, 5, 20, colors["Quartz Latite"], "Quartz\nLatite", 0, 28, obj.top_],
    [0, 10, 0, 5, colors["Q1"], "Q1", 0, 28, obj.top_],
    [10, 35, 0, 5, colors["Trachyte"], "Trachyte", 0, 28, obj.top_],
    [35, 65, 0, 5, colors["Latite"], "Latite", 0, 28, obj.top_],
  ];
};

export const VQAPGridLabel = (obj: any) => {
  const fontSize = obj.config.fontSizeAxisLabel;
  const y = 19;
  const y2 = 54;
  return [
    [10, 20, "10", 29, y, fontSize],
    [35, 20, "35", -34, y, fontSize],
    [65, 20, "65", -110, y, fontSize],
    [0, 5, "5", -60, y2, fontSize],
    [0, 20, "20", -100, y2, fontSize],
    [0, 60, "60", -100, y2, fontSize],
  ];
};

export const VQAPFGridLabel = (obj: any) => {
  const fontSize = obj.config.fontSizeAxisLabel;
  const y = 19;
  const y2 = 54;

  const y3 = 92;
  const y4 = 55
  return [
    [10, 20, "10", 29, y, fontSize],
    [35, 20, "35", -34, y, fontSize],
    [65, 20, "65", -90, y, fontSize],
    [0, 5, "5", -60, y2, fontSize],
    [0, 20, "20", -100, y2, fontSize],
    [0, 60, "60", -100, y2, fontSize],

    [10, 10, "10", 30, y3, fontSize, obj.bottom_],
    [50, 10, "50", -82, y3, fontSize, obj.bottom_],
    [90, 10, "90", -106, y3, fontSize, obj.bottom_],
    [0, 10, "10", -90, y4, fontSize, obj.bottom_],
    [0, 60, "60", -90, y4, fontSize, obj.bottom_],
    [0, 90, "90", -90, y4, fontSize, obj.bottom_],
  ];
};

export const VQAPAxisLabel = (obj: any) => {
  const y = obj.h - 140;
  return [
    ["Q", obj.w / 2 - 1, 140],
    ["A", 140, y],
    ["P", obj.w - 130, y],
  ];
};

export const VQAPAxisCircle = (obj: any) => {
  const c = "#505050";
  return [
    [obj.left.x, obj.left.y, c],
    [obj.right.x, obj.right.y, c],
    [obj.top_.x, obj.top_.y, c],
  ];
};

export const VQAPFAxisLabel = (obj: any) => {
  const y = obj.h * 0.5 + 25;
  return [
    ["Q", obj.top_.x + 0, 160],
    ["A", obj.left.x - 60, y],
    ["P", obj.right.x + 60, y],
    ["F", obj.bottom_.x, obj.h - 110],
  ];
};

export const VQAPFAxisCircle = (obj: any) => {
  const c = "#505050";
  return [
    [obj.left.x, obj.left.y, c],
    [obj.right.x, obj.right.y, c],
    [obj.top_.x, obj.top_.y, c],
  ];
};

