import { useEffect, useRef, useState } from "react";
import TernaryGraph from "@/utils/ternaryGraph";
import QAPForm from "@/components/graph/qapForm";

type QAP = {
  Q: number;
  A: number;
  P: number;
  symbol: string;
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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const canvasW = Math.max(width * 0.5, 300);
      const canvasH = canvasW * 0.9;
      setScreenSize({ width, height, canvasW, canvasH });
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const g = new TernaryGraph(canvas);
      g.drawTriangle();
      setGraph(g);
      // graph.plot(5, 85, 10);
      // graph.plot(60, 36, 4);
      // plot data
    }
  }, [screenSize, canvasRef]);

  const handleSave = (Q: number, A: number, P: number, symbol: any) => {
    // save to data
    graph?.plot(Q, A, P, symbol);
    setData((prev) => [...prev, { Q, A, P, symbol }]);
  };

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
    </div>
  );
};

export default Graph;
