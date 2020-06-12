import { SET_ITEMS, SET_HIDE } from '../actions/actionTypes';

const initState = {
  items: [],
  groups: ['None'],
  hide: true
}

const reducer = (state=initState, action) => {
  switch(action.type) {
    case SET_ITEMS: {
      let groups = state.groups;
      action.items.forEach(item => {
        if(!groups.includes(item.group)) {
          groups.push(item.group);
        }
      });
      return { ...state, items: action.items, groups };
    };
  case SET_HIDE: return { ...state, hide: !state.hide } 
  default: return state;
  }
} 

export default reducer;