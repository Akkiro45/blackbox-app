import React, { Component } from 'react';
import { View, StyleSheet, TouchableNativeFeedback, ActivityIndicator, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

import { PRIMARY, DANGER, DARK3 } from '../../util/colors';
import { validatePassword } from '../../util/util';
import { auth, resetError } from '../../store/actions/index';
import Text from '../../components/UI/Text/Text';
import TextInput from '../../components/UI/TextInput/TextInput';
import BinaryImage from '../../assets/images/binary1.png'

class Auth extends Component {
  state = {
    password: '',
    confirmPassword: '',
    error: null
  }
  onChangeText = (type, val) => {
    this.setState({ [type]: val, error: null });
  }
  onPressClear = () => {
    this.setState({ password: '', confirmPassword: '', error: null });
    this.props.resetError();
  }
  onPress = () => {
    if(validatePassword(this.state.password)) {
      this.setState({ error: validatePassword(this.state.password) });
    } else if(!this.props.pwd && validatePassword(this.state.confirmPassword)) {
        this.setState({ error: validatePassword(this.state.confirmPassword) });
    } else if(!this.props.pwd && this.state.password !== this.state.confirmPassword) {
      this.setState({ error: 'Please enter same password in both field!' });
    } else {
      this.props.auth(this.state.password, this.props.pwd, this.props.changeScreen);
    }
  }
  render() {
    let error = null;
    if(this.props.error || this.state.error) {
      error = (
        <Text text={this.props.error ? this.props.error : this.state.error}  
          type='h6'
          style={{ color: DANGER, marginTop: 10 }}
        />
      );
    }
    let inputs = (
      <View style={{ width: '100%', alignItems: 'center' }} >
        <View style={style.input} >
          <TextInput 
            placeholder='Password'
            onChangeText={(val) => this.onChangeText('password', val)}
            value={this.state.password}
            maxLength={16}
            secureTextEntry
          />
        </View>
        {this.props.pwd ? null : (
          <View style={style.input} >
            <TextInput 
              placeholder='Confirm password'
              onChangeText={(val) => this.onChangeText('confirmPassword', val)}
              value={this.state.confirmPassword}
              maxLength={16}
              secureTextEntry
            />
          </View>
        )}
      </View>
    );
    if(this.props.loading) {
      inputs = (
        <ActivityIndicator size='large' color={PRIMARY} style={{ marginVertical: 15 }} />
      );
    }
    return (
      <ImageBackground source={BinaryImage} style={{ flex: 1 }} >
        <View style={style.container} >
          <Text 
            text={this.props.pwd ? 'Enter Password' : 'Set Password'}
            type='h4'
            style={{ marginVertical: 20, fontFamily: 'Roboto-Medium' }} />
          {inputs}
          {error}
          <View style={style.controls} >
            <TouchableNativeFeedback onPress={this.onPressClear} >
              <View style={style.control} >
                <Text text='clear' type='h4' />
              </View>
            </TouchableNativeFeedback>
            <View style={style.divider} ></View>
            <TouchableNativeFeedback onPress={this.onPress} >
              <View style={style.control} >
                <Text text={this.props.pwd ? 'Enter' : 'Set'} type='h4' style={{ color: PRIMARY }} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const style = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: DARK3,
    position: 'absolute',
    top: '35%',
    alignSelf: 'center',
    borderRadius: 5,
    elevation: 20,
    alignItems: 'center'
  },
  input: {
    width: '80%',
    marginVertical: 5
  },
  controls: {
    flexDirection: 'row',
    height: 45,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
  control: {
    width: '49%',
    height: '100%',
    justifyContent: 'center'
  },
  divider: {
    height: '100%',
    borderRightColor: '#eee',
    borderRightWidth: 1
  }
});

const mapStateToProps = state => {
  return {
    loading: state.loading.loading,
    error: state.error.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    auth: (password, hashedPwd, setScreen) => dispatch(auth(password, hashedPwd, setScreen)),
    resetError: () => dispatch(resetError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);