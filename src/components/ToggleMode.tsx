import { Dispatch, SetStateAction } from "react";
import rooster from "./../assets/Rooster.svg";
import owl from "./../assets/Owl.svg";

interface IProps {
  nightMode: boolean;
  setNightMode: Dispatch<SetStateAction<boolean>>;
}

const ToggleMode = ({ nightMode, setNightMode }: IProps) => {
  return (
    <button className="toggle-mode" onClick={() => setNightMode((prev: boolean) => !prev)}>
      <img
        src={!nightMode ? owl : rooster}
        className="emoji"
        alt={`change to ${!nightMode ? "night mode" : "day mode"}`}
      />
    </button>
  );
};

export default ToggleMode;
