import { useEffect, useRef, useState } from "react";
import TernaryGraph from "@/utils/ternaryGraph";
import QAPForm from "@/components/graph/qapForm";
import SettingsIcon from "@mui/icons-material/Settings";

import {
  canvasConfigType,
  defaultConfig,
  defaultConfigVQAPF,
  defaultConfigVFAP,
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
import OvilineSlider from "@/components/graph/olivineSlider";

const debug = true;
// const debug = false;

const Graph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isShowSettings, setIsShowSettings] = useState(false );
  const [data, setData] = useState<MyDataType[]>([
    {
      Q: 20.11,
      A: 88.88,
      P: 9.5,
      F: 0,
      symbol: "blue",
    },
    {
      Q: 20,
      A: 70.5,
      P: 9.5,
      F: 0,
      symbol: "red",
    },
  ]);
  const [canvasConfig, setCanvasConfig] =
    useState<canvasConfigType>(defaultConfig);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const g = new TernaryGraph(canvas, canvasConfig);
    g.drawTriangle();
    // loop plot in data
    data.forEach((d) => {
      let top = d.Q;
      let bottom = d.F;
      let isShow = true;
      if (canvasConfig.graphType === 'vFAP'){
        top = d.F;
        bottom = d.Q;
        if (d.Q > 0)  isShow = false;
      }
      if (canvasConfig.graphType === 'vQAP'){
        if (d.F > 0) isShow = false;
      }
      g.plot(top, d.A, d.P, bottom, d.symbol as symbolType, isShow);
    });
  }, [canvasRef, canvasConfig, data]);

  const handleSave = (QAP: any, symbol: any) => {
    setData((prev) => [
      ...prev,
      {
        Q: QAP.Q,
        A: QAP.A,
        P: QAP.P,
        F: QAP.F,
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
        F2: theme[11],
        "Phonolitic Foidite": theme[12],
        "Tephritic Foidite": theme[13],
        Phonolite: theme[14],
        "Tephritic Phonolite": theme[15],
        "Phonolitic Tephrite": theme[16],
        Tephrite: theme[17],
        F1: theme[18],
        "Foid-Bearing Trachyte": theme[19],
        "Foid-Bearing Latite": theme[20],
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

  const FLogoSize = 30;

  useEffect(() => {
    if (!debug) return;
    setCanvasConfig((p) => ({
      ...p,
      ...(defaultConfigVFAP as canvasConfigType),
    }));
  }, []);

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
              <div className="flex flex-row space-x-4">
                <MaficSlider
                  canvasConfig={canvasConfig}
                  onChange={handleNumericValue}
                />
                {canvasConfig.graphType !== "vQAP" && (
                  <OvilineSlider
                    canvasConfig={canvasConfig}
                    onChange={handleNumericValue}
                  />
                )}
              </div>
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
                width={FLogoSize}
                height={FLogoSize}
                className="w-auto"
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
                title="QAPF"
                onClick={() => {
                  setCanvasConfig({
                    ...canvasConfig,
                    ...(defaultConfigVQAPF as canvasConfigType),
                  });
                }}
              />
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
                title="FAP"
                onClick={() => {
                  setCanvasConfig({
                    ...canvasConfig,
                    ...(defaultConfigVFAP as canvasConfigType),
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
                onClose={() => {
                  setIsShowSettings(false);
                }}
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
