import { useState } from "react";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import { canvasConfigType } from "@/types/types";
import LegendVQAP from "../legends/vQAP";
import LegendVQAPF from "../legends/vQAPF";

const Legend = ({ canvasConfig }: { canvasConfig: canvasConfigType }) => {
  const scale = canvasConfig.fontSizeLegend / 100;
  const graphType = canvasConfig.graphType;
  return (
    <div
      style={
        {
          "--scale": scale,
          top: canvasConfig.yLegend,
          left: canvasConfig.xLegend,
        } as any
      }
      className={`absolute md:left-0 text-gray-700 bg-gray-100 shadow p-2 transform scale-[var(--scale)] group`}
    >
      {graphType === "vQAP" && <LegendVQAP />}
      {graphType === "vQAPF" && <LegendVQAPF />}
    </div>
  );
};
export default Legend;
