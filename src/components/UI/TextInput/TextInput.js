import React from 'react';
import { TextInput } from 'react-native';

import { PRIMARY_VARIANT } from '../../../util/colors';

const textInput = (props) => {
  return (
    <TextInput 
      onChangeText={props.onChangeText}
      value={props.value}
      maxLength={props.maxLength}
      placeholder={props.placeholder}
      selectTextOnFocus={true}
      selectionColor={PRIMARY_VARIANT}
      secureTextEntry={props.secureTextEntry}
      style={{
        width: '100%',
        height: 40,
        elevation: 5,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: PRIMARY_VARIANT,
        borderRadius: 5,
        backgroundColor: '#fff'
      }}
      {...props}
    />
  );
}

export default textInput;