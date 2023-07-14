export type ILocation = {
  id: string;
  name: string;
  country: string;
};

export type IWeatherCondition = {
  text: string;
  icon: string;
};

export type ICurrent = {
  condition: IWeatherCondition;
  temp_c: string;
};
export type IWeather = {
  location: ILocation;
  current: ICurrent;
};

export type RootStackParamList = {
  Home: undefined;
  Splash: undefined;
};
