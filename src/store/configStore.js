import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import loadingReducer from './reducers/loading';
import errorReducer from './reducers/error';
import currReducer from './reducers/curr';
import itemReducer from './reducers/item';

const rootReducer = combineReducers({
  loading: loadingReducer,
  error: errorReducer,
  curr: currReducer,
  item: itemReducer
});

let composeEnhancers = compose;

if(__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configStore;