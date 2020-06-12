import React from 'react';
import { View, TouchableNativeFeedback } from 'react-native';

import Text from '../../UI/Text/Text';

const menuItem = (props) => {
  return (
    <View style={{ width: '100%', height: 40, overflow: 'hidden' }} >
      <TouchableNativeFeedback onPress={props.onPress} >
        <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', flex: 1 }} >
          <Text text={props.title} style={{ fontSize: 18 }} />
          {props.icon}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

export default menuItem;