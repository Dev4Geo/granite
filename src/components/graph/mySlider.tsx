type MySliderProps = {
  title: string;
  name: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLInputElement>) => void;
};

const MySlider = ({
  title,
  name,
  min,
  max,
  step,
  value,
  onChange,
  onMouseUp,
}: MySliderProps) => {
  return (
    <div className="">
      <div className="text-[0.7rem] text-gray-500">{title}</div>
      <input
        className="slider accent-green-700"
        type="range"
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        onMouseUp={onMouseUp}
      />
    </div>
  );
};

export default MySlider;
