import { Checkbox } from "@mui/material";

type MyCheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const MyCheckbox = ({ label, checked, onChange }: MyCheckboxProps) => {
  return (
    <div className="flex flex-row items-center">
      <Checkbox
        checked={checked}
        onChange={onChange}
        size="small"
      />
      <div className="text-[0.7rem] text-gray-500">{label}</div>
    </div>
  );
};
export default MyCheckbox;
