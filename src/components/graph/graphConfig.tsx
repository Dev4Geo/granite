import { useState } from "react";
import { colorTheme } from "@/types/types";

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
    <>
      <div className="flex flex-row items-center">
        <div className="text-xl">Config</div>
        <div
          className="bg-sky-50 text-gray-400 rounded p-1 m-1"
          onClick={handleReset}
        >
          Reset
        </div>
      </div>
      <div className="flex flex-row space-x-2">
        <div className="flex flex-col">
          <div className="">
            <div className="">Width [{size.width}]</div>
            <input
              className="slider"
              type="range"
              min={200}
              max={1280}
              step={10}
              value={size.width}
              onChange={handleTempWidth}
              onMouseUp={handleWidth}
            />
          </div>
          <div className="">
            <div className="">Height [{size.height}]</div>
            <input
              className="slider"
              type="range"
              min={200}
              max={1280}
              step={10}
              value={size.height}
              onMouseUp={handleHeight}
              onChange={handleTempHeight}
            />
          </div>
          <div className="">
            <div className="">Font-size [{canvasConfig.fontSize}]</div>
            <input
              className="slider"
              type="range"
              min={5}
              max={40}
              value={canvasConfig.fontSize}
              onChange={handleFontSize}
            />
          </div>
          <div className="">
            <div className="">Axis font-size [{canvasConfig.fontSizeAxis}]</div>
            <input
              className="slider"
              type="range"
              min={5}
              max={40}
              value={canvasConfig.fontSizeAxis}
              onChange={handleFontSizeAxis}
            />
          </div>
          <div className="">
            <div className="">Rotate AFR [{canvasConfig.rAlkali}]</div>
            <input
              className="slider"
              type="range"
              min={-2.26}
              max={5}
              step={0.001}
              value={canvasConfig.rAlkali}
              onChange={handleRAlkali}
            />
          </div>
          <div className="">
            <div className="">X AFR [{canvasConfig.xAlkali}]</div>
            <input
              className="slider"
              type="range"
              min={-17}
              max={50}
              step={0.1}
              value={canvasConfig.xAlkali}
              onChange={handleXAlkali}
            />
          </div>
          <div className="">
            <div className="">Y AFR [{canvasConfig.yAlkali}]</div>
            <input
              className="slider"
              type="range"
              min={-4.5}
              max={50}
              step={0.1}
              value={canvasConfig.yAlkali}
              onChange={handleYAlkali}
            />
          </div>
          <div className="">
            <div className="">
              % Mafic Mineral [{canvasConfig.maficMineral}]
            </div>
            <input
              className="slider"
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={canvasConfig.maficMineral}
              onChange={handleMaficMineral}
            />
          </div>
          <div className="flex flex-row space-x-1 items-center justify-start text-center">
            <input
              type="checkbox"
              checked={canvasConfig.isShowRockNames}
              onChange={handleIsShowRockNames}
            />
            <div className="">Show Rock Names</div>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-start text-center">
            <input
              type="checkbox"
              checked={canvasConfig.isShowColors}
              onChange={handleIsShowColors}
            />
            <div className="">Show Colors</div>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-start text-center">
            <input
              type="checkbox"
              checked={canvasConfig.isShowAxis}
              onChange={handleIsShowAxis}
            />
            <div className="">Show Axis Names</div>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-start text-center">
            <input
              type="checkbox"
              checked={canvasConfig.isShowCircle}
              onChange={handleIsShowCircle}
            />
            <div className="">Show Axis Markers</div>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-start text-center">
            <input
              type="checkbox"
              checked={canvasConfig.isShowGrid}
              onChange={handleIsShowGrid}
            />
            <div className="">Show Grids</div>
          </div>
          <div className="flex flex-col">
            <div className="">Rock Name color</div>
            <div className="flex flex-row">
              <input
                type="color"
                value={canvasConfig.rockNameColor}
                onChange={handleRockNameColor}
              />
              {canvasConfig.rockNameColor}
            </div>
          </div>
          <div className="flex flex-row">
            <input
              type="color"
              value={canvasConfig.gridColor}
              onChange={handleGridColor}
            />
            {canvasConfig.gridColor}
          </div>
        </div>
        <div className="">
          <div className="">
            <div className="">Colors</div>
            <div className="">
              {themes.map((theme, ind) => (
                <div
                  key={ind}
                  className="bg-sky-50 text-gray-400 rounded p-1 m-1"
                  onClick={() => handleTheme(theme)}
                >
                  {theme} theme
                </div>
              ))}
            </div>
            {keys.map((k: string, ind: any) => (
              <div className="" key={ind}>
                <div className="">{k}</div>
                <div className="flex flex-row space-x-1">
                  <input
                    type="color"
                    value={canvasConfig.colors[`${k}`]}
                    onChange={(e) => handleColor(e, k)}
                  />
                  <div className="">{canvasConfig.colors[`${k}`]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default GraphConfig;
