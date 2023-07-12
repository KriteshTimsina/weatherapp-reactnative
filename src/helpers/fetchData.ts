import {api_key} from '../constants/constants';

type IWeather = {
  location: string;
};
type ILocation = {
  cityName: string;
};

const weatherEndpoint = (params: IWeather) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${params.location}&days=7&aqi=no&alerts=no`;
const locationEndpoint = (params: ILocation) =>
  `https://api.weatherapi.com/v1/search.json?key=${api_key}&q=${params.cityName}`;

async function apiCall(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export function fetchWeather(params: IWeather) {
  return apiCall(weatherEndpoint(params));
}
export function fetchLocations(params: ILocation) {
  return apiCall(locationEndpoint(params));
}
