import React from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';
import { gray } from '../utils/colors';

export default function UdaciSlider ({value, min, max, step, onChange, unit}) {
  return (<View style={[styles.row, { justifyContent: 'space-between'}]}>
    <Slider
      style={{flex: 1}}
      value={value}
      maximumValue={max}
      minimumValue={min}
      step={step}
      onValueChange={onChange}
    />
    <View style={styles.metricCounter}>
      <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
      <Text style={{fontSize: 18, textAlign: 'center', color: gray}}>{unit}</Text>
    </View>
  </View>);
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
  }
});
