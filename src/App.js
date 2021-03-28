import './App.css';
import Landing from './Pages/Landing';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useLocalContext } from './Context/Context';
import RouteHandler from './Route/RouteHandler';
import Register from './Pages/Register';
import Home from './Pages/Home';
function App() {
	const { loggedInUser, logout } = useLocalContext();
	console.log(!!loggedInUser);
	return (
		<Router className='App'>
			<Switch>
				<Route path='/' exact>
					{loggedInUser ? <RouteHandler /> : <Landing />}
				</Route>
				<Route path='/reg' exact>
					<Register reg={!!loggedInUser} />
				</Route>
				<Route path='/home' exact>
					<Home />
				</Route>
			</Switch>
		</Router>
	);
}
export default App;
