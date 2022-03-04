import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './requests&responses/index';


const initialState = {};
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
// composeEnhancers(applyMiddleware(thunk))
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const devTools = process.env.NODE_ENV === "development" ? composeEnhancers(applyMiddleware(thunk)) : compose(applyMiddleware(thunk));
export const store = createStore(rootReducer, initialState, devTools);

export default { store };