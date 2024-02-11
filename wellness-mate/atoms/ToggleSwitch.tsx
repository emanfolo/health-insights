import { ToggleOff, ToggleOn } from "../icons";

export const ToggleSwitch = ({ boolean, setBoolean }) => {
  return (
    <div onClick={() => setBoolean(!boolean)} className="cursor-pointer">
      {boolean ? (
        <input type="checkbox" className="toggle" checked />
      ) : (
        <input type="checkbox" className="toggle" />
      )}
    </div>
  );
};
