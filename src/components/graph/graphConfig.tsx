import { useState } from "react";
import { colorTheme } from "@/types/types";
import MySlider from "./mySlider";
import MyCheckbox from "./myCheckbox";
import MyColorInput from "./myColorInput";
import { Button } from "@mui/material";
import MySettingHeader from "./mySettingHeader";

const GraphConfig = ({
  canvasConfig,
  handleFontSize,
  handleFontSizeAxis,
  handleWidth,
  handleHeight,
  handleColor,
  handleReset,
  handleRAlkali,
  handleXAlkali,
  handleYAlkali,
  handleRatio,
  handleMaficMineral,
  handleTheme,
  handleIsShowColors,
  handleIsShowAxis,
  handleIsShowGrid,
  handleIsShowRockNames,
  handleRockNameColor,
  handleGridColor,
  handleIsShowLegend,
  handleIsShowCircle,
  handleFontSizeLegend,
  handleXLegend,
  handleYLegend,
  handleIsShowQAP,
  handleIsShowFAP,
}: any) => {
  const [size, setSize] = useState({
    width: canvasConfig.width,
    height: canvasConfig.height,
  });
  const handleTempWidth = (e: any) => {
    setSize({ ...size, width: e.target.value });
  };
  const handleTempHeight = (e: any) => {
    setSize({ ...size, height: e.target.value });
  };

  const keys = Object.keys(canvasConfig.colors);
  const themes = Object.keys(colorTheme);

  return (
    <div className="bg-gray-100 pl-5 py-3 my-3 shadow w-fit space-y-3">
      {
        // settings section
      }
      <div className="">
        {
          // header
        }
        <div className="flex flex-row items-center text-sm ">
          <MySettingHeader text="Settings" />
          <Button
            size="small"
            className="bg-red-400 text-white rounded m-1 h-5 hover:bg-red-200"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>

        {
          // items
        }
        <div className="flex md:flex-row flex-col justify-start md:space-x-10 items-start">
          <div className="flex flex-col">
            <MyCheckbox
              label={"Show Rock Names"}
              checked={canvasConfig.isShowRockNames}
              onChange={handleIsShowRockNames}
            />
            <MyCheckbox
              label={"Show Colors"}
              checked={canvasConfig.isShowColors}
              onChange={handleIsShowColors}
            />
            <MyCheckbox
              label={"Show Axis Names"}
              checked={canvasConfig.isShowAxis}
              onChange={handleIsShowAxis}
            />
            <MyCheckbox
              label={"Show Axis Markers"}
              checked={canvasConfig.isShowCircle}
              onChange={handleIsShowCircle}
            />
            <MyCheckbox
              label={"Show Grids"}
              checked={canvasConfig.isShowGrid}
              onChange={handleIsShowGrid}
            />
            <MyCheckbox
              label={"Show Legend"}
              checked={canvasConfig.isShowLegend}
              onChange={handleIsShowLegend}
            />
          </div>
          <div className="flex flex-col pl-3">
            <MySlider
              title={`Font-size [${canvasConfig.fontSize}]`}
              min={5}
              max={40}
              value={canvasConfig.fontSize}
              onChange={handleFontSize}
            />
            <MySlider
              title={`Axis font-size [${canvasConfig.fontSizeAxis}]`}
              min={5}
              max={40}
              value={canvasConfig.fontSizeAxis}
              onChange={handleFontSizeAxis}
            />
            <MySlider
              title={`Rotate AFR [${canvasConfig.rAlkali}]`}
              min={-2.26}
              max={5}
              step={0.001}
              value={canvasConfig.rAlkali}
              onChange={handleRAlkali}
            />
            <MySlider
              title={`X AFR [${canvasConfig.xAlkali}]`}
              min={-17}
              max={50}
              step={0.1}
              value={canvasConfig.xAlkali}
              onChange={handleXAlkali}
            />
            <MySlider
              title={`Y AFR [${canvasConfig.yAlkali}]`}
              min={-4.5}
              max={50}
              step={0.1}
              value={canvasConfig.yAlkali}
              onChange={handleYAlkali}
            />
          </div>
          <div className="flex flex-col pl-3">
            <MySlider
              title={`Width [${parseInt(size.width)}]`}
              min={200}
              max={1280}
              step={10}
              value={size.width}
              onChange={handleTempWidth}
              onMouseUp={handleWidth}
            />
            <MySlider
              title={`Height [${parseInt(size.height)}]`}
              min={200}
              max={1280}
              step={10}
              value={size.height}
              onMouseUp={handleHeight}
              onChange={handleTempHeight}
            />
            {canvasConfig.isShowLegend && (
              <>
                <MySlider
                  title={`Legend size [${canvasConfig.fontSizeLegend}]`}
                  min={5}
                  max={15}
                  step={0.1}
                  value={canvasConfig.fontSizeLegend}
                  onChange={handleFontSizeLegend}
                />
                <MySlider
                  title={`X Legend [${canvasConfig.xLegend}]`}
                  min={-100}
                  max={500}
                  step={1}
                  value={canvasConfig.xLegend}
                  onChange={handleXLegend}
                />
                <MySlider
                  title={`Y Legend [${canvasConfig.yLegend}]`}
                  min={-200}
                  max={300}
                  step={1}
                  value={canvasConfig.yLegend}
                  onChange={handleYLegend}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {
        // colors section
      }
      <div className="">
        <MySettingHeader text="Colors" />
        <div className="flex flex-wrap space-x-2">
          {canvasConfig.isShowRockNames && (
            <MyColorInput
              title="Name"
              value={canvasConfig.rockNameColor}
              onChange={handleRockNameColor}
            />
          )}
          <MyColorInput
            title="Line"
            value={canvasConfig.gridColor}
            onChange={handleGridColor}
          />
        </div>
      </div>

      {
        // theme section
      }
      {canvasConfig.isShowColors && (
        <div className="">
          <MySettingHeader text="Themes" />
          <div className="flex flex-wrap">
            {themes.map((theme, ind) => (
              <Button
                key={ind}
                onClick={() => handleTheme(theme)}
                className="bg-gray-200 text-gray-500 shadow rounded p-1 m-1 w-fit text-[0.5rem]"
                size="small"
              >
                {theme} theme
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-4">
            {keys.map((k: string, ind: any) => (
              <MyColorInput
                key={ind}
                title={k}
                value={canvasConfig.colors[`${k}`]}
                onChange={(e) => handleColor(e, k)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default GraphConfig;
