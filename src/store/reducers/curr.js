import { SET_CURR } from '../actions/actionTypes';

const initState = {
  curr: null
};

const reducer = (state=initState, action) => {
  switch(action.type) {
    case SET_CURR: return { curr: action.curr };
    default: return state;
  }
}

export default reducer;