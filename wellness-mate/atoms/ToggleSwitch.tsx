import { ToggleOff, ToggleOn } from "../icons";

export const ToggleSwitch = ({ boolean, setBoolean }) => {
  return (
    <div onClick={() => setBoolean(!boolean)} className="cursor-pointer">
      {boolean ? <ToggleOn /> : <ToggleOff />}
    </div>
  );
};
