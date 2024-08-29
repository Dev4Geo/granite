import { useState } from "react";
import { colorTheme } from "@/types/types";
import MySlider from "./mySlider";
import MyCheckbox from "./myCheckbox";
import MyColorInput from "./myColorInput";
import { Button } from "@mui/material";
import MySettingHeader from "./mySettingHeader";

const GraphConfig = ({
  canvasConfig,
  handleColor,
  handleReset,
  handleTheme,
  handleNumericValue,
  handleToggle,
  handleValue,
}: any) => {
  const [size, setSize] = useState({
    width: canvasConfig.width,
    height: canvasConfig.height,
  });
  const handleTempSize = (e: any) => {
    const { name, value } = e.target;
    setSize({ ...size, [name]: value });
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
        </div>

        {
          // items
        }
        <div className="flex md:flex-row flex-col justify-start md:space-x-10 items-start">
          <div className="flex flex-col">
            <MyCheckbox
              label={"Show Rock Names"}
              checked={canvasConfig.isShowRockNames}
              onChange={() => handleToggle("isShowRockNames")}
            />
            <MyCheckbox
              label={"Show Colors"}
              checked={canvasConfig.isShowColors}
              onChange={() => handleToggle("isShowColors")}
            />
            <MyCheckbox
              label={"Show Axis Names"}
              checked={canvasConfig.isShowAxis}
              onChange={() => handleToggle("isShowAxis")}
            />
            <MyCheckbox
              label={"Show Grids"}
              checked={canvasConfig.isShowGrid}
              onChange={() => handleToggle("isShowGrid")}
            />
            <MyCheckbox
              label={"Show Grids Label"}
              checked={canvasConfig.isShowGridLabel}
              onChange={() => handleToggle("isShowGridLabel")}
            />
            <MyCheckbox
              label={"Show Legend"}
              checked={canvasConfig.isShowLegend}
              onChange={() => handleToggle("isShowLegend")}
            />
          </div>
          <div className="flex flex-col pl-3">
            <MySlider
              title={`Plot-size [${canvasConfig.plotSize}]`}
              name="plotSize"
              min={5}
              max={50}
              value={canvasConfig.plotSize}
              onChange={handleNumericValue}
            />
            <MySlider
              title={`Font-size [${canvasConfig.fontSize}]`}
              name="fontSize"
              min={50}
              max={200}
              value={canvasConfig.fontSize}
              onChange={handleNumericValue}
            />
            <MySlider
              title={`Axis font-size [${canvasConfig.fontSizeAxis}]`}
              name="fontSizeAxis"
              min={50}
              max={200}
              value={canvasConfig.fontSizeAxis}
              onChange={handleNumericValue}
            />
            <MySlider
              title={`Rotate AFR [${canvasConfig.rAlkali}]`}
              name="rAlkali"
              min={-2.26}
              max={5}
              step={0.001}
              value={canvasConfig.rAlkali}
              onChange={handleNumericValue}
            />
          </div>
          <div className="flex flex-col pl-3">
            {canvasConfig.isShowLegend && (
              <>
                <MySlider
                  title={`Legend size [${canvasConfig.fontSizeLegend}]`}
                  name="fontSizeLegend"
                  min={50}
                  max={200}
                  step={1}
                  value={canvasConfig.fontSizeLegend}
                  onChange={handleNumericValue}
                />
                <MySlider
                  title={`X Legend [${canvasConfig.xLegend}]`}
                  name="xLegend"
                  min={-100}
                  max={500}
                  step={1}
                  value={canvasConfig.xLegend}
                  onChange={handleNumericValue}
                />
                <MySlider
                  title={`Y Legend [${canvasConfig.yLegend}]`}
                  name="yLegend"
                  min={-200}
                  max={300}
                  step={1}
                  value={canvasConfig.yLegend}
                  onChange={handleNumericValue}
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
              name='rockNameColor'
              value={canvasConfig.rockNameColor}
              onChange={handleValue}
            />
          )}
          <MyColorInput
            title="Line"
            name="gridColor"
            value={canvasConfig.gridColor}
            onChange={handleValue}
          />
          <MyColorInput
            title="Axis Name"
            name="axisColor"
            value={canvasConfig.axisColor}
            onChange={handleValue}
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
                name='empty'
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
