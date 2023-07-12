export type ILocation = {
  id: string;
  name: string;
  country: string;
};

export type IWeatherCondition = {
  text: string;
  icon: string;
};
export type IWeather = {
  location: ILocation;
  temp_c: string;
  current: IWeatherCondition;
};

export type RootStackParamList = {
  Home: undefined;
  Weather: undefined;
};
