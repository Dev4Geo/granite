import { canvasConfigType } from "@/types/types";

type symbolType = "red" | "green" | "blue" | "black";

class TernaryGraph {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private offset: number;
  private w: number;
  private h: number;
  private left: { x: number; y: number };
  private right: { x: number; y: number };
  private top_: { x: number; y: number };
  private d5: [number, number, number];
  private d20: [number, number, number];
  private d60: [number, number, number];
  private fontSize: number;
  private config: canvasConfigType;

  constructor(canvas: HTMLCanvasElement, config: canvasConfigType) {
    this.config = config;
    this.canvas = canvas;
    const ratio = window.devicePixelRatio;
    this.ctx = canvas.getContext("2d")!;
    this.offset = 30;
    this.w = config.width;
    this.h = config.height;
    canvas.width = this.w * ratio;
    canvas.height = this.h * ratio;
    canvas.style.width = `${this.w}px`;
    canvas.style.height = `${this.h}px`;
    this.ctx.scale(ratio, ratio);

    this.left = { x: this.offset, y: this.h - this.offset };
    this.right = { x: this.w - this.offset, y: this.h - this.offset };
    this.top_ = { x: this.w / 2, y: this.offset };
    this.d5 = [0, 0, 0];
    this.d20 = [0, 0, 0];
    this.d60 = [0, 0, 0];
    this.fontSize = config.fontSize;
    this.ctx.font = `${this.fontSize}px Arial`;
  }

  drawTriangle() {
    this.drawTriangleFrame();
    this.drawEdgePoints();
    const draw = this.config.isShowGrid;
    const d20 = this.drawLineParallelQ(20, draw);
    const d60 = this.drawLineParallelQ(60, draw);
    this.drawVerticalQ(10, d60, draw);
    this.drawVerticalQ(35, d20, draw);
    this.drawVerticalQ(65, d60, draw);
    this.drawFivePercentLine(draw);
    this.d5 = this.drawLineParallelQ(5, false);
    this.d20 = d20;
    this.d60 = d60;
    const colors = this.config.colors;
    this.drawQuartzRichArea(colors["Quartz Rich"]);
    this.drawAlkaliFeldsparRhyoliteArea(colors["Alkali Feldspar Rhyolite"]);
    this.drawRhyoliteArea(colors["Rhyolite"]);
    this.drawDaciteArea(colors["Dacite"]);
    this.drawQ2Area(colors["Q2"]);
    this.drawQuartzTrachyteArea(colors["Quartz Trachyte"]);
    this.drawQuartzLatiteArea(colors["Quartz Latite"]);
    this.drawQ1Area(colors["Q1"]);
    this.drawTrachyteArea(colors["Trachyte"]);
    this.drawLatiteArea(colors["Latite"]);
    this.drawAndesiteArea(colors["Andesite"]);
  }

  getCenter(lists: number[][]) {
    const x = lists.map((l) => l[0]).reduce((a, b) => a + b) / lists.length;
    const y = lists.map((l) => l[1]).reduce((a, b) => a + b) / lists.length;
    return [x, y];
  }

