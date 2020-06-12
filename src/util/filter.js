import { isEmty } from './util';

const filter = (items, group, search, isAsec, hide) => {
  items = items.filter(item => item.hide !== hide);
  var re = new RegExp(search, 'i');
  let items1 = [];
  let items2 = [];
  let flag;
  if(group !== 'All') {
    items.forEach(item => {
      if(group === item.group) {
        items1.push(item);
      }
    });
  } else {
    items1 = items;
  }
  if(!isEmty(search)) {
    items1.forEach((item) => {
      flag = 0;
      if(re.test(item.id)) {
        flag = 1;
      } 
      if(flag === 1) {
        items2.push(item);
      } 
    });
  } else {
    items2 = items1;
  }
  if(isAsec) {
    items = items2.sort((a, b) => a.createdAt - b.createdAt);
  } else {
    items = items2.sort((a, b) => b.createdAt - a.createdAt);
  }
  return items;
}

export default filter;