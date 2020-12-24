import {UPDATE_ID} from './type';

export const updateID = (newID) => {
  return {
    type: UPDATE_ID,
    newID: newID,
  };
};