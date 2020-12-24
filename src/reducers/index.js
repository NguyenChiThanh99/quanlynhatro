import {combineReducers} from 'redux';
import IDReducer from './ID';

const myReducer = combineReducers({
  ID: IDReducer,
});
export default myReducer;
