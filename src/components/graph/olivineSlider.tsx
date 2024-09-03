import { canvasConfigType } from "@/types/types";

type OvilineSliderProps = {
  canvasConfig:  canvasConfigType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const OvilineSlider = ({ canvasConfig, onChange }: OvilineSliderProps) => {
  return (
    //
    <div className="flex flex-col">
      <div className="flex flex-row space-x-1">
        <div className="text-sm text-gray-600">Oviline Mineral</div>
        <div className="w-[3rem] text-sm">{canvasConfig.olivineModal} %</div>
      </div>
      <input
        className="slider accent-green-700"
        type="range"
        name="olivineModal"
        min={0}
        max={100}
        step={0.1}
        value={canvasConfig.olivineModal}
        onChange={onChange}
      />
    </div>
  );
};
export default OvilineSlider;
