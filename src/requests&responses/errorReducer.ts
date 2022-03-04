import { GET_ERRORS, CLEAR_ERRORS } from '../types/types';
import { IAction } from '../interfaces/interfaces';

const initialState = {
  msg: {},
  status: null,
  id: null,
  terminalnode: null
};

export default function errorReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
        terminalnode: action.payload.terminalnode
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}
