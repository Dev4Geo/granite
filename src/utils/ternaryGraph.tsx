import { canvasConfigType, graphType, symbolType } from "@/types/types";

type line = [number, number, number];

class TernaryGraph {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private offset: number;
  private w: number;
  private h: number;
  private left: { x: number; y: number };
  private right: { x: number; y: number };
  private top_: { x: number; y: number };
  private bottom_: { x: number; y: number };
  private d5: [number, number, number];
  private d20: [number, number, number];
  private d60: [number, number, number];
  private fontSize: number;
  private nAxis: number;
  private config: canvasConfigType;
  private graphType: graphType;

  constructor(canvas: HTMLCanvasElement, config: canvasConfigType) {
    this.config = config;
    this.canvas = canvas;
    this.graphType = config.graphType;
    this.nAxis = ["vQAPF"].includes(this.graphType) ? 4 : 3;
    const ratio = window.devicePixelRatio;
    this.ctx = canvas.getContext("2d")!;
    this.offset = 30;
    this.w = this.nAxis <= 3 ? config.width : config.width / 1.5;
    this.h = config.height;
    canvas.width = this.w * ratio;
    canvas.height = this.h * ratio;
    canvas.style.width = `${this.w}px`;
    canvas.style.height = `${this.h}px`;
    this.ctx.scale(ratio, ratio);

    if (this.nAxis <= 3) {
      this.left = { x: this.offset, y: this.h - this.offset };
      this.right = { x: this.w - this.offset, y: this.h - this.offset };
      this.top_ = { x: this.w / 2, y: this.offset };
      this.bottom_ = { x: 0, y: 0 };
    } else {
      this.left = { x: this.offset, y: this.h * 0.5 };
      this.right = {
        x: this.w - this.offset,
        y: this.h * 0.5,
      };
      this.top_ = { x: this.w / 2, y: this.offset };
      this.bottom_ = { x: this.w / 2, y: this.h - this.offset };
    }
    this.d5 = [0, 0, 0];
    this.d20 = [0, 0, 0];
    this.d60 = [0, 0, 0];
    this.fontSize = config.fontSize;
    this.ctx.font = `${this.fontSize}px Arial`;
  }

  // main function
  drawTriangle() {
    if (this.graphType === "vQAPF") {
      this.drawVolcanicQAPF();
    } else if (this.graphType === "vQAP") {
      this.drawVolcanicQAP();
    }
  }
  drawVolcanicQAPF() {
    this.drawTriangleFrame(this.left, this.top_, this.right, this.bottom_);
    const draw = this.config.isShowGrid;

    // mafic 35
    const andesite =
      this.config.maficMineral < 35 ? "Andesite\n(M<35)" : "Basalt\n(M>35)";
    const andesiteColor = "#f0A1c0";
    const data = [
      [0, 10, 0, 10, "#f011f0", "F1", 0, 0],
      [10, 35, 0, 10, "#f0A1f0", "Foid-Bearing\nTrachyte", 0, 0],
      [35, 65, 0, 10, "#a0A1f0", "Foid-Bearing\nLatite", 0, 0],
      [65, 100, 0, 10, andesiteColor, "", 0, 0],
      [65, 100, 0, 20, andesiteColor, andesite, 7, 18, this.top_],
      [0, 10, 10, 60, "#a011f0", "Phonolite", -2, 0, this.bottom_, 1.02],
      [10, 50, 10, 60, "#a0A1f0", "Tephritic\nPhonolite", 0, 0],
      [50, 90, 10, 60, "#c0A1c0", "Phonolitic\nBasanite", 0, 0],
      [90, 100, 10, 60, "#a0A1c0", "Basanite", 2, 0, this.bottom_, -1.0],
      [
        0,
        50,
        60,
        90,
        "#a0A1c0",
        "Phonlitic\nFoidite",
        10,
        -12,
        this.bottom_,
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
        -10,
        -12,
        this.bottom_,
        0,
        "start",
      ],
      [0, 100, 90, 100, "#f0A1c0", "F2", 0, 0],
    ];

    data.forEach((d: any) => {
      this.doFill.apply(this, d);
    });
    this.drawEdge4("A", "P", "Q", "F");
    this.drawLineParallelQ(20, draw, this.top_, "20");
    this.drawLineParallelQ(60, draw, this.top_, "60");
    const dm10 = this.drawLineParallelQ(10, draw, this.bottom_, "10");
    const dm60 = this.drawLineParallelQ(60, draw, this.bottom_, "60");
    const dm90 = this.drawLineParallelQ(90, draw, this.bottom_, "90");
    this.drawLineParallelQ(0, false, this.bottom_);
    this.drawVerticalQ(10, dm60, draw, null, "10", "b", 27, 39);
    this.drawVerticalQ(50, dm90, draw, dm10, "50", "b", -8, 7);
    this.drawVerticalQ(90, dm60, draw, dm10, "90", "b", -13, 7);
    this.drawVerticalQ(35, dm10, draw);
    this.drawVerticalQ(65, dm10, draw);
    this.drawVolcanicQAP(false);
    this.drawFrameBottom(0, 65);
  }

