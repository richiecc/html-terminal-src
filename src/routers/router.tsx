import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../components/home/home';
const Routing = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
		</Switch>
	);
};
export default Routing;
