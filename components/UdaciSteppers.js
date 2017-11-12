import React from 'react';
import { View, Text , TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { white, gray, purple } from '../utils/colors';

export default function UdaciSteppers ({value, onInc, onDec, unit, max, step}) {
  return (<View style={[styles.row, { justifyContent: 'space-between'}]}>
    {Platform.OS === 'ios'
      ?
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={onDec}
            style={[styles.iosBtn, {borderTopRightRadius: 0, borderBottomRightRadius: 0}]}>
            <Entypo name='minus' size={30} color={'purple'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onInc}
            style={[styles.iosBtn, {borderTopLeftRadius: 0, borderBottomLeftRadius: 0}]}>
            <Entypo name='plus' size={30} color={'purple'} />
          </TouchableOpacity>
        </View>
      :
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={onDec}
            style={[styles.androidBtn]}>
            <FontAwesome name='minus' size={30} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onInc}
            style={[styles.androidBtn]}>
            <FontAwesome name='plus' size={30} color={'white'} />
          </TouchableOpacity>
        </View>
    }
    <View style={[styles.metricCounter]}>
      <Text style={{fontSize: 28, textAlign: 'center'}}>{value}</Text>
      <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
    </View>
  </View>);
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iosBtn: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  androidBtn: {
    margin: 5,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2,
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
