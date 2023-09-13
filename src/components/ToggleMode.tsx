import { useState } from "react";
import owl from "./../assets/owl.svg";
import rooster from "./../assets/rooster.svg";

const ToggleMode = () => {
  const [nightMode, setNightMode] = useState(
    new Date().getHours() > 17 || new Date().getHours() < 7 ? true : false
  );

  nightMode ? document.body.classList.add("night") : document.body.classList.remove("night");
  nightMode
    ? document.querySelector("main")?.classList.add("night")
    : document.querySelector("main")?.classList.remove("night");

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
