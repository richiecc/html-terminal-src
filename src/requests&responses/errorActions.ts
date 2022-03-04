import { GET_ERRORS, CLEAR_ERRORS } from '../types/types';
import { IMsg } from '../interfaces/interfaces';

// RETURN ERRORS
export const returnErrors = (msg: IMsg, status: number, id: any = null, terminalnode: number) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id, terminalnode}
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {type: CLEAR_ERRORS};
};
