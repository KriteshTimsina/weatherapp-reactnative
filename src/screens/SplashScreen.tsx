import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../constants/constants';

const SplashScreen = () => {
  return (
    <ImageBackground
      blurRadius={70}
      source={require('../assets/bg.png')}
      style={styles.container}>
      <Image style={styles.icon} source={require('../assets/icon.png')} />
      <Text style={{color: Colors.white}}>Daily Weather</Text>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 2,
  },
});
