import { useState } from "react";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import { canvasConfigType } from "@/types/types";

const Legend = ({ canvasConfig }: {canvasConfig: canvasConfigType}) => {
  const scale = canvasConfig.fontSizeLegend / 10;
  // const [position, setPosition] = useState({ top: canvasConfig.yLegend, left: canvasConfig.xLegend });
  const [isDragging, setIsDragging] = useState(false);
  // const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  // make this div can move by dragging
  // let startPosition = { x: 0, y: 0 };
  let previousPosition = { x: 0, y: 0 };

  return (
    <div
      style={
        { "--scale": scale, top: canvasConfig.yLegend, left: canvasConfig.xLegend } as any
      }
      className={`absolute md:left-0 text-gray-700 bg-gray-100 shadow p-2 transform scale-[var(--scale)] group`}
      // onMouseDown={(e) => {
      //   setIsDragging(true);
      //   e.preventDefault();
      // }}
      // onMouseUp={() => {
      // setIsDragging(false);
      // }}
      // onMouseLeave={() => {
      //   setIsDragging(false);
      // }}
      // onMouseMove={(e) => {
      //   if (isDragging) {
      //     console.log(e.movementX, e.movementY);
      //     setPosition({
      //       top: position.top + e.movementY,
      //       left: position.left + e.movementX,
      //     });
      //   }
      // }}
      // onTouchStart={(e) => {
      //   const touch = e.touches[0];
      //   const startPosition = { x: touch.screenX, y: touch.screenY };
      //   setStartPosition(startPosition);
      //   setIsDragging(true);
      //   // log
      //   // console.log("start", startPosition);
      //   // e.preventDefault();
      // }}
      // onTouchEnd={() => {
      //   setIsDragging(false);
      // }}
      // onTouchMove={(e) => {
      //   if (isDragging) {
      //     const touch = e.touches[0];
      //     // console.log(touch, startPosition.x -touch.screenX);
      //     setPosition({
      //       top: position.top + touch.screenY - startPosition.y,
      //       left: position.left + touch.screenX - startPosition.x,
      //     });
      //     setStartPosition({ x: touch.screenX, y: touch.screenY });
      //   }
      // }
      // }
    // onTouchCancelCapture={() => {
    //   setIsDragging(false);
    // }}
    >
      <div className={`${isDragging && "group-hover:text-gray-100"}`}>
        <div className="font-bold text-base">IUGS Classification</div>
        <div className="text-[0.7rem]">Volcanic/Aphanitic Rocks</div>
        <div className="text-[0.7rem]">2a. Volcanic rocks with quartz</div>
        <div className="flex flex-col space-y-2 py-2 text-[0.7rem]">
          <div className="">
            <div className="">Q = Quartz</div>
            <div className="">A = Alkali Feldspar</div>
            <div className="">P = Plagioclase Feldspar</div>
          </div>
          <div className="">
            <div className="">Q1. Alkali feldspar Trachyte</div>
            <div className="">Q2. Quartz Alkali Feldspar Trachyte</div>
          </div>
        </div>
      </div>
      <div
        className={`${isDragging && "group-hover:flex group-hover:flex-col"}  hidden absolute w-full h-full bg-green-50 items-center justify-center left-0 top-0`}
        onClick={() => {
          setIsDragging(false);
          console.log("clicked");
        }}
      >
        <OpenWithIcon fontSize="large" className="text-green-600" />
        {isDragging ? "Dragging" : "Not Dragging"}
      </div>
    </div>
  );
};
export default Legend;
