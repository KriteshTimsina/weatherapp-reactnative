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
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../constants/constants';
import Icon from 'react-native-vector-icons/EvilIcons';
import SearchIcon from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../types/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const [input, setInput] = useState<string>('');
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [locations, setLocations] = useState([
    {
      id: 1,
      city: 'Kualalampur',
      country: 'Malaysia',
    },
    {
      id: 2,
      city: 'London',
      country: 'Uk',
    },
    {
      id: 3,
      city: 'Kathmandu',
      country: 'Nepal',
    },
  ]);

  function handleSearch(value: string) {
    setInput(value);
    console.log(input);
  }

  function handleLocation(city: string) {
    console.log(city);
  }
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
              onChangeText={handleSearch}
              style={[
                styles.textInput,
                {display: showSearchBar ? 'flex' : 'none'},
              ]}
              placeholder="Search for a location..."
              placeholderTextColor={Colors.white}
            />
            <TouchableHighlight
              onPress={() => setShowSearchBar(!showSearchBar)}
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
                    onPress={() => handleLocation(location.city)}
                    style={styles.locations}
                    key={location.id}>
                    <Icon color={'black'} name="location" size={15} />
                    <Text style={styles.locationText}>
                      {location.city}, {location.country}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>

          <View style={styles.weatherInfo}>
            <View>
              <Text style={styles.address}>
                London, <Text style={styles.country}>United Kingdom</Text>
              </Text>
            </View>
            <View>
              <Image source={require('../assets/sunnyImage.png')} />
            </View>
            <View style={styles.weatherData}>
              <Text style={styles.temp}>23&#176;</Text>
              <Text style={styles.situation}>Partly cloudy</Text>
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
    fontSize: 18,
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
