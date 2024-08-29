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
  assert(nAxis === 3 || nAxis === 4, "nAxis should be 3 or 4");
  const top = dat.top || 0;
  const left = dat.left || 0;
  const right = dat.right || 0;
  const bottom = dat.bottom || 0;
  const total = top + left + right + bottom;
  const pTop = ((top / total) * 100).toFixed(2);
  const pLeft = ((left / total) * 100).toFixed(2);
  const pRight = ((right / total) * 100).toFixed(2);
  const pBottom = ((bottom / total) * 100).toFixed(2);
  const data = [top, left, right];
  if (nAxis === 4) data.push(bottom);

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
          Total={total.toFixed(2)} {axisNames[0]}={pTop}% {axisNames[1]}={pLeft}
          % {axisNames[2]}={pRight}%{" "}
          {nAxis === 4 && `${axisNames[3]}=${pBottom}%`}
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
