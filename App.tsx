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
import {Colors} from './src/constants/constants';

const App = () => {
  const [input, setInput] = useState<string>('');
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
  return (
    <ImageBackground
      blurRadius={70}
      source={require('./src/assets/bg.png')}
      style={styles.background}>
      <SafeAreaView>
        <View style={styles.searchbar}>
          <TextInput
            onChangeText={handleSearch}
            style={styles.textInput}
            placeholder="Search for a location..."
            placeholderTextColor={Colors.white}
          />
          <TouchableHighlight style={styles.searchButton}>
            <Text style={styles.searchText}>&#128269;</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.locationContainer}>
          {input.length > 2 &&
            locations.map(location => {
              return (
                <TouchableOpacity style={styles.locations} key={location.id}>
                  <Text>⚓</Text>
                  <Text style={styles.locationText}>
                    {location.city}, {location.country}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default App;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: '100%',
    width: '100%',
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
  searchButton: {},
  searchText: {
    fontSize: 20,
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
  },
});
