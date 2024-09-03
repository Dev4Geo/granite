import { canvasConfigType, graphType, symbolType } from "@/types/types";
import {
  VQAP,
  VQAP4,
  VFAP,
  VQAPGridLabel,
  VQAPAxisCircle,
  VQAPAxisLabel,
  VFAPAxisLabel,
  VQAPF,
  VQAPFGridLabel,
  VFAPGridLabel,
  VQAPFAxisCircle,
  VQAPFAxisLabel,
} from "./drawInfo";

type line = [number, number, number];

class TernaryGraph {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private offset: number;
  initialWidth: number;
  w: number;
  h: number;
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
    this.ctx = canvas.getContext("2d")!;

    // canvas size
    canvas.width = 4000;
    canvas.height = 4000;
    this.offset = 200;

    const initial = canvas.width;
    this.initialWidth = initial;
    const s = initial * config.ratio;

    // drawing size
    this.w = this.nAxis <= 3 ? s : s / 1.5;
    this.h = initial;

    if (this.nAxis <= 3) {
      this.left = { x: this.offset, y: this.h - this.offset };
      this.right = { x: this.w - this.offset, y: this.h - this.offset };
      this.top_ = { x: this.w * 0.5, y: this.offset };
      this.bottom_ = { x: 0, y: 0 };
    } else {
      const xShift = (initial - this.w) * 0.5;
      this.left = { x: xShift + this.offset, y: initial * 0.5 };
      this.right = {
        x: initial - this.offset - xShift,
        y: initial * 0.5,
      };
      this.top_ = { x: initial / 2, y: this.offset };
      this.bottom_ = { x: initial / 2, y: initial - this.offset };
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
    } else if (this.graphType === "vFAP") {
      this.drawVolcanicFAP();
    }
  }
  drawVolcanicFAP() {
    this.drawTriangleFrame(this.left, this.top_, this.right);
    const draw = this.config.isShowGrid;
    // mafic 35
    const andesite =
      this.config.maficMineral < 35 ? "Andesite\n(M<35)" : "Basalt\n(M>35)";
    const isBasaltic = this.config.olivineModal > 10;
    const data = VFAP(this, andesite, isBasaltic);

    data.forEach((d: any) => {
      this.doFill.apply(this, d);
    });
    this.drawEdge(VFAPAxisLabel, VQAPAxisCircle);

    const dm10 = this.drawLineParallelQ(10, draw);
    const dm60 = this.drawLineParallelQ(60, draw);
    const dm90 = this.drawLineParallelQ(90, draw);
    this.drawLineParallelQ(0, false, this.bottom_);

    this.drawVerticalQ(10, dm60, draw);
    this.drawVerticalQ(50, dm90, draw, dm10);
    this.drawVerticalQ(90, dm60, draw, dm10);
    this.drawVerticalQ(35, dm10, draw);
    this.drawVerticalQ(65, dm10, draw);

    if (this.config.isShowGridLabel) {
      const d = VFAPGridLabel(this);
      d.forEach((d: any) => {
        this.drawText({
          horizontal: d[0] as number,
          vertical: d[1] as number,
          text: d[2] as string,
          offsetX: d[3] as number,
          offsetY: d[4] as number,
          fontSize: d[5] as number,
          top: d[6],
        });
      });
    }
  }

  drawVolcanicQAPF() {
    this.drawTriangleFrame(this.left, this.top_, this.right, this.bottom_);
    const draw = this.config.isShowGrid;

    // mafic 35
    const andesite =
      this.config.maficMineral < 35 ? "Andesite\n(M<35)" : "Basalt\n(M>35)";

    const isBasaltic = this.config.olivineModal > 10;
    const data = VQAPF(this, andesite, isBasaltic);

    data.forEach((d: any) => {
      this.doFill.apply(this, d);
    });
    this.drawEdge(VQAPFAxisLabel, VQAPFAxisCircle);
    const dm10 = this.drawLineParallelQ(10, draw, this.bottom_);
    const dm60 = this.drawLineParallelQ(60, draw, this.bottom_);
    const dm90 = this.drawLineParallelQ(90, draw, this.bottom_);
    this.drawLineParallelQ(0, false, this.bottom_);

    // this.drawVerticalQ(65, d60, draw);
    this.drawVerticalQ(10, dm60, draw);
    this.drawVerticalQ(50, dm90, draw, dm10);
    this.drawVerticalQ(90, dm60, draw, dm10);
    this.drawVerticalQ(35, dm10, draw);
    this.drawVerticalQ(65, dm10, draw);

    // draw upper triangle
    this.drawVolcanicQAP(false);
    this.drawFrameBottom(0, 65);

    this.drawLegend(
      -100,
      200,
      "IUGS Classification",
      `2b. Volcanic/Aphanitic Rocks`,
      `Q = Quartz
A = Alkali feldspar
P = Plagioclase feldspar
F = Feldspathoid (Foid)
`,
      `Q1. Alkali feldspar trachyte
Q2. Quartz alkali feldspar trachyte
F1. Foid-bearing alkali feldspar trachyte
F2. Foidite
`,
    );
  }

  drawVolcanicQAP(nAxis3 = true) {
    const colors = this.config.colors;
    const data = nAxis3 ? VQAP(this) : VQAP4(this);

    const andesite =
      this.config.maficMineral < 35 ? "Andesite\n(M<35)" : "Basalt\n(M>35)";
    // fill color and text
    data.forEach((d: any) => {
      this.doFill.apply(this, d);
    });
    if (nAxis3) {
      const data2 = [
        [65, 100, 0, 20, colors["Andesite"], andesite, 0, 28, this.top_],
      ];
      data2.forEach((d: any) => {
        this.doFill.apply(this, d);
      });
    }
    if (nAxis3) {
      this.drawTriangleFrame(this.left, this.top_, this.right);
      this.drawEdge(VQAPAxisLabel, VQAPAxisCircle);
    }
    const draw = this.config.isShowGrid;
    const d20 = this.drawLineParallelQ(20, draw);
    const d60 = this.drawLineParallelQ(60, draw);
    if (this.config.isShowGridLabel) {
      const d = nAxis3 ? VQAPGridLabel(this) : VQAPFGridLabel(this);
      d.forEach((d: any) => {
        this.drawText({
          horizontal: d[0] as number,
          vertical: d[1] as number,
          text: d[2] as string,
          offsetX: d[3] as number,
          offsetY: d[4] as number,
          fontSize: d[5] as number,
          top: d[6],
        });
      });
    }
    this.drawVerticalQ(10, d60, draw);
    this.drawVerticalQ(35, d20, draw);
    this.drawVerticalQ(65, d60, draw);

    this.drawFivePercentLine(draw);
    this.d5 = this.drawLineParallelQ(5, false);
    this.d20 = d20;
    this.d60 = d60;
    if (nAxis3) {
      this.drawLegend(
        400,
        200,
        "IUGS Classification",
        `Volcanic/Aphanitic Rocks
2a. Volcanic rocks with quartz`,
        `Q = Quartz
A = Alkali feldspar
P = Plagioclase feldspar
`,
        `Q1. Alkali feldspar trachyte
Q2. Quartz alkali feldspar trachyte
`,
      );
    }
  }

  drawLegend(
    offsetX: number,
    offsetY: number,
    title: string,
    subtitle: string,
    ...texts: string[]
  ) {
    if (!this.config.isShowLegend) {
      return;
    }

    const fontSize = this.config.fontSizeLegend;
    const x = this.config.xLegend + offsetX;
    const oldColor = this.ctx.fillStyle;
    const ctx = this.ctx;
    let nextY = offsetY;

    // align start
    ctx.textAlign = "start";
    ctx.fillStyle = this.config.colorLegend;
    ctx.font = `bold ${fontSize * 1.5}px Arial`;
    ctx.fillText(title, x, nextY);
    nextY += fontSize;

    ctx.font = `${fontSize * 1.1}px Arial`;
    const subtitles = subtitle.split("\n");
    subtitles.forEach((line) => {
      ctx.fillText(line, x, nextY * 1.1);
      nextY += fontSize * 1.1;
    });
    nextY += fontSize * 0.9;

    ctx.font = `${fontSize}px Arial`;
    texts.forEach((text) => {
      const lines = text.split("\n");
      lines.forEach((line) => {
        ctx.fillText(line, x, nextY);
        nextY += fontSize;
      });
      nextY -= fontSize * 0.5;
    });
    ctx.fillStyle = oldColor;
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
  drawText({
    horizontal,
    vertical,
    text,
    offsetX,
    offsetY,
    fontSize,
    top = this.top_,
  }: {
    horizontal: number;
    vertical: number;
    text: string;
    offsetX: number;
    offsetY: number;
    fontSize: number;
    top: { x: number; y: number };
  }) {
    const ratio = horizontal / 100;
    const [y, xa, xb] = this.drawLineParallelQ(vertical, false, top);
    const x = xa + (xb - xa) * ratio;
    this.drawTextWithLineBreaks(
      text,
      [
        [x, y],
        [x, y - (this.h / 500) * 8],
      ],
      offsetX,
      offsetY,
      0,
      "start",
      fontSize,
    );
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
    centerY += offsetY;
    const lines = text.split("\n");
    const startY = centerY - (lines.length / 2) * lineHeight + lineHeight / 2;
    fontSize = fontSize;
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

  getCenter(lists: number[][]) {
    const x = lists.map((l) => l[0]).reduce((a, b) => a + b) / lists.length;
    const y = lists.map((l) => l[1]).reduce((a, b) => a + b) / lists.length;
    return [x, y];
  }

  fillRotatedText(text: string, box: number[][]) {
    if (!this.config.isShowRockNames) {
      return;
    }
    let [x, y] = this.getCenter(box);
    this.ctx.save();
    this.ctx.translate(x - this.config.xAlkali, y + this.config.yAlkali);
    this.ctx.rotate(-Math.PI / (1.66 + this.config.rAlkali));
    this.ctx.fillStyle = this.config.rockNameColor;
    this.ctx.fillText(text, 0, 0);
    this.ctx.restore();
  }

  fillColor(color: string, points: number[][]) {
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

  plot(
    top: number,
    left: number,
    right: number,
    bottom: number = 0,
    symbol: symbolType = "red",
  ) {
    const p = this.getCoordinate(top, left, right, bottom);
    this.drawPoint(p, symbol, this.config.plotSize);
  }

  drawPoint(point: number[], symbol: string, size = 5) {
    const [x, y] = point;
    const oldColor = this.ctx.fillStyle;
    this.ctx.beginPath();
    this.ctx.fillStyle = symbol;
    this.ctx.arc(x, y, size, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.fillStyle = oldColor;
  }

  getCoordinate(Q: number, A: number, P: number, F: number) {
    [Q, A, P, F] = [
      Number(Q) || 0,
      Number(A) || 0,
      Number(P) || 0,
      Number(F) || 0,
    ];
    const top = Q > F ? Q : F;
    const top_ = Q > F ? this.top_ : this.bottom_;
    console.log(Q > F ? "top" : "bot");
    const sum = top + A + P;
    const percentageTop = top / sum;
    const percentageA = A / sum;
    const percentageP = P / sum;
    const ratioX = percentageP / (percentageA + percentageP);
    const [y, x1, x2] = this.drawLineParallelQ(
      percentageTop * 100,
      false,
      top_,
    );
    const x = x1 + (x2 - x1) * ratioX;
    return [x, y];
  }

  drawFivePercentLine(draw = true) {
    if (!draw) {
      return;
    }
    const ratio = 0.05;
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
    offestX: number = 0,
    offsetY: number = 0,
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
    this.ctx.lineWidth = this.config.gridWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(xAP, ys);
    this.ctx.lineTo(x, y);

    this.ctx.stroke();
    this.ctx.strokeStyle = oldColor;

    const pos = textPos === "a" ? [x, y] : [xAP, ys];
    this.drawTextWithLineBreaks(text, [pos], offestX, offsetY);
  }

  drawTriangleFrame(...lines: { x: number; y: number }[]) {
    const oldColor = this.ctx.strokeStyle;
    this.ctx.lineWidth = this.config.gridWidth;
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

  drawEdge(axisLabelFunc: any, circleFunc: any) {
    // set font size using config
    const ctx = this.ctx;
    if (this.config.isShowAxis) {
      ctx.save();
      const fontSize = this.config.fontSizeAxis;
      ctx.fillStyle = this.config.axisColor;
      ctx.font = `${fontSize}px Arial`;
      const d = axisLabelFunc(this);
      d.forEach((d: any) => {
        this.ctx.fillText(d[0], d[1], d[2]);
      });
      ctx.restore();
    }

    if (this.config.isShowCircle) {
      ctx.save();
      const d = circleFunc(this);
      d.forEach((d: any) => {
        this.drawPoint([d[0], d[1]], d[2]);
      });
      ctx.restore();
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
      this.ctx.lineWidth = this.config.gridWidth;
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
    if (!this.config.isShowGrid) {
      return;
    }
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

    if (this.config.isShowColors) {
      this.fillColor(color, box);
    }

    if (this.config.isShowRockNames) {
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
}

export default TernaryGraph;