  fillText(text: string, box: number[][]) {
    if (!this.config.isShowRockNames) {
      return;
    }
    let [x, y] = this.getCenter(box);
    // x -= text.length * 5;
    // y += 5;
    // relative to font size
    x -= text.length * this.fontSize * 0.2;
    y += this.fontSize * 0.3;

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

  drawQuartzRichArea(color: string) {
    const box = [
      [this.top_.x, this.top_.y],
      [this.d60[1], this.d60[0]],
      [this.d60[2], this.d60[0]],
    ];
    this.fillColor(color, box);
    this.fillText("Quartz Rich", box);
  }

  drawAlkaliFeldsparRhyoliteArea(color: string) {
    const ratio = 0.1;
    let [yTop, x1Top, x2Top] = this.d60;
    x2Top = x1Top + (x2Top - x1Top) * ratio;
    let [yBottom, x1Bottom, x2Bottom] = this.d20;
    x2Bottom = x1Bottom + (x2Bottom - x1Bottom) * ratio;
    const box = [
      [x1Top, yTop],
      [x2Top, yTop],
      [x2Bottom, yBottom],
      [x1Bottom, yBottom],
    ];
    this.fillColor(color, box);
    this.fillRotatedText("Alkali Feldspar Rhyolite", box);
  }

  drawRhyoliteArea(color: string) {
    const ratioA = 0.1;
    const ratioB = 0.65;
    let [yTop, x1Top, x2Top] = this.d60;
    const a = x1Top + (x2Top - x1Top) * ratioA;
    const b = x1Top + (x2Top - x1Top) * ratioB;
    let [yBottom, x1Bottom, x2Bottom] = this.d20;
    const c = x1Bottom + (x2Bottom - x1Bottom) * ratioB;
    const d = x1Bottom + (x2Bottom - x1Bottom) * ratioA;
    const box = [
      [a, yTop],
      [b, yTop],
      [c, yBottom],
      [d, yBottom],
    ];
    this.fillColor(color, box);
    this.fillText("Rhyolite", box);
  }

  drawDaciteArea(color: string) {
    const ratioA = 0.65;
    let [yTop, x1Top, x2Top] = this.d60;
    const a = x1Top + (x2Top - x1Top) * ratioA;
    const b = x2Top;

    let [yBottom, x1Bottom, x2Bottom] = this.d20;
    const c = x2Bottom;
    const d = x1Bottom + (x2Bottom - x1Bottom) * ratioA;
    const box = [
      [a, yTop],
      [b, yTop],
      [c, yBottom],
      [d, yBottom],
    ];
    this.fillColor(color, box);
    this.fillText("Dacite", box);
  }

  drawQ2Area(color: string) {
    const ratioA = 0.1;
    let [yTop, x1Top, x2Top] = this.d20;
    const a = x1Top;
    const b = x1Top + (x2Top - x1Top) * ratioA;
    let [yBottom, x1Bottom, x2Bottom] = this.d5;
    const c = x1Bottom + (x2Bottom - x1Bottom) * ratioA;
    const d = x1Bottom;
    const box = [
      [a, yTop],
      [b, yTop],
      [c, yBottom],
      [d, yBottom],
    ];
    this.fillColor(color, box);
    this.fillText("Q2", box);
  }

  drawQuartzTrachyteArea(color: string) {
    const ratioA = 0.1;
    const ratioB = 0.35;
    let [yTop, x1Top, x2Top] = this.d20;
    const a = x1Top + (x2Top - x1Top) * ratioA;
    const b = x1Top + (x2Top - x1Top) * ratioB;
    let [yBottom, x1Bottom, x2Bottom] = this.d5;
    const c = x1Bottom + (x2Bottom - x1Bottom) * ratioB;
    const d = x1Bottom + (x2Bottom - x1Bottom) * ratioA;

    const box = [
      [a, yTop],
      [b, yTop],
      [c, yBottom],
      [d, yBottom],
    ];
    this.fillColor(color, box);
    this.fillText("Quartz Trachyte", box);
  }

  drawQuartzLatiteArea(color: string) {
    const ratioA = 0.35;
    const ratioB = 0.65;
    let [yTop, x1Top, x2Top] = this.d20;
    const a = x1Top + (x2Top - x1Top) * ratioA;
    const b = x1Top + (x2Top - x1Top) * ratioB;
    let [yBottom, x1Bottom, x2Bottom] = this.d5;
    const c = x1Bottom + (x2Bottom - x1Bottom) * ratioB;
    const d = x1Bottom + (x2Bottom - x1Bottom) * ratioA;

    const box = [
      [a, yTop],
      [b, yTop],
      [c, yBottom],
      [d, yBottom],
    ];
    this.fillColor(color, box);
    this.fillText("Quartz Latite", box);
  }

  drawQ1Area(color: string) {
    const ratioA = 0.1;
    let [yTop, x1Top, x2Top] = this.d5;
    const a = x1Top;
    const b = x1Top + (x2Top - x1Top) * ratioA;
    const c = this.left.x + (this.right.x - this.left.x) * ratioA;
    const d = this.left.x;

    const box = [
      [a, yTop],
      [b, yTop],
      [c, this.left.y],
      [d, this.left.y],
    ];
    this.fillColor(color, box);
    this.fillText("Q1", box);
  }

  drawTrachyteArea(color: string) {
    const ratioA = 0.1;
    const ratioB = 0.35;
    let [yTop, x1Top, x2Top] = this.d5;
    const a = x1Top + (x2Top - x1Top) * ratioA;
    const b = x1Top + (x2Top - x1Top) * ratioB;
    const c = this.left.x + (this.right.x - this.left.x) * ratioB;
    const d = this.left.x + (this.right.x - this.left.x) * ratioA;

    const box = [
      [a, yTop],
      [b, yTop],
      [c, this.left.y],
      [d, this.left.y],
    ];
    this.fillColor(color, box);
    this.fillText("Trachyte", box);
  }

  drawLatiteArea(color: string) {
    const ratioA = 0.35;
    const ratioB = 0.65;
    let [yTop, x1Top, x2Top] = this.d5;
    const a = x1Top + (x2Top - x1Top) * ratioA;
    const b = x1Top + (x2Top - x1Top) * ratioB;
    const c = this.left.x + (this.right.x - this.left.x) * ratioB;
    const d = this.left.x + (this.right.x - this.left.x) * ratioA;

    const box = [
      [a, yTop],
      [b, yTop],
      [c, this.left.y],
      [d, this.left.y],
    ];
    this.fillColor(color, box);
    this.fillText("Latite", box);
  }

  drawAndesiteArea(color: string) {
    const ratioA = 0.65;
    let [yTop, x1Top, x2Top] = this.d20;
    const a = x1Top + (x2Top - x1Top) * ratioA;
    const b = x2Top;
    const c = this.right.x;
    const d = this.left.x + (this.right.x - this.left.x) * ratioA;

    const box = [
      [a, yTop],
      [b, yTop],
      [c, this.right.y],
      [d, this.left.y],
    ];
    this.fillColor(color, box);
    const text =
      this.config.maficMineral > 35 ? "Basalt (M>35%)" : "Andesite (M<35%)";
    this.fillText(text, box);
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

  drawPoint(point: number[], symbol: symbolType) {
    const [x, y] = point;
    const oldColor = this.ctx.fillStyle;
    this.ctx.beginPath();
    this.ctx.fillStyle = symbol;
    this.ctx.arc(x, y, 5, 0, Math.PI * 2);
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

  drawFivePercentLine(draw=true) {
    if (!draw){
      return
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

  drawVerticalQ(percentageX: number, d: number[], draw=true) {
    if (!draw){
      return
    }
    const [y, xa, xb] = d;
    const ratioX = percentageX / 100;

    const xAP = this.left.x + (this.right.x - this.left.x) * ratioX;
    const x = xa + (xb - xa) * ratioX;

    const oldColor = this.ctx.strokeStyle;
    this.ctx.strokeStyle = this.config.gridColor;
    this.ctx.beginPath();
    this.ctx.moveTo(xAP, this.left.y);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.strokeStyle = oldColor;
  }

  drawTriangleFrame() {
    const oldColor = this.ctx.strokeStyle;
    this.ctx.strokeStyle = this.config.gridColor;
    this.ctx.beginPath();
    this.ctx.moveTo(this.left.x, this.left.y);
    this.ctx.lineTo(this.top_.x, this.top_.y);
    this.ctx.lineTo(this.right.x, this.right.y);
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
      this.ctx.fillText("A", this.offset / 2, this.h - this.offset / 2);
      this.ctx.fillText("P", this.w - this.offset, this.h - this.offset / 2);
      this.ctx.font = oldFont;
    }

    if (this.config.isShowCircle) {
      const c = "black";
      this.drawPoint([this.left.x, this.left.y], c);
      this.drawPoint([this.right.x, this.right.y], c);
      this.drawPoint([this.top_.x, this.top_.y], c);
    }
  }

  drawLineParallelQ(percentage: number, draw = true): [number, number, number] {
    const ratio = percentage / 100;
    const y = this.left.y + (this.top_.y - this.left.y) * ratio;
    const xAQ = this.left.x + (this.top_.x - this.left.x) * ratio;
    const xPQ = this.right.x + (this.top_.x - this.right.x) * ratio;
    const x1 = xAQ;
    const x2 = xPQ;
    if (draw) {
      const oldColor = this.ctx.strokeStyle;
      this.ctx.strokeStyle = this.config.gridColor;
      this.ctx.beginPath();
      this.ctx.moveTo(xAQ, y);
      this.ctx.lineTo(xPQ, y);
      this.ctx.stroke();
      this.ctx.strokeStyle = oldColor
    }
    return [y, x1, x2];
  }
}

export default TernaryGraph;
