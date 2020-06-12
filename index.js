import React from 'react';
import { AppRegistry, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';

import App from './App';
import {name as appName} from './app.json';
import store from './src/store/configStore';
import { STATUS_BAR, DARK1 } from './src/util/colors';

const AppContainer = () => {
  return (
    <Provider store={store()} >
      <StatusBar 
        backgroundColor={STATUS_BAR}
        barStyle='light-content'
      />
      <View style={{ backgroundColor: DARK1, flex: 1 }} >
        <App />
      </View>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => AppContainer);
