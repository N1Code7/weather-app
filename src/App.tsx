import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import house from "./assets/house.svg";
import search from "./assets/magnifying-glass.svg";
import calendar from "./assets/spiral-calendar.svg";
import ToggleMode from "./components/ToggleMode";
import WeatherCard from "./components/WeatherCard";
import { formatDate } from "./utils/functions";
import { IWeather } from "./utils/interfaces";

interface iCity {
  code: string;
  nom: string;
  departement: { nom: string; code: string };
}

const App = () => {
  const [weatherData, setWeatherData] = useState(null as null | IWeather);
  const [errorMessage, setErrorMessage] = useState({ citySearch: "", weather: "", address: "" });
  const [citiesList, setCitiesList] = useState([]);
  const searchCityRef = useRef<HTMLInputElement>(null);

  const fetchWeather = ({ search, lat, lon }: { search?: boolean; lat?: number; lon?: number }) => {
    fetch(
      `https://api.airvisual.com/v2/nearest_city?${
        search ? "lat=" + lat + "&lon=" + lon : ""
      }&key=${import.meta.env.VITE_API_WEATHER}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}, Message: ${res.statusText}`);
        return res.json();
      })
      .then((res) => {
        setWeatherData({
          city: res.data.city,
          coordinates: res.data.location.coordinates,
          country: res.data.country,
          state: res.data.state,
          date: res.data.current.weather.ts,
          humidity: res.data.current.weather.hu,
          icon: res.data.current.weather.ic,
          temperature: res.data.current.weather.tp,
          windDirection: res.data.current.weather.wd,
          windSpeed: res.data.current.weather.ws,
        });
      })
      .catch((err) => {
        // console.error(err);
        setErrorMessage((prev) => ({ ...prev, weather: err.message }));
      });
  };

  const handleSearchCity = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.value.length > 4) {
      fetch(
        `https://geo.api.gouv.fr/communes?nom=${e.target.value}&fields=departement&boost=population&limit=5`
      )
        .then((res) => {
          if (!res.ok) throw new Error(`Error: ${res.status}, Message: ${res.statusText}`);
          return res.json();
        })
        .then((res) => {
          setCitiesList(res);
        })
        .catch((err) => {
          setErrorMessage((prev) => ({ ...prev, citySearch: err.message }));
        });
    } else {
      setCitiesList([]);
    }
  };

  const handleCityClick = async (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();

    const selectedCity: iCity = citiesList.filter(
      (item: iCity) => item.code === (e.target as HTMLElement).dataset.code
    )[0];

    setCitiesList([]);
    searchCityRef.current!.value = "";

    fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${selectedCity.nom}&type=municipality&citycode=${selectedCity.code}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}, Message: ${res.statusText}`);
        return res.json();
      })
      .then((res) => {
        fetchWeather({
          search: true,
          lat: res.features[0].geometry.coordinates[1],
          lon: res.features[0].geometry.coordinates[0],
        });
      })
      .catch((err) => {
        setErrorMessage((prev) => ({ ...prev, address: err.message }));
      });
  };

  const handleClickToGetHomeWeather = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchWeather({});
  };

  useEffect(() => {
    fetchWeather({});
  }, []);

  return (
    <main>
      <ToggleMode />

      <div className="calendar-info">
        <img src={calendar} className="emoji" alt="calendar icon" />
        <div className="text">
          Nous sommes le <strong>{formatDate(new Date().toISOString(), 2)}</strong>
        </div>
      </div>

      <div className="search-container">
        <div className="input-search">
          <img src={search} alt="magnifying glass icon" />
          <input
            type="search"
            name="city-research"
            id="cityResearch"
            placeholder="Rechercher une ville"
            onChange={handleSearchCity}
            ref={searchCityRef}
          />
        </div>
        <button className="btn-home" onClick={handleClickToGetHomeWeather}>
          <img src={house} className="emoji" alt="house icon" />
        </button>
      </div>

      {errorMessage.citySearch && (
        <ul>
          <li>Une erreur est survenue dans la recherche de la ville correspondante !</li>
        </ul>
      )}

      {citiesList.length !== 0 && (
        <ul className="citiesList">
          {citiesList.map((item: iCity) => (
            <li key={v4()} onClick={handleCityClick} data-code={item.code}>
              {item.nom as string}, {item.departement.nom} ({item.departement.code})
            </li>
          ))}
        </ul>
      )}
      <WeatherCard errorMessage={errorMessage} weatherData={weatherData} />
    </main>
  );
};

export default App;
