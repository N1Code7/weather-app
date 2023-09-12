import { useEffect, useState } from "react";
import confetti from "./assets/confetti.svg";
import house from "./assets/house.svg";
import calendar from "./assets/spiral-calendar.svg";
import search from "./assets/magnifying-glass.svg";
import ToggleMode from "./components/ToggleMode";
import WeatherCard from "./components/WeatherCard";
import { formatDate, getSaintFromCookie, getTomorrowMidnight } from "./utils/functions";

const App = () => {
  const [nightMode, setNightMode] = useState(false);
  const [saint, setSaint] = useState(getSaintFromCookie() || "");

  useEffect(() => {
    // if (!getSaintFromCookie()) {
    fetch(
      `https://calendarific.com/api/v2/holidays?&api_key=${
        import.meta.env.VITE_API_SAINT
      }&country=FR&year=${new Date().getFullYear()}`
    )
      // fetch(`https://fetedujour.fr/api/v2/${import.meta.env.VITE_API_SAINT}/json-normal-10-5`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}, Message: ${res.statusText}`);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setSaint(res.name);
        document.cookie = `saint=${res.name}; Expires=${getTomorrowMidnight()}`;
      })
      .catch((err) => {
        console.error(err);
      });
    // }
  }, []);

  return (
    <main className={nightMode ? "" : "night"}>
      <ToggleMode nightMode={nightMode} setNightMode={setNightMode} />

      <div className="calendar-info">
        <img src={calendar} className="emoji" alt="calendar icon" />
        <div className="text">
          Nous sommes le <strong>{formatDate(new Date().toISOString(), 2)}</strong>
        </div>
      </div>

      {saint && (
        <div className="celebration">
          <img src={confetti} className="emoji" alt="confetti icon" />
          <div className="text">
            Nous fêtons les <strong>{saint}</strong> !
          </div>
        </div>
      )}

      <div className="search-container">
        <div className="input-search">
          <img src={search} alt="magnifying glass icon" />
          <input
            type="search"
            name="city-research"
            id="cityResearch"
            placeholder="Rechercher une ville"
          />
        </div>
        <button className="btn-home">
          <img src={house} className="emoji" alt="house icon" />
        </button>
      </div>

      <WeatherCard />
    </main>
  );
};

export default App;
