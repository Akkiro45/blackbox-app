import React, { Component } from 'react';
import { View, StyleSheet, TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Dialog } from 'react-native-simple-dialogs';
import AsyncStorage from '@react-native-community/async-storage';

import * as COLORS from '../../util/colors';
import { auth, resetError } from '../../store/actions/index';
import Text from '../UI/Text/Text';
import TextInput from '../UI/TextInput/TextInput';

class PwdChecker extends Component {
  state = {
    password: '',
    hashedPwd: null,
  }
  componentDidMount() {
    this.props.resetError();
    AsyncStorage.getItem('pwd')
      .then(hashedPwd => {
        this.setState({ hashedPwd, password: '' });
      })
      .catch(() => {});
  }
  componentWillUnmount() {
    this.props.resetError();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.visible !== this.props.visible) {
      this.setState({ password: '' });
    }
  }
  onChangeText = (type, val) => {
    this.setState({ [type]: val });
  }
  render() {
    let error = null;
    if(this.props.error) {
      error = (
        <Text text={this.props.error}  
          type='h6'
          style={{ color: COLORS.DANGER, marginTop: 10 }}
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
      </View>
    );
    if(this.props.loading || !this.state.hashedPwd) {
      inputs = (
        <ActivityIndicator size='large' color={COLORS.PRIMARY} style={{ marginVertical: 15 }} />
      );
    }
    return (
      <Dialog
        visible={this.props.visible}
        onTouchOutside={() => {
          this.props.onDialogPress();
          this.props.resetError();
        }}
        dialogStyle={{ backgroundColor: COLORS.DARK3, borderRadius: 5, width: '90%', alignSelf: 'center' }}
        contentStyle={{ padding: 0, paddingTop: 0 }} >
        <View>
          <Text 
            text={'Enter Password'}
            type='h4'
            style={{ marginVertical: 20, fontFamily: 'Roboto-Medium' }} />
          {inputs}
          {error}
          <View style={style.controls} >
            <TouchableNativeFeedback onPress={() => {
              this.props.onDialogPress();
              this.props.resetError();
            }} >
              <View style={style.control} >
                <Text text='Close' type='h4' />
              </View>
            </TouchableNativeFeedback>
            <View style={style.divider} ></View>
            <TouchableNativeFeedback onPress={() => {
              this.props.auth(this.state.password, this.state.hashedPwd, () => {
                this.props.onDialogPress();
                this.props.onSuccess();
              });
            }} >
              <View style={style.control} >
                <Text text={'Enter'} type='h4' style={{ color: COLORS.PRIMARY }} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </Dialog>
    );
  }
}

const style = StyleSheet.create({
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

export default connect(mapStateToProps, mapDispatchToProps)(PwdChecker);