import { useEffect, useState } from "react";
import { colorMap } from "@/types/types";
import Symbol from "@/components/graph/symbol";
import { Button, Input } from "@mui/material";

type inputBoxProps = {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputBox({ label, name, value, onChange }: inputBoxProps) {
  return (
    <div>
      <Input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        onClick={() => onChange({ target: { name, value: undefined } } as any)}
        className="border text-gray-500 w-full max-w-[7rem] text-sm"
        startAdornment={<div className="text-gray-400 text-sm">{label}:</div>}
      />
    </div>
  );
}

export default function QAPForm({ onSave, axisNames }: any) {
  const nAxis = axisNames.length;
  const [data, setData] = useState({ top: 20, left: 70, right: 10, bottom: 0 });
  const [total, setTotal] = useState(100);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = parseInt(e.target.value);
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    setTotal((data.top || 0) + (data.left || 0) + (data.right || 0));
  }, [data]);

  const top: string = (((data.top || 0) / total) * 100).toFixed(2);
  const left: string = (((data.left || 0) / total) * 100).toFixed(2);
  const right: string = (((data.right || 0) / total) * 100).toFixed(2);
  const bottom: string = (((data.bottom || 0) / total) * 100).toFixed(2);

  const handleOnSave = (symbol: string, d: any = data) => {
    const total =
      (d.top || 0) + (d.left || 0) + (d.right || 0) + (d.bottom || 0);
    if (total <= 1) {
      alert("Recheck the values. Total should be greater than 1.");
      return;
    }

    const color = colorMap[symbol];
    onSave(
      {
        top: d.top || 0,
        left: d.left || 0,
        right: d.right || 0,
        bottom: d.bottom || 0,
      },
      color,
    );
    setData({ top: 0, left: 0, right: 0, bottom: 0 });
  };
  const handleRandom = (doSetData: boolean = true) => {
    const random = Math.floor(Math.random() * 100);
    const random2 = Math.floor(Math.random() * (100 - random));
    const random3 = 100 - random - random2;

    let obj;
    if (nAxis === 3) {
      obj = { top: random, left: random2, right: random3, bottom: 0 };
    } else {
      if (Math.random() > 0.5) {
        obj = { top: random, left: random2, right: random3, bottom: 0 };
      } else {
        obj = { top: 0, left: random2, right: random3, bottom: random };
      }
    }
    if (doSetData) {
      setData(obj);
    }
    return obj;
  };

  return (
    <div className="flex flex-col space-y-5 bg-gray-50 py-3 px-2 shadow">
      <div className="flex flex-col">
        {nAxis === 3 ? (
          <div className="text-gray-400 text-[0.5rem]">
            Total={total} {axisNames[0]}={top}% {axisNames[1]}={left}%{" "}
            {axisNames[2]}={right}%
          </div>
        ) : (
          <div className="text-gray-400 text-[0.5rem]">
            Total={total} {axisNames[0]}={top}% {axisNames[1]}={left}%{" "}
            {axisNames[2]}={right} {axisNames[3]}={bottom}%
          </div>
        )}

        <div className="flex flex-row items-center">
          <InputBox
            label={axisNames[0]}
            name="top"
            value={data.top}
            onChange={handleChange}
          />
          <InputBox
            label={axisNames[1]}
            name="left"
            value={data.left}
            onChange={handleChange}
          />
          <InputBox
            label={axisNames[2]}
            name="right"
            value={data.right}
            onChange={handleChange}
          />
          {nAxis === 4 && (
            <InputBox
              label={axisNames[3]}
              name="bottom"
              value={data.bottom}
              onChange={handleChange}
            />
          )}
          <Button onClick={() => handleRandom(true)}>random</Button>
          <Button
            onClick={() => {
              const obj = handleRandom(false);
              const color =
                Object.keys(colorMap)[Math.floor(Math.random() * 3)];

              handleOnSave(color, obj);
            }}
          >
            random plot
          </Button>
        </div>
      </div>
      <div className="">
        <div className="text-[0.7rem] text-gray-400">Plot as</div>

        <div className="flex flex-row">
          <Symbol name="R" onClick={() => handleOnSave("R")} />
          <Symbol name="G" onClick={() => handleOnSave("G")} />
          <Symbol name="B" onClick={() => handleOnSave("B")} />
          <Symbol
            name="Custom"
            onClick={() => {
              alert("Please wait for the next version.");
            }}
          />
        </div>
      </div>
    </div>
  );
}
