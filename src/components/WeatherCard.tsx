import { convertSpeed, findWindDirection, formatDate } from "../utils/functions";
import { IWeather } from "../utils/interfaces";
import droplet from "./../assets/droplet.svg";
import loader from "./../assets/loader.svg";
import thermometer from "./../assets/thermometer.svg";
import wind from "./../assets/wind.svg";

interface IProps {
  weatherData: IWeather | null;
  errorMessage: string;
  // setErrorMessage: Dispatch<SetStateAction<string>>;
}

const WeatherCard = ({ weatherData, errorMessage }: IProps) => {
  // const [weatherData, setWeatherData] = useState(null as null | IWeather);

  // useEffect(() => {
  //   fetch(`https://api.airvisual.com/v2/nearest_city?key=${import.meta.env.VITE_API_WEATHER}`)
  //     .then((res) => {
  //       if (!res.ok) throw new Error(`${res.status}, Message: ${res.statusText}`);
  //       return res.json();
  //     })
  //     .then((res) => {
  //       setWeatherData({
  //         city: res.data.city,
  //         coordinates: res.data.location.coordinates,
  //         country: res.data.country,
  //         state: res.data.state,
  //         date: res.data.current.weather.ts,
  //         humidity: res.data.current.weather.hu,
  //         icon: res.data.current.weather.ic,
  //         temperature: res.data.current.weather.tp,
  //         windDirection: res.data.current.weather.wd,
  //         windSpeed: res.data.current.weather.ws,
  //       });
  //     })
  //     .catch((err) => {
  //       // console.error(err);

  //       setErrorMessage(err.message);
  //     });
  // }, []);

  return (
    <div className="weather-card">
      {!weatherData && !errorMessage && (
        <div className="loader">
          <img src={loader} alt="loader" />
        </div>
      )}

      {errorMessage && <div>Une erreur est survenue !</div>}

      {weatherData && (
        <>
          <div className="weather-conditions">
            <div className="weather">
              <img src={`/icons/${weatherData.icon}.svg`} alt="weather illustration" />
            </div>
            <div className="weather-details">
              <div className="item">
                <img src={thermometer} className="emoji" alt="temperature icon" />
                <span>{weatherData.temperature} °C</span>
              </div>
              <div className="item">
                <img src={wind} className="emoji" alt="wind speed icon" />
                <span>{Math.floor(convertSpeed(weatherData.windSpeed)) + " km/h"}</span>
              </div>
              <div className="item">
                <img src={droplet} className="emoji" alt="humidity icon" />
                <span>{weatherData.humidity} %</span>
              </div>
              <div className="item">
                <img
                  src={`/icons/compass${findWindDirection(weatherData.windDirection)[0]}.svg`}
                  className="emoji"
                  alt="wind direction icon"
                />
                <span>{findWindDirection(weatherData.windDirection)[1]}</span>
              </div>
            </div>
          </div>
          <div className="localization">{weatherData.city}</div>
          <div className="info-date">
            dernière mise à jour : <strong>le {formatDate(weatherData.date)}</strong>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherCard;
