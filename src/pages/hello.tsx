// pages/plotting.tsx
import { useState } from "react";
import Image from "next/image";
import imageUpload from "../utils/uploadImage";

interface Circle {
  x: number;
  y: number;
}

export default function Plotting() {
  const [image, setImage] = useState<string | null>(null);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [imageWidth, setImageWidth] = useState<number>(0);
  const [imageHeight, setImageHeight] = useState<number>(0);

  const handleImageUpload = (e: any) => {
    imageUpload(e, (img:any) => {
      setImageWidth(img.width);
      setImageHeight(img.height);
      setImage(img.src);
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const gridSize = Math.min(imageWidth, imageHeight) / 10;
    const circleX = Math.floor(x / gridSize) * gridSize + gridSize / 2;
    const circleY = Math.floor(y / gridSize) * gridSize + gridSize / 2;

    setCircles([...circles, { x: circleX, y: circleY }]);
  };

  const gridSize = Math.min(imageWidth, imageHeight) / 10;

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <div
          style={{ position: "relative", display: "inline-block" }}
          onClick={handleClick}
        >
          <Image
            src={image}
            alt="Thin Section"
            style={{ maxWidth: "100%" }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            {[...Array(10)].map((_, row) => (
              <div key={row} style={{ position: "relative", height: "10%" }}>
                {[...Array(10)].map((_, col) => (
                  <div
                    key={col}
                    style={{
                      position: "absolute",
                      top: `${row * 10}%`,
                      left: `${col * 10}%`,
                      width: "10%",
                      height: "10%",
                      border: "1px solid rgba(255, 0, 0, 0.5)",
                      boxSizing: "border-box",
                    }}
                  ></div>
                ))}
              </div>
            ))}
            {circles.map((circle, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  top: circle.y - 5,
                  left: circle.x - 5,
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "red",
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
