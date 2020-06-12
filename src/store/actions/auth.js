import AsyncStorage from '@react-native-community/async-storage';
import bcrypt from "react-native-bcrypt";
import isaac from "isaac";

import { startLoading, stopLoading, setError } from './index';

bcrypt.setRandomFallback((len) => {
	const buf = new Uint8Array(len);
	return buf.map(() => Math.floor(isaac.random() * 256));
});

export const auth = (password, hashedPwd, setScreen) => {
  return dispatch => {
    dispatch(startLoading());
    try {
      if(!hashedPwd) {
        bcrypt.hash(password, 8, function(err, hash) {
          if(err) throw new Error('Error!');
          AsyncStorage.setItem('pwd', hash)
            .then(() => {
              dispatch(stopLoading());
              setScreen('init');
            })
            .catch(e => {
              throw new Error('Error!');
            });
        });
      } else {
        bcrypt.compare(password, hashedPwd, function(err, res) {
          if(err) throw new Error('Error!');
          if(res) {
            dispatch(stopLoading());
            setScreen('home');
          } else {
            dispatch(setError('Incorrect password!'));
            dispatch(stopLoading());
          }
        });
      }
    } catch(error) {
      dispatch(stopLoading());
      dispatch(setError('Something went wrong! Please try again!'));
    }
  }
}