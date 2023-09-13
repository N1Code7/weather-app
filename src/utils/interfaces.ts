export interface IWeather {
  city: string;
  coordinates: Array<number>;
  country: string;
  date: string;
  humidity: number;
  icon: string;
  state: string;
  temperature: number;
  windSpeed: number;
  windDirection: number;
}
