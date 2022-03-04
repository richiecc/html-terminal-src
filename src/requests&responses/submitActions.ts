import axios from 'axios';
import { returnErrors } from './errorActions';
import { AUTH_ERROR, SET_ERROR, SET_SUCCESS } from '../types/types';
import { IConfigHeaders } from '../interfaces/interfaces';

export const terminalCommand = (command: string, token: string, terminal: number, directoryPath: string) => (dispatch: Function, getState: Function) => {
    const body = JSON.stringify({command,token,terminal,directoryPath});
    axios
    .post('https://shamich.com/api/command', body, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: SET_SUCCESS,
            payload: res.data
        })
    }).catch(err => {
        try {
            if(err.response.data.msg === 'Authentication error!') {
                dispatch(returnErrors(err.response.data, err.response.status, AUTH_ERROR, terminal));
                dispatch({type: AUTH_ERROR});
                return;
            }
            dispatch(
                returnErrors(err.response.data, err.response.status, SET_ERROR, terminal)
            )
            dispatch({
                type: SET_ERROR
            });	
        } catch (err) {
            dispatch(returnErrors({msg:'Server connection error..(It might be down)'}, 400, SET_ERROR, terminal));
            dispatch({type:SET_ERROR});
        }
    });
}

export const clearSuccess = () => {};

export const tokenConfig = (getState: Function) => {
    const config: IConfigHeaders = {
      headers: {
        'Content-type': 'application/json',
      }
    };
    return config;
  };
  