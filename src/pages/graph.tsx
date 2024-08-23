import { useEffect, useRef, useState } from "react";
import TernaryGraph from "@/utils/ternaryGraph";
import QAPForm from "@/components/graph/qapForm";
import { canvasConfigType, colorTheme } from "@/types/types";
import GraphConfig from "@/components/graph/graphConfig";

type QAP = {
  Q: number;
  A: number;
  P: number;
  symbol: string;
};

const theme = colorTheme.earth;
const defaultConfig = {
  width: 400,
  height: 400,
  fontSize: 10,
  fontSizeAxis: 10,
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
  xAlkali: 0,
  yAlkali: 0,
  rAlkali: 0,
  ratio: 0,
  maficMineral: 20,
};

const Graph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
    canvasW: 0,
    canvasH: 0,
  });
  const [data, setData] = useState<QAP[]>([]);
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const g = new TernaryGraph(canvas, canvasConfig);
      g.drawTriangle();
      setGraph(g);
      // graph.plot(5, 85, 10);
      // graph.plot(60, 36, 4);
      // plot data
    }
  }, [screenSize, canvasRef, canvasConfig]);

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

  const handleTheme = (themeName: canvasConfigType["theme"]) => {
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

  const handleIsShowColors = ()=>{
    setCanvasConfig({
      ...canvasConfig,
      isShowColors: !canvasConfig.isShowColors,
    });
  }

  const handleIsShowAxis = ()=>{
    setCanvasConfig({
      ...canvasConfig,
      isShowAxis: !canvasConfig.isShowAxis,
    });
  }

  const handleIsShowGrid = ()=>{
    setCanvasConfig({
      ...canvasConfig,
      isShowGrid: !canvasConfig.isShowGrid,
    });
  }

  const handleIsShowRockNames = ()=>{
    setCanvasConfig({
      ...canvasConfig,
      isShowRockNames: !canvasConfig.isShowRockNames,
    });
  }

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

  const handleIsShowLegend = ()=>{
    setCanvasConfig({
      ...canvasConfig,
      isShowLegend: !canvasConfig.isShowLegend,
    });
  }

  const handleIsShowCircle = ()=>{
    setCanvasConfig({
      ...canvasConfig,
      isShowCircle: !canvasConfig.isShowCircle,
    });
  }

  return (
    <div className="flex flex-col items-center md:flex-row p-2 space-x-1">
      {/* <div className=" text-4xl text-red-600">
        dev {screenSize.width} {screenSize.height}
      </div> */}
      <div className="flex flex-col items-center text-center justify-center ">
        {screenSize.canvasW <= 1 ? (
          <div className="">Loading...</div>
        ) : (
          <canvas
            ref={canvasRef}
            width={screenSize.canvasW}
            height={screenSize.canvasH}
            // style={{ border: "1px solid #000" }}
            className="w-fit border border-solid border-gray-800"
          />
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <div className="flex flex-col space-y-1 border border-gray-500 rounded  p-1">
          <div className="text-2xl font-bold">QAP Percentage</div>
          <div className="">
            {data.map((d, i) => (
              <div key={i} className="flex justify-between">
                <div>{d.symbol}</div>
                <div>
                  {d.symbol} {d.Q} - {d.A} - {d.P}
                </div>
              </div>
            ))}
          </div>
          <QAPForm onSave={handleSave} />
        </div>
        <div className="flex flex-col border border-gray-500 p-1  rounded">
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
        </div>
      </div>
    </div>
  );
};

export default Graph;
