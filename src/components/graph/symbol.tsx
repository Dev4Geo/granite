import { colorMap } from "@/types/types";
import { Button } from "@mui/material";

type symbolProps = {
  name: string;
  onClick?: () => void;
};

function Symbol({ name, onClick }: symbolProps) {
  const color = colorMap[name];
  const style = [
    "text-white text-sm shadow rounded-none text-center group",
    "hover:bg-gray-300",
    color == "red" && "bg-red-400",
    color == "green" && "bg-green-400",
    color == "blue" && "bg-blue-400",
    color == "Custom" && "bg-slate-400",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Button onClick={onClick} className={style}>
      <div className="group-hover:hidden flex flex-row">
        <div className="opacity-100 hover:opacity-0 text-[0.7rem]">{name}</div>
      </div>
      <span className="hidden group-hover:block text-center text-gray-500 text-sm">
        +
      </span>
    </Button>
  );
}

export default Symbol;
