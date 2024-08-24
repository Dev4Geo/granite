import { useEffect, useRef, useState } from "react";
import TernaryGraph from "@/utils/ternaryGraph";
import QAPForm from "@/components/graph/qapForm";
import SettingsIcon from "@mui/icons-material/Settings";

import {
  canvasConfigType,
  colorTheme,
  defaultConfig,
  QAP,
  symbolType,
  themeType,
} from "@/types/types";
import GraphConfig from "@/components/graph/graphConfig";
import Record from "@/components/graph/record";
import { IconButton, Slider } from "@mui/material";
import Image from "next/image";

const Graph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
    canvasW: 0,
    canvasH: 0,
  });
  const [isShowSettings, setIsShowSettings] = useState(false);
  const [data, setData] = useState<QAP[]>([
    {
      Q: 20,
      A: 70.5,
      P: 9.5,
      symbol: "red",
    },
  ]);
  const [graph, setGraph] = useState<TernaryGraph | null>(null);
  const [canvasConfig, setCanvasConfig] =
    useState<canvasConfigType>(defaultConfig);

  useEffect(() => {
    const handleResize = () => {
      // const width = window.innerWidth;
      // const height = window.innerHeight;
      const width = canvasConfig.width;
      const height = canvasConfig.height;
      const canvasW = Math.max(width * 0.5, 300);
      const canvasH = canvasW * 0.9;
      setScreenSize({ width, height, canvasW, canvasH });
    };

    handleResize();

    // window.addEventListener("resize", handleResize);
    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
  }, []);

  const draw = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const g = new TernaryGraph(canvas, canvasConfig);
      g.drawTriangle();
      setGraph(g);
      // loop plot in data
      data.forEach((d) => {
        g.plot(d.Q, d.A, d.P, d.symbol as symbolType);
      });
    }
  };

  useEffect(() => {
    draw();
  }, [screenSize, canvasRef, canvasConfig, data]);

  const handleSave = (Q: number, A: number, P: number, symbol: any) => {
    // save to data
    graph?.plot(Q, A, P, symbol);
    setData((prev) => [...prev, { Q, A, P, symbol }]);
  };

  const handleFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCanvasConfig({
      ...canvasConfig,
      fontSize: value,
      width: canvasConfig.width,
      height: canvasConfig.height,
    });
  };
  const handleFontSizeAxis = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCanvasConfig({
      ...canvasConfig,
      fontSizeAxis: value,
      width: canvasConfig.width,
      height: canvasConfig.height,
    });
  };
  const handleWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCanvasConfig({
      ...canvasConfig,
      fontSize: canvasConfig.fontSize,
      fontSizeAxis: canvasConfig.fontSizeAxis,
      width: value,
    });
  };

  const handleHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCanvasConfig({
      ...canvasConfig,
      fontSize: canvasConfig.fontSize,
      fontSizeAxis: canvasConfig.fontSizeAxis,
      height: value,
    });
  };

  const handleColor = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const value = e.target.value;
    setCanvasConfig({
      ...canvasConfig,
      colors: { ...canvasConfig.colors, [key]: value },
    });
  };
  const handleReset = () => {
    window.location.reload();
  };
  const handleRAlkali = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCanvasConfig({
      ...canvasConfig,
      rAlkali: value,
    });
  };
  const handleXAlkali = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCanvasConfig({
      ...canvasConfig,
      xAlkali: value,
    });
  };

  const handleYAlkali = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCanvasConfig({
      ...canvasConfig,
      yAlkali: value,
    });
  };

  const handleRatio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCanvasConfig({
      ...canvasConfig,
      ratio: value,
    });
  };

  const handleMaficMineral = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCanvasConfig({
      ...canvasConfig,
      maficMineral: value,
    });
  };

  const handleTheme = (themeName: themeType) => {
    const theme = colorTheme[themeName];
    setCanvasConfig({
      ...canvasConfig,
      colors: {
        "Quartz Rich": theme[0],
        "Alkali Feldspar Rhyolite": theme[1],
        Rhyolite: theme[2],
        Dacite: theme[3],
        Q2: theme[4],
        "Quartz Trachyte": theme[5],
        "Quartz Latite": theme[6],
        Andesite: theme[7],
        Q1: theme[8],
        Trachyte: theme[9],
        Latite: theme[10],
      },
    });
  };

  const handleIsShowColors = () => {
    setCanvasConfig({
      ...canvasConfig,
      isShowColors: !canvasConfig.isShowColors,
    });
  };

  const handleIsShowAxis = () => {
    setCanvasConfig({
      ...canvasConfig,
      isShowAxis: !canvasConfig.isShowAxis,
    });
  };

  const handleIsShowGrid = () => {
    setCanvasConfig({
      ...canvasConfig,
      isShowGrid: !canvasConfig.isShowGrid,
    });
  };

  const handleIsShowRockNames = () => {
    setCanvasConfig({
      ...canvasConfig,
      isShowRockNames: !canvasConfig.isShowRockNames,
    });
  };

  const handleRockNameColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCanvasConfig({
      ...canvasConfig,
      rockNameColor: value,
    });
  };

  const handleGridColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCanvasConfig({
      ...canvasConfig,
      gridColor: value,
    });
  };

  const handleIsShowLegend = () => {
    setCanvasConfig({
      ...canvasConfig,
      isShowLegend: !canvasConfig.isShowLegend,
    });
  };

  const handleIsShowCircle = () => {
    setCanvasConfig({
      ...canvasConfig,
      isShowCircle: !canvasConfig.isShowCircle,
    });
  };

  const handleDelete = (index: number) => {
    const temp = [...data];
    temp.splice(index, 1);
    setData(temp);
  };
  const topLogoSize = 60;
  const bottomLogoSize = 30;

  return (
    <div className="flex flex-col items-center bg-white h-full text-gray-600">
      <div className="text-start mb-5 w-full bg-gray-100 py-5 px-6 shadow">
        <div className="flex flex-row items-center space-x-2">
          <Image
            src={"/stone.png"}
            alt={""}
            width={topLogoSize}
            height={topLogoSize}
          />
          <div className="flex flex-col">
            <div className="text-4xl font-bold text-gray-700">Granite</div>
            <div className="text-sm text-gray-500 ml-1">
              QAP plotter by Dev4Geo
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full flex flex-col md:flex-row p-2 space-x-1 mt-3">
        {/* <div className=" text-4xl text-red-600">
        dev {screenSize.width} {screenSize.height}
      </div> */}
        <div className="flex grow-[1] justify-center">
          {screenSize.canvasW <= 1 ? (
            <div className="">Loading...</div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={screenSize.canvasW}
                  height={screenSize.canvasH}
                  // style={{ border: "1px solid #000" }}
                  className=""
                ></canvas>
                <div className="absolute left-0 top-5 text-gray-700">
                  <div className="text-base font-bold">IUGS Classification</div>
                  <div className="text-[0.7rem]">Volcanic/Aphanitic Rocks</div>
                  <div className="text-[0.7rem]">
                    2a. Volcanic rocks with quartz
                  </div>
                  <div className="flex flex-col space-y-2 py-2 text-[0.6rem]">
                    <div className="">
                      <div className="">Q = Quartz</div>
                      <div className="">A = Alkali Feldspar</div>
                      <div className="">P = Plagioclase Feldspar</div>
                    </div>
                    <div className="">
                      <div className="">Q1. Alkali feldspar Trachyte</div>
                      <div className="">
                        Q2. Quartz Alkali Feldspar Trachyte
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="flex flex-row space-x-1">
                  <div className="text-sm text-gray-600">Mafic Mineral</div>
                  <div className="w-[3rem] text-sm">
                    {canvasConfig.maficMineral} %
                  </div>
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
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-1 grow-[1] ">
          <div className="flex flex-col space-y-1  p-1">
            <div className="flex  flex-row items-end">
              <Image
                src={"/monster.png"}
                alt={""}
                width={bottomLogoSize}
                height={bottomLogoSize}
              />
              <div className="text-gray-600 ml-2">Plotter</div>
              <IconButton
                className="mb-[-0.44rem]"
                onClick={() => {
                  setIsShowSettings((p) => !p);
                }}
              >
                <SettingsIcon fontSize="small" className="" />
              </IconButton>
            </div>

            {isShowSettings && (
              <GraphConfig
                canvasConfig={canvasConfig}
                handleFontSize={handleFontSize}
                handleFontSizeAxis={handleFontSizeAxis}
                handleWidth={handleWidth}
                handleHeight={handleHeight}
                handleColor={handleColor}
                handleReset={handleReset}
                handleRAlkali={handleRAlkali}
                handleXAlkali={handleXAlkali}
                handleYAlkali={handleYAlkali}
                handleRatio={handleRatio}
                handleMaficMineral={handleMaficMineral}
                handleTheme={handleTheme}
                handleIsShowColors={handleIsShowColors}
                handleIsShowAxis={handleIsShowAxis}
                handleIsShowGrid={handleIsShowGrid}
                handleIsShowRockNames={handleIsShowRockNames}
                handleRockNameColor={handleRockNameColor}
                handleGridColor={handleGridColor}
                handleIsShowLegend={handleIsShowLegend}
                handleIsShowCircle={handleIsShowCircle}
              />
            )}

            {
              // data
            }

            {
              // input QAP form
              !isShowSettings && (
                <div className="space-y-2 my-3">
                  <div className="">
                    {data.map((d, i) => (
                      <Record
                        key={i}
                        dat={d}
                        onDelete={() => {
                          handleDelete(i);
                        }}
                      />
                    ))}
                  </div>
                  <QAPForm onSave={handleSave} />
                </div>
              )
            }
          </div>
        </div>
      </div>

      <footer className="bottom-0 left-0 z-20 w-full p-4 border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 bg-gray-100">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://github.com/Dev4Geo" className="hover:underline">
            Dev4Geo
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Graph;
