import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Constants } from 'expo';
import AppNavigator from './app/config/navigation';
import { Font } from 'expo';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './app/reducers/index';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Kanit-Regular": require('./app/assets/fonts/Kanit-Regular.ttf'),
    });
    this.setState({ fontLoaded: true })
  }

  render() {
    if (!this.state.fontLoaded) {
      return null
    }
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
});
