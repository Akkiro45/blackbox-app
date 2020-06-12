import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-community/async-storage';

import { SET_ITEMS, SET_HIDE } from './actionTypes';
import { encrypt, decrypt } from '../../util/ed';
import { startLoading, stopLoading, setError, setCurr } from './index';

export const setItems = (items) => {
  return {
    type: SET_ITEMS,
    items
  }
}

export const setHide = () => {
  return {
    type: SET_HIDE
  }
}

export const addItem = (data, done) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const key = await AsyncStorage.getItem('pwd');
      let items = await AsyncStorage.getItem('items');
      items = JSON.parse(items);
      data.password = encrypt(key, data.password);
      data.createdAt = new Date().getTime();
      data._id = uuid.v1();
      if(!items) {
        items = [];
      }
      items.push(data);
      await AsyncStorage.setItem('items', JSON.stringify(items));
      dispatch(setItems(items));
      dispatch(stopLoading());
      done();
    } catch(error) {
      console.log(error)
      dispatch(stopLoading());
      dispatch(setError('Unable to add!'));
    }
  }
}

export const editItem = (data, done) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      let items = await AsyncStorage.getItem('items');
      items = JSON.parse(items);
      data.updatedAt = new Date().getTime();
      const itemIndex = items.findIndex(item => item._id === data._id);
      if(itemIndex < 0) throw new Error('Error!');
      data.password = items[itemIndex].password
      items[itemIndex] = data;
      await AsyncStorage.setItem('items', JSON.stringify(items));
      dispatch(setItems(items));
      dispatch(stopLoading());
      done();
    } catch(error) {
      dispatch(stopLoading());
      dispatch(setError('Unable to edit!'));
    }
  }
}

export const changeProp = (_id, type, value) => {
  return async (dispatch) => {
    dispatch(startLoading());
    dispatch(setCurr(_id));
    try {
      let items = await AsyncStorage.getItem('items');
      items = JSON.parse(items);
      const itemIndex = items.findIndex(item => item._id === _id);
      if(itemIndex < 0) throw new Error('Error!');
      items[itemIndex]['updatedAt'] = new Date().getTime();
      items[itemIndex][type] = value;
      await AsyncStorage.setItem('items', JSON.stringify(items));
      dispatch(setItems(items));
      dispatch(stopLoading());
      dispatch(setCurr(null));
    } catch(error) {
      dispatch(stopLoading());
      dispatch(setError('Something went wrong!'));
    }
  }
} 

export const removeItem = (_id) => {
  return async dispatch => {
    dispatch(startLoading());
    dispatch(setCurr(_id));
    try {
      let items = await AsyncStorage.getItem('items');
      items = JSON.parse(items);
      items = items.filter(item => item._id !== _id);
      await AsyncStorage.setItem('items', JSON.stringify(items));
      dispatch(setItems(items));
      dispatch(stopLoading());
      dispatch(setCurr(null));
    } catch(error) {
      dispatch(stopLoading());
      dispatch(setError('Something went wrong!'));
    }
  }
}

// Storage
// items = [
//   {
//     id: 'test@test.com',
//     password: 'abjksaskas',
//     group: 'None',
//     hide: false,
//     createdAt: 28378382
//   }
// ]
// pwd = 'KAskskbksbaksHASSasnsasnks';