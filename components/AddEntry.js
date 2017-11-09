import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { getMetricMetaInfo } from '../utils/helpers';


export default class AddEntry extends Component {
  render = () => {
    return (<View>
      <Text>Hi Carlton</Text>
      {getMetricMetaInfo("bike").getIcon()}
      <Text>Bye Carlton</Text>
    </View>);
  }
}
