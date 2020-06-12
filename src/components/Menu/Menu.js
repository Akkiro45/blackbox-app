import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';

import * as COLORS from '../../util/colors';
import MenuItem from './MenuItem/MenuItem';

const menu = (props) => {
  return (
    <Dialog
      visible={props.visible}
      onTouchOutside={props.onDialogPress}
      dialogStyle={{ backgroundColor: COLORS.DARK1, borderRadius: 5, width: '70%', alignSelf: 'center' }}
      contentStyle={{ padding: 0, paddingTop: 0 }} >
      <View>
        <MenuItem title='Edit' onPress={() => {
          props.onDialogPress();
          props.onEditItem();
        }} />
        <View style={style.divider} />
        <MenuItem title={props.item.hide ? 'Un hide' : 'Hide'} onPress={() => {
          props.onDialogPress();
          props.onChangeProp();
        }} />
        <View style={style.divider} />
        <MenuItem title='Delete' onPress={() => {
          props.onDialogPress();
          props.onRmoveItem();
        }} />
      </View>
    </Dialog>
  );
}

const style = StyleSheet.create({
  divider: {
    width: '100%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    alignSelf: 'center'
  }
});

export default menu;