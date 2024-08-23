import { useState } from "react";

const GraphConfig = ({
  canvasConfig,
  handleFontSize,
  handleFontSizeAxis,
  handleWidth,
  handleHeight,
  handleColor,
  handleReset,
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

  return (
    <>
      <div className="flex flex-row items-center">
        <div className="text-xl">Config</div>
        <div className="bg-sky-50 text-gray-400 rounded p-1 m-1" onClick={handleReset}>Reset</div>
      </div>
      <div className="flex flex-row">
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
        </div>
        <div className="">
          <div className="">
            <div className="">Colors</div>
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
