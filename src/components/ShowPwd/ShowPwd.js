import React, { Component } from 'react';
import { ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import AsyncStorage from '@react-native-community/async-storage';

import * as COLORS from '../../util/colors';
import { decrypt } from '../../util/ed';
import Text from '../UI/Text/Text';

class ShowPwd extends Component {
  state = {
    password: null
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
   if(nextProps.visible) {
    AsyncStorage.getItem('pwd')
    .then(pwd => {
      this.setState({ 
        password: decrypt(pwd, nextProps.password)
      });
    })
    .catch(() => {});
   }
  }
  render() {
    let ren = (
      <ActivityIndicator size='large' color={COLORS.PRIMARY} />
    );
    if(this.state.password) {
      ren = (
        <Text 
          text={this.state.password}
          type='h4'
          style={{
            fontFamily: 'Roboto-Medium',
            textAlign: 'left',
            borderWidth: 1,
            borderColor: COLORS.PRIMARY,
            borderRadius: 5,
            padding: 5
          }}
        />
      );
    }
    return (
      <Dialog
          visible={this.props.visible}
          onTouchOutside={this.props.onDialogPress}
          dialogStyle={{ backgroundColor: COLORS.DARK3, borderRadius: 5, width: Dimensions.get('screen').width - 40, alignSelf: 'center' }}
          contentStyle={{ padding: 10, paddingTop: 10 }} >
        <ScrollView style={{ maxHeight: 400 }} >
          <Text text={this.props.id} type='h6' numberOfLines={1} style={{ textAlign: 'left' }} />
          <Text text='Password : ' style={{ textAlign: 'left', marginTop: 15, marginBottom: 5 }} />
          {ren}
        </ScrollView>
      </Dialog>
    );
  }
}

export default ShowPwd;