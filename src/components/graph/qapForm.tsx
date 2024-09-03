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
  const isFAP = nAxis === 3 && axisNames[0] === "F";
  const [data, setData] = useState({ Q: 0, A: 70, P: 10, F: 0 });
  const [total, setTotal] = useState(100);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = parseInt(e.target.value);
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    setTotal((data.Q || 0) + (data.A || 0) + (data.P || 0) + (data.F || 0));
  }, [data]);

  const Q: string = (((data.Q || 0) / total) * 100).toFixed(2);
  const A: string = (((data.A || 0) / total) * 100).toFixed(2);
  const P: string = (((data.P || 0) / total) * 100).toFixed(2);
  const F: string = (((data.F || 0) / total) * 100).toFixed(2);

  const handleOnSave = (symbol: string, d: any = data) => {
    const total = (d.Q || 0) + (d.A || 0) + (d.P || 0) + (d.F || 0);
    if (total <= 1) {
      alert("Recheck the values. Total should be greater than 1.");
      return;
    }

    const color = colorMap[symbol];
    onSave(
      {
        Q: d.Q || 0,
        A: d.A || 0,
        P: d.P || 0,
        F: d.F || 0,
      },
      color,
    );
    setData({ Q: 0, A: 0, P: 0, F: 0 });
  };
  const handleRandom = (doSetData: boolean = true) => {
    const random = Math.floor(Math.random() * 100);
    const random2 = Math.floor(Math.random() * (100 - random));
    const random3 = 100 - random - random2;

    let obj;
    if (nAxis === 3) {
      if (isFAP) {
        obj = { Q: 0, A: random2, P: random3, F: random };
      } else {
        obj = { Q: random, A: random2, P: random3, F: 0 };
      }
    } else {
      if (Math.random() > 0.5) {
        obj = { Q: random, A: random2, P: random3, F: 0 };
      } else {
        obj = { Q: 0, A: random2, P: random3, F: random };
      }
    }
    if (doSetData) {
      setData(obj);
    }
    return obj;
  };

  let caption;
  if (!isFAP) {
    caption = `Total=${total.toFixed(2)} Q=${Q}% A=${A}% P=${P}%`;
    if (nAxis === 4) {
      caption = `Total=${total.toFixed(2)} Q=${Q}% A=${A}% P=${P}% F=${F}%`;
    }
  } else {
    caption = `Total=${total.toFixed(2)} F=${F}% A=${A}% P=${P}%`;
  }

  return (
    <div className="flex flex-col space-y-5 bg-gray-50 py-3 px-2 shadow">
      <div className="flex flex-col">
        <div className="text-gray-400 text-[0.5rem]">{caption}</div>

        <div className="flex flex-row items-center">
          {isFAP ? (
            <InputBox
              label={axisNames[0]}
              name="F"
              value={data.F}
              onChange={handleChange}
            />
          ) : (
            <InputBox
              label={axisNames[0]}
              name="Q"
              value={data.Q}
              onChange={handleChange}
            />
          )}
          <InputBox
            label={axisNames[1]}
            name="A"
            value={data.A}
            onChange={handleChange}
          />
          <InputBox
            label={axisNames[2]}
            name="P"
            value={data.P}
            onChange={handleChange}
          />
          {nAxis === 4 && (
            <InputBox
              label={axisNames[3]}
              name="F"
              value={data.F}
              onChange={handleChange}
            />
          )}
          <Button color="success" onClick={() => handleRandom(true)}>
            random
          </Button>
          <Button
            color="success"
            onClick={() => {
              const obj = handleRandom(false);
              const color =
                Object.keys(colorMap)[Math.floor(Math.random() * 3)];

              handleOnSave(color, obj);
            }}
          >
            r plot
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
