import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import HomeScreen from './src/screens/Home/Home';
import LoadingScreen from './src/screens/Loading/Loading';
import AuthScreen from './src/screens/Auth/Auth';
import InitScreen from './src/screens/Init/Init';

class App extends Component {
  state = {
    currScreen: 'loading',
    pwd: null
  }
  componentDidMount() {
    // startFetchig
    AsyncStorage.getItem('pwd')
      .then(pwd => {
        this.setState({ pwd, currScreen: 'auth' });
      })
      .catch(error => {
        this.setState({ currScreen: 'auth' });
      });
  }
  changeScreen = (name) => {
    this.setState({ currScreen: name });
  }
  render() {
    let screen = null;
    if(this.state.currScreen === 'loading') {
      screen = (
        <LoadingScreen />
      );
    } else if(this.state.currScreen === 'auth') {
      screen = (
        <AuthScreen pwd={this.state.pwd} changeScreen={this.changeScreen} />
      );
    } else if(this.state.currScreen === 'home') {
      screen = (
        <HomeScreen />
      );
    } else if(this.state.currScreen === 'init') {
      screen = (
        <InitScreen changeScreen={this.changeScreen} />
      );
    }
    return screen;
  }
}

export default App;