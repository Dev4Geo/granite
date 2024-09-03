import { MyDataType, symbolType } from "@/types/types";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import assert from "assert";

const CircleColor = ({ symbol }: { symbol: symbolType }) => {
  const style = [
    "mb-[0.24rem] mr-2 w-3 h-3 rounded-full bg-black-500",
    symbol == "red" && "bg-red-500",
    symbol == "green" && "bg-green-500",
    symbol == "blue" && "bg-blue-500",
  ]
    .filter(Boolean)
    .join(" ");
  return <div className={style} />;
};

const Record = ({
  dat,
  onDelete,
  axisNames,
}: {
  dat: MyDataType;
  onDelete: any;
  axisNames: string[];
}) => {
  const nAxis = axisNames.length;
  const isFAP = nAxis === 3 && axisNames[0] === "F";
  assert(nAxis === 3 || nAxis === 4, "nAxis should be 3 or 4");
  const Q = dat.Q || 0;
  const A = dat.A || 0;
  const P = dat.P || 0;
  const F = dat.F || 0;
  const total = Q + A + P + F;
  const pQ = ((Q / total) * 100).toFixed(2);
  const pA = ((A / total) * 100).toFixed(2);
  const pP = ((P / total) * 100).toFixed(2);
  const pF = ((F / total) * 100).toFixed(2);
  let data;
  let caption;
  if (!isFAP) {
    data = [Q, A, P];
    caption = `Total=${total.toFixed(2)} Q=${pQ}% A=${pA}% P=${pP}%`;
    if (nAxis === 4) data.push(F);
    caption = `Total=${total.toFixed(2)} Q=${pQ}% A=${pA}% P=${pP}% F=${pF}%`;
  } else {
    data = [F, A, P];
    caption = `Total=${total.toFixed(2)} F=${pF}% A=${pA}% P=${pP}%`;
  }

  return (
    <div className="flex flex-row bg-gray-50 w-full shadow justify-between">
      <div className="flex flex-row  space-x-2 px-2 items-end justify-start text-gray-400">
        <CircleColor symbol={dat.symbol} />
        <div className="flex flex-row justify-start space-x-1 w-fit  text-sm text-start [&>*]:w-[4rem]">
          {data.map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>
        <div className="hidden lg:flex flex-row text-[0.7rem] w-[20rem]">
          {caption}
        </div>
      </div>
      <IconButton
        aria-label="delete"
        size="small"
        color="error"
        onClick={onDelete}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
};
export default Record;
