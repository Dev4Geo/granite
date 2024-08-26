import { QAP, symbolType } from "@/types/types";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";

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

const Record = ({ dat, onDelete }: { dat: QAP; onDelete: any }) => {
  const [width, setWidth] = useState(0);
  const style = " text-gray-400 text-sm text-start border w-full max-w-[3rem]";
  const style2 =
    "hidden sm:flex flex-row text-gray-400 text-[0.7rem] w-[17rem] ";

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div className="flex flex-row bg-gray-100 space-x-2 px-2  w-full shadow items-end">
      <CircleColor symbol={dat.symbol} />
      <div className="flex flex-row justify-start space-x-1 w-full max-w-[300px]">
        <div className={style}>{dat.Q}</div>
        <div className={style}>{dat.A}</div>
        <div className={style}>{dat.P}</div>
      </div>
      <div className={style2}>
        Total={(dat.Q + dat.A + dat.P).toFixed(2)} Q={dat.Q}% A={dat.A}% P=
        {dat.P}%
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
