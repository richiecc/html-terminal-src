import { Provider } from 'react-redux';
import { store } from './store';
import Routing from './routers/router';
const App = () => {	
	return (
		<Provider store={store}>
			<Router>
				<Routing />
			</Router>
		</Provider>
	);
};

export default App;
