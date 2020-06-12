import { SET_CURR } from './actionTypes';

export const setCurr = (curr) => {
  return {
    type: SET_CURR,
    curr
  }
}