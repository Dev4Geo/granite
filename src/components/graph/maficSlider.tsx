import { canvasConfigType } from "@/types/types";

type MaficSliderProps = {
  canvasConfig:  canvasConfigType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const MaficSlider = ({ canvasConfig, onChange }: MaficSliderProps) => {
  return (
    //
    <div className="flex flex-col">
      <div className="flex flex-row space-x-1">
        <div className="text-sm text-gray-600">Mafic Mineral</div>
        <div className="w-[3rem] text-sm">{canvasConfig.maficMineral} %</div>
      </div>
      <input
        className="slider accent-green-700"
        type="range"
        name="maficMineral"
        min={0}
        max={100}
        step={0.1}
        value={canvasConfig.maficMineral}
        onChange={onChange}
      />
    </div>
  );
};
export default MaficSlider;
