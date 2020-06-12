import React, { Component } from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import FeIcon from 'react-native-vector-icons/dist/Feather';

import * as COLORS from '../../util/colors';
import { LOCK, ALERT } from '../../util/icons';
import Text from '../../components/UI/Text/Text';

class Init extends Component {
  state = {
    done: false
  }
  onPress = () => {
    if(this.state.done) {
      this.props.changeScreen('home');
    } else {
      this.setState({ done: true });
    }
  }
  render() {
    let ren = (
      <View style={style.root} >
        <View style={style.container} >
          <FeIcon name={LOCK} style={style.icon} />
          <Text 
            text='Secure' type='h3' style={style.mainText} />
          <Text text='You can store any id and password!' style={style.subText} />
          <Text text='This app stores your password by encrypting in your phone only!' style={style.subText} />
        </View>
      </View>
    );
    if(this.state.done) {
      ren = (
        <View style={style.root} >
          <View style={style.container} >
            <FeIcon name={ALERT} style={[style.icon, { color: COLORS.PRIMARY }]} />
            <Text 
              text='Warning' type='h3' style={[style.mainText, { color: COLORS.PRIMARY }]} />
            <Text text="Do not add sensitive id's password!" style={style.subText} />
            <Text text='App stores all your passwords in your phone only so if you delete app all the data will be lost!' style={style.subText} />
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }} >
        {ren}
        <View style={style.button} >
          <TouchableNativeFeedback onPress={this.onPress} >
            <View style={{ width: '100%', height: '100%', justifyContent: 'center' }} >
              <Text text={this.state.done ? 'Get Started' : 'Next'} type='h4' style={{ fontFamily: 'Roboto-Medium' }} />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },  
  container: {
    width: '90%',
    alignItems: 'center',
    // marginBottom: 80
  },
  icon: {
    color: '#fff',
    fontSize: 70,
  },
  mainText: {
    fontFamily: 'Roboto-Medium',
    marginVertical: 10
  },
  button: {
    width: '80%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 25,
    marginBottom: 30,
    elevation: 20
  }
});

export default Init;