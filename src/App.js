import './App.css';
import Landing from './Pages/Landing';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useLocalContext } from './Context/Context';
import RouteHandler from './Route/RouteHandler';
function App() {
	const { loggedInUser, logout } = useLocalContext();
	return (
		<Router className='App'>
			<Switch>
				<Route path='/'>
					{loggedInUser ? <RouteHandler /> : <Landing />}
				</Route>
			</Switch>
		</Router>
	);
}
export default App;
