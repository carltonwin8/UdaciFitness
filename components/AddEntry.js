import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import UdaciSlider from './UdaciSlider';
import UdaciSteppers from './UdaciSteppers';
import DateHeader from './DateHeader';

function SubmitBtn ({onPress}) {
  return (<TouchableOpacity onPress={onPress}>
    <Text>Submit</Text>
  </TouchableOpacity>);
}

export default class AddEntry extends Component {
  state = { run: 0, bike: 0, swim: 0, sleep: 0, eat: 0, }
  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric);
    this.setState(state => {
      const count = state[metric] + step;
      return {...state, [metric]: count > max ? max : count}
    });
  }
  decrement = metric => {
  const { step } = getMetricMetaInfo(metric);
    this.setState(state => {
    const count = state[metric] - step;
      return {...state, [metric]: count < 0 ? 0 : count}
    });
  }
  slide = (metric, value) => {
    this.setState(state => ({...state, [metric]: value}));
  }
  submit = () => {
    const key = timeToString();
    const entry = this.state;
    // update redux
    this.setState(() => ({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0, }));
    // nav to home
    // save to db
    // clear local notification
  }
  render = () => {
    const metaInfo = getMetricMetaInfo();
    return (<View>
      <DateHeader date={(new Date()).toLocaleDateString()} />
      {Object.keys(metaInfo).map(key => {
        const { getIcon, type, ...rest } = metaInfo[key];
        const value = this.state[key];
        return (<View key={key}>
          {getIcon()}
          {type === "steppers"
            ? <UdaciSteppers
                value={value}
                onChange={(value) => this.side(key, value)}
                {...rest}
              />
            : <UdaciSlider
                value={value}
                onInc={() => this.increment(key)}
                onDec={() => this.decrement(key)}
                {...rest}
              />}
        </View>);
      })}
      <SubmitBtn onPress={this.submit} />
    </View>);
  }
}
