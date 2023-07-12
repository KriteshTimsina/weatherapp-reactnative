import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../types/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type WeatherProp = NativeStackScreenProps<RootStackParamList, 'Weather'>;

const WeatherScreen = () => {
  return (
    <View>
      <Text>WeatherScreen</Text>
    </View>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({});
