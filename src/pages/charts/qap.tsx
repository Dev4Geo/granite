import { useEffect, useRef, useState } from "react";
import TernaryGraph from "@/utils/ternaryGraph";
import QAPForm from "@/components/graph/qapForm";
import SettingsIcon from "@mui/icons-material/Settings";

import {
  canvasConfigType,
  defaultConfig,
  defaultConfigVQAPF,
  MyDataType,
  symbolType,
} from "@/types/types";
import GraphConfig from "@/components/graph/graphConfig";
import Record from "@/components/graph/record";
import { Button, IconButton } from "@mui/material";
import Image from "next/image";
import MyMenu from "@/components/shared/myMenu";
import MyButton from "@/components/shared/myButton";
import { colorTheme } from "@/types/colors";
import MaficSlider from "@/components/graph/maficSlider";
import MyFooter from "@/components/shared/myFooter";

// const debug = true;
const debug = false;

const Graph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isShowSettings, setIsShowSettings] = useState(false || debug);
  const [data, setData] = useState<MyDataType[]>([
    {
      top: 20.11,
      left: 88.88,
      right: 9.5,
      bottom: 0,
      symbol: "blue",
    },
    {
      top: 20,
      left: 70.5,
      right: 9.5,
      bottom: 0,
      symbol: "red",
    },
  ]);
  const [graph, setGraph] = useState<TernaryGraph | null>(null);
  const [canvasConfig, setCanvasConfig] =
    useState<canvasConfigType>(defaultConfig);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const g = new TernaryGraph(canvas, canvasConfig);
    g.drawTriangle();
    setGraph(g);
    // loop plot in data
    data.forEach((d) => {
      g.plot(d.top, d.left, d.right, d.bottom, d.symbol as symbolType);
    });
  };

  useEffect(() => {
    draw();
  }, [canvasRef, canvasConfig, data]);

  const handleSave = (QAP: any, symbol: any) => {
    console.log(QAP, symbol);
    let Q = parseFloat(QAP.top);
    let A = parseFloat(QAP.left);
    let P = parseFloat(QAP.right);
    let F = parseFloat(QAP.bottom);

    // save to data
    graph?.plot(Q, A, P, F, symbol);
    setData((prev) => [
      ...prev,
      {
        top: QAP.top,
        left: QAP.left,
        right: QAP.right,
        bottom: QAP.bottom,
        symbol,
      },
    ]);
  };

  const handleNumericValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);

    setCanvasConfig({
      ...canvasConfig,
      [name]: numericValue,
    });
  };

  const handleColor = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const value = e.target.value;
    setCanvasConfig({
      ...canvasConfig,
      colors: { ...canvasConfig.colors, [key]: value },
    });
  };

  const handleTheme = (themeName: keyof typeof colorTheme) => {
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

  const handleToggle = (property: keyof typeof canvasConfig) => {
    setCanvasConfig({
      ...canvasConfig,
      [property]: !canvasConfig[property],
    });
  };

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCanvasConfig({
      ...canvasConfig,
      [name]: value,
    });
  };

  const handleDelete = (index: number) => {
    const temp = [...data];
    temp.splice(index, 1);
    setData(temp);
  };
  const handleClearAll = () => {
    setData([]);
  };

  const bottomLogoSize = 30;

  if (debug) {
    useEffect(() => {
      setCanvasConfig({
        ...canvasConfig,
        ...(defaultConfigVQAPF as canvasConfigType),
      });
    });
  }

  return (
    <div className="flex flex-col items-center text-gray-600 w-full">
      <MyMenu current="" />

      {
        // main content; canvas; input form; data
      }
      <div className=" w-full grid grid-cols-1 lg:grid-cols-12 p-2 space-x-1 mt-3 mb-[8rem]">
        {
          // canvas
        }
        <div className="lg:col-span-6">
          {false ? (
            <div className="">Loading...</div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="relative flex flex-row justify-center w-full px-5">
                {
                  // canvas
                }
                <canvas
                  ref={canvasRef}
                  className="h-auto w-full max-w-[40rem]"
                ></canvas>
                {
                  // legend
                }
                {
                  // {canvasConfig.isShowLegend && (
                  //   <Legend canvasConfig={canvasConfig} />
                  // )}
                }
              </div>

              {
                // mafic slider
              }
              <MaficSlider
                canvasConfig={canvasConfig}
                onChange={handleNumericValue}
              />
            </div>
          )}
        </div>

        {
          // config
        }
        <div className="lg:col-span-6  lg:items-start flex flex-col items-center space-y-1 max-lg:mt-4">
          <div className="flex flex-col space-y-1  p-1">
            <div className="flex  flex-row items-end">
              <Image
                src={"/monster.png"}
                alt={""}
                width={bottomLogoSize}
                height={bottomLogoSize}
              />
              <div className="text-gray-500 font-bold ml-2">Plotter</div>
              <IconButton
                className="mb-[-0.44rem]"
                onClick={() => {
                  setIsShowSettings((p) => !p);
                }}
              >
                <SettingsIcon fontSize="small" className="" />
              </IconButton>
              {
                // graphType
              }
              <MyButton
                title="QAP"
                onClick={() => {
                  setCanvasConfig({
                    ...canvasConfig,
                    ...(defaultConfig as canvasConfigType),
                  });
                }}
              />
              <MyButton
                title="QAPF"
                onClick={() => {
                  setCanvasConfig({
                    ...canvasConfig,
                    ...(defaultConfigVQAPF as canvasConfigType),
                  });
                }}
              />
            </div>
            {isShowSettings && (
              <GraphConfig
                canvasConfig={canvasConfig}
                handleColor={handleColor}
                handleTheme={handleTheme}
                handleNumericValue={handleNumericValue}
                handleToggle={handleToggle}
                handleValue={handleValue}
              />
            )}

            {
              // input QAP form
              !isShowSettings && (
                <div className="space-y-2 my-3">
                  {
                    // data
                  }
                  <div className="">
                    {data.map((d, i) => (
                      <Record
                        key={i}
                        dat={d}
                        onDelete={() => {
                          handleDelete(i);
                        }}
                        axisNames={canvasConfig.axisNames}
                      />
                    ))}

                    {data.length >= 4 && (
                      <div className="flex flex-row w-full justify-end">
                        <Button color="error" onClick={handleClearAll}>
                          Clear all
                        </Button>
                      </div>
                    )}
                  </div>
                  {
                    // input form
                  }
                  <QAPForm
                    onSave={handleSave}
                    axisNames={canvasConfig.axisNames}
                  />
                </div>
              )
            }
          </div>
        </div>
      </div>

      {
        // footer
      }
      <MyFooter />
    </div>
  );
};

export default Graph;