  findCenter(box: number[][]) {
    let xSum = 0;
    let ySum = 0;

    box.forEach(([x, y]) => {
      xSum += x;
      ySum += y;
    });

    const centerX = xSum / box.length;
    const centerY = ySum / box.length;

    return [centerX, centerY];
  }

  drawTextWithLineBreaks(
    text: string,
    box: number[][],
    offsetX: number = 0,
    offsetY: number = 0,
    rotatedText: number = 0,
    textAlign: CanvasTextAlign = "center",
    fontSize: number = this.config.fontSize,
  ) {
    const lineHeight = this.config.fontSize * 1.2;
    const ctx = this.ctx;
    let [centerX, centerY] = this.findCenter(box);
    centerX += offsetX;
    centerY += this.config.fontSize * 0.3 + offsetY;
    const lines = text.split("\n");
    const startY = centerY - (lines.length / 2) * lineHeight + lineHeight / 2;
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = textAlign;
    lines.forEach((line, index) => {
      const oldColor = this.ctx.fillStyle;
      ctx.fillStyle = this.config.rockNameColor;
      if (rotatedText !== 0) {
        ctx.save();
        ctx.translate(centerX, startY + index * lineHeight);
        ctx.rotate(rotatedText);
        ctx.fillText(line, 0, 0);
        ctx.restore();
      } else {
        ctx.fillText(line, centerX, startY + index * lineHeight);
      }
      ctx.fillStyle = oldColor;
    });
  }

  drawVolcanicQAP(drawFrame = true) {
    const colors = this.config.colors;
    const data = [
      [
        0,
        100,
        60,
        100,
        colors["Quartz Rich"],
        "Quartz\nRich",
        0,
        10,
        this.top_,
      ],
      [
        0,
        10,
        60,
        20,
        colors["Alkali Feldspar Rhyolite"],
        "Alkali Feldspar Rhyolite",
        2,
        0,
        this.top_,
        -1.096 + this.config.rAlkali,
      ],
      [10, 65, 60, 20, colors["Rhyolite"], "Rhyolite", 0, 0, this.top_],
      [65, 100, 60, 20, colors["Dacite"], "Dacite", 0, 0, this.top_],
      [0, 10, 5, 20, colors["Q2"], "Q2", 0, 0, this.top_],
      [
        10,
        35,
        5,
        20,
        colors["Quartz Trachyte"],
        "Quartz\nTrachyte",
        0,
        0,
        this.top_,
      ],
      [
        35,
        65,
        5,
        20,
        colors["Quartz Latite"],
        "Quartz\nLatite",
        0,
        0,
        this.top_,
      ],
      [0, 10, 0, 5, colors["Q1"], "Q1", 0, 0, this.top_],
      [10, 35, 0, 5, colors["Trachyte"], "Trachyte", 0, 0, this.top_],
      [35, 65, 0, 5, colors["Latite"], "Latite", 0, 0, this.top_],
    ];

    data.forEach((d: any) => {
      this.doFill.apply(this, d);
    });
    if (drawFrame) {
      const data2 = [
        [65, 100, 0, 20, colors["Andesite"], "Andesite", 0, 0, this.top_],
      ];
      data2.forEach((d: any) => {
        this.doFill.apply(this, d);
      });
    }
    if (drawFrame) {
      this.drawTriangleFrame(this.left, this.top_, this.right);
      this.drawEdgePoints();
    }
    const draw = this.config.isShowGrid;
    const d20 = this.drawLineParallelQ(20, draw);
    const d60 = this.drawLineParallelQ(60, draw);
    this.drawVerticalQ(10, d60, draw, null, "10", "b", 44,-69);
    this.drawVerticalQ(35, d20, draw, null, "35", "a", 0,-5);
    this.drawVerticalQ(65, d60, draw, null, "65", "b", -21,-69);

    this.drawFivePercentLine(draw);
    this.d5 = this.drawLineParallelQ(5, false);
    this.d20 = d20;
    this.d60 = d60;
  }

