import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import submitReducer from './submitReducer';

export default combineReducers({
	error: errorReducer,
	submit: submitReducer
});