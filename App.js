import React from 'react';
import { View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';

import AddEntry from './components/AddEntry';
import History from './components/History';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View style={{flex: 1}}>
          <View style={{height: 20}} />
          <History />
          {/* <AddEntry/> */}
        </View>
      </Provider>
    );
  }
}
