// tsx; form of QAP percentage

import { useEffect, useState } from "react";
import { colorMap } from "@/types/types";
import Symbol from "@/components/graph/symbol";

type inputBoxProps = {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputBox({ label, name, value, onChange }: inputBoxProps) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        className="border text-gray-600 w-16"
      />
    </div>
  );
}

export default function QAPForm({ onSave }: any) {
  const [QAP, setQAP] = useState({ Q: 20, A: 70, P: 10 });
  const [total, setTotal] = useState(100);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = parseInt(e.target.value);
    setQAP({ ...QAP, [name]: value });
  };

  useEffect(() => {
    setTotal(QAP.Q + QAP.A + QAP.P);
  }, [QAP]);

  const Q: string = ((QAP.Q / total) * 100).toFixed(2);
  const A: string = ((QAP.A / total) * 100).toFixed(2);
  const P: string = ((QAP.P / total) * 100).toFixed(2);

  const handleOnSave = (symbol: string) => {
    if (total <= 1) {
      alert("Recheck the values. Total should be greater than 1.");
      return;
    }
    
    const color = colorMap[symbol];
    onSave(parseFloat(Q), parseFloat(A), parseFloat(P), color);
    setQAP({ Q: 0, A: 0, P: 0 });
  };

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-row space-x-2">
        <InputBox label="Q" name="Q" value={QAP.Q} onChange={handleChange} />
        <InputBox label="A" name="A" value={QAP.A} onChange={handleChange} />
        <InputBox label="P" name="P" value={QAP.P} onChange={handleChange} />
        <Symbol name="R" onClick={() => handleOnSave("R")} />
        <Symbol name="G" onClick={() => handleOnSave("G")} />
        <Symbol name="B" onClick={() => handleOnSave("B")} />
      </div>
      {!!total && (
        <div className="text-gray-400">
          Total[{total}] QAP%[{Q}_{A}_{P}]
        </div>
      )}
    </div>
  );
}
