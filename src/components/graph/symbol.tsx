import { colorMap } from "@/types/types";

type symbolProps = {
  name: string;
  onClick?: () => void;
};

function Symbol({ name, onClick }: symbolProps) {
  const color = colorMap[name];
  const style = [
    "p-1",
    "hover:cursor-pointer",
    color == "red" && "bg-red-400",
    color == "green" && "bg-green-400",
    color == "blue" && "bg-blue-400",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={style} onClick={onClick}>
      {name}
    </div>
  );
}

export default Symbol;
