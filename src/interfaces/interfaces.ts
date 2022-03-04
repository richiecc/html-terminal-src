import { E_ERROR } from '../errorInterfaces/enum';

// ERRORS TYPES
export interface IMsg {
  msg: string | any;
  user?: string | any;
  email?: string | any;
}
export interface IError {
  id: E_ERROR;
  msg: IMsg;
  terminalnode: number;
}
// REDUCER TYPES
export interface IAction {
  type: string;
  payload?: any;
}

// HEADER TYPES
export interface IConfigHeaders {
  headers: {
    [index: string]: string;
  };
}

// AUTHENTICATION TYPES
export interface IAuthReduxProps {
  error: IError;
}

// TERMINAL TYPES
export interface ITerminal {
  isAuthenticated?: boolean;
  error: IError;
  data: any;
  terminalnode: number;
  terminalId: string;
  clearErrors(): void;
  terminalCommand(info: string,token: string, terminal: number, directoryPath: string): void;
}
export interface ITerminalReduxProps extends IAuthReduxProps {
  submit:{
    data: any;
    isAuthenticated: boolean;
  }
}
