import React, {  } from 'react';
import './App.css';
//import Datatest from './components/datatest/data.js';
//import Nav from './components/nav/nav';
//import Footer from './components/footer/footer';
//import { connect } from 'react-redux'; // haven't use this here yet.

import {BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";


import { Provider } from 'react-redux';
import { store } from './store';
import MainRouter from './routers/mainrouter';
const App = () => {	
		return (
		<Provider store={store}>
			<Router>
				<MainRouter />
			</Router>
    	</Provider>
	);
};

export default App;
