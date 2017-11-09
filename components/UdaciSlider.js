import React from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';

export default function UdaciSlider ({value, min, max, step, onChange, unit}) {
  return (<View>
    <Slider
      value={value}
      maximumValue={max}
      minimumValue={min}
      step={step}
      onValueChange={onChange}
    />
    <View>
      <Text>{value}</Text>
      <Text>{unit}</Text>
    </View>
  </View>);
}