  getCenter(lists: number[][]) {
    const x = lists.map((l) => l[0]).reduce((a, b) => a + b) / lists.length;
    const y = lists.map((l) => l[1]).reduce((a, b) => a + b) / lists.length;
    return [x, y];
  }

  fillText(text: string, box: number[][], offsetX = 0, offsetY = 0) {
    if (!this.config.isShowRockNames) {
      return;
    }
    let [x, y] = this.getCenter(box);
    // x -= text.length * 5;
    // y += 5;
    // relative to font size
    x -= text.length * this.fontSize * 0.2;
    y += this.fontSize * 0.3;
    x += offsetX;
    y += offsetY;

    const oldColor = this.ctx.fillStyle;
    this.ctx.fillStyle = this.config.rockNameColor;
    this.ctx.fillText(text, x, y);
    this.ctx.fillStyle = oldColor;
  }

  fillRotatedText(text: string, box: number[][]) {
    if (!this.config.isShowRockNames) {
      return;
    }
    let [x, y] = this.getCenter(box);
    this.ctx.save();
    this.ctx.translate(
      x - this.w / (20 + this.config.xAlkali),
      y + this.h / (7 + this.config.yAlkali),
    );
    const ratio = this.w / this.h;
    this.ctx.rotate(-Math.PI / (ratio + 1.66 + this.config.rAlkali));
    this.ctx.fillStyle = this.config.rockNameColor;
    this.ctx.fillText(text, 0, 0);
    this.ctx.restore();
  }

  drawArea(
    color: string,
    title: string,
    box: number[][],
    offsetX = 0,
    offsetY = 0,
  ) {
    this.fillColor(color, box);
    this.fillText(title, box, offsetX, offsetY);
  }

