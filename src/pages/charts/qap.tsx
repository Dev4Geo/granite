import { useEffect, useRef, useState } from "react";
import TernaryGraph from "@/utils/ternaryGraph";
import QAPForm from "@/components/graph/qapForm";
import SettingsIcon from "@mui/icons-material/Settings";

import {
  canvasConfigType,
  defaultConfig,
  defaultConfigVQAPF,
  QAP,
  symbolType,
} from "@/types/types";
import GraphConfig from "@/components/graph/graphConfig";
import Record from "@/components/graph/record";
import { IconButton } from "@mui/material";
import Image from "next/image";
import MyMenu from "@/components/shared/myMenu";
import MyButton from "@/components/shared/myButton";
import { colorTheme } from "@/types/colors";

// const debug = true;
const debug = false;

const Graph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isShowSettings, setIsShowSettings] = useState(false || debug);
  const [data, setData] = useState<QAP[]>([
    {
      Q: 20.11,
      A: 88.88,
      P: 9.5,
      symbol: "blue",
    },
    {
      Q: 20,
      A: 70.5, P: 9.5,
      symbol: "red",
    },
  ]);
  const [graph, setGraph] = useState<TernaryGraph | null>(null);
  const [canvasConfig, setCanvasConfig] =
    useState<canvasConfigType>(defaultConfig);

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
  }, [canvasRef, canvasConfig, data]);

  const handleSave = (QAP: any, symbol: any) => {
    let Q = parseFloat(QAP.Q);
    let A = parseFloat(QAP.A);
    let P = parseFloat(QAP.P);

    // save to data
    graph?.plot(Q, A, P, symbol);
    setData((prev) => [
      ...prev,
      {
        Q: QAP.Q,
        A: QAP.A,
        P: QAP.P,
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
        <div className="sm:col-span-10 lg:col-span-6">
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
              <div className="flex flex-col">
                <div className="flex flex-row space-x-1">
                  <div className="text-sm text-gray-600">Mafic Mineral</div>
                  <div className="w-[3rem] text-sm">
                    {canvasConfig.maficMineral} %
                  </div>
                </div>
                <input
                  className="slider accent-green-700"
                  type="range"
                  name="maficMineral"
                  min={0}
                  max={100}
                  step={0.1}
                  value={canvasConfig.maficMineral}
                  onChange={handleNumericValue}
                />
              </div>
            </div>
          )}
        </div>

        {
          // config
        }
        <div className="sm:col-span-2 lg:col-span-6 flex flex-col items-center lg:items-start space-y-1">
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
                      />
                    ))}
                  </div>
                  {
                    // input form
                  }
                  <QAPForm onSave={handleSave} />
                </div>
              )
            }
          </div>
        </div>
      </div>

      {
        // footer
      }
      <footer className="fixed bottom-0 left-0 z-20 w-full p-4 border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 bg-gray-100">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://github.com/Dev4Geo" className="hover:underline">
            Dev4Geo
          </a>
          . Licensed under the{" "}
          <a
            href="https://github.com/Dev4Geo/granite/blob/main/LICENSE"
            className="hover:underline"
          >
            Apache-2.0 License
          </a>
          .
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a
              href="https://github.com/Dev4Geo/Docs"
              className="hover:underline me-4 md:me-6"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Dev4Geo/granite"
              className="hover:underline me-4 md:me-6"
            >
              Source Code (GitHub)
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Dev4Geo/granite/blob/main/LICENSE"
              className="hover:underline me-4 md:me-6"
            >
              License
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Dev4Geo/Dev4Geo/blob/main/contact.md"
              className="hover:underline"
            >
              Contact
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Graph;
