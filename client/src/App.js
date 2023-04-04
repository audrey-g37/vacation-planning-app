import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import ViewAllTrips from './pages/ViewTrip(s)/ViewAllTrips';
import ViewSingleTrip from './pages/ViewTrip(s)/ViewSingleTrip';
import ViewTask from './pages/ViewTask/ViewTask';
import ViewBudget from './pages/ViewBudget/ViewBudget';
import Signup from './pages/signup/signup';
import EditTask from './pages/ViewTask/updateTask';
import EditBudget from './pages/ViewBudget/updateBudget';
import UnderConstruction from './pages/ErrorPages/UnderConstruction';

const httpLink = createHttpLink({
	uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('id_token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	};
});

const client = new ApolloClient({
	// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});

// *using to disable app/features while I refactor and enhance app
const underConstruction = true;

function App() {
	return (
		<>
			<ApolloProvider client={client}>
				<Router>
					<NavBar underConstruction={underConstruction} />
					<div className='whole'>
						{underConstruction ? (
							<Route exact path='/'>
								<UnderConstruction />
							</Route>
						) : (
							<>
								<Route exact path='/'>
									<Login />
								</Route>
								<Route exact path='/signup'>
									<Signup />
								</Route>
								<Switch>
									<Route exact path='/dashboard'>
										<Dashboard />
									</Route>
									<Route exact path='/view-trip/:id'>
										<ViewSingleTrip />
									</Route>
									<Route exact path='/view-trips/'>
										<ViewAllTrips />
									</Route>
									<Route exact path='/:id/view-tasks'>
										<ViewTask />
									</Route>
									<Route exact path='/:id/view-tasks/:id'>
										<EditTask />
									</Route>
									<Route exact path='/:id/view-budget'>
										<ViewBudget />
									</Route>
									<Route exact path='/:id/view-budgets/:id'>
										<EditBudget />
									</Route>
								</Switch>
							</>
						)}
					</div>
					<Footer />
				</Router>
			</ApolloProvider>
		</>
	);
}

export default App;
