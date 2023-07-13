import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../constants/constants';
import Icon from 'react-native-vector-icons/EvilIcons';
import SearchIcon from 'react-native-vector-icons/Ionicons';
import {ILocation, IWeather} from '../types/types';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import {fetchLocations, fetchWeather} from '../helpers/fetchData';
import {getItem, storeData} from '../helpers/storeData';
import DialyForecast from '../components/DialyForecast';

import Geolocation from '@react-native-community/geolocation';

const HomeScreen = () => {
  const [input, setInput] = useState<string>('');
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [weather, setWeather] = useState<IWeather[]>([]);
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLocationOn, setIsLocationOn] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<any>({
    long: 1,
    lat: 2,
  });

  async function handleInput(value: string) {
    setInput(value);
    if (value.length > 2) {
      fetchLocations({cityName: value}).then(data => {
        setLocations(data);
      });
    }
  }

  async function handleSearchToggle() {
    setShowSearchBar(!showSearchBar);
    // setLoading(true);
    // const weather = await fetchWeather({location: input});
    // setWeather(weather);
    // setLoading(false);
  }

  async function handleLocation(city: string) {
    setLocations([]);
    fetchWeather({location: city}).then(data => {
      setWeather(data);
    });

    await storeData('city', city);
  }

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        //Setting Longitude state
        setCoordinates({
          long: position.coords.longitude,
          lat: position.coords.latitude,
        });
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  useEffect(() => {
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setIsLocationOn(true);
          getOneTimeLocation();
        } else {
          setIsLocationOn(false);
        }
      } catch (err) {
        console.log('eroror bajsjk', err);
      }
    }
    // requestLocationPermission();
  }, []);

  useEffect(() => {
    console.log(locations);
  }, [input]);
  useEffect(() => {
    async function fetchWeatherOnStart() {
      const city = await getItem('city');
      let cityName = 'kathmandu';
      if (city) cityName = city;

      const weather = await fetchWeather({location: cityName});
      setWeather(weather);
    }
    fetchWeatherOnStart();
  }, []);

  const {current, location} = weather;
  // console.log(current.condition.icon, typeof current.condition.icon);

  return (
    <View style={styles.container}>
      <ImageBackground
        blurRadius={60}
        source={require('../assets/bg.png')}
        style={styles.background}>
        <SafeAreaView style={{flex: 1}}>
          {/* <View>
            <Text style={{color: 'yellow'}}>
              {isLocationOn && 'location on'}
            </Text>
            <Text style={{color: 'yellow'}}>{coordinates.long}</Text>
            <Text style={{color: 'yellow'}}>{coordinates.lat}</Text>
          </View> */}
          <View
            style={[
              styles.searchbar,
              {backgroundColor: showSearchBar ? Colors.gray : 'transparent'},
            ]}>
            <TextInput
              onChangeText={handleInput}
              style={[
                styles.textInput,
                {
                  display: showSearchBar ? 'flex' : 'none',
                },
              ]}
              placeholder="Search city..."
              placeholderTextColor={Colors.white}
            />
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={handleSearchToggle}
              style={styles.searchButton}>
              <SearchIcon
                style={styles.searchIcon}
                name="md-search-outline"
                size={15}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.locationContainer}>
            {input.length > 2 &&
              locations.map(location => {
                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(location?.name)}
                    style={styles.locations}
                    key={location.id}>
                    <Icon color={'black'} name="location" size={15} />
                    <Text style={styles.locationText ?? 'hi'}>
                      {location?.name ?? 'hi'}, {location?.country ?? 'hi'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>

          {location && (
            <>
              <View style={styles.weatherInfo}>
                <View>
                  <Text style={styles.address}>
                    {location?.name ?? 'hji'},
                    <Text style={styles.country}>
                      {location?.country ?? 'hi'}
                    </Text>
                  </Text>
                </View>
                <View>
                  <Image
                    height={100}
                    source={{uri: 'https:' + current?.condition?.icon}}
                    width={100}
                  />
                </View>

                <View style={styles.weatherData}>
                  <Text style={styles.temp}>{current?.temp_c}&#176;</Text>
                  <Text style={styles.situation}>
                    {current?.condition?.text}
                  </Text>
                </View>

                {/* //humidity and sunrise */}

                <View style={styles.conditionContainer}>
                  <View style={styles.condition}>
                    <FeatherIcon color="white" name="wind" size={25} />
                    <Text style={styles.conditionText}>
                      {current?.wind_kph}km
                    </Text>
                  </View>
                  <View style={styles.condition}>
                    <EntypoIcon color="white" name="drop" size={25} />
                    <Text style={styles.conditionText}>
                      {current?.humidity}%
                    </Text>
                  </View>
                  <View style={styles.condition}>
                    <FeatherIcon color="white" name="sun" size={25} />
                    <Text style={styles.conditionText}>
                      {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                    </Text>
                  </View>
                </View>

                {/* dilay forecast */}
              </View>

              <View style={styles.dialyForecast}>
                <View style={styles.forecastTitle}>
                  <Icon color={'white'} name="calendar" size={25} />
                  <Text style={styles.forecastText}>Dialy Forecast</Text>
                </View>
                <ScrollView
                  horizontal
                  contentContainerStyle={{paddingHorizontal: 15}}
                  showsHorizontalScrollIndicator={false}>
                  {weather?.forecast?.forecastday?.map((item, index) => {
                    return <DialyForecast key={index} item={item} />;
                  })}
                </ScrollView>
              </View>
            </>
          )}
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  background: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  searchbar: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 100,
    backgroundColor: Colors.gray,
  },
  textInput: {
    color: Colors.white,
    width: '85%',
  },
  searchButton: {
    flex: 1,
    alignItems: 'flex-end',
    textAlign: 'center',
    justifyContent: 'center',
    height: 40,
  },
  searchIcon: {
    fontSize: 20,
    color: Colors.white,
    backgroundColor: Colors.bgWhite(0.2),
    padding: 5,
    borderRadius: 100,
  },
  locationContainer: {
    marginTop: 7,
    marginHorizontal: 20,
    paddingHorizontal: 7,
    backgroundColor: Colors.white,
    borderRadius: 20,
    gap: 10,
  },
  locations: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  locationText: {
    fontWeight: 'bold',
    color: Colors.gray,
  },
  weatherInfo: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  address: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  country: {
    fontWeight: 'normal',
    color: Colors.bgWhite(0.9),
  },
  weatherIcon: {},
  weatherData: {
    alignItems: 'center',
  },
  temp: {
    color: Colors.white,
    fontSize: 46,
    fontWeight: '700',
  },
  situation: {
    color: Colors.white,
  },
  conditionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  condition: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  conditionText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  dialyForecast: {
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 20,
  },
  forecastTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  forecastText: {
    fontSize: 16,
    color: Colors.white,
  },
});
