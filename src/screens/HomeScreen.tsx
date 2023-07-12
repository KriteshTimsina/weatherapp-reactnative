import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  Image,
  Button,
  TouchableHighlight,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../constants/constants';
import Icon from 'react-native-vector-icons/EvilIcons';
import SearchIcon from 'react-native-vector-icons/Ionicons';
import {ILocation, IWeather, RootStackParamList} from '../types/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fetchLocations, fetchWeather} from '../helpers/fetchData';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const [input, setInput] = useState<string>('');
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [weather, setWeather] = useState<IWeather[]>([]);
  const [locations, setLocations] = useState<ILocation[]>([]);

  async function handleInput(value: string) {
    setInput(value);
    if (value.length > 2) {
      fetchLocations({cityName: value}).then(data => {
        setLocations(data);
      });
    }
  }

  async function handleSearch() {
    setShowSearchBar(!showSearchBar);
    const weather = await fetchWeather({location: input});
    setWeather(weather);
  }

  async function handleLocation(city: string) {
    setLocations([]);
    setInput('');
    fetchWeather({location: city}).then(data => {
      setWeather(data);
    });
    console.log(weather);
  }

  const {current, location} = weather;
  // console.log(current.condition.icon, typeof current.condition.icon);
  return (
    <View style={styles.container}>
      <ImageBackground
        blurRadius={60}
        source={require('../assets/bg.png')}
        style={styles.background}>
        <SafeAreaView style={{flex: 1}}>
          <View
            style={[
              styles.searchbar,
              {backgroundColor: showSearchBar ? Colors.gray : 'transparent'},
            ]}>
            <TextInput
              onChangeText={handleInput}
              style={[
                styles.textInput,
                {display: showSearchBar ? 'flex' : 'none'},
              ]}
              placeholder="Search for a location..."
              placeholderTextColor={Colors.white}
            />
            <TouchableHighlight
              onPress={handleSearch}
              style={styles.searchButton}>
              <SearchIcon
                style={styles.searchIcon}
                name="md-search-outline"
                size={15}
              />
            </TouchableHighlight>
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
                    <Text style={styles.locationText}>
                      {location?.name}, {location?.country}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>

          <View style={styles.weatherInfo}>
            <View>
              <Text style={styles.address}>
                {location?.name},
                <Text style={styles.country}> {location?.country}</Text>
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
              <Text style={styles.situation}>{current?.condition?.text}</Text>
            </View>
          </View>
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
  },
  searchButton: {
    flex: 1,
    alignItems: 'flex-end',
    textAlign: 'center',
    justifyContent: 'center',
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
});
