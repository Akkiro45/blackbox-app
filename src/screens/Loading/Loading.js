import React from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit';

import { PRIMARY, PRIMARY_VARIANT } from '../../util/colors';
import Text from '../../components/UI/Text/Text';

const loading = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
      <Text text='BlackBox' type='h1' style={{ color: PRIMARY, marginBottom: 120 }} />
      <Spinner 
        isVisible
        color={PRIMARY_VARIANT}
        size={90}
        type='9CubeGrid'
      />
    </View>
  );
}

export default loading;