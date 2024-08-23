import { useEffect, useRef } from "react";

class TernaryGraph {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private offset: number;
  private w: number;
  private h: number;
  private left: { x: number; y: number };
  private right: { x: number; y: number };
  private top_: { x: number; y: number };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.offset = 30;
    this.w = canvas.width;
    this.h = canvas.height;
    this.left = { x: this.offset, y: this.h - this.offset };
    this.right = { x: this.w - this.offset, y: this.h - this.offset };
    this.top_ = { x: this.w / 2, y: this.offset };
  }

  drawTriangle() {
    this.drawTriangleFrame();
    this.drawEdgePoints();
    const d20 = this.drawLineParallelQ(20);
    const d60 = this.drawLineParallelQ(60);
    this.drawVerticalQ(10, d60);
    this.drawVerticalQ(35, d20);
    this.drawVerticalQ(65, d60);
    this.drawFivePercentLine();
    this.fillColor("red", [
      [this.top_.x, this.top_.y],
      [d60[1], d60[0]],
      [d60[2], d60[0]],
    ]);
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

  plot(Q: number, A: number, P: number, symbol:"red"|"green"|"blue") {
    const p = this.getCoordinate(Q, A, P);
    this.drawPoint(p, symbol);
  }

  drawPoint(point: number[], symbol: string) {
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

  drawFivePercentLine() {
    const ratio = 5 / 100;
    const y = this.left.y + (this.top_.y - this.left.y) * ratio;
    const xAQ = this.left.x + (this.top_.x - this.left.x) * ratio;
    const xPQ = this.right.x + (this.top_.x - this.right.x) * ratio;

    const x65 = xAQ + (xPQ - xAQ) * 0.65;
    this.ctx.beginPath();
    this.ctx.moveTo(xAQ, y);
    this.ctx.lineTo(x65, y);
    this.ctx.stroke();
  }

  drawVerticalQ(percentageX: number, d: number[]) {
    const [y, xa, xb] = d;
    const ratioX = percentageX / 100;

    const xAP = this.left.x + (this.right.x - this.left.x) * ratioX;
    const x = xa + (xb - xa) * ratioX;

    this.ctx.beginPath();
    this.ctx.moveTo(xAP, this.left.y);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  drawTriangleFrame() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.left.x, this.left.y);
    this.ctx.lineTo(this.top_.x, this.top_.y);
    this.ctx.lineTo(this.right.x, this.right.y);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  drawEdgePoints() {
    this.ctx.font = "20px Arial";
    this.ctx.fillText("Q", this.w / 2 - 7, 20);
    this.ctx.fillText("A", this.offset / 2, this.h - this.offset / 2);
    this.ctx.fillText("P", this.w - this.offset, this.h - this.offset / 2);

    this.drawPoint([this.left.x, this.left.y]);
    this.drawPoint([this.right.x, this.right.y]);
    this.drawPoint([this.top_.x, this.top_.y]);
  }

  drawLineParallelQ(percentage: number, draw = true) {
    const ratio = percentage / 100;
    const y = this.left.y + (this.top_.y - this.left.y) * ratio;
    const xAQ = this.left.x + (this.top_.x - this.left.x) * ratio;
    const xPQ = this.right.x + (this.top_.x - this.right.x) * ratio;
    const x1 = xAQ;
    const x2 = xPQ;
    if (draw) {
      this.ctx.beginPath();
      this.ctx.moveTo(xAQ, y);
      this.ctx.lineTo(xPQ, y);
      this.ctx.stroke();
    }
    return [y, x1, x2];
  }
}


export default TernaryGraph;