  fillColor(color: string, points: number[][]) {
    if (!this.config.isShowColors) {
      return;
    }
    const oldColor = this.ctx.fillStyle;
    const oldAlpha = this.ctx.globalAlpha;
    this.ctx.fillStyle = color;
    this.ctx.globalAlpha = 0.5;
    this.ctx.beginPath();
    this.ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i][0], points[i][1]);
    }
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.fillStyle = oldColor;
    this.ctx.globalAlpha = oldAlpha;
  }

  plot(Q: number, A: number, P: number, symbol: symbolType) {
    const p = this.getCoordinate(Q, A, P);
    this.drawPoint(p, symbol);
  }

  drawPoint(point: number[], symbol: string) {
    const [x, y] = point;
    const oldColor = this.ctx.fillStyle;
    this.ctx.beginPath();
    this.ctx.fillStyle = symbol;
    this.ctx.arc(x, y, 3, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.fillStyle = oldColor;
  }

  getCoordinate(Q: number, A: number, P: number) {
    const sum = Number(Q) + Number(A) + Number(P);
    const percentageQ = Q / sum;
    const percentageA = A / sum;
    const percentageP = P / sum;
    const ratioX = percentageP / (percentageA + percentageP);
    const [y, x1, x2] = this.drawLineParallelQ(percentageQ * 100, false);
    const x = x1 + (x2 - x1) * ratioX;
    return [x, y];
  }

  drawFivePercentLine(draw = true) {
    if (!draw) {
      return;
    }
    const ratio = 5 / 100;
    const y = this.left.y + (this.top_.y - this.left.y) * ratio;
    const xAQ = this.left.x + (this.top_.x - this.left.x) * ratio;
    const xPQ = this.right.x + (this.top_.x - this.right.x) * ratio;

    const x65 = xAQ + (xPQ - xAQ) * 0.65;

    const oldColor = this.ctx.strokeStyle;
    this.ctx.strokeStyle = this.config.gridColor;
    this.ctx.beginPath();
    this.ctx.moveTo(xAQ, y);
    this.ctx.lineTo(x65, y);
    this.ctx.stroke();
    this.ctx.strokeStyle = oldColor;
  }

  drawVerticalQ(
    percentageX: number,
    d: line,
    draw = true,
    s: line | null = null,
    text: string = "",
    textPos: "a" | "b" = "a",
    textOffestX: number = 0,
    textOffsetY: number = 0,
  ) {
    if (!draw) {
      return;
    }
    const [y, xa, xb] = d;
    const ratioX = percentageX / 100;

    let xAP;
    let ys;
    if (s !== null) {
      const [y, xa, xb] = s;
      ys = y;
      xAP = xa + (xb - xa) * ratioX;
    } else {
      xAP = this.left.x + (this.right.x - this.left.x) * ratioX;
      ys = this.left.y;
    }
    const x = xa + (xb - xa) * ratioX;

    const oldColor = this.ctx.strokeStyle;
    this.ctx.strokeStyle = this.config.gridColor;
    this.ctx.beginPath();
    this.ctx.moveTo(xAP, ys);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.strokeStyle = oldColor;

    const pos = textPos === "a" ? [x, y] : [xAP, ys];
    this.drawTextWithLineBreaks(text, [pos], textOffestX, textOffsetY);
  }

  drawTriangleFrame(...lines: { x: number; y: number }[]) {
    const oldColor = this.ctx.strokeStyle;
    this.ctx.strokeStyle = this.config.gridColor;
    this.ctx.beginPath();
    // this.ctx.moveTo(this.left.x, this.left.y);
    // this.ctx.lineTo(this.top_.x, this.top_.y);
    // this.ctx.lineTo(this.right.x, this.right.y);

    const first = lines.shift()!;
    this.ctx.moveTo(first.x, first.y);
    // foreach
    lines.forEach((line) => {
      this.ctx.lineTo(line.x, line.y);
    });

    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.strokeStyle = oldColor;
  }

  drawEdgePoints() {
    // set font size using config
    if (this.config.isShowAxis) {
      const oldFont = this.ctx.font;
      this.ctx.font = `${this.config.fontSizeAxis}px Arial`;
      this.ctx.fillText("Q", this.w / 2 - 7, 20);
      this.ctx.fillText("A", this.offset / 2.5, this.h - this.offset / 2);
      this.ctx.fillText(
        "P",
        this.w - this.offset / 1.3,
        this.h - this.offset / 2,
      );
      this.ctx.font = oldFont;
    }

    if (this.config.isShowCircle) {
      const c = "#505050";
      this.drawPoint([this.left.x, this.left.y], c);
      this.drawPoint([this.right.x, this.right.y], c);
      this.drawPoint([this.top_.x, this.top_.y], c);
    }
  }
  drawEdge4(left: string, right: string, top: string, bottom: string) {
    // set font size using config
    if (this.config.isShowAxis) {
      const oldFont = this.ctx.font;
      this.ctx.font = `${this.config.fontSizeAxis}px Arial`;
      this.drawTextWithLineBreaks(
        top,
        [
          [this.top_.x, this.top_.y],
          [this.top_.x, 0],
        ],
        0,
        0,
        0,
        "center",
        this.config.fontSizeAxis,
      );
      this.drawTextWithLineBreaks(
        bottom,
        [
          [this.bottom_.x, this.bottom_.y],
          [this.bottom_.x, this.h],
        ],
        0,
        0,
        0,
        "center",

        this.config.fontSizeAxis,
      );
      this.drawTextWithLineBreaks(
        left,
        [
          [this.left.x, this.left.y],
          [this.left.x - this.offset, this.left.y],
        ],
        0,
        0,
        0,
        "center",
        this.config.fontSizeAxis,
      );
      this.drawTextWithLineBreaks(
        right,
        [
          [this.right.x, this.right.y],
          [this.right.x + this.offset, this.right.y],
        ],
        0,
        0,
        0,
        "center",
        this.config.fontSizeAxis,
      );
      this.ctx.font = oldFont;
    }

    if (this.config.isShowCircle) {
      const c = "#505050";
      this.drawPoint([this.left.x, this.left.y], c);
      this.drawPoint([this.right.x, this.right.y], c);
      this.drawPoint([this.top_.x, this.top_.y], c);
      this.drawPoint([this.bottom_.x, this.bottom_.y], c);
    }
  }

  drawLineParallelQ(
    percentage: number,
    draw = true,
    top: { x: number; y: number } = this.top_,
    axisLabel: string = "",
  ): [number, number, number] {
    const ratio = percentage / 100;
    const y = this.left.y + (top.y - this.left.y) * ratio;
    const xAQ = this.left.x + (top.x - this.left.x) * ratio;
    const xPQ = this.right.x + (top.x - this.right.x) * ratio;
    const x1 = xAQ;
    const x2 = xPQ;
    if (draw) {
      const oldColor = this.ctx.strokeStyle;
      this.ctx.strokeStyle = this.config.gridColor;
      this.ctx.beginPath();
      this.ctx.moveTo(xAQ, y);
      this.ctx.lineTo(xPQ, y);
      this.ctx.stroke();
      this.ctx.strokeStyle = oldColor;
    }
    this.drawTextWithLineBreaks(axisLabel, [
      [xAQ, y],
      [xAQ - this.offset - 2, y],
    ]);
    return [y, x1, x2];
  }

  drawFrameBottom(sPercent: number, dPercent: number) {
    const xa = this.left.x + ((this.right.x - this.left.x) * sPercent) / 100;
    const xb = this.left.x + ((this.right.x - this.left.x) * dPercent) / 100;
    const y = this.left.y;
    const oldColor = this.ctx.strokeStyle;
    this.ctx.strokeStyle = this.config.gridColor;
    this.ctx.beginPath();
    this.ctx.moveTo(xa, y);
    this.ctx.lineTo(xb, y);
    this.ctx.stroke();
    this.ctx.strokeStyle = oldColor;
  }

  doFill(
    left: number,
    right: number,
    top: number,
    bottom: number,
    color: string,
    title: string,
    offsetX = 0,
    offsetY = 0,
    top_: { x: number; y: number } = this.bottom_,
    rotatedText: number = 0,
    textAlign: CanvasTextAlign = "center",
  ) {
    // find leftTop
    const ratioA = left / 100;
    const ratioB = right / 100;
    const lineTop = this.drawLineParallelQ(top, false, top_);
    const lineBottom = this.drawLineParallelQ(bottom, false, top_);
    const leftTop = lineTop[1] + (lineTop[2] - lineTop[1]) * ratioA;
    const rightTop = lineTop[1] + (lineTop[2] - lineTop[1]) * ratioB;
    const leftBottom = lineBottom[1] + (lineBottom[2] - lineBottom[1]) * ratioA;
    const rightBottom =
      lineBottom[1] + (lineBottom[2] - lineBottom[1]) * ratioB;
    const box = [
      [leftTop, lineTop[0]],
      [rightTop, lineTop[0]],
      [rightBottom, lineBottom[0]],
      [leftBottom, lineBottom[0]],
    ];
    this.fillColor(color, box);
    // this.fillText(title, box, offsetX, offsetY);

    this.drawTextWithLineBreaks(
      title,
      box,
      offsetX,
      offsetY,
      rotatedText,
      textAlign,
    );
  }
}

export default TernaryGraph;
