import React from 'react';
import { View, Text , TouchableOpacity } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

export default function UdaciSteppers ({value, onInc, onDec, unit, max, step}) {
  return (<View>
    <View>
      <TouchableOpacity onPress={onDec} >
        <FontAwesome name='minus' size={30} color={'black'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onInc} >
        <FontAwesome name='plus' size={30} color={'black'} />
      </TouchableOpacity>
    </View>
    <View>
      <Text>{value}</Text>
      <Text>{unit}</Text>
    </View>
  </View>);
}
