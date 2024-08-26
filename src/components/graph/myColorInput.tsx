type MyColorInputProps = {
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const MyColorInput = ({ title, onChange, value }: MyColorInputProps) => {
  if (title.startsWith("Alkali Feldspar Rhyolite")) {
     title = "AFR"
  }
  title =  title.replace("Quartz", "Q")
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center">
        <input
          className="slider w-8 h-8 bg-transparent"
          type="color"
          onChange={onChange}
          value={value}
        />
        <div className="flex flex-col">
          <div className="text-[0.6rem] text-gray-500 space-y-0 py-0">{title}</div>
          <div className="text-[0.4rem] text-gray-400 py-0">{value}</div>
        </div>
      </div>
    </div>
  );
};
export default MyColorInput;
