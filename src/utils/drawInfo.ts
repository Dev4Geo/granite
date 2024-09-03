export const VQAPF = (obj: any, andesite: string, isBasaltic: boolean) => {
  const y = 20;
  const colors = obj.config.colors;
  const andesiteColor = colors["Andesite"];
  return [
    [0, 10, 0, 10, colors["F1"], "F1", 0, y],
    [
      10,
      35,
      0,
      10,
      colors["Foid-Bearing Trachyte"],
      "Foid-Bearing\nTrachyte",
      0,
      y,
    ],
    [
      35,
      65,
      0,
      10,
      colors["Foid-Bearing Latite"],
      "Foid-Bearing\nLatite",
      0,
      y,
    ],
    [65, 100, 0, 10, andesiteColor, "", 0, 0],
    [65, 100, 0, 20, andesiteColor, andesite, 28, 116, obj.top_],
    [
      0,
      10,
      10,
      60,
      colors["Phonolite"],
      "Phonolite",
      -35,
      -25,
      obj.bottom_,
      1.02,
    ],
    [
      10,
      50,
      10,
      60,
      colors["Tephritic Phonolite"],
      "Tephritic\nPhonolite",
      5,
      -50,
    ],
    [
      50,
      90,
      10,
      60,
      colors["Phonolitic Tephrite"],
      isBasaltic ? "Phonolitic\nBasanite" : "Phonolitic\nTephrite",
      5,
      -50,
    ],
    [
      90,
      100,
      10,
      60,
      colors["Tephrite"],
      isBasaltic ? "Basanite" : "Tephrite",
      34,
      0,
      obj.bottom_,
      -1.0,
    ],
    [
      0,
      50,
      60,
      90,
      colors["Phonolitic Foidite"],
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
      colors["Tephritic Foidite"],
      isBasaltic ? "Basanitic\nFoidite" : "Tephritic\nFoidite",
      -107,
      -36,
      obj.bottom_,
      0,
      "start",
    ],
    [0, 100, 90, 100, colors["F2"], "F2", 2, -3],
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

export const VFAP = (obj: any, andesite: string, isBasaltic: boolean) => {
  const colors = obj.config.colors;
  const y = 30;
  const y2 = 350;
  return [
    [0, 100, 90, 100, colors["F2"], "F2", 0, y + 70, obj.top_],
    [
      0,
      50,
      60,
      90,
      colors["Phonolitic Foidite"],
      "Phonolitic\nFoidite",
      -50,
      y2,
      obj.top_,
      0,
      "center",
    ],
    [
      100,
      50,
      60,
      90,
      colors["Tephritic Foidite"],
      isBasaltic ? "Basanitic\nFoidite" : "Tephritic\nFoidite",
      50,
      y2,
      obj.top_,
      0,
      "center",
    ],
    [
      0,
      10,
      60,
      10,
      colors["Phonolite"],
      "Phonolite",
      25,
      y,
      obj.top_,
      -1.172 + obj.config.rAlkali,
    ],
    [
      50,
      10,
      60,
      10,
      colors["Tephritic Phonolite"],
      "Tephritic\nPhonolite",
      0,
      y + 100,
      obj.top_,
    ],
    [
      50,
      90,
      60,
      10,
      colors["Phonolitic Tephrite"],
      isBasaltic ? "Phonolitic\nBasanite" : "Phonolitic\nTephrite",
      0,
      y + 100,
      obj.top_,
    ],
    [
      100,
      90,
      60,
      10,
      colors["Tephrite"],
      isBasaltic ? "Basanite" : "Tephrite",
      -25,
      y,
      obj.top_,
      1.172 - obj.config.rAlkali,
    ],
    [0, 10, 0, 10, colors["F1"], "F1", 0, y, obj.top_],
    [
      35,
      10,
      0,
      10,
      colors["Foid-Bearing Trachyte"],
      "Foid-Bearing\nTrachyte",
      0,
      y,
      obj.top_,
    ],
    [
      35,
      65,
      0,
      10,
      colors["Foid-Bearing Latite"],
      "Foid-Bearing\nLatite",
      0,
      y,
      obj.top_,
    ],
    [100, 65, 0, 10, colors["Andesite"], andesite, 0, y, obj.top_],
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

export const VFAPGridLabel = (obj: any) => {
  const fontSize = obj.config.fontSizeAxisLabel;
  const y = 110;
  const y2 = 54;
  const x = -105;
  return [
    [0, 10, "10", x, y2, fontSize],
    [0, 60, "60", x, y2, fontSize],
    [0, 90, "90", x, y2, fontSize],
    [10, 0, "10", -60, y, fontSize],
    [35, 0, "35", -60, y, fontSize],
    [50, 0, "50", -60, y, fontSize],
    [65, 0, "65", -30, y, fontSize],
    [90, 0, "90", -30, y, fontSize],
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
  const y4 = 55;
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

export const VFAPAxisLabel = (obj: any) => {
  const y = obj.h - 140;
  return [
    ["F", obj.w / 2 - 1, 140],
    ["A", 140, y],
    ["P", obj.w - 130, y],
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
