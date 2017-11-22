import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import UdaciSlider from './UdaciSlider';
import UdaciSteppers from './UdaciSteppers';
import DateHeader from './DateHeader';
import TextButton from './TextButton';
import { submitEntry, removeEntry } from '../utils/api';
import { addEntry } from '../actions';
import { getDailyReminderValue } from '../utils/helpers';
import { white, purple } from '../utils/colors';

function SubmitBtn ({onPress}) {
  return (
  <TouchableOpacity
    onPress={onPress}
    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}>
    <Text style={styles.submitBtnText}>Submit</Text>
  </TouchableOpacity>);
}

class AddEntry extends Component {
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
    this.props.dispatch(addEntry({[key]: entry}));
    this.setState(() => ({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0, }));
    this.toHome();
    submitEntry({key, entry});
    // clear local notification
  }
  toHome = () => {
    this.props.navigation.dispatch(
      NavigationActions.back({ key: 'AddEntry' })
    );
  }
  reset = () => {
    const key = timeToString();
    this.props.dispatch(addEntry({[key]: getDailyReminderValue() }));
    this.toHome()
    removeEntry(key);
  }
  render = () => {
    if (this.props.alreadyLogged) {
      return (<View style={styles.center}>
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
          size={100}
        />
        <Text>You already logged your information for today 2.</Text>
        <TextButton onPress={this.reset} style={{padding: 10}}>Reset</TextButton>
      </View>);
    } else {
      const metaInfo = getMetricMetaInfo();
      return (<View style={styles.container}>
        <DateHeader date={(new Date()).toLocaleDateString()} />
        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];
          return (<View key={key} style={styles.row}>
            {getIcon()}
            {type === "steppers"
              ? <UdaciSteppers
                  value={value}
                  onInc={() => this.increment(key)}
                  onDec={() => this.decrement(key)}
                  {...rest}
                />
              : <UdaciSlider
                  value={value}
                  onChange={(value) => this.slide(key, value)}
                    min={0}
                  {...rest}
                />}
          </View>);
        })}
        <SubmitBtn onPress={this.submit} />
      </View>);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2,
    height: 45,
    marginLeft: 30,
    marginRight: 30,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  }
});

function mapStateToProps (state) {
  const key = timeToString();
  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}
export default connect(mapStateToProps, null)(AddEntry);
