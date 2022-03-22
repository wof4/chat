
import thunkMiddleware from 'redux-thunk';
import mainReducer from './reducers/mainReducer';
import communicationReducer from './reducers/communicationReducer';
import { applyMiddleware, combineReducers, createStore } from 'redux';

export const reducers = combineReducers({
  mainReducer,
  communicationReducer,
});


const store = createStore(reducers, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store;

export default store;
