import React from 'react';
import { Text, StyleSheet } from 'react-native';

const getFontSize = (type) => {
  if(type === 'h1') return 35;
  else if(type === 'h2') return 30;
  else if(type === 'h3') return 25;
  else if(type === 'h4') return 20;
  else if(type === 'h5') return 18;
  else if(type === 'h6') return 16;
  else return 15
}

const textComp = (props) => {
  const style = StyleSheet.create({
    text: {
      textAlign: 'center',
      color: '#fff',
      fontSize: getFontSize(props.type),
      fontFamily: 'Roboto-Regular'
    }
  });
  return (
    <Text 
      style={[style.text, props.style]} 
      numberOfLines={props.numberOfLines} 
    >{props.text}</Text>
  );
}

export default textComp;