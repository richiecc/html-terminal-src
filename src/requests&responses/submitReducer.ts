import { IAction } from '../interfaces/interfaces';
import { AUTH_ERROR, SET_SUCCESS } from '../types/types';
const initialState = {
  data: null,
  isAuthenticated: false
};


export default function submitReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case SET_SUCCESS:
      return{
        ...state,
        data: action.payload,
        isAuthenticated: true
      }
    case AUTH_ERROR:
      return{
        ...state,
        data: null,
        isAuthenticated: false
      }
    default:
      return state;
  }
}
