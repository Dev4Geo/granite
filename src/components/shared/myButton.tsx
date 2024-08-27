import { Button } from "@mui/material";

type MyButtonProps = {
  title: string;
  onClick: any;
};
const MyButton = ({ title, onClick }: MyButtonProps) => {
  return (
    //
    <Button onClick={onClick}>{title}</Button>
  );
};
export default MyButton;
