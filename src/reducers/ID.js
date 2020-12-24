import {UPDATE_ID} from '../actions/type';

const initialState = [];

var IDReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ID:
      state = action.newID;
      return state;
    default:
      return state;
  }
};
export default IDReducer;
