import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../constants/constants';

const DialyForecast = ({item}: {item: any}) => {
  const date = new Date(item.date);
  const options: any = {weekday: 'long'};
  let dayName = date.toLocaleDateString('en-US', options);
  dayName = dayName.split(',')[0];
  return (
    <View style={[styles.container, {backgroundColor: Colors.bgWhite(0.3)}]}>
      <Image
        source={{uri: 'https:' + item?.day?.condition?.icon}}
        style={styles.icon}
      />
      <Text style={styles.dayName}>{dayName}</Text>
      <Text style={styles.day}>{item?.day?.avgtemp_c}&#176;</Text>
    </View>
  );
};

export default DialyForecast;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 96,
    borderRadius: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginTop: 10,
  },
  icon: {
    width: 44,
    height: 44,
  },
  dayName: {
    color: Colors.white,
  },
  day: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
